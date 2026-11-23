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
// En tu proyecto, titulo es el nombre, texto es la fecha y detalle es el lugar.
// destacado es el booleano del reto del lab 05.
const tarjetas = [
  {
    titulo: "Concierto de música andina",
    texto: "Sábado 6 de diciembre, 7:00 p. m.",
    detalle: "Parque principal",
    destacado: true
  },
  {
    titulo: "Taller de pintura para principiantes",
    texto: "Domingo 7 de diciembre, 10:00 a. m.",
    detalle: "Salón comunal",
    destacado: false
  },
  {
    titulo: "Noche de cine al aire libre",
    texto: "Viernes 12 de diciembre, 7:30 p. m.",
    detalle: "Cancha del barrio",
    destacado: true
  },
  {
    titulo: "Feria del libro usado",
    texto: "Sábado 13 de diciembre, 9:00 a. m.",
    detalle: "Biblioteca comunitaria",
    destacado: false
  },
  {
    titulo: "Clase abierta de baile",
    texto: "Domingo 14 de diciembre, 4:00 p. m.",
    detalle: "Plazoleta central",
    destacado: false
  },
  {
    titulo: "Cuentos para familias",
    texto: "Sábado 20 de diciembre, 3:00 p. m.",
    detalle: "Biblioteca comunitaria",
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
