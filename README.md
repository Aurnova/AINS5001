# AINS5001 — Instructor (Aurnova)

**Live site:** https://aurnova.github.io/AINS5001/

**Audience:** **Instructors / staff** — full-course delivery pointers: Jupyter Book + slides/TTS, IMS CC **sources**, instructor-notes in **aima**, and explicit guidance that **solutions** ship through Castalia/private channels, **not** the student-facing site.

**Student-facing site (minimal):** https://aurnova.github.io/AINS5001-student/ — repository [**AINS5001-student**](https://github.com/Aurnova/AINS5001-student): what learners clone for **Codespaces + exercises + Classroom**.

## Build

```bash
npm install
npm run build
```

`variant.json` sets `audience: "instructor"`, `lessonsCatalogUrl` (default **lectures.html** on this site), and optional `navItemLinks` for sidebar items (**Lessons**, **Files**, **Assignments**). The **Lessons** nav item should stay on `aurnova.github.io/AINS5001/`; put long-form or alternate mirrors in the body of [lectures.md](lectures.md) if needed.

## License

Content policy matches the parent AIMA / Castalia programs licensing workflow.
