# AINS5001 — Instructor (Aurnova)

**Live site:** `https://aurnova.github.io/AINS5001/`

**Audience:** **Instructors / staff** — full-course delivery: the Populi-style shell, **Jupyter Book** (MyST) built in CI to **this** GitHub Pages project, optional **IMS CC** at the site root, and clear guidance that **solutions** ship through private channels, **not** the public student site.

**Student-facing site (minimal):** [AINS5001-student](https://aurnova.github.io/AINS5001-student/) — repository [Aurnova/AINS5001-student](https://github.com/Aurnova/AINS5001-student) for **Codespaces + exercises + Classroom**.

## Deploy (GitHub Actions)

On push to `main`, [`.github/workflows/pages.yml`](.github/workflows/pages.yml):

1. Checks out the **aima** monorepo (`InquiryInstitute/aima` by default) and runs `npm ci` + `BASE_URL=/AINS5001/jupyter-book/ npm run pages:jupyter-book`.
2. Runs `npm ci` + `npm run build` in this repo, then copies `aima/course/myst/_build/html` → `dist/jupyter-book/`, strips `CNAME` from the copy, and optionally copies `course.imscc` → `dist/course.imscc` if that file exists on `main`.
3. Uploads `dist/` to GitHub Pages.

The default aima source in CI is **`CastaliaInstitute/aima`**. It is **private** — the workflow must use repository secret **`AIMA_CLONE_TOKEN`**: a fine-grained or classic PAT with **read** access to that repository (or use a **public** fork and set the variable **`AIMA_REPO`** to that fork so the default `GITHUB_TOKEN` is enough). Set secrets under *Settings → Secrets and variables → Actions → Secrets* on this repo.

## Local build (shell only)

```bash
npm install
npm run build
```

`variant.json` sets `audience: "instructor"`, `lessonsCatalogUrl` (default **lectures.html** on this site), and `navItemLinks` for **Lessons**, **Files** (`course.imscc` when present), and **Assignments** (Jupyter Book `assignments/index.html`). A local `npm run build` does **not** run the MyST build; the slide links resolve after a full Pages deploy (or if you copy a local `jupyter-book/` tree into `dist/` for preview).

## License

Content policy follows the parent AIMA program licensing terms.
