# BLOG_TASK_STATE.md

This file preserves the working state for the personal blog in `D:\viewu_blog`.

Last updated: 2026-08-28, Asia/Taipei

## Current Objective

The user wants ongoing assistance maintaining, modifying, rebuilding, and publishing a personal Hexo blog. Update this file after meaningful project advancements.

## Current Project Snapshot

- Workspace: `~/Desktop/blog/viewu.github.io` (macOS; formerly `D:\viewu_blog` on Windows)
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
- Discovery endpoints: `/sitemap.xml`, `/atom.xml`, `/robots.txt`, `/manifest.webmanifest`; custom fallback: `/404.html`
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
  - Assets: `source/images/learning-unit-from-course-to-question/` (`1.webp` cover plus body images `2.webp`-`6.webp`)
- `internship-weekly-01-read-code-after-project-runs.md`
  - Title: `实习记录 01：项目跑起来以后，我才发现自己还没读懂代码`
  - Date: `2026-08-01 17:01:53`
  - Description: `实习第一周的工程环境、代码阅读、AI 辅助与能力边界复盘。`
  - Categories: `工作`
  - Tags: `实习记录`, `AI Coding`, `工程实践`
  - Assets: `source/images/internship-weekly-01-read-code-after-project-runs/` (`1.webp` cover plus body images `2.webp`-`6.webp`)
- `four-interests-life-more-than-one-direction.md`
  - Title: `四种兴趣，让生活不只有一个方向`
  - Date: `2026-08-16 16:56:33`
  - Description: `一篇关于四种兴趣、生活重心、身份标签与让生活保持多方向感的反思。`
  - Categories: `成长`
  - Tags: `SelfGrowth`, `兴趣探索`, `生活方式`
  - Assets: `source/images/four-interests-life-more-than-one-direction/` (`1.webp` cover plus body images `1.webp`-`5.webp`)
- `internship-record-02-understanding-real-engineering.md`
  - Title: `实习记录02：从“只会写代码”到开始理解真实工程。`
  - Date: `2026-08-15 13:15:13`
  - Description: `实习记录第二篇：从 CLI、API、异步、CI/CD 到真实工程协作的理解变化。`
  - Categories: `工作`
  - Tags: `实习记录`, `工程实践`, `AI Coding`
  - Assets: `source/images/internship-record-02-understanding-real-engineering/` (`1.webp` cover plus body images `2.webp`-`7.webp`)

- `beyond-weight-bmi-body-fat-bmr-tdee.md`
  - Title: `体重之外：看懂 BMI、体脂率、基础代谢和 TDEE`
  - Date: `2026-08-22 13:51:47`
  - Description: `一篇关于体重、BMI、体脂率、基础代谢、TDEE 与健身数据理解方式的整理。`
  - Categories: `运动`
  - Tags: `运动`, `健身`, `身体数据`
  - Assets: `source/images/beyond-weight-bmi-body-fat-bmr-tdee/` (`1.webp` cover plus body images `2.webp`, `3.webp`, `4.webp`, `5.webp`, `6.webp`)

- `august-learning-to-carry-more.md`
  - Title: `August — Learning to Carry More`
  - Date: `2026-08-28 16:05:00`
  - Description: `An August reflection on internship pressure, money, AI learning, gratitude, responsibility, and growing into a stronger container.`
  - Categories: `成长`
  - Tags: `SelfGrowth`, `EnglishDiary`, `Internship`
  - Assets: `source/images/august-learning-to-carry-more/` (`1.webp` cover plus body images `1.webp`-`5.webp`)

- `internship-record-03-ai-answers-judgment.md`
  - Title: `实习记录03：当 AI 越来越会给答案，我该如何判断？`
  - Date: `2026-08-28 20:03:39`
  - Description: `实习记录第三篇：关于 AI 生成答案、工具结果、Taste、评价标准与判断力形成的反思。`
  - Categories: `工作`
  - Tags: `实习记录`, `AI Coding`, `判断力`
  - Assets: `source/images/internship-record-03-ai-answers-judgment/` (`0.webp` cover plus body images `1.webp`-`5.webp`)

