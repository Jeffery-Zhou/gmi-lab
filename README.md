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

Keep this repository **private**. In Settings > Pages, select **GitHub Actions** as the source. Private-repository Pages hosting requires a supported GitHub plan; do not make the repository public to work around this restriction.

The deployment workflow runs on pushes to `main` and can also be started manually from Actions. It builds with the Pages base URL and canonicalizes site links for project-subdirectory hosting. Only the built website is published, not the source repository.

Expected URL after a successful deployment:
https://jeffery-zhou.github.io/gmi-lab-website/

Note: A public website necessarily exposes the rendered pages and media it serves, even when its source repository is private. Do not include secrets or private-only documents in `static/`.
