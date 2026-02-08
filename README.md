# PPTX Reader — View PowerPoint in your Browser 🎉

[![GitHub Pages](https://img.shields.io/static/v1?label=pages&message=live&color=brightgreen)](https://verhaje.github.io/pptx-web/) [![Deploy](https://github.com/verhaje/pptx-web/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/verhaje/pptx-web/actions/workflows/deploy-pages.yml)

Fast, private, and easy — open .pptx files right in your browser (no uploads, no server required). Drag-and-drop a file and view your slides instantly. ⚡️

Why use PPTX Reader
- **Private:** Everything runs locally in your browser — your files never leave your machine. 🔒
- **Lightweight:** No heavy dependencies; built for speed and simplicity. 🚀
- **Easy:** Drag & drop or open a file and start viewing immediately. 🖱️

Highlights
- Renders text, shapes, tables, and basic themes
- Smooth slide navigation and responsive layout
- Modular code (parsers & renderers) — easy to extend

Quick start — Open locally (recommended for end users)
1. Open the project folder in your browser or start a simple static server.

Example (Python built-in server):
```powershell
python -m http.server 8080
```
Then open http://localhost:8080 in your browser and drop a `.pptx` file into the viewer. 👍

Developer quickstart
- Install dev dependencies (only needed if you're building or developing):
```powershell
npm install
```
- Run the dev watcher:
```powershell
npm run dev
```
- Build production bundle:
```powershell
npm run prod
```
The production build generates `index.prod.html` and `dist/` assets.

Usage tips
- Drag and drop a `.pptx` file onto the page, or use the file picker. 📂
- If slides look different across browsers, try a different browser or install matching system fonts. 🎨

Project layout (short)
- `index.html` — development entry (unminified)
- `index.prod.html` — production entry (uses `dist/` assets)
- `dist/` — generated bundles after `npm run prod`
- `js/` — parsers, renderers, and UI code
- `css/` — styling for the viewer

Got feedback or want to contribute?
- Open an issue or submit a pull request — contributions are welcome. 🙌

License
- MIT — see `package.json` for details.

Enjoy PPTX Reader! If it helped you, share it with a colleague. 🙂
