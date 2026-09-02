# Portfolio

A one-page portfolio built with React + Vite and GSAP (ScrollTrigger).

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production / deploy:

```bash
npm run build
```

This outputs static files to `dist/` — drag that folder into Netlify,
Vercel, or any static host.

## What to customize before you ship this

1. **Your name and copy** — `src/components/Hero.jsx`,
   `src/components/About.jsx`, `index.html` (`<title>`, meta description).
2. **Projects** — `src/data/projects.js`. Keep it to 3–6 strong pieces;
   the horizontal rail is built for a short, curated list, not a dump.
3. **Contact links** — `src/components/Contact.jsx` (email, GitHub,
   LinkedIn).
4. **Colors / type** — all in `src/index.css` under `:root`. Change
   `--accent` and `--coral` first if you want a different feel; the
   type pairing is Fraunces (display) + Space Grotesk (body/UI), loaded
   from Google Fonts in `index.html`.

## How the two signature animations work

- **Hero headline decode** (`Hero.jsx`) — scrambles each line's
  characters and resolves them left to right on load, instead of a
  fade/slide-up. Runs once, respects `prefers-reduced-motion`.
- **Pinned horizontal project rail** (`Projects.jsx`) — on screens
  ≥800px, GSAP's ScrollTrigger pins the section and translates the
  track horizontally as you scroll vertically. Below 800px it falls
  back to a normal vertical stack (see the media query at the bottom
  of `App.css`) — no ScrollTrigger runs on mobile.

There's also a custom cursor (`Cursor.jsx`) that swells and labels
itself over anything with a `data-cursor="..."` attribute — it's
disabled automatically on touch devices.

## Notes

- No component library, no CSS framework — one hand-written
  stylesheet (`App.css`) plus tokens in `index.css`.
- Accessibility: focus-visible outlines are set, reduced-motion is
  respected, and the pointer-only cursor doesn't hide content from
  keyboard or touch users.