Recent image-backed articles use site-absolute paths under their respective `/images/<slug>/` folders.

## Maintenance Log

### 2026-08-28 - Internship record 03 upload

- Corrected the user-provided root from `D:\viewu\_writing` to actual `D:\viewu_writing`.
- Renamed source folder from `D:\viewu_writing\公众号\2026-08-28` to `D:\viewu_writing\公众号\2026-08-28-实习记录03：当 AI 越来越会给答案，我该如何判断？`.
- Renamed the duplicated source Markdown filename to `实习记录03：当 AI 越来越会给答案，我该如何判断？.md`.
- Inserted five source images into the article at natural reading breaks: AI shifts work to judgment, Graphify/evaluation gap, multi-agent decision ownership, Taste/internal evaluation function, and the final “why this path?” reflection; restored the source Markdown LastWriteTime as `2026-08-28 20:03:39`.
- Imported `internship-record-03-ai-answers-judgment.md` with `categories: 工作` and tags `实习记录`, `AI Coding`, `判断力`.
- Converted source `0.png`-`5.png` to 800px-wide WebP in `source/images/internship-record-03-ai-answers-judgment/`; `0.webp` is the cover and `1.webp`-`5.webp` are body images. Original writing-folder PNGs remain unchanged; smaller blog copies keep the generated site within the 55 MiB budget.
- Re-encoded the oversized existing Work-category asset `source/images/internship-weekly-01-read-code-after-project-runs/6.webp` to an 800px-wide WebP copy (1,598,842 bytes to 14,592 bytes) so the generated site remains under the 55 MiB budget.
- Local `npm run check` passed before publishing.

### 2026-08-28 - August English reflection upload

- Corrected the user-provided root from `D:\viewu\_writing` to the actual `D:\viewu_writing` path.
- Renamed the source folder from `D:\viewu_writing\english\2026-08-28` to `D:\viewu_writing\english\2026-08-28-August-Learning-to-Carry-More`.
- Inserted five source images into `August — Learning to Carry More.md` at natural reading breaks: internship pressure, second-hand bicycle/money, AI learning, responsibility/gratitude, and closing growth reflection; preserved the source Markdown LastWriteTime as `2026-08-28 16:05:00`.
- Imported `august-learning-to-carry-more.md` with `categories: 成长` and tags `SelfGrowth`, `EnglishDiary`, `Internship`.
- Converted source `1.png`-`5.png` to 800px-wide WebP in `source/images/august-learning-to-carry-more/`; `1.webp` is the cover and all five images are used in the body. The original writing-folder PNGs remain unchanged; the smaller blog copies keep the generated site within the 55 MiB budget.
- Local `npm run check` passed before publishing.

### 2026-08-23 - About page Sports routing fix

- Fixed the About page Sports link to use the populated `/categories/运动/` route instead of the stale `/sports/` placeholder page.
- Added a generated-site regression check that requires the populated Sports category and rejects the stale About-page placeholder link.

### 2026-08-23 - About page contact email

- Added the dedicated blog email `viewublog@163.com` to a new "联系我" section on the About page.
- Kept the sidebar unchanged; the address uses a direct `mailto:` link.

### 2026-08-22 - Local music album recommendation MVP

- Replaced the `/music/` placeholder with a data-driven album wall using `source/_data/music_albums.yml` and `themes/next/layout/music.njk`.
- Imported 12 albums and covers from `D:\view_music\专辑推荐`; scene/moment metadata is intentionally omitted.
- Uses native `<details>` expansion without client-side JavaScript; the grid is three columns on desktop and two on mobile.
- Includes the concise corrected English recommendations and replaces *Trying Times* with Jay Chou's 《八度空间》.
- Blog cover copies are optimized to 360×360 WebP (132,336 bytes total); the external 400×400 source package remains unchanged.
- Extended the generated-site verifier to require the music page, exactly 12 album cards, 《八度空间》, and no *Trying Times* residue.
- A clean `npm run check` passed. Production deployment succeeded through PR #21 at merge commit `4ecd419`; Pages workflow run `32576803027` succeeded. The live `/music/` returned HTTP 200 with 12 album cards, 《八度空间》 present, and no *Trying Times* residue.
- Refined the music page hierarchy after local review: restored the shared 380px section Hero, removed the duplicate header description, and placed the introduction once inside Album Notes beneath the Hero before The Collection.
- Added a music-only 420px Hero width override because the music artwork has substantially narrower internal content than the other 1000×1500 section illustrations; the shared 380px Hero rule remains unchanged elsewhere.



