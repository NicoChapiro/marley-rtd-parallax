# Marley Coffee Ready to Drink Parallax

Landing page estática responsive en HTML, CSS y JavaScript vanilla para la línea Marley Coffee Ready to Drink Chile. La experiencia traduce la referencia de campaña a secciones reales con capas, parallax, placeholders CSS y assets opcionales.

## Workflow principal: Vercel

Vercel es el flujo principal de preview y despliegue para esta landing estática.

### Producción

- **Rama de producción:** `main`
- **URL de producción:** https://marley-rtd-parallax.vercel.app/
- Los cambios deben llegar a producción mediante merge a `main` después de revisar y aprobar el Preview Deployment de Vercel.

### Preview deployments

- Cada pull request o rama distinta de `main` debe generar un **Vercel Preview Deployment**.
- Usa la URL de preview de Vercel para hacer QA antes de mergear.
- Mergea a `main` solo después de que el preview haya sido revisado y aprobado.

### Configuración del sitio estático en Vercel

Configura el proyecto en Vercel con estos valores:

| Setting | Value |
| --- | --- |
| Framework preset | `Other` / `Static HTML` |
| Build command | leave empty / blank |
| Output directory | `.` |
| Install command | leave empty / blank |

Do not type `none` into Vercel command fields. Leave Build Command and Install Command empty so Vercel skips those steps for this static HTML/CSS/JS site.

## Tipografías oficiales

Los archivos de tipografía oficial deben subirse manualmente a `./assets/fonts/`. Codex no debe agregar archivos binarios de fuentes salvo aprobación explícita.

Archivos esperados:

- `FestivoLettersNo1-Regular.otf`
- `GT-Pressura-Mono-Regular.otf`
- `GT-Pressura-Mono-Bold.otf`

Si las fuentes no cargan, revisa DevTools → Network → Font para detectar errores 404 o nombres de archivo incorrectos. Si las fuentes no están disponibles, el sitio usa fallbacks de Helvetica / Arial Black / Courier New para mantener la landing funcional. Después de subir las fuentes, repite el QA en desktop y mobile porque las métricas de fuente pueden cambiar el layout.

## QA antes de mergear

Revisa la URL de Vercel Preview antes de mergear a `main`:

- [ ] Layout desktop en 1280px, 1440px y 1920px.
- [ ] Layout mobile en 320px, 375px, 390px y 430px.
- [ ] Parallax smoothness.
- [ ] No hay elementos cortados o croppeados accidentalmente.
- [ ] No hay scroll horizontal en mobile ni desktop.
- [ ] No hay errores en consola.
- [ ] Los assets de producto cargan correctamente.
- [ ] `prefers-reduced-motion: reduce` desactiva animaciones/parallax y deja el contenido visible.
- [ ] Los links de CTA funcionan: “Comprar ahora”, “Ver sabores” y “Comprar Ready to Drink”.
- [ ] Claims revisados antes de producción.
- [ ] Vercel Preview generado y listo para revisión visual antes de mergear.
- [ ] La página conserva rutas relativas para CSS, JavaScript e imágenes opcionales.
- [ ] La experiencia sigue funcionando si faltan assets opcionales gracias a placeholders CSS.

### Notas de QA de producción

- Los CTA apuntan a `https://www.marleycoffee.cl/cafe/bebidas-preparadas/ready-to-drink`.
- La landing debe revisarse con consola abierta para confirmar que no existan errores JavaScript.
- Para validar assets opcionales faltantes, renombra temporalmente uno de los archivos bajo `./assets/rtd/` en una copia local y recarga la página; debe aparecer el placeholder CSS sin romper el layout.
- Para validar movimiento reducido, activa la emulación de `prefers-reduced-motion: reduce` en DevTools o en el sistema operativo antes de recargar la página.


## Checklist de lanzamiento a producción

Antes del lanzamiento comercial final, usa Vercel como flujo primario y completa esta revisión sin rediseñar la página:

