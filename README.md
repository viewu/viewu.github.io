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

The preferred deployment path is `.github/workflows/pages.yml`: a push to `main` installs the locked dependencies, builds and verifies the site, then publishes the `public/` artifact with GitHub Pages Actions.

The legacy `npm run deploy` command remains available until the GitHub Pages repository is switched from branch publishing to GitHub Actions.

## Theme provenance

`themes/next/` is based on NexT 8.19.2 commit `94dc7f105b1bf7d6d37246fec90af3a40ded1cfb` and contains local layout, sidebar, branding, and homepage customizations. It is intentionally tracked as vendored source so those customizations are preserved by the root repository. The original nested Git metadata is retained locally as `themes/next/.git-upstream-backup/` and ignored.
