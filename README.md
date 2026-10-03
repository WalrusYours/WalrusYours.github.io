# WALRUS landing page

A static site (plain HTML and CSS, no build) for GitHub Pages.

```
index.html   the page
style.css    near-black minimal theme
assets/      logo and favicon (copied from walrus-dashboard-client/public)
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
