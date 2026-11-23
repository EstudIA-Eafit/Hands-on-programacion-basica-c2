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
// En tu proyecto, titulo es el oficio, texto es la descripción y detalle es el horario.
const tarjetas = [
  {
    titulo: "Plomería",
    texto: "Arreglo de tuberías, llaves y fugas de agua.",
    detalle: "Lunes a viernes, 8:00 a. m. a 5:00 p. m.",
    destacado: true
  },
  {
    titulo: "Electricidad",
    texto: "Instalación de tomas, lámparas e interruptores.",
    detalle: "Lunes a sábado, 8:00 a. m. a 4:00 p. m.",
    destacado: false
  },
  {
    titulo: "Carpintería",
    texto: "Arreglo de puertas, sillas y muebles de madera.",
    detalle: "Martes a sábado, 9:00 a. m. a 5:00 p. m.",
    destacado: false
  },
  {
    titulo: "Costura",
    texto: "Arreglos de ropa: dobladillos, cierres y botones.",
    detalle: "Lunes a viernes, 9:00 a. m. a 6:00 p. m.",
    destacado: false
  },
  {
    titulo: "Cerrajería",
    texto: "Copias de llaves y cambio de cerraduras.",
    detalle: "Todos los días, 8:00 a. m. a 8:00 p. m.",
    destacado: true
  },
  {
    titulo: "Jardinería",
    texto: "Poda de plantas y cuidado de jardines.",
    detalle: "Sábados y domingos, 7:00 a. m. a 12:00 m.",
    destacado: false
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
// "Hay 6 servicios". Usa textContent y contarTarjetas(tarjetas).



// ---------- TAREA 6 · classList ----------
// A las tarjetas que tienen destacado en true, agrégales la clase
// tarjeta-destacada con classList.add. Después escribe la regla
// .tarjeta-destacada en la pestaña CSS.



// ---------- RETO ----------
// Agrega una séptima tarjeta al array tarjetas (arriba, en Datos).
// Comprueba que aparece en la página sin tocar el HTML.
