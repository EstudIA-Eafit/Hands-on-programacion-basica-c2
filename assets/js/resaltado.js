// ============================================================
// RESALTADO DE CÓDIGO
// Pinta de colores el código HTML, CSS y JavaScript del editor, parecido
// a Visual Studio Code.
//
// Cómo funciona: el cuadro de texto donde se escribe tiene la
// letra transparente. Debajo hay una copia del mismo código,
// partida en etiquetas <span> con una clase por tipo de palabra,
// por ejemplo <span class="t-etiqueta">h1</span>.
// Los colores de cada clase están en assets/css/sitio.css.
//
// No es un analizador completo: reconoce lo más común en HTML
// CSS y JavaScript. Si el código tiene un error, los colores pueden verse
// raros, pero el código no cambia.
// ============================================================


// Cambia los símbolos especiales de HTML para que se muestren
// como texto y no se interpreten como etiquetas.
function escaparHTML(texto) {
  return texto
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

// Envuelve un texto en un <span> con la clase de su color.
function pintar(clase, texto) {
  return '<span class="t-' + clase + '">' + escaparHTML(texto) + "</span>";
}

// Busca dónde termina una etiqueta como </style>, sin importar
// mayúsculas. Si no está, devuelve el final del código.
function buscarCierre(codigo, desde, etiqueta) {
  const posicion = codigo.toLowerCase().indexOf("</" + etiqueta, desde);
  return posicion === -1 ? codigo.length : posicion;
}


// ---------- HTML ----------

// Partes que se buscan en el HTML, en este orden:
// 1. un comentario <!-- ... -->
// 2. la línea <!DOCTYPE html>
// 3. una etiqueta: < o </, el nombre, los atributos y el >
// 4. una entidad como &lt; o &amp;
const PARTES_HTML = /(<!--[\s\S]*?(?:-->|$))|(<!doctype[^>]*>?)|(<\/?)([a-zA-Z][\w-]*)([^>]*)(>?)|(&#?\w+;)/gi;

// Partes de los atributos de una etiqueta:
// un nombre, el signo =, un texto entre comillas o espacios.
const PARTES_ATRIBUTOS = /([^\s=/"'>]+)|(=)|("[^"]*"?|'[^']*'?)|(\s+)|([\s\S])/g;

function pintarAtributos(texto) {
  let salida = "";
  let despuesDeIgual = false;
  for (const parte of texto.matchAll(PARTES_ATRIBUTOS)) {
    const [completo, nombre, igual, comillas, espacio] = parte;
    if (nombre) {
      // Un valor sin comillas, como en class=destacado
      salida += pintar(despuesDeIgual ? "valor" : "atributo", nombre);
      despuesDeIgual = false;
    } else if (igual) {
      salida += pintar("puntuacion", igual);
      despuesDeIgual = true;
    } else if (comillas) {
      salida += pintar("valor", comillas);
      despuesDeIgual = false;
    } else if (espacio) {
      salida += espacio;
    } else {
      // Por ejemplo la / de <br />
      salida += pintar("puntuacion", completo);
    }
  }
  return salida;
}

function resaltarHTML(codigo) {
  let salida = "";
  let ultimo = 0;
  const buscador = new RegExp(PARTES_HTML.source, "gi");
  let parte;

  while ((parte = buscador.exec(codigo)) !== null) {
    const [completo, comentario, doctype, abre, nombre, atributos, cierra, entidad] = parte;
    // El texto normal que hay antes de esta parte
    salida += escaparHTML(codigo.slice(ultimo, parte.index));

    if (comentario) {
      salida += pintar("comentario", comentario);
    } else if (doctype) {
      salida += pintar("etiqueta", doctype);
    } else if (nombre) {
      salida += pintar("puntuacion", abre) + pintar("etiqueta", nombre) +
        pintarAtributos(atributos) + (cierra ? pintar("puntuacion", cierra) : "");

      // Dentro de <style> hay CSS, y dentro de <script>, JavaScript.
      const etiqueta = nombre.toLowerCase();
      if (abre === "<" && cierra && (etiqueta === "style" || etiqueta === "script")) {
        const fin = buscarCierre(codigo, buscador.lastIndex, etiqueta);
        const contenido = codigo.slice(buscador.lastIndex, fin);
        salida += etiqueta === "style" ? resaltarCSS(contenido) : resaltarJS(contenido);
        buscador.lastIndex = fin;
      }
    } else if (entidad) {
      salida += pintar("entidad", entidad);
    } else {
      salida += escaparHTML(completo);
    }
    ultimo = buscador.lastIndex;

    // Evita quedarse en el mismo lugar si una parte quedó vacía.
    if (completo === "") {
      buscador.lastIndex = buscador.lastIndex + 1;
    }
  }
  return salida + escaparHTML(codigo.slice(ultimo));
}


// ---------- CSS ----------

// Partes que se buscan en el CSS:
// comentario, texto entre comillas, llaves, ; y :, una regla con @,
// un color como #e8f4f8, un número con su unidad (16px, 1fr, 50%),
// una palabra, espacios o cualquier otro símbolo.
const PARTES_CSS = /(\/\*[\s\S]*?(?:\*\/|$))|("[^"\n]*"?|'[^'\n]*'?)|(\{)|(\})|(;)|(:)|(@[\w-]+)|(#[0-9a-fA-F]{3,8}(?![\w-]))|(-?\d*\.?\d+(?:[a-zA-Z%]+)?)|([\wÀ-ɏ-]+)|(\s+)|([\s\S])/g;

function resaltarCSS(codigo) {
  let salida = "";
  // Dónde estamos: "reglas" (selectores) o "declaraciones" (dentro de { }).
  // Es una pila porque @media tiene reglas adentro de sus llaves.
  const pila = [];
  let esArroba = false;      // estamos después de @media, antes de su {
  let parentesis = 0;        // dentro de ( ) en @media (max-width: 600px)
  let enValor = false;       // dentro de { }, después de los dos puntos

  for (const parte of codigo.matchAll(PARTES_CSS)) {
    const [completo, comentario, comillas, abre, cierra, puntoComa, dosPuntos,
      arroba, colorHex, numero, palabra, espacio] = parte;
    const enDeclaraciones = pila[pila.length - 1] === "declaraciones";

    if (comentario) {
      salida += pintar("comentario", comentario);
    } else if (espacio) {
      salida += espacio;
    } else if (abre) {
      pila.push(esArroba ? "reglas" : "declaraciones");
      esArroba = false;
      enValor = false;
      salida += abre;
    } else if (cierra) {
      pila.pop();
      enValor = false;
      salida += cierra;
    } else if (enDeclaraciones) {
      // Dentro de { }: primero la propiedad, después de : el valor.
      if (puntoComa) {
        enValor = false;
        salida += puntoComa;
      } else if (dosPuntos) {
        enValor = true;
        salida += dosPuntos;
      } else if (!enValor && palabra) {
        salida += pintar("propiedad", palabra);
      } else if (enValor && numero) {
        salida += pintar("numero", numero);
      } else if (enValor && (palabra || colorHex || comillas)) {
        salida += pintar("valor-css", completo);
      } else {
        salida += escaparHTML(completo);
      }
    } else if (arroba) {
      esArroba = true;
      salida += pintar("arroba", arroba);
    } else if (esArroba) {
      // Lo que va entre @media y su {, por ejemplo (max-width: 600px)
      if (completo === "(") {
        parentesis = parentesis + 1;
      } else if (completo === ")") {
        parentesis = Math.max(0, parentesis - 1);
      }
      if (puntoComa) {
        // Reglas con @ que terminan en ; y no tienen llaves, como @import
        esArroba = false;
        salida += puntoComa;
      } else if (numero) {
        salida += pintar("numero", numero);
      } else if (palabra) {
        salida += pintar(parentesis > 0 ? "propiedad" : "arroba", palabra);
      } else {
        salida += escaparHTML(completo);
      }
    } else if (completo === ",") {
      salida += completo;
    } else {
      // Un selector: h1, .tarjeta, #menu, a:hover, *
      salida += pintar("selector", completo);
    }
  }
  return salida;
}


// ---------- JavaScript ----------

// Palabras que JavaScript reserva. Solo las que se ven en el curso
// y algunas más comunes.
const PALABRAS_CLAVE_JS = new Set([
  "let", "const", "var", "function", "return", "if", "else", "for", "of",
  "in", "while", "do", "break", "continue", "typeof", "new", "true", "false",
  "null", "undefined", "this", "class", "switch", "case", "default", "try",
  "catch", "throw", "async", "await"
]);

// Partes que se buscan en JavaScript, en este orden:
// comentario /* ... */, comentario // hasta el final de la línea,
// plantilla literal entre comillas invertidas `...`,
// texto entre comillas dobles o simples, un número, una palabra
// o cualquier otro símbolo.
const PARTES_JS = /(\/\*[\s\S]*?(?:\*\/|$))|(\/\/[^\n]*)|(`(?:\\[\s\S]|[^`\\])*`?)|("(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$À-ɏ][\w$À-ɏ]*)|([\s\S])/g;

// En una plantilla literal, el texto va del color de los textos
// y lo que está dentro de ${ } va con los colores normales.
function pintarPlantilla(plantilla) {
  let salida = "";
  let ultimo = 0;
  for (const parte of plantilla.matchAll(/\$\{([^}]*)\}?/g)) {
    salida += pintar("texto-js", plantilla.slice(ultimo, parte.index));
    salida += pintar("puntuacion", "${") + resaltarJS(parte[1]) +
      (parte[0].endsWith("}") ? pintar("puntuacion", "}") : "");
    ultimo = parte.index + parte[0].length;
  }
  return salida + pintar("texto-js", plantilla.slice(ultimo));
}

function resaltarJS(codigo) {
  let salida = "";
  for (const parte of codigo.matchAll(PARTES_JS)) {
    const [completo, bloque, linea, plantilla, texto, numero, palabra] = parte;
    if (bloque || linea) {
      salida += pintar("comentario", completo);
    } else if (plantilla) {
      salida += pintarPlantilla(plantilla);
    } else if (texto) {
      salida += pintar("texto-js", texto);
    } else if (numero) {
      salida += pintar("numero", numero);
    } else if (palabra && PALABRAS_CLAVE_JS.has(palabra)) {
      salida += pintar("clave", palabra);
    } else {
      salida += escaparHTML(completo);
    }
  }
  return salida;
}


// Elige el resaltador según el tipo de archivo.
function resaltarCodigo(codigo, lenguaje) {
  if (lenguaje === "css") {
    return resaltarCSS(codigo);
  }
  if (lenguaje === "js") {
    return resaltarJS(codigo);
  }
  return resaltarHTML(codigo);
}
