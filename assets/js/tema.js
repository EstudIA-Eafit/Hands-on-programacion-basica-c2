// ============================================================
// TEMA CLARO U OSCURO
// Este archivo se carga dentro de <head>, antes de mostrar la
// página. Así la página aparece desde el principio con el tema
// correcto, sin un destello blanco.
//
// - La primera vez usa el tema del sistema (computador o celular).
// - El botón de la cabecera (id="boton-tema") lo cambia.
// - La elección se guarda en este navegador.
// Los colores de cada tema están en assets/css/sitio.css.
// ============================================================

const CLAVE_TEMA = "laboratorios:tema";
const temaDelSistema = window.matchMedia("(prefers-color-scheme: dark)");

// localStorage puede fallar (por ejemplo, en una ventana privada).
function leerTemaGuardado() {
  try {
    return localStorage.getItem(CLAVE_TEMA);
  } catch (error) {
    return null;
  }
}

function guardarTema(tema) {
  try {
    localStorage.setItem(CLAVE_TEMA, tema);
  } catch (error) {
    // Si no se puede guardar, el tema vale solo hasta cerrar la página.
  }
}

function temaInicial() {
  const guardado = leerTemaGuardado();
  if (guardado === "claro" || guardado === "oscuro") {
    return guardado;
  }
  return temaDelSistema.matches ? "oscuro" : "claro";
}

function temaActual() {
  return document.documentElement.dataset.tema === "oscuro" ? "oscuro" : "claro";
}

// El botón dice a qué tema se va a cambiar.
function actualizarBotonTema() {
  const boton = document.getElementById("boton-tema");
  if (!boton) {
    return;
  }
  if (temaActual() === "oscuro") {
    boton.innerHTML = '<span aria-hidden="true">☀</span> Cambiar a tema claro';
  } else {
    boton.innerHTML = '<span aria-hidden="true">☾</span> Cambiar a tema oscuro';
  }
  boton.hidden = false;
}

function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema;
  actualizarBotonTema();
}

function cambiarTema() {
  const nuevo = temaActual() === "oscuro" ? "claro" : "oscuro";
  guardarTema(nuevo);
  aplicarTema(nuevo);
}

// 1. Antes de mostrar la página: aplicar el tema.
aplicarTema(temaInicial());

// 2. Cuando la página ya cargó: preparar el botón.
document.addEventListener("DOMContentLoaded", function () {
  const boton = document.getElementById("boton-tema");
  if (boton) {
    boton.addEventListener("click", cambiarTema);
  }
  actualizarBotonTema();
});

// 3. Si la persona no ha elegido un tema y cambia el de su sistema,
//    la página lo sigue.
temaDelSistema.addEventListener("change", function () {
  if (!leerTemaGuardado()) {
    aplicarTema(temaInicial());
  }
});
