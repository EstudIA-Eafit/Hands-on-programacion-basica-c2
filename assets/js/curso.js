// ============================================================
// NOMBRE DEL CURSO
// Lee el nombre del curso y de la institución en labs/labs.json
// y los escribe en todos los elementos con estas clases:
//   class="nombre-curso"
//   class="nombre-institucion"
// Así el nombre se cambia en un solo lugar: labs/labs.json.
// ============================================================

function escribirEnTodos(clase, texto) {
  const elementos = document.querySelectorAll("." + clase);
  for (const elemento of elementos) {
    elemento.textContent = texto;
  }
}

async function mostrarNombreCurso() {
  try {
    const respuesta = await fetch("labs/labs.json");
    const catalogo = await respuesta.json();
    escribirEnTodos("nombre-curso", catalogo.curso);
    escribirEnTodos("nombre-institucion", catalogo.institucion);
  } catch (error) {
    // Si no se puede leer, los espacios quedan vacíos.
    // La portada ya muestra un aviso en ese caso.
    console.error(error);
  }
}

mostrarNombreCurso();
