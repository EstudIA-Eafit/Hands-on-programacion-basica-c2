// ============================================================
// PÁGINA DE LABORATORIO
// Esta página es la misma para todos los laboratorios.
// 1. Lee en la dirección qué laboratorio abrir (?lab=carpeta).
// 2. Carga labs/<carpeta>/lab.json.
// 3. Si el laboratorio tiene varios proyectos, pide elegir uno.
// 4. Carga los archivos de inicio y muestra las tareas,
//    el editor y la vista previa.
// Todo lo que la persona hace se guarda solo en su navegador.
// ============================================================


// ---------- Datos que comparten todas las funciones ----------

let laboratorio = null;   // el contenido de lab.json
let carpeta = "";         // por ejemplo "labs/01-html-basico/"
let carpetaInicio = "";   // carpeta de los archivos de inicio
let proyecto = null;      // el proyecto elegido, si el lab tiene varios
let codigoInicial = {};   // nombre de archivo -> código de inicio
let editores = {};        // nombre de archivo -> su cuadro de texto
let espera = null;        // temporizador para no actualizar en cada tecla


// ---------- Guardar en el navegador ----------
// localStorage guarda texto en este navegador. Puede fallar
// (por ejemplo, en una ventana privada), así que siempre
// lo usamos dentro de try/catch para que la página siga funcionando.

function claveGuardado(parte) {
  return "laboratorios:" + laboratorio.id + ":" + parte;
}

function leerGuardado(parte) {
  try {
    return localStorage.getItem(claveGuardado(parte));
  } catch (error) {
    return null;
  }
}

function guardar(parte, valor) {
  try {
    localStorage.setItem(claveGuardado(parte), valor);
    return true;
  } catch (error) {
    return false;
  }
}

function borrarGuardado(parte) {
  try {
    localStorage.removeItem(claveGuardado(parte));
  } catch (error) {
    // Si no se puede borrar, no pasa nada grave.
  }
}

// El código de cada archivo se guarda aparte para cada proyecto.
// Así, si la persona cambia de proyecto y vuelve, no pierde su trabajo.
// En los laboratorios sin proyectos la clave es la de siempre.
function parteArchivo(nombre) {
  if (proyecto) {
    return proyecto.id + ":archivo:" + nombre;
  }
  return "archivo:" + nombre;
}

// La elección de proyecto se guarda por "grupo", no por laboratorio.
// Los laboratorios del mismo grupo comparten la elección.
function claveProyecto() {
  const grupo = laboratorio.proyectos.grupo || laboratorio.id;
  return "laboratorios:proyecto:" + grupo;
}

function leerProyectoGuardado() {
  try {
    return localStorage.getItem(claveProyecto());
  } catch (error) {
    return null;
  }
}

function guardarProyecto(id) {
  try {
    localStorage.setItem(claveProyecto(), id);
  } catch (error) {
    // Si no se puede guardar, la persona tendrá que elegir otra vez.
  }
}


// ---------- Datos del laboratorio ----------

function mostrarDatos() {
  document.title = laboratorio.titulo + " · Laboratorios";
  document.getElementById("titulo-lab").textContent = laboratorio.titulo;
  document.getElementById("objetivo-lab").textContent = laboratorio.objetivo;
  document.getElementById("duracion-lab").textContent = laboratorio.duracion;
  document.getElementById("nivel-lab").textContent = laboratorio.nivel;
}


// ---------- Tareas ----------

function leerTareasHechas() {
  const texto = leerGuardado("tareas");
  if (!texto) {
    return {};
  }
  try {
    return JSON.parse(texto);
  } catch (error) {
    return {};
  }
}

function actualizarAvance() {
  const casillas = document.querySelectorAll("#lista-tareas input[type=checkbox]");
  let hechas = 0;
  for (const casilla of casillas) {
    if (casilla.checked) {
      hechas = hechas + 1;
    }
  }
  document.getElementById("avance").textContent =
    "Llevas " + hechas + " de " + casillas.length + " tareas.";
}

