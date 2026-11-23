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
// En tu proyecto, titulo es el oficio, texto es la descripción y detalle es el horario.
// destacado es el booleano del reto del lab 05.
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
