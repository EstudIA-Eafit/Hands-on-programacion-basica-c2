# Laboratorios prácticos · Programación Básica - C2

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
6. [Laboratorios con varios proyectos](#laboratorios-con-varios-proyectos)
7. [Contrato para JavaScript (labs 03 y 04)](#contrato-para-javascript-labs-03-y-04)
8. [Formato de labs/labs.json](#formato-de-labslabsjson)
9. [Editor con colores y tema claro u oscuro](#editor-con-colores-y-tema-claro-u-oscuro)
10. [Límites conocidos](#límites-conocidos)

---

## Cómo está organizado

```
/
├── index.html              Portada: muestra la lista de laboratorios
├── laboratorio.html        Página de laboratorio, la misma para todos
├── README.md               Este archivo
├── .nojekyll               Archivo vacío para GitHub Pages (ver abajo)
├── .github/
│   ├── workflows/publicar.yml   Publica el sitio al subir cambios a main
│   └── scripts/revisar_labs.py  Revisa los laboratorios antes de publicar
├── assets/
│   ├── css/sitio.css       Estilos de todo el sitio
│   └── js/
│       ├── tema.js         Tema claro u oscuro y su botón (todas las páginas)
│       ├── curso.js        Escribe el nombre del curso en todas las páginas
│       ├── portada.js      Arma la lista de la portada
│       ├── resaltado.js    Pinta de colores el código HTML y CSS del editor
│       └── laboratorio.js  Tareas, editor, vista previa y botones
├── labs/
│   ├── labs.json           Catálogo: la lista de laboratorios
│   ├── _plantilla/         Laboratorio vacío para copiar (con dos proyectos)
│   ├── 01-html-basico/
│   │   ├── lab.json        Datos y tareas del laboratorio
│   │   └── inicio/         Archivos con los que empieza la práctica
│   ├── 02-html-css/
│   │   ├── lab.json
│   │   └── inicio/
│   ├── 03-modelo-de-cajas/ Laboratorio con tres proyectos para elegir
│   │   ├── lab.json
│   │   └── inicio/
│   │       ├── eventos/    Una carpeta por proyecto,
│   │       ├── tienda/     cada una con los mismos archivos
│   │       └── servicios/
│   └── 04-flexbox-grid/    Sigue con el proyecto elegido en el 03
│       ├── lab.json
│       └── inicio/
│           ├── eventos/
│           ├── tienda/
│           └── servicios/
└── material/               Plantillas originales de clase
```

Cómo funciona:

- La **portada** (`index.html`) lee `labs/labs.json` y muestra una tarjeta por
  cada laboratorio.
- Cada tarjeta lleva a `laboratorio.html?lab=NOMBRE-DE-CARPETA`. Esa página lee
  `labs/NOMBRE-DE-CARPETA/lab.json` y los archivos de `inicio/`, y arma todo.
- Si el laboratorio ofrece varios proyectos, la página primero pide elegir uno
  y después lee los archivos de `inicio/NOMBRE-DEL-PROYECTO/`.

Por eso, para agregar un laboratorio **no hace falta tocar HTML ni JavaScript**:
solo carpetas y archivos JSON.

> **¿Por qué el archivo `.nojekyll`?** Con la publicación por GitHub Actions
> no hace falta. Se deja por si alguien publica con la opción
> **Deploy from a branch**: en ese modo GitHub ignora las carpetas que
> empiezan con guion bajo, como `_plantilla`, y este archivo vacío lo impide.

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
- Al escribir en el editor, la vista previa cambia y el código se ve de colores.
- En el editor, Tab agrega 2 espacios. Esc y después Tab sale del editor.
- El botón **Ocultar tareas** cierra el panel de tareas: el editor y el
  resultado se hacen más anchos y queda una franja con el avance y el botón
  **Mostrar tareas**. Al abrir de nuevo un laboratorio, las tareas se ven.
- El botón **Cambiar a tema oscuro / claro** de la cabecera cambia los colores
  de todo el sitio, y el tema se mantiene al pasar a otra página.
- El botón **Abrir vista previa en pestaña nueva** muestra el código del
  editor, con tus cambios.
- Los enlaces de "Descargar" bajan los archivos de inicio.
- En los labs 03 y 04: el proyecto que eliges en el 03 aparece ya elegido
  en el 04, y el botón **Cambiar de proyecto** funciona.
- Prueba la página a lo ancho de un celular (375 px) con el modo de
  dispositivo del inspector (`Ctrl + Mayús + M` en Chrome, Edge o Firefox).

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
5. En **Build and deployment**, en **Source**, elige **GitHub Actions**.
   No hace falta elegir nada más: el proyecto ya trae las instrucciones de
   publicación en `.github/workflows/publicar.yml`.
6. Ve a la pestaña **Actions** del repositorio. Si la publicación no empezó
   sola, entra en **Publicar en GitHub Pages** y pulsa **Run workflow**.
7. Cuando termine (marca verde ✓), la dirección del sitio aparece en
   **Settings → Pages** y en el resultado de la publicación. Tiene esta forma:

   ```
   https://USUARIO.github.io/NOMBRE-DEL-REPO/
   ```

### Qué pasa en cada publicación

Cada vez que subes cambios a `main`, GitHub hace dos pasos (los ves en la
pestaña **Actions**):

1. **Revisar laboratorios.** Ejecuta `.github/scripts/revisar_labs.py`, que
   busca los errores más comunes: un JSON mal escrito, una carpeta que no
   existe, un archivo de inicio que falta o tareas con el mismo `id`.
2. **Publicar sitio.** Solo si la revisión salió bien.

Si la revisión encuentra un problema, aparece una marca roja ✗ y **el sitio
no se actualiza**: sigue en línea la versión anterior. Entra en la ejecución
fallida, abre el paso **Revisar labs.json y cada lab.json** y lee la lista de
problemas. Cada uno dice el archivo y, si es un JSON mal escrito, la línea.

Puedes hacer la misma revisión en tu computador antes de subir los cambios:

```
python .github/scripts/revisar_labs.py
```

Todas las rutas del sitio son relativas, así que funciona dentro de esa
subcarpeta sin cambiar nada.

---

## Agregar un laboratorio nuevo

Ejemplo: vamos a crear el laboratorio `05-listas`.

### Paso 1. Copia la plantilla

Copia la carpeta `labs/_plantilla/` y pega la copia dentro de `labs/` con el
nombre nuevo:

```
labs/05-listas/
├── lab.json
└── inicio/
    ├── proyecto-a/
    │   └── index.html
    └── proyecto-b/
        └── index.html
```

Reglas para el nombre de la carpeta: solo letras minúsculas sin tildes,
números y guiones. Sin espacios. Empieza con un número para que queden en orden.

La plantilla viene con **dos proyectos para elegir**. Decide ahora cuál de
estos dos casos es el tuyo:

- **Un solo proyecto** (como los labs 01 y 02): todas las personas trabajan
  con los mismos archivos.
  1. Mueve los archivos de `inicio/proyecto-a/` a `inicio/`.
  2. Borra las carpetas `inicio/proyecto-a/` e `inicio/proyecto-b/`.
  3. En `lab.json`, borra todo el bloque `"proyectos": { ... },` con su coma.

  Queda así:

  ```
  labs/05-listas/
  ├── lab.json
  └── inicio/
      └── index.html
  ```

- **Varios proyectos para elegir** (como los labs 03 y 04): cada persona elige
  un proyecto. Todos tienen las mismas tareas; solo cambia el contenido.
  Deja la estructura como está y lee la sección
  [Laboratorios con varios proyectos](#laboratorios-con-varios-proyectos).

### Paso 2. Pon los archivos de inicio

Los archivos de inicio son los archivos con los que empieza la persona.
Van en `inicio/` o, si hay varios proyectos, en la carpeta de cada proyecto.
Reemplaza `index.html` por el tuyo.

- Si el laboratorio usa CSS, agrega también el archivo `.css` (por ejemplo
  `estilos.css`). El HTML debe enlazarlo con
  `<link rel="stylesheet" href="estilos.css">`.
- Los archivos deben guardarse con codificación **UTF-8**.

### Paso 3. Edita `lab.json`

Abre `labs/05-listas/lab.json` y cambia los textos entre corchetes. El formato
completo está en la sección [Formato de lab.json](#formato-de-labjson).

### Paso 4. Agrega el laboratorio al catálogo

Abre `labs/labs.json` y agrega una entrada al final de la lista
`"laboratorios"`. **Ojo con la coma** entre una entrada y la siguiente:

```json
    {
      "id": "04-flexbox-grid",
      ...
      "carpeta": "04-flexbox-grid"
    },
    {
      "id": "05-listas",
      "titulo": "Listas en HTML",
      "descripcion": "Crea listas ordenadas y no ordenadas.",
      "duracion": "30 minutos",
      "nivel": "Básico",
      "carpeta": "05-listas"
    }
  ]
}
```

### Paso 5. Prueba

Ejecuta la revisión automática desde la carpeta del proyecto:

```
python .github/scripts/revisar_labs.py
```

Después abre el sitio con el servidor local y revisa que el laboratorio
aparece en la portada y que abre bien. Si ves el mensaje "No se pudo cargar", lo más común es:

- una coma de más o de menos en un archivo JSON;
- comillas que faltan alrededor de un texto;
- el nombre de `"carpeta"` no coincide con el nombre real de la carpeta;
- un archivo de `"archivos"` no existe dentro de `inicio/`;
- con varios proyectos: el `"id"` de un proyecto no coincide con el nombre de
  su carpeta, o a un proyecto le falta uno de los archivos.

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

  // OPCIONAL. Solo si el laboratorio ofrece varios proyectos para elegir.
  // Si no lo escribes, los archivos están directo en inicio/.
  // La explicación completa está en "Laboratorios con varios proyectos".
  "proyectos": {
    "grupo": "encuentro-2",
    "opciones": [
      { "id": "eventos", "titulo": "Inscripción a eventos culturales",
        "descripcion": "Seis eventos del barrio y un formulario para inscribirse." }
    ]
  },

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

## Laboratorios con varios proyectos

Un laboratorio puede ofrecer varios proyectos para elegir. Por ejemplo, en
los labs 03 y 04 cada persona elige entre un catálogo de tienda, una agenda de
eventos o un directorio de servicios. **Las tareas son las mismas para todos
los proyectos.** Solo cambian los archivos de inicio.

### Qué cambia en lab.json

Se agrega el bloque `"proyectos"`:

```jsonc
"proyectos": {
  // Los laboratorios con el mismo "grupo" comparten la elección:
  // lo que la persona elige en uno aparece ya elegido en los otros.
  // Los labs 03 y 04 usan "encuentro-2".
  // Si no escribes "grupo", la elección vale solo para este laboratorio.
  "grupo": "encuentro-2",

  // Un elemento por proyecto, en el orden en que se muestran.
  "opciones": [
    {
      // Es también el NOMBRE DE LA CARPETA: inicio/eventos/
      // Solo letras minúsculas sin tildes, números y guiones.
      // No lo cambies después de publicar: el trabajo guardado depende de él.
      "id": "eventos",

      // Lo que se ve en la lista para elegir.
      "titulo": "Inscripción a eventos culturales",
      "descripcion": "Seis eventos del barrio y un formulario para inscribirse."
    },
    {
      "id": "tienda",
      "titulo": "Catálogo de una tienda de barrio",
      "descripcion": "Seis productos y un formulario para hacer un pedido."
    }
  ]
}
```

### Qué cambia en las carpetas

Cada proyecto tiene su carpeta dentro de `inicio/`, con el mismo nombre que su
`"id"`. **Todas las carpetas deben tener los mismos archivos**, los de la lista
`"archivos"`:

```
labs/03-modelo-de-cajas/
├── lab.json
└── inicio/
    ├── eventos/
    │   ├── index.html
    │   └── estilos.css
    ├── tienda/
    │   ├── index.html
    │   └── estilos.css
    └── servicios/
        ├── index.html
        └── estilos.css
```

La revisión automática (`revisar_labs.py`) avisa si a un proyecto le falta un
archivo.

### Qué ve la persona

- La primera vez, antes del editor, aparece la lista de proyectos para elegir.
- Después, arriba de las tareas dice el proyecto elegido y hay un botón
  **Cambiar de proyecto**.
- La elección se guarda en el navegador. Si otro laboratorio tiene el mismo
  `"grupo"`, se abre directamente con ese proyecto.
- El código se guarda aparte para cada proyecto. Si la persona cambia de
  proyecto y vuelve, encuentra su trabajo como lo dejó.
- Las tareas marcadas son del laboratorio, no del proyecto: no se borran al
  cambiar de proyecto.

---

## Contrato para JavaScript (labs 03 y 04)

En próximos encuentros los estudiantes van a usar JavaScript para leer el
formulario y agregar tarjetas a la lista. Ese código va a buscar los elementos
por su `id` y su clase. Por eso, **en los laboratorios futuros que sigan con
estos proyectos, no cambies estos nombres**. Son los mismos en los tres
proyectos, así que el mismo código de JavaScript sirve para todos.

### Estructura de la página

| Qué es | Nombre | Notas |
|---|---|---|
| Sección de tarjetas | `id="seccion-tarjetas"` | El menú enlaza aquí. |
| Contenedor de tarjetas | `id="lista-tarjetas"` | JavaScript agregará tarjetas aquí adentro. |
| Cada tarjeta | `class="tarjeta"` | Siempre un `<article>` con la estructura de abajo. |
| Sección del formulario | `id="seccion-formulario"` | El menú enlaza aquí. |
| Formulario | `id="formulario"` | |
| Cada campo con su etiqueta | `class="campo"` | Un `<div>` con un `<label>` y su campo. |
| Botón del formulario | `id="boton-enviar"` | Es `type="button"`: no envía nada. |
| Mensajes | `id="mensaje"` | Un `<p>` vacío con `aria-live="polite"`. JavaScript escribirá aquí. |
| Pie de página | `id="acerca"` | El menú enlaza aquí. |
| Menú | `class="menu"` | Un `<nav>` con tres enlaces. |

### Estructura de cada tarjeta

Todas las tarjetas son iguales. Una tarjeta nueva creada con JavaScript debe
tener exactamente esta forma:

```html
<article class="tarjeta">
  <h3 class="tarjeta-titulo">...</h3>
  <p class="tarjeta-texto">...</p>
  <p class="tarjeta-detalle">...</p>
</article>
```

| Clase | Eventos | Tienda | Servicios |
|---|---|---|---|
| `tarjeta-titulo` | Nombre del evento | Nombre del producto | Oficio |
| `tarjeta-texto` | Fecha | Descripción | Descripción |
| `tarjeta-detalle` | Lugar | Precio | Horario |

### Campos del formulario

En cada campo, el `id` y el `name` son iguales, y el `<label>` tiene un `for`
con ese mismo nombre.

| Proyecto | Campos (`id` y `name`) |
|---|---|
| Eventos | `nombre` (text), `correo` (email), `evento` (select), `acompanantes` (number) |
| Tienda | `nombre` (text), `telefono` (tel), `producto` (select), `cantidad` (number), `comentarios` (textarea) |
| Servicios | `nombre` (text), `correo` (email), `servicio` (select), `fecha` (date), `descripcion` (textarea) |

Las opciones del `select` tienen como `value` el mismo texto del título de
cada tarjeta.

La página dice: "Este formulario todavía no guarda ni envía datos." Cuando un
laboratorio futuro agregue JavaScript, actualiza ese texto.

---

## Formato de labs/labs.json

```jsonc
{
  // Nombre del curso. Se muestra en la portada y en el pie de todas las páginas.
  // Este es el ÚNICO lugar donde se escribe: cámbialo aquí y listo.
  "curso": "Programación Básica - C2",

  // Nombre de la institución. Se muestra en el pie de todas las páginas.
  "institucion": "[Nombre de la institución]",

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

## Editor con colores y tema claro u oscuro

### Colores del código

El editor pinta de colores el HTML y el CSS, parecido a Visual Studio Code:
etiquetas, atributos, valores, comentarios, selectores, propiedades y números.
También tiene números de línea.

Cómo funciona, por si hay que arreglar algo:

- El cuadro de texto donde se escribe tiene la **letra transparente**.
- Debajo hay una copia del código pintada de colores (`assets/js/resaltado.js`).
  Se vuelve a pintar en cada tecla.
- Las dos capas usan la misma letra, el mismo tamaño y los mismos espacios.
  **Si cambias la letra, el tamaño o el `padding` del editor en
  `assets/css/sitio.css`, cámbialos en la regla compartida
  `.numeros, .capa-colores, .codigo`**, o el color dejará de coincidir con
  el texto.

### Teclado en el editor

- **Tab** agrega 2 espacios. Con varias líneas seleccionadas, las mueve a la
  derecha.
- **Mayús + Tab** quita hasta 2 espacios al inicio de cada línea seleccionada.
- **Esc y después Tab** sale del editor. Así, quien usa solo el teclado no
  queda atrapado. La página lo explica debajo del editor.
- **Ctrl + Z** deshace, también los cambios de Tab.

### Tema claro u oscuro

- La primera vez, el sitio usa el tema del sistema (computador o celular).
- El botón de la cabecera lo cambia. La elección se guarda en el navegador y
  vale para todas las páginas del sitio.
- El cuadro **Resultado** siempre muestra la página del estudiante con sus
  propios colores, también en el tema oscuro.

Los colores de los dos temas están al principio de `assets/css/sitio.css`, en
variables: el bloque `:root` es el tema claro y el bloque
`:root[data-tema="oscuro"]` es el oscuro. Los colores del código empiezan con
`--c-`. Todas las combinaciones de texto y fondo tienen un contraste de al
menos 4.5 a 1; si cambias un color, revisa que siga así.

---

## Límites conocidos

- **El avance vive en un solo navegador.** Si la persona cambia de computador,
  usa una ventana privada o borra los datos del navegador, pierde el avance.
  Por eso hay un botón para descargar el trabajo.
- **La vista previa no ejecuta JavaScript ni envía formularios.** Los
  formularios de ejemplo son solo de práctica: no guardan ni envían datos.
  La vista previa en pestaña nueva tampoco ejecuta JavaScript.
- **La pestaña nueva es una foto del código.** Muestra el código del momento
  en que se pulsó el botón. Si la persona cambia el código, debe pulsar el
  botón otra vez. Si el navegador bloquea las ventanas emergentes, la página
  lo avisa debajo del botón.
- **Solo HTML y CSS.** El editor acepta un archivo HTML principal y archivos
  CSS. Los archivos CSS se conectan a la vista previa solo si el HTML los
  enlaza con `<link ... href="nombre.css">`.
- **La descarga del trabajo es un solo archivo HTML.** Si hay CSS, queda
  dentro de una etiqueta `<style>`. Los archivos de inicio sí se descargan por
  separado.
- **El editor no es VS Code.** Pinta colores, muestra números de línea y
  maneja Tab, pero no autocompleta, no cierra etiquetas solo y no marca
  errores. Si el código tiene un error, los colores pueden verse raros; el
  código no cambia.
- **El tema se guarda en un solo navegador**, igual que el avance.
