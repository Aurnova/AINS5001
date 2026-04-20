---
title: AINS5001 — Instructor hub
description: Castalia / Inquiry Institute AIMA — instructor delivery surface (not the student clone).
---

# AINS5001: Instructor hub

**Audience:** instructors and program staff delivering **A Modern Approach to AI** for Aurnova.  
**Student entry point:** send learners to **[AINS5001-student](https://aurnova.github.io/AINS5001-student/)** — that site is scoped to **GitHub Classroom + Codespaces + exercises** only.

## What belongs here (instructor)

| Track | Where to find it |
| --- | --- |
| **Full narrative & book** | Public **[Jupyter Book (AIMA on Pages)](https://inquiryinstitute.github.io/aima/)** — readings, syllabus-aligned pages, assignments index |
| **Slide sessions + MP3 / VTT** | **[Lecture slides index](https://inquiryinstitute.github.io/aima/slides/)** — same slide order as the Reveal / TTS pipeline in the upstream [aima](https://github.com/InquiryInstitute/aima) repo |
| **Instructor notes & course ops** | [instructor-notes](https://github.com/InquiryInstitute/aima/tree/main/instructor-notes) in **aima** |
| **Exercise solutions & rubrics** | Distribute through **Castalia / your program channel** (private LMS, faculty drive, or signed artifacts) — **not** the public student Pages site or bare student template repos |
| **IMS CC (Moodle / LMS packages)** | Built from MyST sources under **aima** `course/` — see [course](https://github.com/InquiryInstitute/aima/tree/main/course) and deployment docs in that repo; use sidebar **Files** as a quick jump to the source tree you export from |

## Engineering workflow (reminder)

- **GitHub Classroom** — private assignment repos per learner.  
- **Codespace template** — [**aima-codespace**](https://github.com/InquiryInstitute/aima-codespace): students fork/rename to `aima-<github-username>`.  
- **Exercise starter** — [aima-exercise-starter](https://github.com/InquiryInstitute/aima/tree/main/classroom-templates/aima-exercise-starter) in **aima**.

```{note}
This repository’s Pages build is a **thin Castalia-style shell** around `index.md`. Heavy course content stays in **aima**; the **student** site stays intentionally minimal.
```

## References

- [Student-facing site](https://aurnova.github.io/AINS5001-student/)
- [aima-codespace](https://github.com/InquiryInstitute/aima-codespace)
- [Classroom setup (aima)](https://github.com/InquiryInstitute/aima/blob/main/docs/CLASSROOM_SETUP.md)
- [AIMA repository](https://github.com/InquiryInstitute/aima)
