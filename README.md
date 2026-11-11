# Laboratorios prácticos · [Nombre del curso]

Sitio web con laboratorios de programación para principiantes.
Cada laboratorio tiene tareas cortas, un editor de código y una vista
previa que se actualiza mientras la persona escribe.

- No hay que instalar nada para usarlo: funciona en el navegador.
- Es un sitio estático: solo HTML, CSS y JavaScript, sin librerías externas.
- No recoge datos. El avance de cada persona se guarda solo en su navegador.

---

## Contenido

1. [Cómo está organizado](#cómo-está-organizado)
2. [Probar el sitio en tu computador](#probar-el-sitio-en-tu-computador)
3. [Publicar en GitHub Pages](#publicar-en-github-pages)
4. [Agregar un laboratorio nuevo](#agregar-un-laboratorio-nuevo)
5. [Formato de lab.json](#formato-de-labjson)
6. [Formato de labs/labs.json](#formato-de-labslabsjson)
7. [Límites conocidos](#límites-conocidos)

---

## Cómo está organizado

```
/
├── index.html              Portada: muestra la lista de laboratorios
├── laboratorio.html        Página de laboratorio, la misma para todos
├── README.md               Este archivo
├── .nojekyll               Archivo vacío que GitHub Pages necesita (ver abajo)
├── assets/
│   ├── css/sitio.css       Estilos de todo el sitio
│   └── js/
│       ├── portada.js      Arma la lista de la portada
│       └── laboratorio.js  Tareas, editor, vista previa y botones
├── labs/
│   ├── labs.json           Catálogo: la lista de laboratorios
│   ├── _plantilla/         Laboratorio vacío para copiar
│   ├── 01-html-basico/
│   │   ├── lab.json        Datos y tareas del laboratorio
│   │   └── inicio/         Archivos con los que empieza la práctica
│   └── 02-html-css/
│       ├── lab.json
│       └── inicio/
└── material/               Plantillas originales de clase
```

Cómo funciona:

- La **portada** (`index.html`) lee `labs/labs.json` y muestra una tarjeta por
  cada laboratorio.
- Cada tarjeta lleva a `laboratorio.html?lab=NOMBRE-DE-CARPETA`. Esa página lee
  `labs/NOMBRE-DE-CARPETA/lab.json` y los archivos de `inicio/`, y arma todo.

Por eso, para agregar un laboratorio **no hace falta tocar HTML ni JavaScript**:
solo carpetas y archivos JSON.

> **¿Por qué el archivo `.nojekyll`?** GitHub Pages ignora las carpetas que
> empiezan con guion bajo, como `_plantilla`. Este archivo vacío se lo impide.
> No lo borres.

---

## Probar el sitio en tu computador

El sitio **no funciona si abres `index.html` con doble clic**. El navegador no
deja leer los archivos JSON desde el disco. Necesitas un servidor local, que es
un programa pequeño que sirve las páginas como lo haría internet.

### Opción A: con Python

1. Instala Python desde <https://www.python.org/downloads/> si no lo tienes.
   En Windows, marca la casilla **"Add Python to PATH"** al instalar.
2. Abre una terminal en la carpeta del proyecto:
   - **Windows:** abre la carpeta en el Explorador, escribe `cmd` en la barra
     de direcciones y pulsa Enter.
   - **macOS o Linux:** abre la Terminal y escribe `cd ` seguido de la ruta de
     la carpeta.
3. Escribe este comando y pulsa Enter:

   ```
   python -m http.server 8000
   ```

   En macOS o Linux puede ser `python3` en lugar de `python`.
4. Abre el navegador en <http://localhost:8000/>.
5. Para apagar el servidor, vuelve a la terminal y pulsa `Ctrl + C`.

### Opción B: con Visual Studio Code

1. Instala la extensión **Live Server**.
2. Abre la carpeta del proyecto en VS Code.
3. Haz clic derecho en `index.html` y elige **Open with Live Server**.

### Qué revisar antes de publicar

- La portada muestra todos los laboratorios.
- Cada laboratorio abre, muestra sus tareas y la vista previa.
- Al escribir en el editor, la vista previa cambia.
- Los enlaces de "Descargar" bajan los archivos de inicio.

---

## Publicar en GitHub Pages

Solo se hace una vez. Después, cada cambio que subas a la rama `main` se
publica solo en uno o dos minutos.

1. Crea una cuenta en <https://github.com> si no la tienes.
2. Crea un repositorio nuevo: botón **New**, ponle un nombre (por ejemplo
   `laboratorios`) y elige **Public**. No marques ninguna casilla de
   archivos iniciales.
3. Sube el proyecto. Desde una terminal en la carpeta del proyecto:

   ```
   git remote add origin https://github.com/USUARIO/NOMBRE-DEL-REPO.git
   git push -u origin main
   ```

   Cambia `USUARIO` y `NOMBRE-DEL-REPO` por los tuyos.
4. En GitHub, entra al repositorio y ve a **Settings → Pages**.
5. En **Build and deployment**, en **Source**, elige **Deploy from a branch**.
6. En **Branch**, elige `main` y la carpeta `/ (root)`. Pulsa **Save**.
7. Espera uno o dos minutos y recarga la página de Settings. Arriba aparece la
   dirección del sitio, con esta forma:

   ```
   https://USUARIO.github.io/NOMBRE-DEL-REPO/
   ```

Todas las rutas del sitio son relativas, así que funciona dentro de esa
subcarpeta sin cambiar nada.

---

## Agregar un laboratorio nuevo

Ejemplo: vamos a crear el laboratorio `03-listas`.

### Paso 1. Copia la plantilla

Copia la carpeta `labs/_plantilla/` y pega la copia dentro de `labs/` con el
nombre nuevo:

```
labs/03-listas/
├── lab.json
└── inicio/
    └── index.html
```

Reglas para el nombre de la carpeta: solo letras minúsculas sin tildes,
números y guiones. Sin espacios. Empieza con un número para que queden en orden.

### Paso 2. Pon los archivos de inicio

Dentro de `inicio/` van los archivos con los que empieza la persona.
Reemplaza `index.html` por el tuyo.

- Si el laboratorio usa CSS, agrega también el archivo `.css` (por ejemplo
  `estilos.css`). El HTML debe enlazarlo con
  `<link rel="stylesheet" href="estilos.css">`.
- Los archivos deben guardarse con codificación **UTF-8**.

### Paso 3. Edita `lab.json`

Abre `labs/03-listas/lab.json` y cambia los textos entre corchetes. El formato
completo está en la sección [Formato de lab.json](#formato-de-labjson).

### Paso 4. Agrega el laboratorio al catálogo

Abre `labs/labs.json` y agrega una entrada al final de la lista
`"laboratorios"`. **Ojo con la coma** entre una entrada y la siguiente:

```json
    {
      "id": "02-html-css",
      ...
      "carpeta": "02-html-css"
    },
    {
      "id": "03-listas",
      "titulo": "Listas en HTML",
      "descripcion": "Crea listas ordenadas y no ordenadas.",
      "duracion": "30 minutos",
      "nivel": "Básico",
      "carpeta": "03-listas"
    }
  ]
}
```

### Paso 5. Prueba

Abre el sitio con el servidor local y revisa que el laboratorio aparece en la
portada y que abre bien. Si ves el mensaje "No se pudo cargar", lo más común es:

- una coma de más o de menos en un archivo JSON;
- comillas que faltan alrededor de un texto;
- el nombre de `"carpeta"` no coincide con el nombre real de la carpeta;
- un archivo de `"archivos"` no existe dentro de `inicio/`.

Para encontrar errores en un JSON, puedes pegarlo en un validador de JSON
o abrirlo en VS Code, que marca los errores en rojo.

---

## Formato de lab.json

JSON no admite comentarios. Por eso el ejemplo de abajo está comentado con
`//` solo para explicarlo: **en tu archivo no escribas los comentarios**.

```jsonc
{
  // Identificador único. Se usa para guardar el avance en el navegador.
  // Usa el mismo nombre de la carpeta. Si lo cambias después,
  // las personas pierden su avance guardado.
  "id": "02-html-css",

  // Título que se ve arriba de la página.
  "titulo": "HTML con CSS",

  // Una o dos frases: qué va a aprender la persona.
  "objetivo": "Cambiar la apariencia de una página con reglas de CSS.",

  // Texto libre. Se muestra tal cual.
  "duracion": "60 minutos",
  "nivel": "Básico",

  // Los archivos que se editan. Cada uno debe existir en la carpeta inicio/.
  // - "nombre": nombre exacto del archivo.
  // - "etiqueta": texto de la pestaña del editor.
  // - "principal": true en el archivo HTML que se ve en la vista previa.
  //   Solo uno lo lleva.
  // Si hay un solo archivo, no se muestran pestañas.
  "archivos": [
    { "nombre": "index.html",  "etiqueta": "HTML", "principal": true },
    { "nombre": "estilos.css", "etiqueta": "CSS" }
  ],

  // Las tareas, en el orden en que se muestran.
  "tareas": [
    {
      // Identificador corto y único dentro del laboratorio, sin espacios.
      // Sirve para recordar si la casilla está marcada. No lo cambies
      // después de publicar: puedes cambiar el orden o el texto sin problema.
      "id": "fondo",

      // La instrucción. Puede llevar <code> para mostrar código.
      // Para mostrar una etiqueta como texto, escribe &lt; en vez de <
      // y &gt; en vez de >. Ejemplo: <code>&lt;h1&gt;</code>
      // Las comillas dentro del texto se escriben \"
      "texto": "Cambia el color de fondo del <code>body</code>.",

      // Pista opcional. Si no hay, deja "" y no se muestra.
      "pista": "Busca la regla <code>body</code> en la pestaña CSS.",

      // true si es un reto: se muestra como "Reto." en vez de "Tarea N."
      "reto": false
    },
    {
      "id": "footer",
      "texto": "Escribe desde cero una regla para <code>footer</code>.",
      "pista": "",
      "reto": true
    }
  ]
}
```

---

## Formato de labs/labs.json

```jsonc
{
  // Nombre del curso. Se muestra arriba en la portada.
  "curso": "[Nombre del curso]",

  // Un elemento por laboratorio, en el orden en que aparecen en la portada.
  "laboratorios": [
    {
      "id": "01-html-basico",         // igual al "id" de su lab.json
      "titulo": "HTML básico",        // título de la tarjeta
      "descripcion": "Edita tu primera página web.",  // una o dos frases
      "duracion": "45 minutos",
      "nivel": "Básico",
      "carpeta": "01-html-basico"     // nombre exacto de la carpeta en labs/
    }
  ]
}
```

La carpeta `_plantilla` no está en el catálogo a propósito, para que no se vea
en la portada. Puedes verla en `laboratorio.html?lab=_plantilla`.

---

## Límites conocidos

- **El avance vive en un solo navegador.** Si la persona cambia de computador,
  usa una ventana privada o borra los datos del navegador, pierde el avance.
  Por eso hay un botón para descargar el trabajo.
- **La vista previa no ejecuta JavaScript ni envía formularios.** Los
  formularios de ejemplo son solo de práctica: no guardan ni envían datos.
- **Solo HTML y CSS.** El editor acepta un archivo HTML principal y archivos
  CSS. Los archivos CSS se conectan a la vista previa solo si el HTML los
  enlaza con `<link ... href="nombre.css">`.
- **La descarga del trabajo es un solo archivo HTML.** Si hay CSS, queda
  dentro de una etiqueta `<style>`. Los archivos de inicio sí se descargan por
  separado.
- **Sin resaltado de colores en el código.** El editor es un cuadro de texto
  simple, para que el sitio funcione en computadores modestos.
