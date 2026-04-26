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

See `scripts/sync-aurnova-instructor-from-delivery.mjs` in **aima**.
