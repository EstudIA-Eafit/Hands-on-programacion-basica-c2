// ============================================================
// PÁGINA DE LABORATORIO
// Esta página es la misma para todos los laboratorios.
// 1. Lee en la dirección qué laboratorio abrir (?lab=carpeta).
// 2. Carga labs/<carpeta>/lab.json y los archivos de inicio.
// 3. Muestra las tareas, el editor y la vista previa.
// Todo lo que la persona hace se guarda solo en su navegador.
// ============================================================


// ---------- Datos que comparten todas las funciones ----------

let laboratorio = null;   // el contenido de lab.json
let carpeta = "";         // por ejemplo "labs/01-html-basico/"
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

// Crea un panel con su etiqueta y su cuadro de texto para un archivo.
function crearPanel(archivo, posicion) {
  const panel = document.createElement("div");
  panel.className = "panel";
  panel.id = "panel-" + posicion;

  const etiqueta = document.createElement("label");
  etiqueta.htmlFor = "codigo-" + posicion;
  etiqueta.textContent = "Código " + archivo.etiqueta + " (" + archivo.nombre + ")";

  const cuadro = document.createElement("textarea");
  cuadro.id = "codigo-" + posicion;
  cuadro.className = "codigo";
  // Apagamos el corrector y las mayúsculas automáticas:
  // en el código molestan.
  cuadro.spellcheck = false;
  cuadro.setAttribute("autocapitalize", "off");
  cuadro.setAttribute("autocomplete", "off");
  cuadro.setAttribute("autocorrect", "off");
  cuadro.setAttribute("wrap", "off");

  const guardado = leerGuardado("archivo:" + archivo.nombre);
  cuadro.value = guardado !== null ? guardado : codigoInicial[archivo.nombre];
  cuadro.addEventListener("input", alEscribir);

  panel.appendChild(etiqueta);
  panel.appendChild(cuadro);
  editores[archivo.nombre] = cuadro;
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
    guardarCodigo();
    actualizarVistaPrevia();
  }, 300);
}

function guardarCodigo() {
  let todoBien = true;
  for (const archivo of laboratorio.archivos) {
    const cambio = guardar("archivo:" + archivo.nombre, editores[archivo.nombre].value);
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

// Arma la página completa a partir del HTML principal.
// Si hay archivos CSS, cambia su <link href="estilos.css">
// por una etiqueta <style> con el código que la persona escribió.
// Así la vista previa y la descarga quedan en un solo archivo.
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

function actualizarVistaPrevia() {
  const pagina = armarPagina();
  document.getElementById("vista-previa").srcdoc = prepararVistaPrevia(pagina);

  // El <title> no se ve dentro de la vista previa, así que lo mostramos arriba.
  const documento = new DOMParser().parseFromString(pagina, "text/html");
  const titulo = documento.title.trim();
  document.getElementById("titulo-pestana").textContent = titulo || "(sin título)";
}


// ---------- Botones ----------

function descargarTrabajo() {
  const pagina = armarPagina();
  const archivo = new Blob([pagina], { type: "text/html;charset=utf-8" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(archivo);
  enlace.download = laboratorio.id + "-mi-trabajo.html";
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  URL.revokeObjectURL(enlace.href);
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
    borrarGuardado("archivo:" + archivo.nombre);
  }
  document.getElementById("estado-guardado").textContent = "Volviste al código inicial.";
  actualizarVistaPrevia();
}

function mostrarDescargas() {
  const lista = document.getElementById("lista-descargas");
  for (const archivo of laboratorio.archivos) {
    const elemento = document.createElement("li");
    const enlace = document.createElement("a");
    enlace.href = carpeta + "inicio/" + archivo.nombre;
    enlace.download = archivo.nombre;
    enlace.textContent = "Descargar " + archivo.nombre;
    elemento.appendChild(enlace);
    lista.appendChild(elemento);
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
    for (const archivo of laboratorio.archivos) {
      codigoInicial[archivo.nombre] = await leerArchivo(carpeta + "inicio/" + archivo.nombre);
    }
  } catch (error) {
    console.error(error);
    mostrarError("No se pudo cargar este laboratorio. Vuelve a la lista y elige otro. " +
      "Si abriste el archivo con doble clic, usa un servidor local como explica el README.md.");
    return;
  }

  mostrarDatos();
  mostrarTareas();
  mostrarEditor();
  mostrarDescargas();
  actualizarVistaPrevia();

  document.getElementById("boton-descargar").addEventListener("click", descargarTrabajo);
  document.getElementById("boton-reiniciar").addEventListener("click", reiniciarCodigo);
  document.getElementById("laboratorio").hidden = false;
}

cargarLaboratorio();
