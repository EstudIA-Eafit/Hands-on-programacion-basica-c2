// ==========================================================
// LAB 10 · VALIDACIÓN Y MENSAJES
// Los formularios revisan los datos antes de usarlos y explican
// qué pasó con mensajes claros.
// Para probar, pulsa «Abrir vista previa en pestaña nueva»: el
// cuadro «Resultado» no ejecuta JavaScript. Cada vez que cambies
// el código, vuelve a pulsar el botón. Si algo no funciona, abre
// la consola (F12 > Consola).
//
// La primera parte es el resultado del lab 09.
// El Encuentro 5 va a usar estos nombres: no los cambies.
//
// Recuerda: la validación del navegador (required, min, max...)
// y la de este archivo ayudan a la persona a escribir bien los
// datos, pero NO protegen un servidor: cualquiera puede saltarlas.
// Un servidor siempre debe revisar los datos otra vez.
// ==========================================================


// ---------- Datos ----------
// En tu proyecto, titulo es el oficio, texto es la descripción, detalle es el
// horario y disponibles son los turnos por semana.
// id identifica cada tarjeta: cada tarjeta lo guarda en data-id.
const tarjetas = [
  {
    id: 1,
    titulo: "Plomería",
    texto: "Arreglo de tuberías, llaves y fugas de agua.",
    detalle: "Lunes a viernes, 8:00 a. m. a 5:00 p. m.",
    disponibles: 10,
    destacado: true
  },
  {
    id: 2,
    titulo: "Electricidad",
    texto: "Instalación de tomas, lámparas e interruptores.",
    detalle: "Lunes a sábado, 8:00 a. m. a 4:00 p. m.",
    disponibles: 8,
    destacado: false
  },
  {
    id: 3,
    titulo: "Carpintería",
    texto: "Arreglo de puertas, sillas y muebles de madera.",
    detalle: "Martes a sábado, 9:00 a. m. a 5:00 p. m.",
    disponibles: 6,
    destacado: false
  },
  {
    id: 4,
    titulo: "Costura",
    texto: "Arreglos de ropa: dobladillos, cierres y botones.",
    detalle: "Lunes a viernes, 9:00 a. m. a 6:00 p. m.",
    disponibles: 12,
    destacado: false
  },
  {
    id: 5,
    titulo: "Cerrajería",
    texto: "Copias de llaves y cambio de cerraduras.",
    detalle: "Todos los días, 8:00 a. m. a 8:00 p. m.",
    disponibles: 15,
    destacado: true
  },
  {
    id: 6,
    titulo: "Jardinería",
    texto: "Poda de plantas y cuidado de jardines.",
    detalle: "Sábados y domingos, 7:00 a. m. a 12:00 m.",
    disponibles: 4,
    destacado: false
  }
];

// Viene del lab 06: devuelve cuántas tarjetas tiene una lista.
function contarTarjetas(lista) {
  return lista.length;
}


// ---------- Elementos de la página ----------
const contenedor = document.getElementById("lista-tarjetas");
const mensajeTarjetas = document.getElementById("mensaje-tarjetas");
const buscador = document.getElementById("buscador");
const campoOpcion = document.getElementById("servicio");   // el select del formulario
const formularioAgregar = document.getElementById("formulario-agregar");
const mensajeAgregar = document.getElementById("mensaje-agregar");
const formulario = document.getElementById("formulario");
const mensaje = document.getElementById("mensaje");


// ---------- Pintar las tarjetas (lab 09) ----------
// Crea un elemento con una clase y un texto. textContent pone el
// texto tal cual: si tiene etiquetas, se ven como texto.
function crearElemento(etiqueta, clase, texto) {
  const elemento = document.createElement(etiqueta);
  elemento.classList.add(clase);
  elemento.textContent = texto;
  return elemento;
}

// Devuelve una tarjeta hecha con createElement, con la misma
// estructura y las mismas clases que antes. No usa innerHTML: los
// datos pueden venir del formulario, y textContent nunca crea etiquetas.
// El <span class="texto-oculto"> no se ve en la pantalla: lo leen
// los lectores de pantalla, para saber de qué tarjeta es cada botón.
function crearTarjeta(tarjeta) {
  const articulo = document.createElement("article");
  articulo.classList.add("tarjeta");
  if (tarjeta.destacado) {
    articulo.classList.add("tarjeta-destacada");
  }
  articulo.dataset.id = tarjeta.id;

  const boton = crearElemento("button", "tarjeta-boton", "Solicitar");
  boton.type = "button";
  boton.append(crearElemento("span", "texto-oculto", " " + tarjeta.titulo));

  articulo.append(
    crearElemento("h3", "tarjeta-titulo", tarjeta.titulo),
    crearElemento("p", "tarjeta-texto", tarjeta.texto),
    crearElemento("p", "tarjeta-detalle", tarjeta.detalle),
    crearElemento("p", "tarjeta-disponibles", "Turnos por semana: " + tarjeta.disponibles),
    boton
  );
  return articulo;
}

// Pone en la página las tarjetas de la lista.
function pintarTarjetas(lista) {
  contenedor.textContent = "";   // vacía la lista
  for (const tarjeta of lista) {
    contenedor.append(crearTarjeta(tarjeta));
  }
}


// ---------- Al cargar la página ----------
pintarTarjetas(tarjetas);
mensajeTarjetas.textContent = `Hay ${contarTarjetas(tarjetas)} servicios`;


