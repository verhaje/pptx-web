# Pptx_reader

A lightweight, client-side PPTX (PowerPoint) viewer that runs in the browser.

## Features

- Open and render `.pptx` files locally (no server upload required)
- Slide navigation UI
- Extracts and renders common content types:
  - text
  - shapes
  - tables
  - basic theme/style information

## Quick start

1. Install dependencies (only needed for building/minifying):

```bash
npm install
```

2. Run in development mode:

- Option A: open `index.html` directly in your browser
- Option B: serve the folder with any static server (recommended)

If you want a simple local server, you can use any of these:

```bash
# Python
python -m http.server 8080

# Node (if you have it)
npx serve .
```

Then open `http://localhost:8080`.

## Build (production)

Create minified assets in `dist/`:

```bash
npm run build
# or
npm run prod
```

Use `index.prod.html` for production deployments (it references the minified assets).

## Watch (development)

Rebuild automatically on changes:

```bash
npm run watch
# or
npm run dev
```

## Project structure

- `index.html` — development entry (unminified sources)
- `index.prod.html` — production entry (minified `dist/` assets)
- `js/` — parsers, renderers, and UI logic
- `css/` — stylesheets
- `scripts/` — build/minify/watch pipeline

## Notes

- This is a browser-based viewer; behavior can vary slightly across browsers depending on ZIP/XML parsing and font availability.

## License

MIT (see `package.json`).