// Abre o cierra el panel de tareas. Cerrado, el editor y el resultado
// ocupan su espacio y queda una franja con el avance y el botón.
// No se guarda: cada vez que se abre un laboratorio, las tareas se ven.
function mostrarPanelTareas(abrir) {
  const boton = document.getElementById("boton-tareas");
  document.getElementById("contenido-tareas").hidden = !abrir;
  document.getElementById("panel-tareas").classList.toggle("tareas-cerrada", !abrir);
  document.querySelector(".lab-cuerpo").classList.toggle("sin-tareas", !abrir);
  boton.setAttribute("aria-expanded", abrir ? "true" : "false");
  // El botón solo muestra una flecha. Su nombre lo leen los lectores
  // de pantalla (aria-label) y aparece al pasar el mouse (title).
  // La dirección de la flecha la cambia sitio.css según aria-expanded.
  const nombre = abrir ? "Ocultar tareas" : "Mostrar tareas";
  boton.setAttribute("aria-label", nombre);
  boton.title = nombre;
}

function alternarTareas() {
  const abierto = document.getElementById("boton-tareas").getAttribute("aria-expanded") === "true";
  mostrarPanelTareas(!abierto);
}

function guardarTareas() {
  const hechas = {};
  const casillas = document.querySelectorAll("#lista-tareas input[type=checkbox]");
  for (const casilla of casillas) {
    hechas[casilla.dataset.tarea] = casilla.checked;
  }
  guardar("tareas", JSON.stringify(hechas));
  actualizarAvance();
}

// Crea una tarea: casilla, instrucción y, si hay, una pista que se despliega.
// La instrucción y la pista se escriben en lab.json y pueden llevar
// etiquetas sencillas como <code>. Por eso aquí usamos innerHTML.
function crearTarea(tarea, numero, hechas) {
  const elemento = document.createElement("li");
  elemento.className = tarea.reto ? "tarea tarea-reto" : "tarea";

  const casilla = document.createElement("input");
  casilla.type = "checkbox";
  casilla.id = "tarea-" + tarea.id;
  casilla.dataset.tarea = tarea.id;
  casilla.checked = hechas[tarea.id] === true;
  casilla.addEventListener("change", guardarTareas);

  const etiqueta = document.createElement("label");
  etiqueta.htmlFor = casilla.id;
  const nombre = tarea.reto ? "Reto." : "Tarea " + numero + ".";
  etiqueta.innerHTML = "<strong>" + nombre + "</strong> " + tarea.texto;

  elemento.appendChild(casilla);
  elemento.appendChild(etiqueta);

  if (tarea.pista) {
    const pista = document.createElement("details");
    const resumen = document.createElement("summary");
    resumen.textContent = "Ver pista";
    const texto = document.createElement("p");
    texto.innerHTML = tarea.pista;
    pista.appendChild(resumen);
    pista.appendChild(texto);
    elemento.appendChild(pista);
  }

  return elemento;
}

function mostrarTareas() {
  const lista = document.getElementById("lista-tareas");
  const hechas = leerTareasHechas();
  let numero = 1;
  for (const tarea of laboratorio.tareas) {
    lista.appendChild(crearTarea(tarea, numero, hechas));
    if (!tarea.reto) {
      numero = numero + 1;
    }
  }
  actualizarAvance();
}


// ---------- Editor ----------

// ---------- Colores, números de línea y sangría ----------

// Vuelve a pintar los colores y los números de línea de un editor.
// Se llama cada vez que cambia el código.
function pintarEditor(cuadro) {
  const partes = cuadro.parentElement.parentElement;
  const capa = partes.querySelector(".capa-colores code");
  const numeros = partes.querySelector(".numeros-texto");

  // El salto de línea final hace que la última línea tenga altura,
  // igual que en el cuadro de texto.
  capa.innerHTML = resaltarCodigo(cuadro.value, cuadro.dataset.lenguaje) + "\n";

  const lineas = cuadro.value.split("\n").length;
  if (Number(numeros.dataset.lineas) !== lineas) {
    let texto = "";
    for (let numero = 1; numero <= lineas; numero = numero + 1) {
      texto = texto + numero + "\n";
    }
    numeros.textContent = texto;
    numeros.dataset.lineas = lineas;
  }
  seguirDesplazamiento(cuadro);
}

// Cuando el cuadro de texto se desplaza, los colores y los números
// se mueven lo mismo para quedar alineados.
function seguirDesplazamiento(cuadro) {
  const partes = cuadro.parentElement.parentElement;
  const capa = partes.querySelector(".capa-colores code");
  const numeros = partes.querySelector(".numeros-texto");
  capa.style.transform = "translate(" + (-cuadro.scrollLeft) + "px, " + (-cuadro.scrollTop) + "px)";
  numeros.style.transform = "translateY(" + (-cuadro.scrollTop) + "px)";
}