// ---------- Buscador (lab 08) ----------
// Devuelve las tarjetas cuyo titulo contiene el texto, sin importar
// mayúsculas ni minúsculas.
function filtrarTarjetas(texto) {
  const buscado = texto.toLowerCase();
  return tarjetas.filter(function (tarjeta) {
    return tarjeta.titulo.toLowerCase().includes(buscado);
  });
}

// Se ejecuta con cada letra que se escribe o se borra en el buscador.
function alEscribirBusqueda(evento) {
  const encontradas = filtrarTarjetas(buscador.value);
  pintarTarjetas(encontradas);
  if (buscador.value === "") {
    mensajeTarjetas.textContent = `Hay ${contarTarjetas(tarjetas)} servicios`;
  } else if (contarTarjetas(encontradas) === 0) {
    mensajeTarjetas.textContent = `Ningún servicio coincide con «${buscador.value}». Prueba con otra palabra.`;
  } else {
    mensajeTarjetas.textContent = `Servicios que coinciden: ${contarTarjetas(encontradas)} de ${contarTarjetas(tarjetas)}.`;
  }
}

buscador.addEventListener("input", alEscribirBusqueda);


// ---------- Botones de las tarjetas (lab 08) ----------
// Devuelve la tarjeta del array que tiene ese id.
function buscarTarjetaPorId(id) {
  const encontradas = tarjetas.filter(function (tarjeta) {
    return tarjeta.id === id;
  });
  return encontradas[0];
}

// Delegación: un solo listener en el contenedor escucha los clics de
// todos los botones. Sigue funcionando cuando las tarjetas se vuelven
// a pintar (al buscar o al agregar una), porque el contenedor es
// siempre el mismo: solo cambia lo que tiene adentro.
function alPulsarEnLista(evento) {
  const boton = evento.target.closest(".tarjeta-boton");
  if (boton === null) {
    return;   // el clic no fue en un botón
  }
  const id = Number(boton.closest(".tarjeta").dataset.id);
  const tarjeta = buscarTarjetaPorId(id);
  campoOpcion.value = tarjeta.titulo;
  campoOpcion.focus();   // lleva la vista hasta el formulario
}

contenedor.addEventListener("click", alPulsarEnLista);


// ---------- Formulario para agregar (lab 09) ----------
// Agrega una opción al select del formulario, para que el botón de
// una tarjeta nueva también pueda elegirla (reto del lab 09).
function agregarOpcion(titulo) {
  const opcion = document.createElement("option");
  opcion.value = titulo;
  opcion.textContent = titulo;
  campoOpcion.append(opcion);
}

function alAgregarTarjeta(evento) {
  evento.preventDefault();   // sin esto, la página se recarga
  const nueva = {
    id: tarjetas.length + 1,
    titulo: document.getElementById("titulo").value,
    texto: document.getElementById("texto").value,
    detalle: document.getElementById("detalle").value,
    disponibles: Number(document.getElementById("disponibles").value),
    destacado: document.getElementById("destacado").checked
  };
  tarjetas.push(nueva);
  agregarOpcion(nueva.titulo);
  buscador.value = "";
  pintarTarjetas(tarjetas);
  mensajeTarjetas.textContent = `Hay ${contarTarjetas(tarjetas)} servicios`;
  mensajeAgregar.textContent = `Se agregó «${nueva.titulo}» a la lista.`;
  formularioAgregar.reset();
}

formularioAgregar.addEventListener("submit", alAgregarTarjeta);


// ---------- Formulario de solicitud (lab 09) ----------
// Muestra un resumen de lo que se escribió. Es una simulación: nada
// sale de esta página.
function alEnviarFormulario(evento) {
  evento.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const opcion = campoOpcion.value;
  const fecha = document.getElementById("fecha").value;
  mensaje.textContent = `Resumen de tu solicitud: ${nombre}, ${correo}, ${opcion}, fecha deseada ${fecha}. ` +
    "Es una simulación: no se envió nada.";
}

formulario.addEventListener("submit", alEnviarFormulario);


// ---------- TAREAS 1 y 2 · En la pestaña HTML ----------
// Agrega required, min, max y maxlength a los campos.
// Recuerda: esto ayuda a la persona, pero no protege un servidor.


// ---------- TAREA 3 · trim ----------
// En alAgregarTarjeta y en alEnviarFormulario, quita los espacios del
// nombre con trim() y, si queda vacío, muestra un mensaje y termina
// la función con return.


// ---------- TAREA 4 · Nombre repetido ----------
// En alAgregarTarjeta, usa filter y length para saber si ya hay una
// tarjeta con ese titulo. Si la hay, muestra un mensaje y termina.


// ---------- TAREA 5 · Registros ----------
// Cada envío válido del formulario de solicitud se guarda en este
// array. Rechaza el mismo correo con la misma opción.
const registros = [];


// ---------- TAREA 6 · Mensajes claros ----------
// Completa esta función y úsala en todos los mensajes. tipo es "ok"
// o "error": agrega la clase mensaje-ok o mensaje-error.
// El texto debe decir qué pasó y qué hacer: el color solo no alcanza.
function mostrarMensaje(elemento, tipo, texto) {

}


// ---------- TAREA 7 · Casos de prueba ----------
// Prueba cada caso en la pestaña nueva y anota los resultados en la
// tabla de casos de prueba, debajo del editor.


// ---------- RETO · localStorage ----------
// Guarda las tarjetas agregadas para que sigan al recargar la página.
