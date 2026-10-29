# Solomough — Interactive Desk Portfolio

A dark, spatial portfolio concept built with Next.js, TypeScript, Tailwind CSS, React Three Fiber / Three.js, Drei and Framer Motion. The desk is rendered from actual 3D geometry (not a stock image), and each object opens a paginated portfolio book.

## Requirements

- Node.js 18.17+ (Node 20 LTS recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Create a production build with `npm run build`, then run it with `npm start`.

## Interactions

- Notebook: bio and project archive
- Laptop: engineering / Ark project details
- Phone: connected products and Ark Portal
- Camera: visual practice / photography
- Pen: process and 3D experiment
- Cup: working principles
- Click an object or use the object index below the desk.
- In the book: arrow buttons or keyboard left/right; Escape closes it.

## Project structure

```text
app/
  globals.css       Tailwind base + visual system
  layout.tsx        metadata and document shell
  page.tsx          landing layout and interactions
components/
  DeskScene.tsx     Three.js desk and 3D objects
  BookModal.tsx     paginated portfolio viewer
```

## Customize the content

Edit the `pages` array in `components/BookModal.tsx`. Keep claims aligned with what has actually shipped. The Ark Network and Ark Profile/Portal are described as work in progress / early-stage projects rather than completed products.

Replace the contact email in `app/page.tsx` if you want a different public inbox. Update the project links in `components/BookModal.tsx` when destinations change.

## Production notes

- The Three.js scene is dynamically imported with SSR disabled because WebGL requires a browser.
- `prefers-reduced-motion` is respected for CSS transitions; consider adding a reduced-motion mode to the Framer Motion and Three.js animation layer before launch.
- The scene uses procedural geometry and materials, so it does not depend on third-party textures or image licenses.
- The desk currently uses a fixed composition and restricted orbit controls to keep the overhead flat-lay framing intentional. Test on low-power Android devices and consider a static CSS fallback if WebGL is unavailable.
- Before public launch, add a real contact form only if you have a backend endpoint, confirm all public links, test keyboard focus and modal focus trapping, and run a Lighthouse/mobile pass.