// Escribe un texto en lugar de lo seleccionado.
// execCommand permite deshacer con Ctrl + Z. Si el navegador
// no lo acepta, usamos setRangeText.
function escribirEnCursor(cuadro, texto) {
  const funciono = document.execCommand("insertText", false, texto);
  if (!funciono) {
    cuadro.setRangeText(texto, cuadro.selectionStart, cuadro.selectionEnd, "end");
    cuadro.dispatchEvent(new Event("input"));
  }
}

// Cambia la sangría de las líneas seleccionadas.
// mas = true agrega 2 espacios; mas = false quita hasta 2.
function cambiarSangria(cuadro, mas) {
  const codigo = cuadro.value;
  const inicioSeleccion = cuadro.selectionStart;
  let finSeleccion = cuadro.selectionEnd;
  const variasLineas = codigo.slice(inicioSeleccion, finSeleccion).includes("\n");

  // Tab sin seleccionar varias líneas: escribe 2 espacios donde está el cursor.
  if (mas && !variasLineas) {
    escribirEnCursor(cuadro, "  ");
    return;
  }

  // Si la selección termina justo al empezar una línea, esa línea no cuenta.
  if (variasLineas && codigo[finSeleccion - 1] === "\n") {
    finSeleccion = finSeleccion - 1;
  }
  const inicioLineas = codigo.lastIndexOf("\n", inicioSeleccion - 1) + 1;
  let finLineas = codigo.indexOf("\n", finSeleccion);
  if (finLineas === -1) {
    finLineas = codigo.length;
  }

  const lineas = codigo.slice(inicioLineas, finLineas).split("\n");
  const nuevas = lineas.map(function (linea) {
    if (mas) {
      return "  " + linea;
    }
    return linea.replace(/^ {1,2}/, "");
  });
  const texto = nuevas.join("\n");
  if (texto === lineas.join("\n")) {
    return;
  }

  // Cuánto se movió el inicio de la primera línea, para dejar el cursor bien.
  const cambioPrimera = nuevas[0].length - lineas[0].length;
  cuadro.setSelectionRange(inicioLineas, finLineas);
  escribirEnCursor(cuadro, texto);
  if (variasLineas) {
    cuadro.setSelectionRange(inicioLineas, inicioLineas + texto.length);
  } else {
    const cursor = Math.max(inicioLineas, inicioSeleccion + cambioPrimera);
    cuadro.setSelectionRange(cursor, cursor);
  }
}

// Tab y Mayús + Tab cambian la sangría, como en VS Code.
// Para no dejar atrapado a quien usa solo el teclado:
// después de Esc, la tecla Tab sale del editor como siempre.
function alPulsarTecla(evento) {
  const cuadro = evento.target;
  if (evento.key === "Escape") {
    cuadro.dataset.salir = "si";
    return;
  }
  // Mayús, Ctrl o Alt solos no cuentan como "otra tecla".
  if (["Shift", "Control", "Alt", "Meta"].includes(evento.key)) {
    return;
  }
  const saleDelEditor = cuadro.dataset.salir === "si";
  delete cuadro.dataset.salir;
  if (evento.key !== "Tab" || evento.ctrlKey || evento.altKey || evento.metaKey || saleDelEditor) {
    return;
  }
  evento.preventDefault();
  cambiarSangria(cuadro, !evento.shiftKey);
}

// Al salir del editor, Esc deja de tener efecto.
function alSalirDelEditor(evento) {
  delete evento.target.dataset.salir;
}


// El tipo de código de un archivo, según cómo termina su nombre.
// Sirve para elegir los colores del editor.
function lenguajeDe(nombre) {
  if (nombre.endsWith(".css")) {
    return "css";
  }
  if (nombre.endsWith(".js")) {
    return "js";
  }
  return "html";
}

