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
| Build command | none |
| Output directory | `.` |
| Install command | none |

## QA antes de mergear

Revisa la URL de Vercel Preview antes de mergear a `main`:

- [ ] Layout desktop.
- [ ] Layout mobile.
- [ ] Parallax smoothness.
- [ ] No hay elementos cortados o croppeados accidentalmente.
- [ ] No hay errores en consola.
- [ ] Los assets de producto cargan correctamente.
- [ ] Los links de CTA funcionan.
- [ ] Claims revisados antes de producción.

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

- Hero con montaña fría, badge “Nuevo”, CTA y tres latas flotantes.
- Sección hielo / ritual con la secuencia “Agita, abre y disfruta”.
- Tres secciones independientes para Vanilla Latte, Cappuccino y Caramel; cada una usa una sola lata flotante.
- Sección lifestyle cinematográfica con fondo opcional y lata superpuesta.
- Cierre amarillo con rasta stripe, beneficios tipo sticker y CTA final.

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
