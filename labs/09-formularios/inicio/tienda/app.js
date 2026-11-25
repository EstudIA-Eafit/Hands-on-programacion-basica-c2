// ==========================================================
// LAB 09 · FORMULARIOS
// Los formularios ya funcionan: el de agregar suma tarjetas a la
// lista y el otro muestra un resumen. Todo pasa en esta página.
// Para probar, pulsa «Abrir vista previa en pestaña nueva»: el
// cuadro «Resultado» no ejecuta JavaScript. Cada vez que cambies
// el código, vuelve a pulsar el botón. Si algo no funciona, abre
// la consola (F12 > Consola).
//
// La primera parte es el resultado del lab 08.
// El Encuentro 5 va a usar estos nombres: no los cambies.
// ==========================================================


// ---------- Datos ----------
// En tu proyecto, titulo es el nombre, texto es la descripción, detalle es el
// precio y disponibles son las unidades disponibles.
// id identifica cada tarjeta: cada tarjeta lo guarda en data-id.
const tarjetas = [
  {
    id: 1,
    titulo: "Pan de la casa",
    texto: "Pan fresco, horneado cada mañana.",
    detalle: "$ 3.500",
    disponibles: 20,
    destacado: true
  },
  {
    id: 2,
    titulo: "Huevos",
    texto: "Bandeja de 12 huevos.",
    detalle: "$ 9.000",
    disponibles: 12,
    destacado: false
  },
  {
    id: 3,
    titulo: "Leche entera",
    texto: "Bolsa de 1 litro.",
    detalle: "$ 4.200",
    disponibles: 30,
    destacado: false
  },
  {
    id: 4,
    titulo: "Café molido",
    texto: "Paquete de 500 gramos.",
    detalle: "$ 15.000",
    disponibles: 8,
    destacado: false
  },
  {
    id: 5,
    titulo: "Queso fresco",
    texto: "Bloque de 500 gramos.",
    detalle: "$ 12.000",
    disponibles: 10,
    destacado: false
  },
  {
    id: 6,
    titulo: "Frutas de temporada",
    texto: "Canasta pequeña con frutas variadas.",
    detalle: "$ 10.000",
    disponibles: 6,
    destacado: true
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
const campoOpcion = document.getElementById("producto");   // el select del formulario
const formularioAgregar = document.getElementById("formulario-agregar");
const mensajeAgregar = document.getElementById("mensaje-agregar");
const formulario = document.getElementById("formulario");
const mensaje = document.getElementById("mensaje");


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
      <p class="tarjeta-disponibles">Unidades disponibles: ${tarjeta.disponibles}</p>
      <button type="button" class="tarjeta-boton">Pedir<span class="texto-oculto"> ${tarjeta.titulo}</span></button>
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
mensajeTarjetas.textContent = `Hay ${contarTarjetas(tarjetas)} productos`;


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
    mensajeTarjetas.textContent = `Hay ${contarTarjetas(tarjetas)} productos`;
  } else if (contarTarjetas(encontradas) === 0) {
    mensajeTarjetas.textContent = `Ningún producto coincide con «${buscador.value}». Prueba con otra palabra.`;
  } else {
    mensajeTarjetas.textContent = `Productos que coinciden: ${contarTarjetas(encontradas)} de ${contarTarjetas(tarjetas)}.`;
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


// ---------- TAREA 1 · submit ----------
// Completa esta función y conéctala al submit del formulario para
// agregar: formularioAgregar.addEventListener("submit", alAgregarTarjeta);
// Pruébala primero SIN preventDefault y mira qué pasa.
function alAgregarTarjeta(evento) {

}


// ---------- TAREA 2 · preventDefault ----------
// Agrega evento.preventDefault(); al principio de alAgregarTarjeta.


// ---------- TAREA 3 · Leer los campos ----------
// En alAgregarTarjeta, lee cada campo con .value y arma un objeto
// llamado nueva, con un id nuevo. Convierte disponibles con Number().
// En la casilla destacado, usa .checked en vez de .value.


// ---------- TAREA 4 · push y volver a pintar ----------
// Agrega nueva al array con push, vuelve a pintar las tarjetas,
// escribe un mensaje en mensajeAgregar y limpia el formulario con
// formularioAgregar.reset();


// ---------- TAREA 5 · Prueba con <h1>Hola</h1> ----------
// Agrega una tarjeta con el nombre <h1>Hola</h1> y mira la página.


// ---------- TAREA 6 · createElement ----------
// Reescribe crearTarjeta (arriba) con createElement, textContent y
// append. Esta función de ayuda crea un elemento con su clase y su texto.
// Ejemplo: crearElemento("h3", "tarjeta-titulo", tarjeta.titulo)
function crearElemento(etiqueta, clase, texto) {
  const elemento = document.createElement(etiqueta);
  elemento.classList.add(clase);
  elemento.textContent = texto;
  return elemento;
}
// Cambia también pintarTarjetas: vacía el contenedor con
// contenedor.textContent = ""; y agrega cada tarjeta con append.


// ---------- TAREA 7 · El formulario de pedido ----------
// Completa esta función y conéctala al submit de formulario.
// Debe mostrar en mensaje un resumen con textContent y decir que es
// una simulación. Nunca escribas «enviado» ni «recibimos».
function alEnviarFormulario(evento) {

}


// ---------- RETO ----------
// Haz que el botón de las tarjetas nuevas también elija su opción en
// el formulario, sin agregar listeners nuevos.
