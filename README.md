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
7. [Contrato para JavaScript (labs 03 a 10)](#contrato-para-javascript-labs-03-a-10)
8. [Laboratorios con JavaScript (labs 05 a 10)](#laboratorios-con-javascript-labs-05-a-10)
9. [Tabla de casos de prueba](#tabla-de-casos-de-prueba)
10. [Formato de labs/labs.json](#formato-de-labslabsjson)
11. [Editor con colores y tema claro u oscuro](#editor-con-colores-y-tema-claro-u-oscuro)
12. [Límites conocidos](#límites-conocidos)

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
│       ├── resaltado.js    Pinta de colores el código HTML, CSS y JS del editor
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
│   ├── 04-flexbox-grid/    Sigue con el proyecto elegido en el 03
│   │   ├── lab.json
│   │   └── inicio/
│   │       ├── eventos/
│   │       ├── tienda/
│   │       └── servicios/
│   ├── 05-datos/           Encuentro 3: JavaScript. Los mismos tres proyectos,
│   ├── 06-funciones/       cada uno con index.html, estilos.css y app.js
│   ├── 07-dom/
│   ├── 08-eventos/         Encuentro 4: eventos, formularios y validación.
│   ├── 09-formularios/     Los mismos tres proyectos y los mismos archivos
│   └── 10-validacion/      Su lab.json trae una tabla de casos de prueba
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
- La flecha junto al título **Tareas** cierra el panel de tareas y el editor
  y el resultado se hacen más anchos. En pantalla grande la flecha apunta a
  la izquierda (‹) con el panel abierto y a la derecha (›) cerrado; cerrado,
  queda solo una franja con la flecha. En celular y pantallas medianas apunta
  hacia arriba (˄) abierto y hacia abajo (˅) cerrado. Al pasar el mouse dice
  «Ocultar tareas» o «Mostrar tareas». Al abrir de nuevo un laboratorio, las
  tareas se ven.
- El botón **Cambiar a tema oscuro / claro** de la cabecera cambia los colores
  de todo el sitio, y el tema se mantiene al pasar a otra página.
- El botón **Abrir vista previa en pestaña nueva** muestra el código del
  editor, con tus cambios.
- Los enlaces de "Descargar" bajan los archivos de inicio.
- En los labs 03 a 07: el proyecto que eliges en el 03 aparece ya elegido
  en los demás, y el botón **Cambiar de proyecto** funciona.
- En los labs 05 a 07: hay una pestaña **JS**. Al pulsar **Abrir vista
  previa en pestaña nueva**, el código JS del editor se ejecuta en esa
  pestaña y lo que muestra `console.log` aparece en su consola (F12 >
  Consola). En el lab 07, con las tareas resueltas, aparecen las 6 tarjetas
  con los estilos del lab 04.
- En los labs 08 a 10, en la pestaña nueva: el buscador filtra las tarjetas,
  el botón de cada tarjeta elige su opción en el formulario y el formulario
  para agregar crea la tarjeta sin recargar. En el lab 09, si un formulario se
  envía sin `preventDefault()`, la pestaña se recarga.
- En el lab 10: la tabla de casos de prueba aparece debajo del editor, lo que
  escribes sigue ahí al recargar y **Descargar mi trabajo** baja también
  `casos-de-prueba.html`.
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

Ejemplo: vamos a crear el laboratorio `08-listas`.

### Paso 1. Copia la plantilla

Copia la carpeta `labs/_plantilla/` y pega la copia dentro de `labs/` con el
nombre nuevo:

```
labs/08-listas/
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
  labs/08-listas/
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

Abre `labs/08-listas/lab.json` y cambia los textos entre corchetes. El formato
completo está en la sección [Formato de lab.json](#formato-de-labjson).

### Paso 4. Agrega el laboratorio al catálogo

Abre `labs/labs.json` y agrega una entrada al final de la lista
`"laboratorios"`. **Ojo con la coma** entre una entrada y la siguiente:

```json
    {
      "id": "07-dom",
      ...
      "carpeta": "07-dom"
    },
    {
      "id": "08-listas",
      "titulo": "Listas en HTML",
      "descripcion": "Crea listas ordenadas y no ordenadas.",
      "duracion": "30 minutos",
      "nivel": "Básico",
      "carpeta": "08-listas"
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
  // Un archivo que termina en .js es JavaScript: tiene su pestaña y sus
  // colores, y se ejecuta en la pestaña nueva. Ejemplo:
  // { "nombre": "app.js", "etiqueta": "JS" }
  // Ver "Laboratorios con JavaScript".
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
  ],

  // OPCIONAL. Una tabla de casos de prueba debajo del editor.
  // La explicación completa está en "Tabla de casos de prueba".
  "casos": {
    "instrucciones": "Prueba cada caso y escribe qué esperas y qué pasó.",
    "filas": [
      { "id": "agregar-vacio", "caso": "Agregar tarjeta: nombre vacío",
        "entrada": "En el nombre, escribe solo espacios." }
    ]
  }
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
  // Los labs 03 a 07 usan "encuentro-2". Los labs 05 a 07 son del
  // Encuentro 3, pero usan el mismo grupo a propósito: así la persona
  // sigue con el proyecto que eligió en el lab 03. No lo cambies.
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

## Contrato para JavaScript (labs 03 a 10)

Desde el lab 05, los estudiantes usan JavaScript para pintar las tarjetas,
leer los formularios y agregar tarjetas a la lista. Ese código busca los
elementos por su `id` y su clase. Por eso, **en los laboratorios futuros que
sigan con estos proyectos, no cambies estos nombres**. Son los mismos en los
tres proyectos, así que el mismo código de JavaScript sirve para todos. El
Encuentro 5 (depuración con DevTools) trabaja sobre este código.

### Estructura de la página

| Qué es | Nombre | Desde | Notas |
|---|---|---|---|
| Sección de tarjetas | `id="seccion-tarjetas"` | lab 03 | El menú enlaza aquí. |
| Buscador | `id="buscador"` (y `name`) | lab 08 | Un `<input type="search">` con su `<label>`, dentro de un `<div class="campo campo-buscar">`, encima de las tarjetas. No está dentro de un formulario. |
| Mensajes de la lista | `id="mensaje-tarjetas"` | lab 08 | Un `<p>` con `aria-live="polite"`: «Hay 6 eventos», cuántas coinciden con la búsqueda… |
| Contenedor de tarjetas | `id="lista-tarjetas"` | lab 03 | Desde el lab 07 está vacío: JavaScript pinta las tarjetas aquí. Tiene el único listener de clic de las tarjetas (delegación). |
| Cada tarjeta | `class="tarjeta"` | lab 03 | Siempre un `<article>` con la estructura de abajo. |
| Sección para agregar | `id="seccion-agregar"` | lab 08 | Va después de las tarjetas. El menú no enlaza aquí: sigue con tres enlaces. |
| Formulario para agregar | `id="formulario-agregar"` | lab 08 | Sus campos están más abajo. |
| Botón para agregar | `id="boton-agregar"` | lab 08 | `type="submit"`. |
| Mensajes para agregar | `id="mensaje-agregar"` | lab 08 | Un `<p>` con `aria-live="polite"`. |
| Sección del formulario | `id="seccion-formulario"` | lab 03 | El menú enlaza aquí. |
| Formulario de inscripción, pedido o solicitud | `id="formulario"` | lab 03 | |
| Cada campo con su etiqueta | `class="campo"` | lab 03 | Un `<div>` con un `<label>` y su campo. Con una casilla, `class="campo campo-casilla"`: la casilla va primero. |
| Botón del formulario | `id="boton-enviar"` | lab 03 | Hasta el lab 07 es `type="button"`. Desde el lab 08 es `type="submit"`. |
| Mensajes del formulario | `id="mensaje"` | lab 03 | Un `<p>` con `aria-live="polite"`. Muestra el resumen de la simulación. |
| Pie de página | `id="acerca"` | lab 03 | El menú enlaza aquí. |
| Menú | `class="menu"` | lab 03 | Un `<nav>` con tres enlaces. |
| Zona de práctica | `id="seccion-prueba"`, `id="texto-prueba"`, `id="boton-prueba"` | solo lab 08 | Para las tareas 1 y 2. No pasa a los labs siguientes. |

### Estructura de cada tarjeta

Todas las tarjetas son iguales. Una tarjeta nueva creada con JavaScript debe
tener exactamente esta forma. Hasta el lab 07 solo tiene las tres primeras
partes; desde el lab 08 tiene las cinco:

```html
<article class="tarjeta" data-id="1">
  <h3 class="tarjeta-titulo">Concierto de música andina</h3>
  <p class="tarjeta-texto">Sábado 6 de diciembre, 7:00 p. m.</p>
  <p class="tarjeta-detalle">Parque principal</p>
  <p class="tarjeta-disponibles">Cupos: 40</p>
  <button type="button" class="tarjeta-boton">Inscribirme<span class="texto-oculto"> en Concierto de música andina</span></button>
</article>
```

| Parte | Eventos | Tienda | Servicios |
|---|---|---|---|
| `data-id` | El `id` de la tarjeta en el array | igual | igual |
| `tarjeta-titulo` | Nombre del evento | Nombre del producto | Oficio |
| `tarjeta-texto` | Fecha | Descripción | Descripción |
| `tarjeta-detalle` | Lugar | Precio | Horario |
| `tarjeta-disponibles` | «Cupos: 40» | «Unidades disponibles: 20» | «Turnos por semana: 10» |
| `tarjeta-boton` | «Inscribirme» | «Pedir» | «Solicitar» |

- **El texto oculto.** El `<span class="texto-oculto">` no se ve en la
  pantalla, pero los lectores de pantalla sí lo leen. Así, en vez de oír
  «Inscribirme» seis veces, se oye «Inscribirme en Concierto de música
  andina». El texto del `span` empieza con un espacio, y en eventos lleva
  «en».
- **Al pulsar el botón.** Como el `span` está dentro del botón, un clic puede
  caer en el `span`. Por eso la delegación usa
  `evento.target.closest(".tarjeta-boton")`.
- **La clase `tarjeta-destacada`.** La reciben las tarjetas con
  `destacado: true`. Su estilo está en el CSS desde el lab 08.

### Campos de los formularios

En cada campo, el `id` y el `name` son iguales, y el `<label>` tiene un `for`
con ese mismo nombre.

**Formulario de inscripción, pedido o solicitud (`#formulario`):**

| Proyecto | Campos (`id` y `name`) |
|---|---|
| Eventos | `nombre` (text), `correo` (email), `evento` (select), `acompanantes` (number) |
| Tienda | `nombre` (text), `telefono` (tel), `producto` (select), `cantidad` (number), `comentarios` (textarea) |
| Servicios | `nombre` (text), `correo` (email), `servicio` (select), `fecha` (date), `descripcion` (textarea) |

**Formulario para agregar (`#formulario-agregar`, desde el lab 08).** Sus
campos se llaman igual que las propiedades de una tarjeta en el array. No
chocan con los del otro formulario:

| Campo (`id` y `name`) | Tipo | Eventos | Tienda | Servicios |
|---|---|---|---|---|
| `titulo` | text | Nombre del evento | Nombre del producto | Oficio |
| `texto` | text | Fecha | Descripción | Descripción |
| `detalle` | text | Lugar | Precio | Horario |
| `disponibles` | number | Cupos | Unidades disponibles | Turnos por semana |
| `destacado` | checkbox | Destacado | Destacado | Destacado |

El `id` de la tarjeta no es un campo: lo calcula JavaScript.

Las opciones del `select` tienen como `value` el mismo texto del título de
cada tarjeta. Cuando se agrega una tarjeta, `agregarOpcion` suma su opción al
`select` (reto del lab 09).

- **Hasta el lab 07** la página dice: «Este formulario todavía no guarda ni
  envía datos.»
- **Desde el lab 08** dice: «Este formulario es una simulación: no guarda ni
  envía datos.» El resumen que muestra `#mensaje` dice siempre «Es una
  simulación: no se envió nada.» **Nunca** debe decir «enviado» ni
  «recibimos».

### Clases de los mensajes

Desde el lab 10, `mostrarMensaje` pone la clase `mensaje-ok` o
`mensaje-error`, que cambian el color. El color nunca va solo: cada mensaje
empieza con palabras («Listo.», «No se agregó la tarjeta:») y dice qué
hacer.

---

## Laboratorios con JavaScript (labs 05 a 10)

### Cómo se conecta el JavaScript

Basta con agregar el archivo a `"archivos"` en `lab.json`:

```json
"archivos": [
  { "nombre": "index.html",  "etiqueta": "HTML", "principal": true },
  { "nombre": "estilos.css", "etiqueta": "CSS" },
  { "nombre": "app.js",      "etiqueta": "JS" }
]
```

El HTML lo enlaza en el `<head>`, siempre de la misma forma:

```html
<script src="app.js" defer></script>
```

`defer` hace que el código se ejecute cuando la página ya cargó. Así
`document.getElementById("lista-tarjetas")` encuentra el elemento.
`revisar_labs.py` avisa si a un HTML le falta esa línea.

### Dónde se ve el resultado

- **El cuadro «Resultado» no ejecuta JavaScript.** Se vuelve a armar con cada
  tecla. Con código a medio escribir llenaría la consola de errores, y un
  bucle que nunca termina congelaría el editor. En los labs con JS, una nota
  lo avisa.
- **La pestaña nueva sí lo ejecuta.** El botón **Abrir vista previa en
  pestaña nueva** guarda el código JS del editor como un archivo temporal del
  navegador (una dirección `blob:`). El `<script src="app.js" defer>` pasa a
  apuntar ahí. Por eso `defer` funciona igual que con un archivo de verdad, y
  los errores de la consola dicen la misma línea que el editor.
- La regla de seguridad de esa pestaña solo deja ejecutar esos archivos
  temporales. Un `<script>` escrito dentro del HTML o un `onclick` siguen
  bloqueados. En los labs sin JS, la pestaña sigue sin ejecutar nada.
- En los labs 05 y 06 todo se revisa con `console.log` en la consola de esa
  pestaña (F12 > Consola). La primera tarea de cada uno explica cómo abrirla.

### Formularios en la pestaña nueva: la recarga simulada

Un formulario que se envía sin `evento.preventDefault()` recarga la página.
La tarea 1 del lab 09 muestra justamente eso. Pero la pestaña nueva no puede
enviar formularios de verdad: su regla de seguridad lo impide
(`form-action 'none'`), y una dirección `blob:` no se puede pedir con los
datos del formulario.

Por eso, en los labs con JavaScript, el sitio agrega a la pestaña nueva un
script propio y pequeño: `simularEnvioDeFormularios`, en
`assets/js/laboratorio.js`. Ese script escucha `submit` en `window`, es decir,
después de los listeners del formulario. Si nadie llamó a `preventDefault()`,
recarga la página. Se pierde lo que había cambiado, igual que al enviar un
formulario de verdad. En la consola deja el mensaje «El formulario se envió
sin preventDefault(): la página se recarga.», que se ve si está activo
«Conservar registro» (Preserve log).

Los archivos temporales de la pestaña nueva se liberan cuando se vuelve a
pulsar el botón, ya no al minuto. Así la persona puede recargar esa pestaña
con F5, por ejemplo en el reto de `localStorage` del lab 10.

### Datos de las tarjetas

En los tres proyectos, cada tarjeta es un objeto con las mismas propiedades.
Se llaman como las clases del HTML, así el mismo código sirve para todos:

```js
{
  id: 1,                                      // desde el lab 08: va en data-id
  titulo: "Concierto de música andina",       // va en .tarjeta-titulo
  texto: "Sábado 6 de diciembre, 7:00 p. m.", // va en .tarjeta-texto
  detalle: "Parque principal",                // va en .tarjeta-detalle
  disponibles: 40,                            // desde el lab 08: número, va en .tarjeta-disponibles
  destacado: true                             // booleano del reto del lab 05
}
```

Son las mismas 6 tarjetas ficticias del HTML de los labs 03 y 04. En cada
proyecto, 2 tienen `destacado: true`.

- **`id`:** un número del 1 al 6. Una tarjeta nueva recibe
  `tarjetas.length + 1`. Como `data-id` siempre es texto, se compara con
  `Number(...dataset.id)`.
- **`disponibles`:** según el proyecto, son cupos, unidades disponibles o
  turnos por semana. Existe para que el formulario para agregar tenga un
  número de verdad que convertir con `Number()` (lab 09), y donde usar `min`
  y `max` (lab 10).

### Nombres que reutiliza el Encuentro 4

El `app.js` del lab 07 trae estos nombres. El código del Encuentro 4 los va a
usar, así que **no los cambies**:

| Nombre | Qué es |
|---|---|
| `tarjetas` | El array con los datos de todas las tarjetas. |
| `crearTarjeta(tarjeta)` | Recibe un objeto y devuelve con `return` el HTML de una tarjeta, con la estructura del contrato. |
| `pintarTarjetas(lista)` | Junta el HTML de todas las tarjetas de `lista` y lo pone en `#lista-tarjetas` con `innerHTML`, una sola vez. |
| `contarTarjetas(lista)` | Devuelve cuántas tarjetas tiene `lista`. Viene del lab 06. |
| `contenedor` | El elemento `#lista-tarjetas` (tarea 2 del lab 07). |

Para agregar una tarjeta desde el Encuentro 4, basta con agregarla al array y
volver a llamar `pintarTarjetas(tarjetas)`.

### Nombres que reutiliza el Encuentro 5

El Encuentro 5 (depuración con DevTools) trabaja sobre el código de los labs
08 a 10. Estos nombres son los mismos en los tres proyectos. **No los
cambies:**

| Nombre | Desde | Qué es |
|---|---|---|
| `tarjetas`, `contarTarjetas`, `contenedor` | lab 07 | Siguen igual. |
| `crearTarjeta(tarjeta)` | lab 07 | Hasta la tarea 6 del lab 09 devuelve un texto con HTML. Desde ahí devuelve un `<article>` hecho con `createElement` y `textContent`, con la estructura del contrato. |
| `pintarTarjetas(lista)` | lab 07 | Pinta las tarjetas de `lista` en `#lista-tarjetas`. En el lab 08 también vuelve a poner `tarjeta-destacada`. Desde el lab 09 vacía el contenedor con `textContent = ""` y agrega cada tarjeta con `append`. |
| `crearElemento(etiqueta, clase, texto)` | lab 09 | Ayuda de `crearTarjeta`: crea un elemento con su clase y su texto. |
| `mensajeTarjetas`, `buscador`, `campoOpcion` | lab 08 | Los elementos `#mensaje-tarjetas`, `#buscador` y el `select` del formulario (`#evento`, `#producto` o `#servicio`). |
| `filtrarTarjetas(texto)` | lab 08 | Devuelve las tarjetas cuyo `titulo` contiene el texto, sin importar mayúsculas (`filter`, `includes`, `toLowerCase`). No cambia `tarjetas`. |
| `alEscribirBusqueda(evento)` | lab 08 | Listener de `input` del buscador: pinta las que coinciden y escribe cuántas son. |
| `buscarTarjetaPorId(id)` | lab 08 | Devuelve la tarjeta con ese `id` (número), con `filter(...)[0]`. |
| `alPulsarEnLista(evento)` | lab 08 | El único listener de clic de `#lista-tarjetas` (delegación). Con `closest(".tarjeta-boton")` y `data-id` sabe qué tarjeta se pulsó. Elige su opción en `campoOpcion` y le pone el foco. |
| `formularioAgregar`, `mensajeAgregar`, `formulario`, `mensaje` | lab 09 | Los elementos de los dos formularios y sus mensajes. |
| `alAgregarTarjeta(evento)` | lab 09 | Listener de `submit` de `#formulario-agregar`: lee los campos, hace `push`, vuelve a pintar y limpia con `reset()`. En el lab 10 también valida. |
| `agregarOpcion(titulo)` | lab 09 | Agrega una `<option>` al `select`, para que el botón de una tarjeta nueva también funcione. |
| `alEnviarFormulario(evento)` | lab 09 | Listener de `submit` de `#formulario`: muestra el resumen de la simulación con `textContent`. En el lab 10 también valida. |
| `registros` | lab 10 | Array en memoria con los envíos válidos de `#formulario`. Se vacía al recargar. |
| `mostrarMensaje(elemento, tipo, texto)` | lab 10 | Escribe un mensaje y le pone la clase `mensaje-ok` o `mensaje-error`. |
| `existeTitulo(titulo)` | lab 10 | Dice si ya hay una tarjeta con ese título (`filter` y `length`). Es el nombre que usa la solución de referencia; la tarea 4 se puede resolver sin esta función. |
| `"tarjetas-agregadas"` | lab 10 | Clave de `localStorage` del reto. |

### Seguridad: innerHTML

`innerHTML` convierte un texto en HTML.

- **En los labs 07 y 08** se usa porque los datos son propios del archivo
  `app.js`: nadie de afuera los escribe.
- **En el lab 09** los datos vienen del formulario. Por eso la tarea 5 hace
  ver el riesgo: se agrega una tarjeta llamada `<h1>Hola</h1>`, y con
  `innerHTML` aparece como un título. Las instrucciones usan solo etiquetas
  inofensivas como `<h1>` o `<b>`.
- **En la tarea 6 del lab 09** `crearTarjeta` cambia a `createElement` y
  `textContent`, y entonces `<h1>Hola</h1>` se ve como texto.
- Desde ahí, los datos que escribe la persona **nunca** pasan por
  `innerHTML`. Lo único que queda es `contenedor.textContent = ""` para
  vaciar la lista, y no lleva datos.

### Validación

En el lab 10 la validación se hace en dos lugares:

- **El navegador:** con `required`, `type="email"`, `min`, `max` y
  `maxlength`, frena el envío y muestra su propio mensaje.
- **JavaScript:** rechaza los nombres que solo tienen espacios (`trim`), un
  título repetido y el mismo correo (o teléfono, en la tienda) con la misma
  opción (`filter` y `length`).

> **La validación del navegador ayuda a la persona, pero no protege un
> servidor.** Cualquiera puede saltarla, por ejemplo con DevTools. Si algún
> día los datos van a un servidor, el servidor debe revisarlos otra vez. El
> código de inicio del lab 10 tiene el mismo aviso en un comentario.

### Temas de cada laboratorio

- **Lab 05:** `let`, `const`, textos, números, booleanos, `typeof`, arrays
  (índice y `length`), objetos con punto y array de objetos.
- **Lab 06:** declarar y llamar funciones, parámetros, `return`, funciones
  flecha, `for...of` y `forEach`. El reto presenta `if`.
- **Lab 07:** `getElementById`, `querySelector`, `textContent`, `classList`,
  plantillas literales e `innerHTML`. La tarea 6 usa `querySelectorAll` y la
  posición que da `forEach`.
- En los labs 05 a 07 no se usan eventos, formularios, `map`, `filter`,
  `reduce`, clases, módulos ni `fetch`. Todo se ejecuta al cargar la página.
- **Lab 08:** `addEventListener`, `click`, `input`, el objeto del evento,
  `event.target`, `closest`, `data-*`, `filter`, `includes`, `toLowerCase` y
  delegación. También aparecen `Number()` (para leer `data-id`), `focus()` y
  `else if`.
- **Lab 09:** `submit`, `preventDefault`, `.value` (y `.checked` en la
  casilla), `Number()`, `push`, volver a pintar, `reset()`, el riesgo de
  `innerHTML`, `createElement`, `textContent` y `append`.
- **Lab 10:** `required`, `type="email"`, `min`, `max`, `maxlength`, `trim`,
  `filter` y `length` para encontrar repetidos, `&&` y mensajes con texto.
  El reto usa `localStorage`, `JSON.stringify` y `JSON.parse`.
- En los labs 08 a 10 no se usan `fetch`, servidores, `map`, `reduce`,
  clases, módulos ni frameworks. `localStorage` solo aparece en el reto del
  lab 10.

### Archivos de inicio

- **Labs 05 y 06:** el resultado del lab 04. El HTML es el mismo: solo cambia
  el comentario de arriba y se agrega el `<script>`. El CSS queda ordenado
  por secciones, con el menú en fila, la cuadrícula y las `@media`.
- **Lab 07:** el mismo HTML, pero `#lista-tarjetas` está vacío. El CSS es el
  mismo de los labs 05 y 06. El `app.js` trae el array completo.
- **Lab 08:**
  - **HTML:** el del lab 07, más el buscador, `#mensaje-tarjetas`, el
    formulario para agregar, la zona de práctica y los botones
    `type="submit"`.
  - **CSS:** el del lab 07, con `.tarjeta-destacada` y estilos para las
    partes nuevas.
  - **app.js:** la solución del lab 07, con `id`, `disponibles` y el botón en
    cada tarjeta, sin listeners.
- **Lab 09:** la solución del lab 08, sin la zona de práctica.
- **Lab 10:** la solución del lab 09, con el reto incluido (`agregarOpcion`).
  El HTML todavía no tiene `required`, `min`, `max` ni `maxlength`: eso lo
  agregan las tareas 1 y 2.

---

## Tabla de casos de prueba

Un laboratorio puede mostrar, debajo del editor y del resultado, una tabla
para planear y anotar pruebas. Hoy la usa el lab 10. Se activa con el bloque
opcional `"casos"` en su `lab.json`:

```jsonc
"casos": {
  // Texto de arriba de la tabla. Puede llevar <code>, como las tareas.
  "instrucciones": "Prueba cada caso en la pestaña nueva...",

  // Una fila por caso, en el orden en que se muestran.
  "filas": [
    {
      // Corto, único y sin espacios. Sirve para guardar lo que escribe la
      // persona: no lo cambies después de publicar.
      "id": "agregar-vacio",
      // Qué se prueba. Puede llevar <code>.
      "caso": "Agregar tarjeta: nombre vacío",
      // Qué escribir para probarlo. Puede llevar <code>.
      "entrada": "En el nombre, escribe solo espacios."
    }
  ]
}
```

- **Columnas:** son siempre cuatro. Caso y Entrada sugerida vienen de
  `lab.json`. **Resultado esperado** y **Resultado observado** las escribe la
  persona.
- **Guardado:** se guarda en el navegador, por laboratorio, junto al avance
  de las tareas, con la clave `laboratorios:<id del lab>:casos`. **Volver al
  código inicial** no la borra.
- **Descarga:** **Descargar mi trabajo** baja además `casos-de-prueba.html`,
  una tabla que se puede abrir e imprimir. Lo que escribió la persona va
  escapado: si escribe etiquetas, se ven como texto.
- **En celular:** cada fila se ve como una ficha, con el nombre de cada
  columna encima de su valor.
- **Revisión:** `revisar_labs.py` revisa que cada fila tenga `id`, `caso` y
  `entrada`, y que los `id` no se repitan.
- **Labs sin `"casos"`:** no muestran la tabla y no cambian.

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

El editor pinta de colores el HTML, el CSS y el JavaScript, parecido a Visual
Studio Code: etiquetas, atributos, valores, comentarios, selectores,
propiedades, números, palabras clave de JS (`let`, `function`, `return`...)
y textos entre comillas, también en las plantillas literales.
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
- **El cuadro «Resultado» no ejecuta JavaScript ni envía formularios.** Los
  formularios de ejemplo son solo de práctica: no guardan ni envían datos.
  La vista previa en pestaña nueva ejecuta JavaScript solo en los labs que
  tienen un archivo `.js`, y solo ese archivo.
- **La pestaña nueva se puede recargar con F5** mientras el laboratorio siga
  abierto. Si cierras el laboratorio o vuelves a pulsar el botón, la página
  anterior ya no se puede recargar: pulsa el botón otra vez.
- **Los formularios de la pestaña nueva no envían nada.** Si el código no
  llama a `preventDefault()`, el sitio recarga la página para imitar un envío
  (ver «Formularios en la pestaña nueva»). Con los archivos descargados, el
  navegador sí envía el formulario a la misma página y la recarga.
- **`localStorage` de la pestaña nueva es el del sitio.** Lo que guarda el
  reto del lab 10 (`"tarjetas-agregadas"`) queda en el mismo navegador y para
  la misma dirección que el avance de los laboratorios. No los mezcla porque
  usa otra clave. Se borra con
  `localStorage.removeItem("tarjetas-agregadas")` en la consola de esa
  pestaña.
- **La pestaña nueva es una foto del código.** Muestra el código del momento
  en que se pulsó el botón. Si la persona cambia el código, debe pulsar el
  botón otra vez. Si el navegador bloquea las ventanas emergentes, la página
  lo avisa debajo del botón.
- **HTML, CSS y JS.** El editor acepta un archivo HTML principal, archivos
  CSS y archivos JS. Los CSS se conectan a la vista previa solo si el HTML
  los enlaza con `<link ... href="nombre.css">`. Los JS, solo si el HTML los
  enlaza con `<script src="nombre.js" defer>`.
- **La descarga del trabajo.** Sin JavaScript es un solo archivo HTML, con el
  CSS dentro de una etiqueta `<style>`. Con JavaScript se descargan los
  archivos por separado (`index.html`, `estilos.css` y `app.js`), iguales a
  los del editor. Si el laboratorio tiene tabla de casos, se agrega
  `casos-de-prueba.html`. El navegador puede pedir permiso una vez para
  descargar varios archivos. Los archivos de inicio siempre se descargan por
  separado.
- **El editor no es VS Code.** Pinta colores, muestra números de línea y
  maneja Tab, pero no autocompleta, no cierra etiquetas solo y no marca
  errores. Si el código tiene un error, los colores pueden verse raros; el
  código no cambia.
- **El tema se guarda en un solo navegador**, igual que el avance.
