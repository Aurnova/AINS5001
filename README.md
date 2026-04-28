# Aurnova instructor repository (generated)

This tree is **merged into** `Aurnova/AINS5001` after each sync from the **myst-imscc** delivery build.

- **`docs/`** — static site generated from the **same IMS CC** as `course.imscc` (via [imscc-pages](https://github.com/CastaliaInstitute/imscc-pages)); do **not** hand-edit generated HTML.
- **`course.imscc`** — import into Populi / Canvas / Moodle.
- **`.github/workflows/`** — GitHub Pages + automation preserved across regenerations.

Regenerate from the **aima** monorepo:

```bash
npm run course:build -- --variant delivery --push   # refresh ../aima-delivery
npm run course:sync:aurnova-instructor -- --commit --push   # optional: push AINS5001
```

Optional **Pages password gate** (client-side): set `AINS_PAGES_PASSWORD` when running `course:sync:aurnova-instructor` so each synced HTML page prompts once per browser session. See `scripts/apply-populi-bridge-to-docs.mjs` in **aima**.

See `scripts/sync-aurnova-instructor-from-delivery.mjs` in **aima**.
