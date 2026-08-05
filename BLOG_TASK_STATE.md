# BLOG_TASK_STATE.md

This file preserves the working state for the personal blog in `D:\viewu_blog`.

Last updated: 2026-08-05, Asia/Taipei

## Current Objective

The user wants ongoing assistance maintaining, modifying, rebuilding, and publishing a personal Hexo blog. Update this file after meaningful project advancements.

## Current Project Snapshot

- Workspace: `D:\viewu_blog`
- Framework: Hexo static blog
- Hexo: `8.1.2`
- Theme: NexT `8.19.2`
- Source posts: `source/_posts/`
- Static article images: `source/images/<slug>/`
- Generated site output: `public/`
- Production repository: root `.git/`, remote `https://github.com/viewu/viewu.github.io.git`
- Root folder is the production Git source repository on `main`, tracking `origin/main`.
- GitHub Pages uses Actions publishing; `.deploy_git/` is ignored and retained only as an emergency legacy path.
- Pre-migration static deployment commit: `524d8b4`, preserved on `legacy-static-2026-08-05`.

## Site Notes

- Main config: `_config.yml`
- Active theme directory: `themes/next/`
- Permalink pattern: `:year/:month/:day/:title/`
- GitHub Pages repository: `https://github.com/viewu/viewu.github.io.git`; source branch `main`; publishing mode `workflow`
- Recent UI work before this task refined the site background, typography, borders, shadows, responsive spacing, homepage/category display, sidebar/music/avatar markup, and deployed at `b19e0fe`.
- `BLOG_TASK_STATE.md` was found truncated on 2026-07-26 and was restored to this concise continuity state.

## Content State

Current source posts include:

- `最后的终点.md`
- `Wins-Taught-Me.md`
- `April-A-Quiet-Shift-I-Almost-Mistook-for-Stagnation.md`
- `resume-overwritten-learning-codex.md`
  - Assets: `source/images/resume-overwritten-learning-codex/`
- `ai-coding-context-tools-verification.md`
  - Assets: `source/images/ai-coding-context-tools-verification/`
- `understanding-human-nature-influence.md`
  - Assets: `source/images/understanding-human-nature-influence/`
- `tasks-not-system-procrastination.md`
  - Assets: `source/images/tasks-not-system-procrastination/`
- `gpt-5-6-chatgpt-direction-workflow.md`
  - Assets: `source/images/gpt-5-6-chatgpt-direction-workflow/`
- `learning-unit-from-course-to-question.md`
  - Title: `学习的单位，从一门课程变成一个问题`
  - Date: `2026-07-26 14:55:03`
  - Description: `一篇关于视频课、文字学习、技能错觉与问题驱动学习方式的反思。`
  - Tags: `SelfGrowth`, `学习系统`, `数字工作流`
  - Assets: `source/images/learning-unit-from-course-to-question/` (`1.png` cover plus body images `2.png`-`6.png`)
- `internship-weekly-01-read-code-after-project-runs.md`
  - Title: `实习记录 01：项目跑起来以后，我才发现自己还没读懂代码`
  - Date: `2026-08-01 17:01:53`
  - Description: `实习第一周的工程环境、代码阅读、AI 辅助与能力边界复盘。`
  - Categories: `工作`
  - Tags: `实习记录`, `AI Coding`, `工程实践`
  - Assets: `source/images/internship-weekly-01-read-code-after-project-runs/` (`1.png` cover plus body images `2.png`-`6.png`)

Recent image-backed articles use site-absolute paths under their respective `/images/<slug>/` folders.

## Maintenance Log

### 2026-08-05

- Initialized a root Git repository on `main` to version the actual blog source.
- Converted the customized NexT 8.19.2 checkout into vendored source; preserved its original nested Git metadata locally at ignored `themes/next/.git-upstream-backup/`.
- Standardized dependency management on npm 11 / Node 22; preserved the old `yarn.lock` under ignored `.agents/backups/`.
- Upgraded Hexo from 7.1.1 to 7.3.0, `hexo-generator-index` to 4.0.0, and `hexo-renderer-marked` to 7.0.1.
- Replaced `hexo-symbols-count-time` with NexT's `hexo-word-counter` 0.2.2 and removed unused npm theme packages.
- Regenerated `package-lock.json`; `npm audit fix` reduced the audit result from 19 findings (including one critical) to zero known vulnerabilities.
- Pinned Node 22 and npm 11, added LF/binary Git attributes, and expanded ignore rules for generated output, caches, editor files, Codex metadata, and theme Git backup data.
- Set `timezone: Asia/Taipei`, disabled future-dated publication, and changed generated update dates from filesystem mtime to stable article dates.
- Removed the manually injected legacy `pjax@0.2.8`; NexT's own PJAX integration remains enabled.
- Added missing `/categories/` and `/tags/` source pages, fixing existing navigation dead links.
- Added `npm run check` and `tools/verify-generated-site.mjs` to verify required pages, internal assets, Windows-path leaks, and duplicate legacy PJAX.
- Added a GitHub Pages Actions workflow and weekly grouped Dependabot configuration.
- Migrated `viewu/viewu.github.io` from checked-in generated files to source-on-`main` through PR #1; first production Actions deployment succeeded in run `30967799631` at merge commit `71f5257`.
- Preserved the former static `main` exactly on remote branch `legacy-static-2026-08-05` and preserved the original local source-bootstrap history on `bootstrap-source-history-2026-08-05`.
- Configured GitHub Pages `build_type: workflow`; PRs build/verify without deploying, while pushes to `main` deploy the verified artifact.
- Fixed Linux CI date-permalink drift by setting `TZ=Asia/Taipei` and added regression checks for the two affected established URLs.
- Upgraded the official Pages Actions to `configure-pages@v6`, `upload-pages-artifact@v5`, and `deploy-pages@v5` so all use the supported Node 24 runtime.
- Enabled repository ruleset `Protect production main` (`20426356`): `main` requires a pull request and successful `build`, blocks deletion and non-fast-forward pushes, and permits the owner to bypass only through a pull request.
- Upgraded Hexo from 7.3.0 to 8.1.2 on Node 22. The cold build retained all 131 generated paths and all static asset hashes; HTML changes were limited to the generator version and equivalent Open Graph tag ordering.
- Verified a successful Hexo build: 42 HTML pages generated and the generated-site verifier passed.
### 2026-08-01