### 2026-08-22 - Sports section category routing fix

- Fixed the homepage Sports card to link to `/categories/运动/` instead of the empty placeholder `/sports/` page.
- Added the Sports hero image branch to `themes/next/layout/category.njk`, so the `运动` category page matches the styled category pages for 工作、成长、写作 and shows the published sports article list.
- Local `npm run check` passed before publishing.

### 2026-08-22 - Fitness metrics sports article upload

- Imported `beyond-weight-bmi-body-fat-bmr-tdee.md` from the 公众号 writing folder; corrected the user-provided root from `D:\viewu\_writing` to the actual `D:\viewu_writing` path.
- Added front matter with `categories: 运动` and tags `运动`, `健身`, `身体数据`.
- Used the source Markdown LastWriteTime as the publish date: `2026-08-22 13:51:47`.
- Converted source `1.png`-`6.png` to high-quality WebP in `source/images/beyond-weight-bmi-body-fat-bmr-tdee/`; `1.webp` is the cover and `2.webp`, `3.webp`, `4.webp`, `5.webp`, `6.webp` are body images. Used lossy WebP for this new article to keep the generated site within the 55 MiB budget while leaving the original writing-folder PNGs untouched.
- Replaced local relative image references with site-absolute `/images/beyond-weight-bmi-body-fat-bmr-tdee/` WebP paths.
- Local `npm run check` passed before publishing.

### 2026-08-22 - About page social-platform links

- Replaced the about page's standalone WeChat section with a unified social-platform section for Bilibili, NetEase Cloud Music, Xiaohongshu, and the WeChat Official Account.
- Reused the sidebar's local brand icons and platform URLs; the WeChat entry still leads to the dedicated QR-code page.
- Added a responsive two-column card layout that collapses to one column on narrow screens.

### 2026-08-16 - Four interests growth article upload

- Imported `four-interests-life-more-than-one-direction.md` from the 公众号 writing folder.
- Added front matter with `categories: 成长` and tags `SelfGrowth`, `兴趣探索`, `生活方式`.
- Converted source `1.png`-`5.png` to lossless WebP in `source/images/four-interests-life-more-than-one-direction/`; `1.webp` is the cover.
- Replaced two external jsDelivr image blocks and three source-local Windows image paths with site-absolute `/images/four-interests-life-more-than-one-direction/` WebP paths.
- Local `npm run check` passed before publishing.

### 2026-08-16 - UI refinements: intro, sidebar, about, typography

- Avatar: removed cursor-rotation (`rotated: false`), added subtle hover scale (1.05).
- Sidebar description replaced long Chinese text with two lines "YOLO" / "an optimistic pessimist"; hidden the site-state "分类" count via CSS.
- Header menu: commented out the "分类" item (首页/关于/标签/归档 remain).
- Homepage intro (`index.njk`): removed the redundant description paragraph, switched to an open large-title layout (no card; Klein-blue kicker + blue left rule on the headline).
- About page (`source/about/index.md`): rewrote with personal positioning ("初级技术用户", YOLO motto) and all five sections (工作/成长/写作/音乐/运动) as links; updated `_config.yml` description to "初级技术用户".
- Post/page typography (`source/_data/styles.styl`): body ink `#1a1a1a`, line-height 1.85, clearer heading hierarchy, Klein-blue links, styled blockquotes; embedded images constrained (`max-width: 80%`, centered, `height: auto`).
- `npm run check` passes. Branch: `feature/ui-refinements`.

### 2026-08-15 - Homepage: five-section navigation + section hero images

