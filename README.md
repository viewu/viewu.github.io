# viewu blog source

Source project for <https://viewu.github.io>, built with Hexo and a customized vendored copy of the NexT theme.

## Requirements

- Node.js 22
- npm 11

## Local workflow

```powershell
npm ci
npm run check
npm run server
```

`npm run check` generates the static site and verifies required pages and local asset links. Generated files under `public/`, Hexo cache data, dependencies, and the legacy `.deploy_git/` checkout are not source-controlled.

## Deployment

Production publishing is handled by `.github/workflows/pages.yml` in this repository:

- Pull requests targeting `main` install dependencies and run `npm run check`; deployment is skipped.
- Pushes to `main` build the same locked source and deploy the `public/` artifact with GitHub Pages Actions.
- The workflow sets `TZ=Asia/Taipei` so date-based permalinks remain stable on Linux runners.

GitHub Pages is configured for Actions publishing. The pre-migration generated site is preserved on `legacy-static-2026-08-05`. `npm run deploy` and `.deploy_git/` are emergency legacy paths, not the routine publishing workflow.

## Discovery and fallback files

- `source/404.md` generates the custom GitHub Pages `/404.html` fallback.
- `source/robots.txt` publishes the crawler policy and sitemap location.
- `hexo-generator-sitemap` and `hexo-generator-feed` generate `/sitemap.xml` and `/atom.xml`.
- `source/manifest.webmanifest` provides the linked web app manifest.

`npm run check` requires these files and validates their essential URLs, metadata, and JSON/XML structure.

## Performance guardrails

- `scripts/native-image-performance.js` adds native lazy loading, asynchronous decoding, and intrinsic dimensions to rendered content images without changing the source image files.
- NexT preconnects to configured font and vendor origins to reduce connection setup latency.
- `npm run check` rejects missing canonical/title/viewport metadata, unsafe `target="_blank"` links, unoptimized content-image markup, individual generated assets above 3 MiB, and generated sites above 75 MiB.

## Theme provenance

`themes/next/` is based on NexT 8.19.2 commit `94dc7f105b1bf7d6d37246fec90af3a40ded1cfb` and contains local layout, sidebar, branding, and homepage customizations. It is intentionally tracked as vendored source so those customizations are preserved by the root repository. The original nested Git metadata is retained locally as `themes/next/.git-upstream-backup/` and ignored.
