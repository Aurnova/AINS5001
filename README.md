# AINS5001 — Aurnova

A Modern Approach to AI (AINS5001) — Castalia / Inquiry Institute AIMA delivery demo for Aurnova.

- **Source:** `index.md` (from [programs](https://github.com/Aurnova/programs) `demo-sources/ain2001/classroom.md`).
- **Live site (after Pages):** https://Aurnova.github.io/AINS5001/
- **Layout:** Populi-style course shell (same visual language as the [AIMA catalog](https://programs.castalia.institute/catalog/aima)); built to static HTML with `marked`. **Lessons** in the sidebar links to the [Jupyter Book slide index](https://inquiryinstitute.github.io/aima/slides/) on the main AIMA site (override with `lessonsCatalogUrl` in `variant.json`).

## Build locally

```bash
npm install
npm run build
```

Open `dist/index.html`. On GitHub Actions, `dist/` is published to Pages.

## License

Content policy matches the parent AIMA / Castalia programs licensing workflow.
