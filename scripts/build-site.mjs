/**
 * Build Populi-style static HTML for an AIMA deliverable repo (GitHub Pages).
 * Reads variant.json + index.md → dist/index.html + copied styles.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { marked } from 'marked'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

function loadVariant() {
  const p = path.join(ROOT, 'variant.json')
  if (!existsSync(p)) {
    throw new Error(`Missing ${p}`)
  }
  return JSON.parse(readFileSync(p, 'utf8'))
}

function stripFrontmatter(md) {
  return md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
}

function preprocessFences(md) {
  const directiveKinds = ['note', 'important', 'warning', 'seealso', 'tip', 'caution']
  let s = md
  for (const kind of directiveKinds) {
    const re = new RegExp('```\\{' + kind + '\\}\\r?\\n([\\s\\S]*?)```', 'g')
    s = s.replace(re, (_, body) => {
      const inner = marked.parse(body.trim())
      const mod =
        kind === 'important'
          ? 'populi-demo__callout--important'
          : kind === 'warning' || kind === 'caution'
            ? 'populi-demo__callout--warning'
            : 'populi-demo__callout--note'
      return `\n\n<aside class="populi-demo__callout ${mod}">${inner}</aside>\n\n`
    })
  }
  return s
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Same-origin slide paths: CI copies MyST <code>course/myst/_build/html</code> → <code>dist/jupyter-book/</code>
 * with <code>BASE_URL=/AINS5001/jupyter-book/</code> so links resolve on this site only.
 */
const DEFAULT_JUPYTER_SLIDES_BASE = 'jupyter-book/slides'