- [ ] **URL de producción en Vercel:** abrir `https://marley-rtd-parallax.vercel.app/` y confirmar que corresponde a la versión aprobada para lanzamiento.
- [ ] **Preview de Vercel antes de futuros merges:** revisar y aprobar el Vercel Preview Deployment de cada PR antes de mergear a `main`.
- [ ] **QA desktop:** revisar 1280px, 1440px y 1920px.
- [ ] **QA mobile:** revisar 320px, 375px, 390px y 430px.
- [ ] **Consola:** confirmar que no existan errores JavaScript ni errores de carga inesperados.
- [ ] **Scroll horizontal:** confirmar que no exista scroll horizontal en desktop ni mobile.
- [ ] **Links de CTA:** validar “Comprar ahora”, “Ver sabores” y “Comprar Ready to Drink”.
- [ ] **Movimiento reducido:** confirmar que `prefers-reduced-motion: reduce` mantiene el contenido visible y desactiva animaciones/parallax.
- [ ] **Fallback opcional de assets:** confirmar que los placeholders CSS sigan funcionando si faltan imágenes opcionales.
- [ ] **Validación de claims/legal:** confirmar aprobación legal, nutricional y/o regulatoria de los claims comerciales antes de producción.
- [ ] **Aprobación final de stakeholders:** registrar aprobación final de marca, marketing, legal/regulatorio y equipo responsable del lanzamiento.

## Validación de claims comerciales

Los siguientes claims permanecen en la landing, pero deben contar con aprobación legal, nutricional y/o regulatoria antes del lanzamiento comercial final:

- “Sin sellos”
- “7 ingredientes”
- “Apto para deportistas”
- “Equivalente a 1 espresso”

No elimines estos claims de la página durante esta etapa; solo deben avanzar a producción cuando la revisión comercial correspondiente confirme que pueden publicarse.

## Handoff de assets finales

Sube manualmente los assets reales a `./assets/rtd/` cuando estén aprobados. No cargues imágenes a través de Codex ni agregues binarios al repositorio salvo aprobación explícita.

Assets esperados y especificaciones recomendadas:

- **Latas de producto:** PNG transparente, recortado limpio, con sombra/reflejo solo si viene aprobado desde diseño.
- **Lifestyle:** JPG o WebP optimizado, con encuadre suficiente para desktop y mobile.
- **Hielo foreground:** PNG transparente para capas frontales de hielo.
- **Splash/frost:** PNG transparente o fallback CSS si no hay arte final aprobado.
- **Montaña/background opcional:** JPG o WebP optimizado, solo si existe asset final aprobado.
- **Compresión:** comprimir todas las imágenes antes de subirlas para mantener buena carga inicial y evitar archivos innecesariamente pesados.
- **Nombres:** mantener exactamente los nombres documentados en `./assets/rtd/README.md`; no cambiar rutas ni referencias si se usan esos nombres.
- **Carga manual:** subir los archivos de imagen manualmente, no mediante Codex, a menos que exista aprobación explícita.

### QA después de subir imágenes finales

Después de cargar assets reales, revisa nuevamente la landing completa:

- [ ] Revalidar todos los breakpoints desktop y mobile.
- [ ] Confirmar crop, escala y posición de cada producto.
- [ ] Revisar tamaño de archivo y compresión de cada imagen.
- [ ] Validar comportamiento de carga en red normal y red lenta simulada.
- [ ] Confirmar jerarquía visual: titulares, latas, CTA y fondos deben mantener prioridad clara.
- [ ] Confirmar que los placeholders/fallbacks CSS sigan funcionando si alguna imagen opcional falla o no está disponible.

## GitHub Pages opcional / fallback

GitHub Pages queda documentado solo como alternativa de respaldo. El flujo primario para previews y producción es Vercel.

Este proyecto también puede publicarse como sitio estático en GitHub Pages desde una URL de repositorio como:

