# A.D.G.B — Sitio web (rojo y negro, con modo claro · ES / EN / 中文)

Sitio estático, sin dependencias ni compilación. Funciona tal cual en **GitHub Pages**, gratis.

## Direcciones (una página real por cada una)

| Dirección                           | Archivo                  | Contenido                                                                       |
|-------------------------------------|--------------------------|---------------------------------------------------------------------------------|
| `adgb3264.github.io`                | `index.html`             | **Inicio**: "desarrollador independiente", las letras A D G B, Sobre mí y enlace a GitHub |
| `adgb3264.github.io/projects`       | `projects/index.html`    | Aviso "Próximamente" (todavía no hay proyectos publicados)                      |
| `adgb3264.github.io/more`           | `more/index.html`        | Tus redes sociales                                                              |
| (cualquier dirección que no exista) | `404.html`               | Página de error con el mismo diseño, menú, idiomas y pie                        |

Además: `favicon.svg`, `apple-touch-icon.png`, `og-image.png` (la imagen que aparece al compartir el enlace), `robots.txt`, `sitemap.xml` y la carpeta `fonts/` con las tipografías.

Al pasar de una página a otra aparece una cortina roja con una "A". Los enlaces viejos del tipo `adgb3264.github.io/#proyectos` redirigen solos a la página nueva.

## Cómo está hecho el diseño (consistencia)

Todas las páginas comparten **el mismo** `styles.css` y `script.js`, y repiten la misma estructura:

- **Cabecera** (logo, menú, idiomas, sonido, modo oscuro/claro) y **pie** (marca, páginas, redes), iguales en todas.
- **Cabecera de página** (`.page-head`): migas de pan, título grande y fondo animado.
- **Secciones** que alternan fondo negro → negro un poco más claro (`is-alt`). La **cinta** y el **bloque final** usan el "negro plomo" (`--surface-2`). El **blanco no se usa como color de fondo ni de botones**: queda solo para el texto (y para el modo claro, que activa el visitante).
- **Componentes únicos**: botón (`.btn`), etiqueta (`.chip`), tarjeta con marcas rojas en las esquinas (`.card`), cuadro con la A (`.tile`), cinta con el nombre (`.marquee`), bloque final (`.cta`).
- **Tipografía y espacios** salen de variables (`--fs-*`, `--sp-*`), así que todo mantiene el mismo ritmo.
- Los hovers solo se activan en dispositivos con mouse; en celular se usan efectos al tocar.

**Una sola A en todo el sitio:** es la letra A de **Chakra Petch Bold**, la misma de la A grande de la portada. En los cuadros, la cortina entre páginas, el favicon, `apple-touch-icon.png` y `og-image.png` es el contorno exacto de esa letra (SVG, `<symbol id="mark-a">`), así que queda **exactamente centrada** en cualquier pantalla y no depende de que la tipografía haya cargado. En los textos, la clase `.a` la pone siempre roja y en Chakra Petch Bold.

## Archivos compartidos

| Archivo      | Para qué sirve                                                                                       |
|--------------|------------------------------------------------------------------------------------------------------|
| `styles.css` | Colores, tipografía, componentes, páginas, animaciones y adaptación a celulares                      |
| `script.js`  | Traducciones ES/EN/中文, fondo animado de esferas y cuadros, cortina entre páginas, sonido, efectos |
| `fonts/`     | Las tipografías del sitio, alojadas aquí: no se pide nada a Google Fonts (ver "Tipografía")        |

## Publicar en GitHub Pages (gratis)

1. Tu repositorio debe ser **público** y llamarse exactamente `adgb3264.github.io`.
2. En el repositorio: **Add file → Upload files**. Arrastra **todo el contenido de esta carpeta, con sus subcarpetas** (`projects`, `more`, `fonts`, además de `index.html`, `404.html`, `styles.css`, `script.js`, `favicon.svg`, `apple-touch-icon.png`, `og-image.png`, `robots.txt`, `sitemap.xml` y este `README.md`). Pulsa **Commit changes**.
   Cada subcarpeta debe quedar con su `index.html` dentro: así `/projects`, `/more`, etc. funcionan.
   Los archivos con el mismo nombre se reemplazan; los de la versión anterior que ya no existan puedes borrarlos desde GitHub.
