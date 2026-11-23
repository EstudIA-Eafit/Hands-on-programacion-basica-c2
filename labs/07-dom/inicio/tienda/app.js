// ==========================================================
// LAB 07 · PINTAR LAS TARJETAS DESDE LOS DATOS
// Ahora JavaScript cambia la página. Para verlo, pulsa «Abrir
// vista previa en pestaña nueva»: el cuadro «Resultado» no
// ejecuta JavaScript. Cada vez que cambies el código, vuelve a
// pulsar el botón. Si algo no aparece, abre la consola
// (F12 > Consola) y lee el error en rojo.
//
// En el Encuentro 4 vas a usar otra vez estos nombres:
// tarjetas, crearTarjeta, pintarTarjetas y contarTarjetas.
// No les cambies el nombre.
// ==========================================================


// ---------- Datos ----------
// Las 6 tarjetas del proyecto. El HTML ya no las trae:
// la página las va a crear desde aquí.
// En tu proyecto, titulo es el nombre, texto es la descripción y detalle es el precio.
const tarjetas = [
  {
    titulo: "Pan de la casa",
    texto: "Pan fresco, horneado cada mañana.",
    detalle: "$ 3.500",
    destacado: true
  },
  {
    titulo: "Huevos",
    texto: "Bandeja de 12 huevos.",
    detalle: "$ 9.000",
    destacado: false
  },
  {
    titulo: "Leche entera",
    texto: "Bolsa de 1 litro.",
    detalle: "$ 4.200",
    destacado: false
  },
  {
    titulo: "Café molido",
    texto: "Paquete de 500 gramos.",
    detalle: "$ 15.000",
    destacado: false
  },
  {
    titulo: "Queso fresco",
    texto: "Bloque de 500 gramos.",
    detalle: "$ 12.000",
    destacado: false
  },
  {
    titulo: "Frutas de temporada",
    texto: "Canasta pequeña con frutas variadas.",
    detalle: "$ 10.000",
    destacado: true
  }
];

// Viene del lab 06: devuelve cuántas tarjetas tiene una lista.
function contarTarjetas(lista) {
  return lista.length;
}


// ---------- TAREA 1 · querySelector y textContent ----------
// Selecciona el título principal (el <h1>) con document.querySelector
// y cambia su texto con textContent.



// ---------- TAREA 2 · getElementById ----------
// Guarda en una const llamada contenedor el elemento que tiene
// el id "lista-tarjetas".



// ---------- TAREA 3 · El HTML de una tarjeta ----------
// Completa esta función: debe devolver con return el HTML de una
// tarjeta, escrito con una plantilla literal (entre comillas
// invertidas ` `). Usa exactamente esta estructura, la del lab 04:
//
//   <article class="tarjeta">
//     <h3 class="tarjeta-titulo">...</h3>
//     <p class="tarjeta-texto">...</p>
//     <p class="tarjeta-detalle">...</p>
//   </article>
//
// Dentro de la plantilla, ${tarjeta.titulo} pone el valor de esa propiedad.
function crearTarjeta(tarjeta) {
  return "";
}


// ---------- TAREA 4 · Pintar la lista ----------
// Completa esta función: recorre la lista, junta en la variable
// html el HTML de todas las tarjetas y, al final, ponlo en el
// contenedor con innerHTML una sola vez.
//
// Seguridad: innerHTML convierte un texto en HTML. Aquí se puede
// usar porque los datos son propios de este archivo. En el
// Encuentro 4, cuando los datos vengan del formulario, se cambiará
// a textContent o createElement.
function pintarTarjetas(lista) {
  let html = "";

}

pintarTarjetas(tarjetas);


// ---------- TAREA 5 · El mensaje ----------
// Escribe en el elemento con id "mensaje" un texto como
// "Hay 6 productos". Usa textContent y contarTarjetas(tarjetas).



// ---------- TAREA 6 · classList ----------
// A las tarjetas que tienen destacado en true, agrégales la clase
// tarjeta-destacada con classList.add. Después escribe la regla
// .tarjeta-destacada en la pestaña CSS.



// ---------- RETO ----------
// Agrega una séptima tarjeta al array tarjetas (arriba, en Datos).
// Comprueba que aparece en la página sin tocar el HTML.
