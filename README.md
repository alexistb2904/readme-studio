<div align="center">

# README Studio

**Build a GitHub profile README that feels like you - visually, locally, and without an account.**
<img width="1901" height="905" alt="image" src="https://github.com/user-attachments/assets/88c74ce4-ed27-4a2f-9268-b7810a212259" />
<img width="1908" height="904" alt="image" src="https://github.com/user-attachments/assets/229ec399-8f3b-4905-96c6-7d2f658a547f" />

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-2ea44f.svg)](LICENSE)

</div>

README Studio is a local-first visual editor for creating polished GitHub profile READMEs. Assemble components with drag and drop, customize their content, inspect the GitHub-style preview, then copy or download the generated Markdown.

No account, backend, or project database is required.

## Why README Studio?

- **Visual workflow:** compose a profile with a palette, sortable canvas, contextual inspector, and live preview.
- **30 GitHub-ready components:** from hero banners and tech stacks to activity graphs and repository cards.
- **Useful starting points:** 5 complete templates and 6 coordinated themes.
- **Large technology catalogue:** more than 400 languages, frameworks, databases, cloud platforms, tools, and creative apps.
- **Multilingual:** English, French, and Spanish interfaces and generated content.
- **Responsive preview:** switch between desktop/mobile and GitHub light/dark modes.
- **Portable projects:** import or export project configuration as JSON copy or download the final `README.md`.
- **Local-first:** projects and custom templates are stored in the browser with `localStorage`.

## Generated component examples

The editor produces regular Markdown and GitHub-supported HTML. For example, a hero and a technology badge can be exported as:

```html
<div align="center">
  <h1>Hi, I’m Alex 👋</h1>
  <p><strong>Full-stack developer</strong></p>
</div>

## Tech stack

<img
  src="https://cdn.simpleicons.org/react"
  alt="React"
  width="42"
  height="42"
/>
```

A GitHub statistics component produces an image integration that remains configurable in the inspector:

```html
<div align="center">
  <img
    src="https://github-stats-extended.vercel.app/api?username=your-username&show_icons=true&hide_border=true"
    alt="GitHub statistics"
  />
</div>
```

## Local development

### Requirements

- Node.js 20.19+ (Node.js 22 LTS recommended)
- npm 10+

### Setup

```bash
git clone https://github.com/alexistb2904/readme-studio.git
cd readme-studio
npm ci
npm run dev
```

Open the local URL printed by Vite.

### Quality checks

```bash
npm test
npm run build
npm run check
npm audit
```

`npm run check` runs the test suite and a production build, matching the main CI job.

## Deployment

Create the optimized static build with:

```bash
npm run build
npm run preview
```

The generated `dist/` directory can be served by a static host. The app uses `base: './'` hosts must also redirect client-side routes to `index.html` for direct navigation to `/projects/...` URLs.

## License

Distributed under the [MIT License](LICENSE).

---

<div align="center">
Made with care by <a href="https://github.com/alexistb2904">Alexis Thierry-Bellefond</a>.
</div>