```txt
https://USUARIO.github.io/REPO/
```

Checklist de compatibilidad para GitHub Pages:

- `index.html` existe en la raíz del repositorio y es el documento de entrada que GitHub Pages sirve por defecto.
- Las rutas locales de CSS y JavaScript usan prefijo relativo: `./styles.css` y `./script.js`.
- Las imágenes opcionales se referencian con rutas relativas bajo `./assets/rtd/` mediante `data-src` y `data-bg-src`.
- No se requieren rutas absolutas del tipo `/archivo` o `/assets/...`, por lo que la landing funciona correctamente cuando el sitio se sirve desde el subdirectorio `/REPO/` de GitHub Pages.

### Activar GitHub Pages como fallback

1. Sube estos archivos a la rama `main` del repositorio.
2. En GitHub, abre **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Elige la rama **main**.
5. En **Folder**, elige **/ (root)** / repository root.
6. Guarda la configuración y espera a que GitHub Pages publique el sitio.
7. Abre la URL publicada con el formato `https://USUARIO.github.io/REPO/` y verifica que carguen estilos, JavaScript y placeholders/imágenes.

## Estructura visual

- Hero con montaña fría, badge “Nuevo”, CTA destacado, señales de hielo y tres latas flotantes.
- Sección hielo / ritual con la secuencia “Agita, abre y disfruta”.
- Tres secciones independientes para Vanilla Latte, Cappuccino y Caramel; cada una usa una sola lata flotante.
- Sección lifestyle cinematográfica con fondo opcional y lata superpuesta.
- Cierre amarillo con rasta stripe, beneficios tipo sticker y CTA final como cierre fuerte de campaña.

## Assets esperados

Sube manualmente los assets reales a `./assets/rtd/` con estos nombres exactos:

```txt
hero-mountain-bg.jpg
lifestyle-caramel.jpg
ice-foreground.png
ice-splash.png
rtd-cappuccino-250ml.png
rtd-vainilla-latte-250ml.png
rtd-caramel-250ml.png
beans-cluster.png
rasta-ribbon.png
frost-texture.png
```

Mientras un asset no exista, el sitio mantiene la composición con gradientes, pseudo-elementos y placeholders CSS no binarios. Las latas usan un placeholder CSS hasta que el PNG correspondiente carga correctamente.

### Instrucciones de assets

- Las imágenes deben subirse manualmente a `./assets/rtd/`.
- No commitees assets binarios a través de Codex salvo aprobación explícita.
- No cambies las rutas si mantienes los nombres exactos.
- Si un asset tiene un encuadre distinto, ajusta `background-position`, `width` o `data-speed` en lugar de editar la imagen desde el repositorio.

## Ajustar parallax y movimiento

- Velocidad de scroll parallax: cambia `data-speed` en `index.html`. Valores positivos hacen que la capa se desplace con más profundidad; valores negativos funcionan bien para fondos lentos.
- Movimiento de mouse en escritorio: cambia `data-mouse` en las latas o capas decorativas.
- Zoom de fondos: ajusta las reglas `--scroll-progress` en `styles.css` para `.hero__photo` y `.lifestyle__bg`.
- Reveal al entrar en viewport: se controla con `IntersectionObserver` en `script.js` y las clases `.reveal` / `.is-visible`.

## Reemplazar placeholders por assets reales

1. Exporta los archivos finales con los nombres de la lista anterior.
2. Súbelos manualmente a `./assets/rtd/`.
3. No cambies las rutas si mantienes los nombres exactos.
4. Revisa la página en desktop y mobile para confirmar encuadres.
5. Si un asset tiene un encuadre distinto, ajusta `background-position`, `width` o `data-speed` en lugar de editar la imagen desde el repositorio.

## Previsualización local

Desde la raíz del repositorio:

```bash
python3 -m http.server 4173
```

Luego abre `http://localhost:4173/` en el navegador.