3. En **Settings → Pages**, deja *Deploy from a branch*, rama **main**, carpeta **/ (root)**.
4. Espera 1–2 minutos y abre tu dirección. Si ves la versión anterior, recarga con `Ctrl + Shift + R`.

## Personalizar

- **Colores:** al inicio de `styles.css`, en `:root`. Todo el sitio (y el fondo animado) los lee de ahí:

  ```css
  --black: #0a0a0a;
  --red: #e10600;      /* el rojo: único, igual en modo oscuro y claro */
  ```

  El texto usa `--fg` (blanco en modo oscuro, negro en modo claro). Los colores de cada modo están justo debajo: `:root` (oscuro) y `html[data-theme="light"]` (claro). **El rojo es el mismo en los dos modos** (`--red`); `--red-deep` solo se usa para sombras de las esferas y estados al apretar.
- **Modo oscuro / claro:** el botón con el sol / la luna, junto al del sonido, cambia todo el sitio. Arranca en **oscuro**, recuerda la elección del visitante en todas las páginas (`localStorage`, clave `adgb-theme`) y se aplica antes de pintar la página, así no hay parpadeo. El fondo animado y la etiqueta del botón (ES / EN / 中文) también se adaptan.
- **La A grande:** al pasar el mouse o tocar con el dedo la A (y las otras letras) de la portada, sube y brilla. La clase `is-hot` la pone `script.js`; el aspecto está en `.bl.is-hot` y `.bl--a.is-hot` de `styles.css`.
- **Las letras A D G B:** en `index.html`, dentro de `<h1 class="bigword">`. La A roja es `bl--a`.
- **El fondo de esferas y cuadros:** está dibujado en un `<canvas>` por la función `Scene` de `script.js`. Las esferas son siempre bolas rojas rellenas. Para más o menos esferas y cuadros cambia `nS` (esferas) y `nQ` (cuadros). La cuadrícula y las casillas que se encienden tienen los bordes difuminados, y el cursor deja una luz redonda y suave (sin cuadrados). Se pausa solo cuando no se ve.
- **Agregar otra red social:** en `more/index.html`, copia el bloque de GitHub dentro de `<div class="channels">` y cambia el enlace, el nombre y el texto. Cuando tengas varias redes, puedes borrar la tarjeta "Próximamente" (`channel--soon`). Agrega también el enlace en la columna "Redes" del pie de cada página.
- **Textos en español:** edítalos en el `.html` de cada página. **En inglés:** en el objeto `EN` de `script.js`. **En chino mandarín:** en el objeto `ZH` del mismo archivo. Todos usan la misma clave `data-i18n`; si cambias un texto, cambia también sus traducciones.
- **Tipografía:** Chakra Petch (títulos, cuadrada), IBM Plex Sans (texto) e IBM Plex Mono (etiquetas), más Noto Sans SC para el chino. **Todas se cargan desde la carpeta `fonts/` con `@font-face` (sección 0 de `styles.css`); el sitio ya no usa Google Fonts.** Archivos que espera el sitio:

  | Familia          | Archivos en `fonts/`                                                                              |
  |------------------|----------------------------------------------------------------------------------------------------|
  | Chakra Petch     | `chakra-petch-400.woff`, `chakra-petch-500.woff`, `chakra-petch-600.woff`, `chakra-petch-700.woff` |
  | IBM Plex Sans    | `ibm-plex-sans-300.woff`, `ibm-plex-sans-400.woff`, `ibm-plex-sans-500.woff`, `ibm-plex-sans-600.woff` |
  | IBM Plex Mono    | `ibm-plex-mono-400.woff` (también se usa para el peso 500)                                         |
  | Noto Sans SC     | `noto-sans-sc-400.woff`, `noto-sans-sc-700.woff` y las partes mínimas `noto-sans-sc-400-min.woff`, `noto-sans-sc-700-min.woff` |

  Los archivos están recortados al alfabeto latino (Chakra Petch e IBM Plex) para que pesen poco y están en formato WOFF. Si quieres cambiar de tipografía o de formato, edita los `@font-face` y las variables `--font-*` en `styles.css`.

  Las cuatro familias son de licencia libre (SIL OFL); sus licencias están en `fonts/` (`ChakraPetch-OFL.txt`, `IBMPlexSans-OFL.txt`, `IBMPlexMono-OFL.txt`). El chino está recortado a los caracteres que usa el sitio: si agregas texto chino con caracteres nuevos, el navegador usará una tipografía china del sistema para esos caracteres.