// Crea un panel con su etiqueta y su editor para un archivo.
// El editor tiene tres partes: números de línea, la capa de
// colores y, encima, el cuadro de texto donde se escribe.
function crearPanel(archivo, posicion) {
  const panel = document.createElement("div");
  panel.className = "panel";
  panel.id = "panel-" + posicion;

  const etiqueta = document.createElement("label");
  etiqueta.htmlFor = "codigo-" + posicion;
  etiqueta.textContent = "Código " + archivo.etiqueta + " (" + archivo.nombre + ")";

  const marco = document.createElement("div");
  marco.className = "marco-codigo";

  // aria-hidden: los lectores de pantalla leen solo el cuadro de texto.
  const numeros = document.createElement("div");
  numeros.className = "numeros";
  numeros.setAttribute("aria-hidden", "true");
  const numerosTexto = document.createElement("div");
  numerosTexto.className = "numeros-texto";
  numeros.appendChild(numerosTexto);

  const area = document.createElement("div");
  area.className = "area-codigo";
  const capa = document.createElement("pre");
  capa.className = "capa-colores";
  capa.setAttribute("aria-hidden", "true");
  capa.appendChild(document.createElement("code"));

  const cuadro = document.createElement("textarea");
  cuadro.id = "codigo-" + posicion;
  cuadro.className = "codigo";
  cuadro.dataset.lenguaje = lenguajeDe(archivo.nombre);
  cuadro.setAttribute("aria-describedby", "ayuda-teclado");
  // Apagamos el corrector y las mayúsculas automáticas:
  // en el código molestan.
  cuadro.spellcheck = false;
  cuadro.setAttribute("autocapitalize", "off");
  cuadro.setAttribute("autocomplete", "off");
  cuadro.setAttribute("autocorrect", "off");
  cuadro.setAttribute("wrap", "off");

  const guardado = leerGuardado(parteArchivo(archivo.nombre));
  cuadro.value = guardado !== null ? guardado : codigoInicial[archivo.nombre];

  // Los colores se pintan en cada tecla, para que no se atrasen.
  // Guardar y actualizar la vista previa espera un momento (alEscribir).
  cuadro.addEventListener("input", function () {
    pintarEditor(cuadro);
    alEscribir();
  });
  cuadro.addEventListener("scroll", function () {
    seguirDesplazamiento(cuadro);
  });
  cuadro.addEventListener("keydown", alPulsarTecla);
  cuadro.addEventListener("blur", alSalirDelEditor);

  area.appendChild(capa);
  area.appendChild(cuadro);
  marco.appendChild(numeros);
  marco.appendChild(area);
  panel.appendChild(etiqueta);
  panel.appendChild(marco);
  editores[archivo.nombre] = cuadro;
  pintarEditor(cuadro);
  return panel;
}

// Crea una pestaña por archivo. Solo se usa si hay más de un archivo.
function crearPestana(archivo, posicion) {
  const pestana = document.createElement("button");
  pestana.type = "button";
  pestana.id = "pestana-" + posicion;
  pestana.className = "pestana";
  pestana.textContent = archivo.etiqueta;
  pestana.setAttribute("role", "tab");
  pestana.setAttribute("aria-controls", "panel-" + posicion);
  pestana.addEventListener("click", function () {
    elegirPestana(posicion);
  });
  pestana.addEventListener("keydown", moverEntrePestanas);
  return pestana;
}

// Muestra el panel elegido y oculta los demás.
function elegirPestana(elegida) {
  const pestanas = document.querySelectorAll(".pestana");
  const paneles = document.querySelectorAll(".panel");
  for (let i = 0; i < pestanas.length; i = i + 1) {
    const activa = i === elegida;
    pestanas[i].setAttribute("aria-selected", activa ? "true" : "false");
    pestanas[i].tabIndex = activa ? 0 : -1;
    paneles[i].hidden = !activa;
  }
}

// Con el teclado: las flechas izquierda y derecha cambian de pestaña.
function moverEntrePestanas(evento) {
  const pestanas = document.querySelectorAll(".pestana");
  const actual = Array.from(pestanas).indexOf(evento.target);
  let nueva = actual;
  if (evento.key === "ArrowRight") {
    nueva = (actual + 1) % pestanas.length;
  } else if (evento.key === "ArrowLeft") {
    nueva = (actual - 1 + pestanas.length) % pestanas.length;
  } else if (evento.key === "Home") {
    nueva = 0;
  } else if (evento.key === "End") {
    nueva = pestanas.length - 1;
  } else {
    return;
  }
  evento.preventDefault();
  elegirPestana(nueva);
  pestanas[nueva].focus();
}

