# Musa Raza Zaidi: Portfolio

React 19 + Vite 8 + styled-components + three.js (@react-three/fiber).

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # output in ./build
npm run preview   # serve the production build
npm run lint
```

## Adding a project
1. Add a 16:9 WebP thumbnail (800x450) to `public/images/projects/`.
2. Add an entry to `projects` in `src/data/constants.js` (leave `webapp: ""` for private work).

Below-the-fold sections and the three.js canvases are lazy-loaded (`src/components/LazySection.jsx`).
