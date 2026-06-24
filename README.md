# Marley Coffee Ready to Drink Parallax

Landing page estática responsive en HTML, CSS y JavaScript vanilla para la línea Marley Coffee Ready to Drink Chile.

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
- Rutas de imágenes: mantén los assets en `./assets/rtd/` o actualiza `data-src` / `data-bg-src` en `index.html`.

## Previsualización local

Desde la raíz del repositorio:

```bash
python3 -m http.server 4173
```

Luego abre `http://localhost:4173/` en el navegador.

## Publicación en GitHub Pages

1. Sube los assets reales a `assets/rtd/`.
2. En GitHub, ve a **Settings → Pages**.
3. Selecciona la rama que contiene estos archivos y la carpeta raíz (`/`).
4. Guarda la configuración y espera a que GitHub Pages publique el sitio.

Las rutas usan prefijo relativo `./`, por lo que son compatibles con GitHub Pages en repositorios de usuario, organización o proyecto.
