---
title: AINS5001 — Instructor hub
description: Aurnova AINS5001 — instructor delivery surface (not the student clone). Jupyter Book is served on this same GitHub Pages site.
---

# AINS5001: Instructor hub

**Audience:** instructors and program staff delivering **A Modern Approach to AI** for Aurnova.  
**Student entry point:** send learners to **[AINS5001-student](https://aurnova.github.io/AINS5001-student/)** — that site is scoped to **GitHub Classroom + Codespaces + exercises** only.

## What belongs here (instructor)

| Track | Where to find it |
| --- | --- |
| **Full narrative & book** | On **this** site: [Jupyter Book (index)](jupyter-book/index.html) — readings, syllabus-aligned pages, assignments index |
| **Slide sessions + MP3 / VTT** | [Lecture slides index](jupyter-book/index-1/index.html) — per-lecture routes are `jupyter-book/lecture-00/index.html`, …, `lecture-28/` (MyST `pages:jupyter-book` from **CastaliaInstitute/aima** in CI) |
| **Instructor notes & course ops** | [instructor-notes](https://github.com/CastaliaInstitute/aima/tree/main/instructor-notes) in the **aima** monorepo |
| **Exercise solutions & rubrics** | Distribute through your **private** LMS, faculty drive, or signed artifacts — **not** the public student Pages site or bare student template repos |
| **IMS CC (Moodle / LMS packages)** | If `course.imscc` is committed to this repository, the [download](course.imscc) is published at the site root by the same workflow. Otherwise build and ship from a local **aima** delivery clone. |

## Engineering workflow (reminder)

- **GitHub Classroom** — private assignment repos per learner.  
- **Codespace template** — [**aima-codespace**](https://github.com/InquiryInstitute/aima-codespace): students fork/rename to `aima-<github-username>`.  
- **Exercise starter** — [aima-exercise-starter](https://github.com/CastaliaInstitute/aima/tree/main/classroom-templates/aima-exercise-starter) in **aima**.

```{note}
This repository’s **Deploy Pages** workflow builds a Populi-style shell, then checks out **CastaliaInstitute/aima** and runs `pages:jupyter-book` with `BASE_URL=/AINS5001/jupyter-book` (no trailing slash) and copies `course/myst/_build/html` into `dist/jupyter-book/`. A local `npm run build` only produces the shell until you run that pipeline.
```

## References

- [Student-facing site](https://aurnova.github.io/AINS5001-student/)
- [aima-codespace](https://github.com/InquiryInstitute/aima-codespace)
- [Classroom setup (aima)](https://github.com/CastaliaInstitute/aima/blob/main/docs/CLASSROOM_SETUP.md)
- [aima (CastaliaInstitute)](https://github.com/CastaliaInstitute/aima)
