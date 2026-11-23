// ==========================================================
// LAB 06 · FUNCIONES
// En este laboratorio todo se escribe en este archivo.
// Lo que muestres con console.log aparece en la consola del
// navegador, no en la página. Para verlo, pulsa «Abrir vista
// previa en pestaña nueva» y, en esa pestaña, abre la consola
// (F12 > Consola). Cada vez que cambies el código, vuelve a
// pulsar el botón.
// ==========================================================


// ---------- Datos ----------
// Las 6 tarjetas, como quedaron al final del lab 05.
// En tu proyecto, titulo es el nombre, texto es la descripción y detalle es el precio.
// destacado es el booleano del reto del lab 05.
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


// ---------- TAREA 1 · Abrir la consola ----------
// Si ves este mensaje en la consola, todo funciona.
console.log("Hola desde app.js");


// ---------- TAREA 2 · Declarar y llamar ----------
// Declara una función llamada saludar, sin parámetros,
// que muestre un saludo con console.log.
// Después llámala: saludar();



// ---------- TAREA 3 · Parámetros y return ----------
// Escribe una función llamada describirTarjeta que reciba una
// tarjeta y devuelva con return un texto con sus tres datos,
// separados por comas. Pruébala con la primera tarjeta:
// console.log(describirTarjeta(tarjetas[0]));



// ---------- TAREA 4 · Función flecha ----------
// Escribe la misma función como función flecha, con el nombre
// describirFlecha. Pruébala con otra tarjeta.



// ---------- TAREA 5 · for...of ----------
// Recorre el array tarjetas con for...of y muestra la descripción
// de cada tarjeta con describirTarjeta.



// ---------- TAREA 6 · forEach ----------
// Haz el mismo recorrido con tarjetas.forEach.



// ---------- TAREA 7 · Contar ----------
// Escribe una función llamada contarTarjetas que reciba un array
// (llama al parámetro lista) y devuelva cuántas tarjetas tiene.
// Muestra el resultado de contarTarjetas(tarjetas).



// ---------- RETO · Contar las destacadas ----------
// Escribe una función llamada contarDestacadas que reciba la lista
// y devuelva cuántas tarjetas tienen destacado en true.
