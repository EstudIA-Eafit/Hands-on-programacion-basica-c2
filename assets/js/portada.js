// ============================================================
// PORTADA
// Lee el catálogo labs/labs.json y muestra una tarjeta
// por cada laboratorio. Para agregar un laboratorio no hay
// que tocar este archivo: basta con editar labs/labs.json.
// ============================================================

const lista = document.getElementById("lista-laboratorios");

// Crea un elemento HTML con su texto. Usamos textContent
// (y no innerHTML) para que el texto se muestre tal cual.
function crearElemento(etiqueta, texto) {
  const elemento = document.createElement(etiqueta);
  if (texto) {
    elemento.textContent = texto;
  }
  return elemento;
}

// Arma la tarjeta de un laboratorio:
// título con enlace, descripción, duración y nivel.
function crearTarjeta(lab) {
  const tarjeta = crearElemento("li");
  tarjeta.className = "tarjeta";

  const titulo = crearElemento("h3");
  const enlace = crearElemento("a", lab.titulo);
  enlace.href = "laboratorio.html?lab=" + encodeURIComponent(lab.carpeta);
  titulo.appendChild(enlace);

  const descripcion = crearElemento("p", lab.descripcion);

  const datos = crearElemento("dl");
  datos.className = "datos";
  datos.appendChild(crearElemento("dt", "Duración"));
  datos.appendChild(crearElemento("dd", lab.duracion));
  datos.appendChild(crearElemento("dt", "Nivel"));
  datos.appendChild(crearElemento("dd", lab.nivel));

  tarjeta.appendChild(titulo);
  tarjeta.appendChild(descripcion);
  tarjeta.appendChild(datos);
  return tarjeta;
}

function mostrarError() {
  lista.innerHTML = "";
  const aviso = crearElemento("li",
    "No se pudo cargar la lista de laboratorios. " +
    "Si abriste el archivo con doble clic, usa un servidor local " +
    "como explica el archivo README.md.");
  aviso.className = "aviso";
  lista.appendChild(aviso);
}

async function cargarPortada() {
  try {
    const respuesta = await fetch("labs/labs.json");
    if (!respuesta.ok) {
      throw new Error("No se encontró labs/labs.json");
    }
    const catalogo = await respuesta.json();

    lista.innerHTML = "";
    for (const lab of catalogo.laboratorios) {
      lista.appendChild(crearTarjeta(lab));
    }
  } catch (error) {
    console.error(error);
    mostrarError();
  }
}

cargarPortada();
