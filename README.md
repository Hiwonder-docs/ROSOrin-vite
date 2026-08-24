# ROSOrin Documentation

This repository contains the ROSOrin VitePress documentation site. The source
files for each version are stored under `content/jetson-orin-nano-version/docs/`,
`content/jetson-nano-version/docs/`, and `content/raspberry-pi-version/docs/`.

## Local development

Install dependencies and start the local documentation server:

```bash
npm ci
npm run docs:dev
```

Build the production site and stage the artifacts:

```bash
npm run docs:build
npm run docs:stage-main
```

The staged production files are generated in:

- `projects/ROSOrin/en/jetson-orin-nano-version/`
- `projects/ROSOrin/en/jetson-nano-version/`
- `projects/ROSOrin/en/raspberry-pi-version/`

## GitHub Pages deployment

The build artifacts under `projects/` are committed to the repository. Open
**Settings > Pages**, select **Deploy from a branch**, and choose **main** and
**/(root)**. Do not bind a custom domain.

The GitHub Pages direct URL is:

```text
https://GITHUB-USERNAME.github.io/ROSOrin-vite/projects/ROSOrin/en/jetson-orin-nano-version/
```

The public-facing URL (via the baota Nginx reverse proxy) is:

```text
https://wiki.hiwonder.com/projects/ROSOrin/en/jetson-orin-nano-version/
```
