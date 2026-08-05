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
- `npm run check` rejects missing canonical/title/viewport metadata, unsafe `target="_blank"` links, unoptimized content-image markup, individual generated assets above 2 MiB, and generated sites above 55 MiB.

## Image workflow

- Article raster assets under `source/images/<slug>/` use lossless WebP; source content references them through site-absolute `/images/<slug>/<file>.webp` URLs.
- `npm run verify:images` rejects legacy PNG/JPEG/GIF files in article asset folders, invalid WebP headers, and source images above 2 MiB.
- Keep original assets recoverable through Git history or an ignored local backup before converting future images.

## Production health monitoring

`npm run audit:production` checks the live site rather than the generated local output. It verifies the homepage, discovery endpoints, a representative article and WebP asset, then checks external URLs referenced by published Markdown and requests a mobile PageSpeed baseline.

The `Audit production health` GitHub Actions workflow runs every Monday at 03:23 UTC (11:23 Asia/Taipei) and can also be started manually. Its job summary contains the endpoint table, external-link results, and Lighthouse scores/metrics.

- Broken critical contracts and confirmed external HTTP 404/410 responses fail the audit.
- Bot rejection, rate limiting, transient network errors, and an unavailable PageSpeed API are warnings so they do not create noisy false failures.
- Set the optional repository secret `PAGESPEED_API_KEY` if Google API quota becomes unreliable; the audit works without a key when public quota is available.
- Run `node tools/audit-production.mjs --skip-pagespeed` for a faster endpoint and link-only check.

## Theme provenance

`themes/next/` is based on NexT 8.19.2 commit `94dc7f105b1bf7d6d37246fec90af3a40ded1cfb` and contains local layout, sidebar, branding, and homepage customizations. It is intentionally tracked as vendored source so those customizations are preserved by the root repository. The original nested Git metadata is retained locally as `themes/next/.git-upstream-backup/` and ignored.
