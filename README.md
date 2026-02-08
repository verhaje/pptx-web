# Pptx Reader — Instantly View PowerPoints in Your Browser

Beautiful. Fast. Private.

Pptx Reader is a lightweight, client-side PowerPoint viewer that opens `.pptx` files right in your browser — no uploads, no servers, and no fuss. Drag a file in and enjoy your slides instantly.

Why you'll love it
- Delightful: Slides render quickly with a clean, responsive UI so your content looks great.
- Private: Everything runs in your browser — your presentations never leave your machine.
- Lightweight: Built for speed and simplicity; no heavyweight dependencies.

Key features
- Open and render `.pptx` files locally (no server upload required)
- Smooth slide navigation and responsive viewer
- Extracts and renders common content: text, shapes, tables, and basic themes/styles
- Modular parsers and renderers so the viewer is easy to extend

Quick start (3 steps)

1. Install build tools (only required for building/minifying):

```bash
npm install
```

2. Run a local server and open the app:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Open `http://localhost:8080` and drop a `.pptx` file into the viewer.

Tip: For a production-ready bundle use `index.prod.html` which references minified assets.

Build for production

```bash
npm run build
# or
npm run prod
```

Development (watch mode)

```bash
npm run watch
# or
npm run dev
```

Project structure

- `index.html` — development entry (unminified sources)
- `index.prod.html` — production entry (minified `dist/` assets)
- `js/` — parsers, renderers, and UI logic
  - `parsers/` — PPTX/XML parsing utilities
  - `renderers/` — drawing and layout code
- `css/` — stylesheets for a polished viewer
- `scripts/` — build/minify/watch pipeline

Contributing and feedback

Found a bug or missing a feature you need? Open an issue or send a pull request — contributions are welcome. If you want a new renderer (e.g., advanced charts or animations), let's collaborate.

Notes

- This is a client-side viewer; rendering can vary slightly across browsers based on ZIP/XML parsing and available fonts.

License

MIT — see `package.json` for details.

Enjoyed Pptx Reader? Share it with a colleague and make someone's day a little simpler.