- Imported and built `internship-weekly-01-read-code-after-project-runs.md` from the 公众号 writing folder.
- Normalized the source path from the user-provided asterisk form to the real `_01_` folder/file name because Windows paths cannot contain `*`.
- Added `categories: 工作` as requested.
- Copied `1.png` as cover and `2.png`-`6.png` as body images into `source/images/internship-weekly-01-read-code-after-project-runs/`.
- Replaced relative HTML `<img src="2.png">`-style paths with site-absolute `/images/internship-weekly-01-read-code-after-project-runs/` paths.
- Deployment succeeded to `viewu/viewu.github.io` branch `main` at commit `d9f0301`.
- Corrected the internship article title from `实习周记 01：项目跑起来以后，我才发现自己还没读懂代码` to `实习记录 01：项目跑起来以后，我才发现自己还没读懂代码` in the blog source and original writing Markdown.
- Replaced the cover image text so it says `实习记录 01`; copied the corrected cover to both the blog asset folder and original writing folder.
- Updated the visible tag from `实习周记` to `实习记录`; deployment succeeded at commit `a25c8b6`.

### 2026-07-26

- Imported and built `learning-unit-from-course-to-question.md` from the 公众号 writing folder.
- Copied `1.png` as cover and `2.png`-`6.png` as body images into `source/images/learning-unit-from-course-to-question/`.
- Replaced source-local Windows image paths in HTML `<img>` tags with site-absolute `/images/learning-unit-from-course-to-question/` paths.
- Deployment succeeded to `viewu/viewu.github.io` branch `main` at commit `fefe903`.

### Earlier known deployments

- `e807ed1`: `resume-overwritten-learning-codex.md` deployed on 2026-06-30.
- `ab3d776`: `ai-coding-context-tools-verification.md` deployed on 2026-07-02.
- `0d3fbc2`: `understanding-human-nature-influence.md` deployed on 2026-07-06.
- `0352155`: `tasks-not-system-procrastination.md` deployed on 2026-07-08.
- `7192a39`: `gpt-5-6-chatgpt-direction-workflow.md` deployed on 2026-07-13.
- `b19e0fe`: site UI refinement and homepage/category changes deployed before 2026-07-26.

## Known Notes And Risks

- Be careful with Chinese UTF-8 text in PowerShell; avoid rewriting whole articles unless necessary.
- `apply_patch` may fail in this Windows sandbox with `helper_unknown_error`; when it does, use narrow UTF-8 no-BOM PowerShell writes for the specific target file.
- Deployment warnings about LF/CRLF have appeared but have not blocked successful deploys.
- Added Bilibili profile link and two featured video cards to the homepage using canonical profile/video URLs.
- Replaced the generic TV icon for the Bilibili profile link with a lightweight CSS brand-style icon.
- Added a direct NetEase Cloud Music artist profile link for artist ID 46702907; the existing sidebar player already uses this artist ID.
- Deployed Bilibili and NetEase Cloud Music integrations, featured video cards, and the custom Bilibili icon successfully at commit 001a33b.
- Updated featured Bilibili cards with their actual titles, categorized the 2026-07-26 learning article under Growth, and removed English diary from the Writing description.
- Deployed the corrected Bilibili titles, Growth category assignment, and Writing description update successfully at commit 30d7f25.
- Added the supplied Xiaohongshu profile URL as a sidebar social link.
- Deployed the Xiaohongshu profile link and current site updates successfully at commit e658124.
- Added the viewu WeChat Official Account QR asset and a dedicated WeChat page/sidebar link.
- Refined the Bilibili, NetEase Music, Xiaohongshu, and WeChat social link icons and verified a clean production build.
- Replaced the four social-link CSS approximations with locally bundled, searched brand SVG assets from Simple Icons.
- Reworked social links to render the searched brand SVGs as proportion-preserving image elements; rebuilt and restarted the local preview for review.
- Refined the local social-link layout into an aligned two-column grid with dedicated label spans to prevent truncation.
