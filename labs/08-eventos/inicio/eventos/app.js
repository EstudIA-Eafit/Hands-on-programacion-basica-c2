// ==========================================================
// LAB 08 · EVENTOS
// Ahora la página responde a lo que hace la persona: clics y
// lo que escribe.
// Para probar, pulsa «Abrir vista previa en pestaña nueva»: el
// cuadro «Resultado» no ejecuta JavaScript. Cada vez que cambies
// el código, vuelve a pulsar el botón. Si algo no funciona, abre
// la consola (F12 > Consola).
//
// La primera parte es el resultado del lab 07, con dos cambios:
// cada tarjeta tiene un id (va en data-id) y un botón.
// El Encuentro 5 va a usar estos nombres: no los cambies.
// ==========================================================


// ---------- Datos ----------
// En tu proyecto, titulo es el nombre, texto es la fecha, detalle es el lugar
// y disponibles son los cupos.
// id identifica cada tarjeta: cada tarjeta lo guarda en data-id.
const tarjetas = [
  {
    id: 1,
    titulo: "Concierto de música andina",
    texto: "Sábado 6 de diciembre, 7:00 p. m.",
    detalle: "Parque principal",
    disponibles: 40,
    destacado: true
  },
  {
    id: 2,
    titulo: "Taller de pintura para principiantes",
    texto: "Domingo 7 de diciembre, 10:00 a. m.",
    detalle: "Salón comunal",
    disponibles: 15,
    destacado: false
  },
  {
    id: 3,
    titulo: "Noche de cine al aire libre",
    texto: "Viernes 12 de diciembre, 7:30 p. m.",
    detalle: "Cancha del barrio",
    disponibles: 80,
    destacado: true
  },
  {
    id: 4,
    titulo: "Feria del libro usado",
    texto: "Sábado 13 de diciembre, 9:00 a. m.",
    detalle: "Biblioteca comunitaria",
    disponibles: 100,
    destacado: false
  },
  {
    id: 5,
    titulo: "Clase abierta de baile",
    texto: "Domingo 14 de diciembre, 4:00 p. m.",
    detalle: "Plazoleta central",
    disponibles: 30,
    destacado: false
  },
  {
    id: 6,
    titulo: "Cuentos para familias",
    texto: "Sábado 20 de diciembre, 3:00 p. m.",
    detalle: "Biblioteca comunitaria",
    disponibles: 25,
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
const campoOpcion = document.getElementById("evento");   // el select del formulario


// ---------- Pintar las tarjetas (viene del lab 07) ----------
// Devuelve el HTML de una tarjeta. data-id guarda su id: así, al
// pulsar su botón, se sabe de qué tarjeta es.
// El <span class="texto-oculto"> no se ve en la pantalla: lo leen
// los lectores de pantalla, para saber de qué tarjeta es cada botón.
function crearTarjeta(tarjeta) {
  return `
    <article class="tarjeta" data-id="${tarjeta.id}">
      <h3 class="tarjeta-titulo">${tarjeta.titulo}</h3>
      <p class="tarjeta-texto">${tarjeta.texto}</p>
      <p class="tarjeta-detalle">${tarjeta.detalle}</p>
      <p class="tarjeta-disponibles">Cupos: ${tarjeta.disponibles}</p>
      <button type="button" class="tarjeta-boton">Inscribirme<span class="texto-oculto"> en ${tarjeta.titulo}</span></button>
    </article>`;
}

// Pone en la página las tarjetas de la lista y marca las destacadas.
// Seguridad: innerHTML se usa aquí porque los datos son de este
// archivo. En el lab 09 se cambia a createElement, cuando los datos
// vengan del formulario.
function pintarTarjetas(lista) {
  let html = "";
  for (const tarjeta of lista) {
    html = html + crearTarjeta(tarjeta);
  }
  contenedor.innerHTML = html;

  // Las tarjetas se crean de nuevo cada vez que se pintan: hay que
  // volver a marcar las destacadas.
  const elementos = contenedor.querySelectorAll(".tarjeta");
  lista.forEach(function (tarjeta, posicion) {
    if (tarjeta.destacado) {
      elementos[posicion].classList.add("tarjeta-destacada");
    }
  });
}


// ---------- Al cargar la página ----------
pintarTarjetas(tarjetas);
mensajeTarjetas.textContent = `Hay ${contarTarjetas(tarjetas)} eventos`;


// ---------- TAREA 1 · click ----------
// Selecciona el botón con id "boton-prueba" y el párrafo con id
// "texto-prueba". Escucha el click del botón y, en la función,
// cambia el texto del párrafo con textContent.


// ---------- TAREA 2 · event.target ----------
// Dentro de la función del click, muestra evento.target con console.log.


// ---------- TAREA 3 · input ----------
// Completa esta función: muestra con console.log lo que tiene el
// buscador (buscador.value). Después conéctala al evento input:
// buscador.addEventListener("input", alEscribirBusqueda);
function alEscribirBusqueda(evento) {

}


// ---------- TAREA 4 · filter ----------
// Completa esta función: debe devolver solo las tarjetas cuyo titulo
// contiene el texto, sin importar mayúsculas. Usa filter, includes y
// toLowerCase. Después, en alEscribirBusqueda, pinta solo esas.
function filtrarTarjetas(texto) {
  return tarjetas;
}


// ---------- TAREA 5 · Cuántas coinciden ----------
// En alEscribirBusqueda, escribe en mensajeTarjetas cuántas tarjetas
// coinciden, o un texto claro si no coincide ninguna.


// ---------- TAREA 6 · Delegación ----------
// Completa buscarTarjetaPorId: debe devolver la tarjeta del array
// que tiene ese id.
function buscarTarjetaPorId(id) {

}

// Completa alPulsarEnLista y conéctala con un solo listener en el
// contenedor: contenedor.addEventListener("click", alPulsarEnLista);
// Usa evento.target.closest(".tarjeta-boton") y data-id.
function alPulsarEnLista(evento) {

}


// ---------- TAREA 7 · Elegir en el formulario ----------
// En alPulsarEnLista, pon el titulo de la tarjeta en campoOpcion
// (el select del formulario) y dale el foco con focus().


// ---------- RETO ----------
// Explica aquí, con un comentario, por qué la delegación sigue
// funcionando después de que el buscador vuelve a pintar las tarjetas.