function mostrarEditor() {
  const contenedorPestanas = document.getElementById("pestanas");
  const contenedorPaneles = document.getElementById("paneles");
  const hayVariosArchivos = laboratorio.archivos.length > 1;

  // Si la persona cambió de proyecto, quitamos el editor anterior.
  contenedorPestanas.innerHTML = "";
  contenedorPaneles.innerHTML = "";
  editores = {};

  laboratorio.archivos.forEach(function (archivo, posicion) {
    const panel = crearPanel(archivo, posicion);
    contenedorPaneles.appendChild(panel);
    if (hayVariosArchivos) {
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", "pestana-" + posicion);
      contenedorPestanas.appendChild(crearPestana(archivo, posicion));
    }
  });

  if (hayVariosArchivos) {
    contenedorPestanas.hidden = false;
    elegirPestana(0);
  }
}

// Cada vez que la persona escribe, esperamos un momento
// y luego guardamos y actualizamos la vista previa.
// Así no se recalcula todo en cada tecla.
function alEscribir() {
  clearTimeout(espera);
  espera = setTimeout(function () {
    espera = null;
    guardarCodigo();
    actualizarVistaPrevia();
  }, 300);
}

function guardarCodigo() {
  let todoBien = true;
  for (const archivo of laboratorio.archivos) {
    const cambio = guardar(parteArchivo(archivo.nombre), editores[archivo.nombre].value);
    todoBien = todoBien && cambio;
  }
  const estado = document.getElementById("estado-guardado");
  if (todoBien) {
    estado.textContent = "Tus cambios se guardan en este navegador.";
  } else {
    estado.textContent = "No se pudieron guardar tus cambios en este navegador. " +
      "Descarga tu trabajo para no perderlo.";
  }
}


// ---------- Vista previa ----------

function archivoPrincipal() {
  for (const archivo of laboratorio.archivos) {
    if (archivo.principal) {
      return archivo;
    }
  }
  return laboratorio.archivos[0];
}

// Los archivos JavaScript del laboratorio (por ejemplo app.js).
// Los labs 01 a 04 no tienen ninguno.
function archivosJS() {
  return laboratorio.archivos.filter(function (archivo) {
    return lenguajeDe(archivo.nombre) === "js";
  });
}

function tieneJS() {
  return archivosJS().length > 0;
}

// Arma la página completa a partir del HTML principal.
// Si hay archivos CSS, cambia su <link href="estilos.css">
// por una etiqueta <style> con el código que la persona escribió.
// Así la vista previa y la descarga quedan en un solo archivo.
// Los archivos JavaScript no se tocan aquí: ver conectarJS.
function armarPagina() {
  let pagina = editores[archivoPrincipal().nombre].value;

  for (const archivo of laboratorio.archivos) {
    if (archivo.nombre.endsWith(".css")) {
      const nombre = archivo.nombre.replaceAll(".", "\\.");
      const enlace = new RegExp("<link[^>]*href=[\"']?" + nombre + "[\"']?[^>]*>", "gi");
      const estilo = "<style>\n" + editores[archivo.nombre].value + "\n</style>";
      // Usamos una función para que los símbolos $ del CSS no se interpreten.
      pagina = pagina.replace(enlace, function () {
        return estilo;
      });
    }
  }
  return pagina;
}

// Solo para la pestaña nueva. Cada archivo JavaScript se guarda como un
// archivo temporal del navegador (una dirección blob:) y su
// <script src="app.js" defer> pasa a apuntar ahí. No lo copiamos dentro
// de la página porque un <script> con el código adentro no respeta defer:
// se ejecutaría antes de que exista el resto del HTML. Además, así los
// errores de la consola dicen la misma línea que el editor.
// Devuelve la página y las direcciones creadas, para liberarlas después.
function conectarJS(pagina) {
  const direcciones = [];
  for (const archivo of archivosJS()) {
    const codigo = new Blob([editores[archivo.nombre].value], { type: "text/javascript;charset=utf-8" });
    const direccion = URL.createObjectURL(codigo);
    direcciones.push(direccion);
    const nombre = archivo.nombre.replaceAll(".", "\\.");
    const fuente = new RegExp("(<script[^>]*src=)[\"']?" + nombre + "[\"']?", "gi");
    pagina = pagina.replace(fuente, function (completo, inicio) {
      return inicio + '"' + direccion + '"';
    });
  }
  return { pagina: pagina, direcciones: direcciones };
}

// Los enlaces como href="#lista" deben moverse dentro de la vista previa.
// Esta etiqueta <base>, puesta dentro de <head>, evita que lleven a otra página.
function prepararVistaPrevia(pagina) {
  const base = '<base href="about:srcdoc">';
  const inicioHead = /<head[^>]*>/i;
  if (inicioHead.test(pagina)) {
    return pagina.replace(inicioHead, function (etiqueta) {
      return etiqueta + base;
    });
  }
  return base + pagina;
}

