# gmi-lab-website

GMI Lab website at Great Bay University, built with Hugo.

## Local preview

Install Hugo 0.162.0 or later, then run:

```sh
hugo server --disableFastRender
```

Open http://localhost:1313/.

## Editing

- Homepage and captions: `content/_index.md`
- Research projects: `content/research/_index.md`
- Team members: `content/team/_index.md`
- Publications: `data/publications.json`
- Facility page: `content/facility/_index.md`
- Images and videos: `static/images/`
- Shared page templates: `layouts/`
- Styles: `static/css/site.css`

Some research videos and images stream from the original lab website.

## GitHub Pages

This repository is public. In Settings > Pages, **GitHub Actions** is selected as the source.

The deployment workflow runs on pushes to `main` and can also be started manually from Actions. It builds with the Pages base URL and canonicalizes site links for project-subdirectory hosting. The workflow publishes the built website; the source is available in this public repository.

Expected URL after a successful deployment:
https://jeffery-zhou.github.io/gmi-lab-website/

Do not include secrets or private-only documents in this public repository.