- **Dominio propio (opcional):** en *Settings → Pages → Custom domain*. Después cambia `adgb3264.github.io` por tu dominio en `sitemap.xml`, `robots.txt` y las etiquetas `canonical` / `og:url` de cada página.

## Notas

- El idioma se detecta según el navegador y se recuerda la elección del visitante (en todas las páginas).
- La pantalla de carga con "A.D.G.B" aparece solo la primera vez que se entra; después, entre páginas solo se ve la cortina roja.
- Respeta la preferencia de "reducir movimiento" del sistema: el fondo queda quieto y no hay cortina.
- Si JavaScript falla o tarda, el contenido se muestra igual (las animaciones tienen respaldo).
- Las tipografías se cargan desde `fonts/`, así que el sitio se ve igual sin conexión.
- **Abrir en tu computador:** haz doble clic en `index.html`; los enlaces a carpetas funcionan también sin internet.
- **Sonido:** el botón con el altavoz, junto a los idiomas, activa o desactiva un sonido corto al apretar botones y enlaces. Viene **desactivado** por defecto y recuerda la elección del visitante. Los sonidos se generan en el navegador, no hay archivos de audio.
- **Modo oscuro / claro:** el botón del sol / la luna está al lado del de sonido. Por defecto el sitio es oscuro (sin blanco salvo en el texto); la elección se recuerda en todas las páginas.
- **Celulares:** la cabecera se compacta con un menú desplegable (y los botones de sonido y tema se achican en pantallas muy angostas), los botones son más grandes para el dedo, se respetan las zonas con muesca, el fondo usa menos esferas y los efectos de "pasar el mouse" se reemplazan por efectos al tocar.
- **Accesibilidad:** enlace "Saltar al contenido", foco visible con teclado, contraste alto y etiquetas para lectores de pantalla.

## Capa avanzada

Está al final de `styles.css` (sección 7) y de `script.js` (bloque "Capa avanzada"):

- Grano de película, cortina con borde diagonal, cabecera que se esconde al bajar, cinta que se inclina con el scroll y títulos que se revelan como máscara.
- Cursor con un punto exacto y un aro redondo que lo sigue con suavidad (crece sobre enlaces y botones; no hay cuadros que lo sigan), tarjetas con foco de luz e inclinación 3D, botones magnéticos, letras de la portada con perspectiva y texto que se "descifra" en menú y botones.
- Luz del mouse: un halo rojo grande (`.cursor-glow`) que va por delante de todo, incluido el encabezado, y alumbra lo de abajo sin taparlo (`mix-blend-mode`).
- Efectitos: onda y chispas al hacer clic o tocar, brillo diagonal que cruza las tarjetas al pasar el mouse, línea del título que se dibuja al aparecer, la A del inicio "respira" con una luz, el cuadrito del logo gira, los enlaces del pie y las migas se subrayan en rojo, la cinta se detiene al pasar el mouse y la barra de progreso brilla.
- Separadores difuminados: los fondos de las secciones se funden con las vecinas y las líneas son una campana desenfocada (variables `--sep-line` y `--sep-glow` en `styles.css`).
- Todo se apaga solo con "reducir movimiento" y en pantallas táctiles.