- Restructured the homepage (`themes/next/layout/index.njk`) to: intro + five section cards (工作/成长/写作/音乐/运动, each a Font Awesome icon + name + one-line subtitle) + latest posts. Removed the featured-posts, Bilibili-video, and old three topic-card sections.
- The five cards link to three category pages plus two new pages:
  - `source/music/index.md` and `source/sports/index.md` (placeholder "正在建设中" pages).
- Section pages now share a consistent layout — centered title + hero image + content/list:
  - Category pages (`themes/next/layout/category.njk`) render the category name as a centered title, a hero image, then the collapse post list, all inside a white card (so the white line-art blends with the card).
  - Music/sports pages use the same `.section-hero` block.
- Five AI-generated black-and-white line-art images (one per section) converted to WebP (`hero-*.webp`, 1000px wide) in `source/images/sections/`. PNG sources live outside the repo in `~/Desktop/blog_pic`.
- New CSS in `source/_data/styles.styl`: `.home-sections`/`.home-section-card`/`.home-section-icon` (cards), `.section-hero` (hero), `.category-title` (centered title), `.posts-collapse .post-block` (white card).
- `npm run check` passes. Branch: `feature/homepage-5-sections`.

### 2026-08-15

- Imported `internship-record-02-understanding-real-engineering.md` from the 公众号 writing folder.
- Added front matter with `categories: 工作` and tags `实习记录`, `工程实践`, `AI Coding`.
- Converted source `1.png`-`7.png` to lossless WebP in `source/images/internship-record-02-understanding-real-engineering/`; `1.webp` is the cover and `2.webp`-`7.webp` are body images.
- Replaced stale source-local image paths that pointed at an older draft directory with site-absolute `/images/internship-record-02-understanding-real-engineering/` WebP paths.
- Local `npm run check` passed before publishing.

### 2026-08-14 - Performance: eliminate overseas CDN dependencies

- Disabled `motion` (`themes/next/_config.yml`), removing the animate.css + motion.js entrance-animation requests.
- Self-hosted all third-party assets into `source/lib/` (removing every `cdnjs.cloudflare.com` / `cdn.jsdelivr.net` dependency, which are slow/unreliable for mainland-China readers):
  - `fontawesome@6.5.1` css + 4 woff2 webfonts → `/lib/fontawesome/`
  - `next-theme-pjax@0.6.0` → `/lib/pjax/pjax.min.js`
  - `animejs@3.2.1` → `/lib/anime/anime.min.js`
  - `aplayer@1.10.1` css+js and `meting@2.0.1` js → `/lib/aplayer/`
- Overrode vendor URLs in `themes/next/_config.yml` (`vendors.fontawesome/pjax/anime`) to local `/lib/...` paths; set `preconnect: false`.
- Music player (`_macro/sidebar.njk`) kept but optimized: local assets, `defer` scripts, `preload="none"`, theme color corrected `#42aaf0` → `#002fa7`.
- Verified `cdnjs`/`jsdelivr` references are 0 in generated HTML; `npm run check` passes.

### 2026-08-13 - Klein blue minimal visual redesign (macOS)

- Development moved from Windows (`D:\viewu_blog`) to macOS (`~/Desktop/blog/viewu.github.io`); Node 22 installed via nvm (project pins `>=22 <23`), deps installed with `npm ci`.
- Full "极简安静" visual repaint on branch `feature/klein-blue-redesign`, keeping all layout structure unchanged:
  - Palette: light-gray page `#fafafa` + white cards + near-black text `#1a1a1a` + grays `#6b6b6b`/`#9e9e9e` + hairlines `#eeeeee`; single accent Klein blue `#002fa7` (3px top `headband`, home-intro left rule, link hovers).
  - Typography: system serif headings (`Songti SC`/`STSong`/`SimSun`) + system sans body, zero webfont loading.
  - De-decorated: removed card shadows, gradients, rounded corners, and hover lift; hairlines + whitespace only.
  - `.site-brand-container` (sidebar brand panel) changed from the `--theme-color` solid block to white + hairline.
