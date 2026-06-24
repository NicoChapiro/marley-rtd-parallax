# Marley Coffee Ready to Drink Parallax

Landing page estática responsive en HTML, CSS y JavaScript vanilla para la línea Marley Coffee Ready to Drink Chile.

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
- No se incluyen archivos binarios nuevos en el repositorio; si necesitas imágenes reales, súbelas manualmente respetando la estructura documentada abajo.

## Activar GitHub Pages

1. Sube estos archivos a la rama `main` del repositorio.
2. En GitHub, abre **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Elige la rama **main**.
5. Elige la carpeta **/root**.
6. Guarda la configuración y espera a que GitHub Pages publique el sitio.
7. Abre la URL publicada con el formato `https://USUARIO.github.io/REPO/` y verifica que carguen estilos, JavaScript y placeholders/imagenes.

> Nota: en la interfaz de GitHub Pages, la carpeta raíz puede mostrarse como `/ (root)`. Selecciona esa opción para publicar desde la raíz del repositorio.

## Estructura

```txt
.
├── index.html
├── styles.css
├── script.js
└── assets/
    └── rtd/
        ├── rtd-cappuccino-250ml.png
        ├── rtd-vainilla-latte-250ml.png
        ├── rtd-caramel-250ml.png
        ├── rtd-lifestyle-bg.jpg
        ├── beans-cluster.png
        ├── leaf-left.png
        ├── leaf-right.png
        ├── rasta-ribbon.png
        ├── kraft-texture.jpg
        ├── caramel-splash.png
        └── vanilla-flower.png
```

> Los archivos de imagen no se incluyen en este commit. Súbelos manualmente a `./assets/rtd/` con esos nombres. Mientras no existan, la landing usa gradientes y placeholders CSS no binarios para seguir funcionando.

## Archivos principales

- `index.html`: estructura semántica de hero, sabores, beneficios y CTA final.
- `styles.css`: sistema visual responsive, placeholders CSS, keyframes de flotación y estilos premium oscuros.
- `script.js`: carga progresiva de assets opcionales, parallax por scroll con `requestAnimationFrame`, mouse sutil en desktop y soporte `prefers-reduced-motion`.

## Ajustes rápidos

- Velocidad de parallax: cambia `data-speed` en elementos de `index.html`.
- Movimiento con mouse: cambia `data-mouse` en las latas/decorativos de `index.html`.
- Rutas de imágenes: mantén los assets en `./assets/rtd/` o actualiza `data-src` / `data-bg-src` en `index.html` conservando rutas relativas, por ejemplo `./assets/rtd/nombre.png`.

## Previsualización local

Desde la raíz del repositorio:

```bash
python3 -m http.server 4173
```

Luego abre `http://localhost:4173/` en el navegador.

Para simular una URL de proyecto de GitHub Pages, sirve el repositorio desde un subdirectorio y abre una ruta como `http://localhost:4173/REPO/`. Las rutas relativas con `./` seguirán resolviendo contra ese directorio.
