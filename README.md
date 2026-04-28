# Portfolio — FerGv

Personal portfolio site built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com).

## Tech stack

- **Astro 5** — static site generation
- **Tailwind CSS 4** — utility-first styling via Vite plugin
- **DM Sans** — Google Fonts

## Project structure

```
src/
├── components/
│   ├── Nav.astro
│   ├── Hero.astro
│   ├── Stats.astro
│   ├── Experience.astro
│   ├── Projects.astro
│   ├── Skills.astro
│   └── Footer.astro
├── layouts/
│   └── Layout.astro
├── pages/
│   └── index.astro
└── styles/
    └── global.css
public/
├── icons/          # Tech stack SVG icons
└── profile-photo.jpg
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
npm run preview # preview the build locally
```

## Deployment

Deployed to **GitHub Pages** via GitHub Actions on every push to `main`. The workflow is defined in [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

Configure the repo: **Settings → Pages → Source → GitHub Actions**.