// Antes de cambiar de proyecto o abrir la pestaña nueva,
// guardamos lo que estaba pendiente.
function guardarPendiente() {
  if (espera !== null) {
    clearTimeout(espera);
    espera = null;
    guardarCodigo();
    actualizarVistaPrevia();
  }
}

function actualizarVistaPrevia() {
  const pagina = armarPagina();
  document.getElementById("vista-previa").srcdoc = prepararVistaPrevia(pagina);

  // El <title> no se ve dentro de la vista previa, así que lo mostramos arriba.
  const documento = new DOMParser().parseFromString(pagina, "text/html");
  const titulo = documento.title.trim();
  document.getElementById("titulo-pestana").textContent = titulo || "(sin título)";
}


// ---------- Botones ----------

function nombreDescarga() {
  if (proyecto) {
    return laboratorio.id + "-" + proyecto.id + "-mi-trabajo.html";
  }
  return laboratorio.id + "-mi-trabajo.html";
}

// Descarga un texto como archivo.
function bajarArchivo(texto, tipo, nombre) {
  const archivo = new Blob([texto], { type: tipo });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(archivo);
  enlace.download = nombre;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  // Esperamos un momento antes de liberar la memoria, para que la descarga empiece.
  setTimeout(function () {
    URL.revokeObjectURL(enlace.href);
  }, 10000);
}

function tipoDeArchivo(nombre) {
  const lenguaje = lenguajeDe(nombre);
  if (lenguaje === "css") {
    return "text/css;charset=utf-8";
  }
  if (lenguaje === "js") {
    return "text/javascript;charset=utf-8";
  }
  return "text/html;charset=utf-8";
}

// Sin JavaScript: un solo archivo HTML, con el CSS dentro de <style>.
// Con JavaScript: cada archivo por separado, igual que en el editor,
// porque el <script src="app.js" defer> necesita su archivo al lado.
// Los archivos salen uno tras otro; el navegador puede pedir permiso
// una vez para descargar varios archivos.
function descargarTrabajo() {
  if (!tieneJS()) {
    bajarArchivo(armarPagina(), "text/html;charset=utf-8", nombreDescarga());
    return;
  }
  laboratorio.archivos.forEach(function (archivo, posicion) {
    setTimeout(function () {
      bajarArchivo(editores[archivo.nombre].value, tipoDeArchivo(archivo.nombre), archivo.nombre);
    }, posicion * 400);
  });
  document.getElementById("estado-guardado").textContent =
    "Se descargan " + laboratorio.archivos.length + " archivos. Guárdalos juntos en una misma carpeta.";
}

// La pestaña nueva no tiene la protección del cuadro de vista previa.
// Esta regla de seguridad, puesta al inicio de <head>, hace lo mismo:
// no deja ejecutar scripts ni enviar formularios.
// En los laboratorios con JavaScript solo deja ejecutar los archivos
// temporales (blob:) que arma conectarJS, es decir, el código del editor.
// Un <script> escrito dentro del HTML o un onclick siguen bloqueados.
function protegerPestana(pagina) {
  const scripts = tieneJS() ? "blob:" : "'none'";
  const regla = '<meta http-equiv="Content-Security-Policy" ' +
    'content="script-src ' + scripts + '; object-src \'none\'; form-action \'none\'">';
  const inicioHead = /<head[^>]*>/i;
  if (inicioHead.test(pagina)) {
    return pagina.replace(inicioHead, function (etiqueta) {
      return etiqueta + regla;
    });
  }
  return regla + pagina;
}

// Abre en otra pestaña el código que está ahora en el editor,
// para usar el inspector y la consola del navegador con más espacio.
// Siempre usa la misma pestaña, así no se acumulan.
function abrirEnPestana() {
  guardarPendiente();
  const conJS = conectarJS(armarPagina());
  const pagina = protegerPestana(conJS.pagina);
  const archivo = new Blob([pagina], { type: "text/html;charset=utf-8" });
  const direccion = URL.createObjectURL(archivo);
  const pestana = window.open(direccion, "vista-previa-laboratorio");
  const estado = document.getElementById("estado-pestana");
  if (pestana) {
    estado.textContent = "Tu página se abrió en otra pestaña. " +
      "Si cambias el código, vuelve a pulsar el botón para ver los cambios.";
  } else {
    estado.textContent = "El navegador no dejó abrir la pestaña nueva. " +
      "Revisa si bloqueó las ventanas emergentes de este sitio.";
  }
  // Damos tiempo a que la pestaña cargue y después liberamos la memoria.
  setTimeout(function () {
    URL.revokeObjectURL(direccion);
    for (const direccionJS of conJS.direcciones) {
      URL.revokeObjectURL(direccionJS);
    }
  }, 60000);
}