- Social icons reworked to the CSS `mask` technique: `source/images/social/*.svg` reverted to original brand fills (Bilibili `#00AEEC`, NetEase `#D43C33`, WeChat `#07C160`, Xiaohongshu `#FF2442`); `themes/next/layout/_partials/sidebar/site-overview.njk` renders `<span class="social-brand-icon">` instead of `<img>`; `source/_data/styles.styl` colors them Klein blue at rest and brand color on hover via `background-color` + `mask-image`. Card stays white + hairline; hover changes only the icon.
- All style changes are additive overrides in `source/_data/styles.styl` (the `custom_file_path.style` inject point); the vendored NexT theme is otherwise untouched.
- `npm run check` passes (image audit + build + generated-site verification).

### 2026-08-05 - July Reflection upload

- Imported `july-reflection-the-month-theory-became-reality.md` from `D:\viewu_writing\english\July Reflection — The Month Theory Became Reality.md`.
- Added front matter with `categories: 成长` and tags `SelfGrowth`, `EnglishDiary`, `Internship`.
- Fixed the homepage Writing category card in `themes/next/layout/index.njk`, replacing the stale `英文日记、科幻创作和其他不属于工作笔记的文字。` with `科幻创作和其他不属于工作笔记的文字实验。`.
- Local `npm run check` passed before publishing.

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
- Added a custom 404 page, crawler policy, XML sitemap, Atom feed, and linked web app manifest. Expanded `npm run check` to require and validate them; the cold build now produces 136 files.
- Added dependency-free native image performance handling: rendered content images receive lazy loading, asynchronous decoding, and intrinsic dimensions where detectable, while original image files remain unchanged. Enabled NexT resource preconnect and expanded CI checks for metadata, new-window link safety, image markup, and generated-size budgets.
- Second-batch verification covered 43 HTML pages and 34 content-image tags: all 34 use native lazy loading and asynchronous decoding, 29 receive numeric intrinsic dimensions, the largest generated asset remains 2,396,614 bytes, the full site is 57,971,266 bytes, and `npm audit` reports zero vulnerabilities.
- Migrated all 40 nested article PNG assets to pixel-identical lossless WebP and updated seven post cover/body references. Source article images fell from 56,697,360 to 40,371,662 bytes, saving 16,325,698 bytes (28.79%); every decoded RGBA SHA-256 matched its original.
- Preserved the removed PNG files and a conversion manifest locally at ignored `.agents/backups/image-originals-2026-08-05-lossless-webp/`; the originals also remain recoverable from Git history.
- Added `npm run verify:images` to reject legacy nested raster formats, invalid WebP files, and article images above 2 MiB. Extended intrinsic-dimension detection to WebP and tightened generated budgets to 2 MiB per file and 55 MiB total.
- Verified a successful Hexo build: 42 HTML pages generated and the generated-site verifier passed.
- Added a dependency-free production health audit covering seven critical live contracts, external URLs extracted from source Markdown, and report-only mobile Lighthouse metrics.
- Added a weekly/manual `Audit production health` workflow, scheduled Mondays at 03:23 UTC (11:23 Asia/Taipei). It runs pinned Lighthouse 13.4.1 transiently under Node 24, without adding Lighthouse to the blog dependency tree, and remains separate from the required PR/build/deploy path.
- Calibrated alert severity: critical contract failures and confirmed external 404/410 responses fail; bot rejection, rate limiting, transient network errors, and Lighthouse availability remain warnings.
- Local production baseline on 2026-08-05: all seven critical checks passed; nine unique external URLs had no confirmed 404/410; three endpoints were unconfirmed due to 403/network policy. The first hosted audit (run `30985141217`) passed the production contracts but confirmed that the public PageSpeed API returned HTTP 429, motivating the direct Lighthouse runner.
- Direct Lighthouse validation succeeded in branch run `30987884469`: Performance 80, Accessibility 95, Best Practices 100, SEO 100; FCP 3.1s, LCP 4.2s, TBT 50ms, CLS 0, and Speed Index 3.1s. All seven critical contracts passed and no external 404/410 was found.

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