/** Strips this site’s absolute URL if people paste a full GHP link into variant.json. */
function normalizeJupyterSlidesBase(input) {
  const raw = String(input || DEFAULT_JUPYTER_SLIDES_BASE).trim().replace(/\/$/, '')
  if (/^https:\/\/aurnova\.github\.io\/AINS5001\/?/i.test(raw)) {
    return raw.replace(/^https:\/\/aurnova\.github\.io\/AINS5001\/?/i, '') || DEFAULT_JUPYTER_SLIDES_BASE
  }
  return raw.replace(/^\.\//, '')
}

function jupyterSlideDecksSectionHtml(baseUrl) {
  const base = normalizeJupyterSlidesBase(baseUrl)
  const indexPage = `${base}/index.html`
  const listItems = []
  for (let i = 0; i <= 28; i += 1) {
    const id = String(i).padStart(2, '0')
    const pageUrl = `${base}/lecture-${id}.html`
    listItems.push(
      `      <li><a href="${escapeHtml(pageUrl)}">Lecture ${i}</a></li>`,
    )
  }
  return `
<section class="lecture-slide-decks" aria-labelledby="lecture-slides-h">
  <h2 id="lecture-slides-h">Jupyter Book: one page per lecture</h2>
  <p class="lecture-slide-decks__lede">MyST slide HTML is deployed on <strong>this</strong> site under <code>${escapeHtml(
    base,
  )}/</code>. <a href="${escapeHtml(indexPage)}">Lecture slides index</a>.</p>
  <p class="lecture-slide-decks__note">(Local <code>npm run build</code> only produces the shell — run the GitHub Action or copy <code>jupyter-book/</code> into <code>dist/</code> to preview slides offline.)</p>
  <ul class="lecture-slide-decks__list">
${listItems.join('\n')}
  </ul>
</section>
`
}

const NAV_ITEMS = [
  'Dashboard',
  'Syllabus',
  'Lessons',
  'Files',
  'Assignments',
  'Discussions',
  'Tests',
  'Calendar',
  'Roster',
  'Gradebook',
  'Attendance',
  'Reporting',
  'Chat',
  'Settings',
]

/** In-repo default so the “Lessons” nav item does not point off-site (e.g. another org’s GitHub Pages). */
const DEFAULT_LESSONS_CATALOG_URL = 'lectures.html'

/** Merge explicit per-item URLs from variant.json `navItemLinks` with the Lessons default. */
function resolveNavLinks(variant) {
  const out = { ...(variant.navItemLinks && typeof variant.navItemLinks === 'object' ? variant.navItemLinks : {}) }
  const lessons = variant.lessonsCatalogUrl ?? DEFAULT_LESSONS_CATALOG_URL
  if (!out.Lessons && lessons) out.Lessons = lessons
  return out
}

function renderNavItem(item, navLinks, activeNavItem) {
  const active = item === activeNavItem
  const cls = `populi-demo__nav-item${active ? ' populi-demo__nav-item--active' : ''}`
  const href = navLinks[item]
  if (item === 'Dashboard' && !active) {
    return `<a class="${cls}" href="index.html">${escapeHtml(item)}</a>`
  }
  if (item === 'Dashboard' && active) {
    return `<span class="${cls}">${escapeHtml(item)}</span>`
  }
  if (href) {
    return `<a class="${cls}" href="${escapeHtml(href)}">${escapeHtml(item)}</a>`
  }
  return `<span class="${cls}">${escapeHtml(item)}</span>`
}

function renderShellHtml({
  courseCode,
  courseTitle,
  pillLabel,
  alertText,
  termLabel,
  bodyHtml,
  description,
  programsCatalogUrl,
  navLinks,
  footerHtml,
  audience,
  activeNavItem = 'Dashboard',
}) {
  const pill = pillLabel ?? `${String(courseCode).replace(/\s+/g, '')}: Dashboard`
  const navItemsHtml = NAV_ITEMS.map((item) => renderNavItem(item, navLinks, activeNavItem)).join('\n        ')

  const descPara = description
    ? `<p class="populi-demo__panel-body">${escapeHtml(description)}</p>`
    : '<p class="populi-demo__panel-body populi-demo__panel-body--empty">Product line details on the programs catalog.</p>'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(courseCode)}: ${escapeHtml(courseTitle)} — ${audience === 'student' ? 'Student' : 'Instructor'} — Aurnova</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="./styles/populi-demo.css" />
  <link rel="stylesheet" href="./styles/populi-demo-standalone.css" />
</head>
<body>
  <div class="populi-demo populi-demo--standalone">
    <header class="populi-demo__topbar">
      <ul class="populi-demo__topbar-links">
        <li><a href="https://aurnova.github.io">Aurnova</a></li>
        <li><a href="https://github.com/Aurnova">GitHub</a></li>
        <li><a href="${escapeHtml(programsCatalogUrl)}">This course (Pages)</a></li>
        <li><a href="https://aurnova.github.io/AINS5001-student/">Student site</a></li>
      </ul>
      <span class="populi-demo__pill">${escapeHtml(pill)}</span>
    </header>

    <div class="populi-demo__alert">${escapeHtml(alertText)}</div>

    <div class="populi-demo__layout">
      <aside class="populi-demo__sidebar" aria-label="Course navigation">
        <div class="populi-demo__course-tile" aria-hidden="true">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
            <rect width="64" height="64" rx="6" fill="#2d2d32" />
            <ellipse cx="32" cy="22" rx="10" ry="9" stroke="#a1a1aa" stroke-width="2" />
            <path d="M20 38c2-6 8-9 12-9s10 3 12 9v4H20v-4z" fill="#71717a" />
            <rect x="10" y="44" width="44" height="10" rx="2" stroke="#71717a" stroke-width="1.5" />
            <rect x="14" y="47" width="36" height="4" rx="1" fill="#52525b" />
          </svg>
        </div>
        <nav class="populi-demo__nav">
        ${navItemsHtml}
        </nav>
        <div class="populi-demo__nav-footer">${footerHtml}</div>
      </aside>

      <div class="populi-demo__main">
        <div class="populi-demo__course-header">
          <h1>${escapeHtml(courseCode)}: ${escapeHtml(courseTitle)}</h1>
          <div class="populi-demo__course-header-actions">
            <label class="sr-only" for="populi-term-select">Term</label>
            <select id="populi-term-select" class="populi-demo__select" disabled>
              <option>${escapeHtml(termLabel)}</option>
            </select>
            <button type="button" class="populi-demo__icon-btn" aria-label="Menu" disabled>⋮</button>
          </div>
        </div>

        <div class="populi-demo__columns">
          <div class="populi-demo__primary">
            <div class="populi-demo__primary-inner">
${bodyHtml}
            </div>
          </div>
          <aside class="populi-demo__secondary">
            <section class="populi-demo__panel">
              <div class="populi-demo__panel-head">
                <h2 class="populi-demo__panel-title">About this deliverable</h2>
              </div>
              ${descPara}
            </section>
            <section class="populi-demo__panel">
              <div class="populi-demo__panel-head">
                <h2 class="populi-demo__panel-title">Jupyter Book (this site)</h2>
              </div>
              <p class="populi-demo__panel-body">
                <a href="jupyter-book/index.html">Open the full book</a> (built on this same GitHub Pages host).
              </p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  </div>
  <style>
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  </style>
</body>
</html>
`
}

function main() {
  const variant = loadVariant()
  const mdPath = path.join(ROOT, 'index.md')
  if (!existsSync(mdPath)) {
    throw new Error('Missing index.md')
  }

  let md = readFileSync(mdPath, 'utf8')
  md = stripFrontmatter(md)
  md = preprocessFences(md)

  marked.setOptions({ gfm: true })
  const bodyHtml = marked.parse(md)

  const audience = variant.audience === 'student' ? 'student' : 'instructor'
  let footerHtml =
    typeof variant.navFooter === 'string' && variant.navFooter.trim()
      ? escapeHtml(variant.navFooter.trim())
      : ''
  if (!footerHtml) {
    footerHtml =
      audience === 'student'
        ? 'Student site · <strong>Lessons</strong> = public slide index · <strong>Assignments</strong> = GitHub Classroom (set URL in variant.json)'
        : 'Instructor site · <strong>Lessons</strong> = <a href="lectures.html">this site’s Lessons page</a> · set <strong>Files</strong> / <strong>Assignments</strong> in variant.json (IMS CC, Classroom)'
  }
  const navLinks = resolveNavLinks(variant)

  const dist = path.join(ROOT, 'dist')
  if (existsSync(dist)) {
    rmSync(dist, { recursive: true, force: true })
  }
  mkdirSync(path.join(dist, 'styles'), { recursive: true })

  const indexHtml = renderShellHtml({
    courseCode: variant.courseCode,
    courseTitle: variant.courseTitle,
    pillLabel: variant.pillLabel,
    alertText: variant.alertText ?? 'This course opens on Aug 31, 2026',
    termLabel: variant.termLabel ?? '2026-2027: Fall Semester 2026 A',
    bodyHtml,
    description: variant.description ?? '',
    programsCatalogUrl: variant.programsCatalogUrl ?? 'index.html',
    navLinks,
    footerHtml,
    audience,
    activeNavItem: 'Dashboard',
  })
  writeFileSync(path.join(dist, 'index.html'), indexHtml, 'utf8')

  const lessonsPath = path.join(ROOT, 'lectures.md')
  if (existsSync(lessonsPath)) {
    let lessonsMd = readFileSync(lessonsPath, 'utf8')
    lessonsMd = stripFrontmatter(lessonsMd)
    lessonsMd = preprocessFences(lessonsMd)
    const slideBase = typeof variant.jupyterSlidesBaseUrl === 'string' ? variant.jupyterSlidesBaseUrl : DEFAULT_JUPYTER_SLIDES_BASE
    const lessonsBody = marked.parse(lessonsMd) + jupyterSlideDecksSectionHtml(slideBase)
    const lessonsHtml = renderShellHtml({
      courseCode: variant.courseCode,
      courseTitle: variant.courseTitle,
      pillLabel: variant.pillLabel,
      alertText: variant.alertText ?? 'This course opens on Aug 31, 2026',
      termLabel: variant.termLabel ?? '2026-2027: Fall Semester 2026 A',
      bodyHtml: lessonsBody,
      description: variant.description ?? '',
      programsCatalogUrl: variant.programsCatalogUrl ?? 'index.html',
      navLinks,
      footerHtml,
      audience,
      activeNavItem: 'Lessons',
    })
    writeFileSync(path.join(dist, 'lectures.html'), lessonsHtml, 'utf8')
  } else {
    throw new Error('Missing lectures.md (expected alongside index.md for the Lessons page)')
  }

  const styles = ['populi-demo.css', 'populi-demo-standalone.css']
  for (const f of styles) {
    const src = path.join(ROOT, 'styles', f)
    if (!existsSync(src)) {
      throw new Error(`Missing style file: ${src}`)
    }
    copyFileSync(src, path.join(dist, 'styles', f))
  }

  console.log('[build-site] wrote dist/index.html and dist/lectures.html (Populi layout)')
}

main()