function reiniciarCodigo() {
  const seguro = confirm(
    "¿Volver al código inicial?\n\n" +
    "Se borrarán todos tus cambios en el código de este laboratorio. " +
    "Las tareas marcadas no cambian.");
  if (!seguro) {
    return;
  }
  for (const archivo of laboratorio.archivos) {
    editores[archivo.nombre].value = codigoInicial[archivo.nombre];
    pintarEditor(editores[archivo.nombre]);
    borrarGuardado(parteArchivo(archivo.nombre));
  }
  document.getElementById("estado-guardado").textContent = "Volviste al código inicial.";
  actualizarVistaPrevia();
}

function mostrarDescargas() {
  const lista = document.getElementById("lista-descargas");
  lista.innerHTML = "";
  for (const archivo of laboratorio.archivos) {
    const elemento = document.createElement("li");
    const enlace = document.createElement("a");
    enlace.href = carpetaInicio + archivo.nombre;
    enlace.download = archivo.nombre;
    enlace.textContent = "Descargar " + archivo.nombre;
    elemento.appendChild(enlace);
    lista.appendChild(elemento);
  }
}


// ---------- Elegir proyecto ----------
// Solo para laboratorios con "proyectos" en lab.json.

function buscarProyecto(id) {
  for (const opcion of laboratorio.proyectos.opciones) {
    if (opcion.id === id) {
      return opcion;
    }
  }
  return null;
}

// Crea una opción: botón redondo, título y descripción.
function crearOpcion(opcion) {
  const caja = document.createElement("div");
  caja.className = "opcion";

  const boton = document.createElement("input");
  boton.type = "radio";
  boton.name = "proyecto";
  boton.id = "proyecto-" + opcion.id;
  boton.value = opcion.id;
  boton.required = true;

  const etiqueta = document.createElement("label");
  etiqueta.htmlFor = boton.id;
  const titulo = document.createElement("strong");
  titulo.textContent = opcion.titulo;
  etiqueta.appendChild(titulo);
  if (opcion.descripcion) {
    const descripcion = document.createElement("span");
    descripcion.textContent = opcion.descripcion;
    etiqueta.appendChild(descripcion);
  }

  caja.appendChild(boton);
  caja.appendChild(etiqueta);
  return caja;
}

function prepararEleccion() {
  const contenedor = document.getElementById("opciones-proyecto");
  for (const opcion of laboratorio.proyectos.opciones) {
    contenedor.appendChild(crearOpcion(opcion));
  }
  document.getElementById("form-eleccion").addEventListener("submit", function (evento) {
    // Este formulario no se envía a ningún lado: solo leemos la opción marcada.
    evento.preventDefault();
    const marcada = document.querySelector("input[name=proyecto]:checked");
    if (marcada) {
      elegirProyecto(marcada.value);
    }
  });
  document.getElementById("boton-cancelar-eleccion").addEventListener("click", function () {
    mostrarTrabajo();
    document.getElementById("boton-cambiar-proyecto").focus();
  });
  document.getElementById("boton-cambiar-proyecto").addEventListener("click", mostrarEleccion);
}

// Muestra la lista de proyectos y oculta el editor.
// Al cargar la página no movemos el foco; al pulsar "Cambiar de proyecto", sí.
function mostrarEleccion(moverFoco) {
  guardarPendiente();
  for (const boton of document.querySelectorAll("input[name=proyecto]")) {
    boton.checked = proyecto !== null && boton.value === proyecto.id;
  }
  // "Seguir con el proyecto actual" solo tiene sentido si ya hay uno.
  document.getElementById("boton-cancelar-eleccion").hidden = proyecto === null;
  document.getElementById("proyecto-actual").hidden = true;
  document.getElementById("area-trabajo").hidden = true;
  document.getElementById("eleccion-proyecto").hidden = false;
  if (moverFoco !== false) {
    document.getElementById("titulo-eleccion").focus();
  }
}

