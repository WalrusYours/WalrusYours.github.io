# WALRUS landing page

A static site (plain HTML and CSS, no build) for GitHub Pages.

```
index.html   the page
docs/        the documentation, served at /docs/: index.html (get started), schema.html, api.html
style.css    near-black minimal theme, shared by the page and the docs
assets/      logo, favicon, og.png (social card)
og/og.html   source of assets/og.png; regenerate with headless Chrome (command inside)
.nojekyll    tell Pages not to run Jekyll
.github/workflows/pages.yml   deploys on push to main
```

Preview locally by opening `index.html`, or `npx serve .`.

To publish: put this folder in its own repository (or the root of `WalrusYours/WalrusCore`
if it should live there), then in the repository settings choose Settings, Pages, Source:
GitHub Actions. The workflow does the rest. Asset paths are relative, so it works both at
`https://<org>.github.io/` and under a project path.

All GitHub links point at `https://github.com/WalrusYours/WalrusCore`; change them in
`index.html` if the repository moves.
