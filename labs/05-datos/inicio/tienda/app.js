// ==========================================================
// LAB 05 · DATOS
// En este laboratorio todo se escribe en este archivo.
// Lo que muestres con console.log aparece en la consola del
// navegador, no en la página. Para verlo, pulsa «Abrir vista
// previa en pestaña nueva» y, en esa pestaña, abre la consola
// (F12 > Consola). Cada vez que cambies el código, vuelve a
// pulsar el botón.
// ==========================================================


// ---------- TAREA 1 · Abrir la consola ----------
// Si ves este mensaje en la consola, todo funciona.
console.log("Hola desde app.js");


// ---------- TAREA 2 · const ----------
// Guarda el nombre del sitio en una const llamada nombreSitio.
// El nombre está en el <h1> de la pestaña HTML.
// Después muéstralo con console.log(nombreSitio);



// ---------- TAREA 3 · let ----------
// Guarda en una let llamada cantidadTarjetas cuántas tarjetas
// hay en la página y muéstrala.
// Después cambia su valor y muéstrala otra vez.



// ---------- TAREA 4 · typeof ----------
// typeof dice de qué tipo es un dato.
// Muestra el tipo de un texto, de un número y de un booleano.
// Ejemplo: console.log(typeof "hola");



// ---------- TAREA 5 · array ----------
// Crea un array llamado nombres con los títulos de 3 productos.
// Muestra el primero con nombres[0] y el total con nombres.length.



// ---------- TAREA 6 · objeto ----------
// Crea un objeto llamado tarjeta con los datos de una tarjeta:
// titulo, texto y detalle.
// Muestra dos de sus propiedades con punto, por ejemplo tarjeta.titulo.



// ---------- TAREA 7 · array de objetos ----------
// Este array trae 2 tarjetas. Agrega las otras 4: copia sus textos
// de la pestaña HTML. Entre un objeto y el siguiente va una coma.
// En tu proyecto, titulo es el nombre, texto es la descripción y detalle es el precio.
const tarjetas = [
  {
    titulo: "Pan de la casa",
    texto: "Pan fresco, horneado cada mañana.",
    detalle: "$ 3.500"
  },
  {
    titulo: "Huevos",
    texto: "Bandeja de 12 huevos.",
    detalle: "$ 9.000"
  }
];

console.log(tarjetas);


// ---------- RETO · booleano ----------
// Agrega a cada objeto del array tarjetas una propiedad destacado
// con el valor true o false, sin comillas. Por ejemplo: destacado: true
