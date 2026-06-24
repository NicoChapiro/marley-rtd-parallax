# Marley Coffee Ready to Drink Parallax

Landing page estática responsive en HTML, CSS y JavaScript vanilla para la línea Marley Coffee Ready to Drink Chile. La experiencia traduce la referencia de campaña a secciones reales con capas, parallax, placeholders CSS y assets opcionales.

## Compatibilidad con GitHub Pages

Este proyecto está preparado para publicarse como sitio estático en GitHub Pages desde una URL de repositorio como:

```txt
https://USUARIO.github.io/REPO/
```

Checklist aplicado:

- `index.html` existe en la raíz del repositorio y es el documento de entrada que GitHub Pages sirve por defecto.
- Las rutas locales de CSS y JavaScript usan prefijo relativo: `./styles.css` y `./script.js`.
- Las imágenes opcionales se referencian con rutas relativas bajo `./assets/rtd/` mediante `data-src` y `data-bg-src`.
- No se requieren rutas absolutas del tipo `/archivo` o `/assets/...`, por lo que la landing funciona correctamente cuando el sitio se sirve desde el subdirectorio `/REPO/` de GitHub Pages.
- No se incluyen archivos binarios nuevos en este cambio; si necesitas imágenes reales, súbelas manualmente respetando la estructura documentada abajo.

## Activar GitHub Pages

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