// Oculta la lista de proyectos y muestra el editor.
function mostrarTrabajo() {
  document.getElementById("eleccion-proyecto").hidden = true;
  document.getElementById("proyecto-actual").hidden = false;
  document.getElementById("area-trabajo").hidden = false;
}

async function elegirProyecto(id) {
  const elegido = buscarProyecto(id);
  if (!elegido) {
    mostrarEleccion();
    return;
  }
  const veniaDeLaLista = !document.getElementById("eleccion-proyecto").hidden;
  try {
    await cargarArchivos(carpeta + "inicio/" + elegido.id + "/");
  } catch (error) {
    console.error(error);
    mostrarError("No se pudieron cargar los archivos del proyecto «" + elegido.titulo + "». " +
      "Prueba con otro proyecto o recarga la página.");
    return;
  }
  proyecto = elegido;
  guardarProyecto(elegido.id);
  document.getElementById("nombre-proyecto").textContent = elegido.titulo;
  document.getElementById("aviso-error").hidden = true;
  document.getElementById("estado-guardado").textContent = "";
  document.getElementById("estado-pestana").textContent = "";
  prepararTrabajo();
  mostrarTrabajo();
  // Si la persona eligió en la lista, llevamos el foco al proyecto elegido.
  if (veniaDeLaLista) {
    document.getElementById("proyecto-actual").focus();
  }
}


// ---------- Cargar todo ----------

function mostrarError(mensaje) {
  const aviso = document.getElementById("aviso-error");
  aviso.textContent = mensaje;
  aviso.hidden = false;
}

async function leerArchivo(ruta) {
  const respuesta = await fetch(ruta);
  if (!respuesta.ok) {
    throw new Error("No se encontró " + ruta);
  }
  return respuesta.text();
}

// Lee los archivos de inicio de una carpeta. Si falta uno,
// no cambia nada de lo que ya estaba cargado.
async function cargarArchivos(ruta) {
  const leidos = {};
  for (const archivo of laboratorio.archivos) {
    leidos[archivo.nombre] = await leerArchivo(ruta + archivo.nombre);
  }
  carpetaInicio = ruta;
  codigoInicial = leidos;
}

// Arma el editor, las descargas y la vista previa.
function prepararTrabajo() {
  // El cuadro «Resultado» no ejecuta JavaScript: lo avisamos en los labs que lo usan.
  document.getElementById("aviso-js").hidden = !tieneJS();
  mostrarEditor();
  mostrarDescargas();
  actualizarVistaPrevia();
}

async function cargarLaboratorio() {
  const parametros = new URLSearchParams(window.location.search);
  const nombreCarpeta = parametros.get("lab");

  // Solo aceptamos nombres de carpeta con letras, números, - y _
  if (!nombreCarpeta || !/^[a-z0-9_-]+$/i.test(nombreCarpeta)) {
    mostrarError("No se indicó qué laboratorio abrir. Vuelve a la lista y elige uno.");
    return;
  }
  carpeta = "labs/" + nombreCarpeta + "/";

  try {
    laboratorio = JSON.parse(await leerArchivo(carpeta + "lab.json"));
    // Sin proyectos, los archivos de inicio están directo en inicio/.
    if (!laboratorio.proyectos) {
      await cargarArchivos(carpeta + "inicio/");
    }
  } catch (error) {
    console.error(error);
    mostrarError("No se pudo cargar este laboratorio. Vuelve a la lista y elige otro. " +
      "Si abriste el archivo con doble clic, usa un servidor local como explica el README.md.");
    return;
  }

  mostrarDatos();
  mostrarTareas();

  document.getElementById("boton-descargar").addEventListener("click", descargarTrabajo);
  document.getElementById("boton-reiniciar").addEventListener("click", reiniciarCodigo);
  document.getElementById("boton-pestana").addEventListener("click", abrirEnPestana);
  document.getElementById("boton-tareas").addEventListener("click", alternarTareas);
  mostrarPanelTareas(true);
  document.getElementById("laboratorio").hidden = false;

  if (!laboratorio.proyectos) {
    prepararTrabajo();
    return;
  }

  // Laboratorio con varios proyectos: si ya hay uno elegido, lo abrimos.
  // Si no, mostramos la lista para elegir.
  prepararEleccion();
  const guardado = leerProyectoGuardado();
  if (guardado && buscarProyecto(guardado)) {
    await elegirProyecto(guardado);
  }
  if (proyecto === null) {
    mostrarEleccion(false);
  }
}

cargarLaboratorio();
