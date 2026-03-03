# 📱 AppSec Through Time

# Product Requirements Document

## 1) Product summary

**Product name (working):** *AppSec Through Time*

**One-liner:** An educational, interactive, guided timeline that teaches the key historical developments in application security through curated “story slides,” primary sources, and short interactive checks for understanding.

## 2) Problem & opportunity

People learning application security often get *tools and tactics* without understanding the *historical why*: major vulnerabilities, standards, watershed incidents, and how practices evolved (secure SDLC, OWASP, threat modeling, appsec automation, supply chain, etc.). A guided timeline makes the learning path approachable and memorable.

## 3) Goals

1. Teach the history of application security via a **guided, narrative timeline**.
2. Make learning sticky through **media + brief interactive moments** (e.g., “spot the flaw,” 1–3 question checks).
3. Provide strong **credibility** through **citations and sources** on each entry.

## 4) Non-goals (explicitly out of scope for v1)

- User accounts, progress syncing, profiles
- Comments/community submissions
- Real exploit labs that execute untrusted code server-side
- Complex personalization/recommendation

## 5) Target users & personas

- **Learner (primary):** dev/student transitioning into appsec; wants a “story” and context.
- **Practitioner (secondary):** appsec engineer who wants a quick historical refresher and references.
- **Educator (secondary):** uses it as a teaching aid.

## 6) Core user story

“As a user, I navigate a guided timeline and learn about historical developments in application security.”

### Supporting stories

- I can start at the beginning and proceed **Next/Previous** like a story.
- I can jump to a specific era/chapter from an index.
- I can open a **detail page** for an event with deeper reading and references.
- I can share a link to a specific event/slide.

## 7) Experience principles

- **Guided first:** default path is linear narrative, not an overwhelming dataset.
- **Credible:** every claim is backed by references; show “Primary / Secondary sources.”
- **Fast & simple:** instant loading, minimal friction, mobile-friendly.
- **Accessible:** keyboard navigation, alt text for media, readable typography.

## 8) Functional requirements

### 8.1 Timeline (guided narrative)

- **Homepage** presents a full-width guided timeline.
- Timeline supports:
    - Next/Previous navigation
    - Media embeds (images, video links, etc.)
    - Event title, date, short narrative text
- Deep link support:
    - Visiting `/events/<slug>` shows the long-form lesson
    - Visiting `/?event=<slug>` (or `#event-<slug>`) opens the timeline at that point

> TimelineJS is designed for “visually rich, interactive timelines” with either spreadsheets or JSON data. ([Timeline JS](https://timeline.knightlab.com/docs/index.html?utm_source=chatgpt.com))
> 

### 8.2 Event detail lessons

- Each timeline event has a corresponding **lesson page** containing:
    - Expanded narrative
    - Inline figures/media
    - References (primary/secondary)
    - Optional “Key takeaway” + “Why it mattered”
    - Optional mini-check (1–3 questions)

### 8.3 Table of contents / chapters

- A “Chapters” view listing events grouped by era (e.g., 1970s–1990s foundations, early web, OWASP era, SDLC and tooling, cloud era, supply chain).
- Clicking a chapter jumps the timeline to that slide.

### 8.4 Search and filters (lightweight)

- Text search over titles + tags (client-side).
- Optional tag filters (e.g., *Injection, Auth, Crypto, SDLC, Supply Chain*).

### 8.5 Sources and citation expectations

- Each event must include:
    - At least 1–2 references
    - A “Further reading” section on the detail page

### 8.6 Accessibility requirements

- Keyboard support for timeline navigation.
- Images must have alt text; timeline media should not rely on color alone.
- Meet WCAG 2.1 AA where practical.

> TimelineJS spreadsheet workflow supports an **Alt Text** column for accessibility (added Dec 2024). ([Timeline JS](https://timeline.knightlab.com/docs/using-spreadsheets.html?utm_source=chatgpt.com))
> 

## 9) Non-functional requirements

- **Performance:** fast first load, timeline lazy-load where possible.
- **SEO:** indexable event pages with descriptive metadata.
- **Security:** strict content handling (no unsafe HTML injection), security headers.
- **Reliability:** no dependency on a backend; works from static hosting.

## 10) Success metrics (v1)

- % of users who reach 25% / 50% / 100% of slides
- Average time on site and per event page
- Bounce rate on homepage
- Shares/copies of deep links
- Accessibility checks passing (lint + manual spot checks)

## 11) Milestones

1. **MVP (2–4 weeks equivalent effort)**
    - Timeline with ~20–30 curated events
    - Event pages + citations
    - Chapters list + deep links
2. **v1**
    - Search + tags
    - Mini-checks on ~30–50% of events
    - Polished SEO + OpenGraph previews
3. **v1.1**
    - Glossary page
    - “Related events” suggestions by tag

## 12) Risks & mitigations

- **Content scope creep:** keep a fixed list of eras and a target event count for v1.
- **Third-party embed fragility:** self-host timeline library and data rather than relying on externally hosted embeds.
- **Accessibility drift:** enforce alt text and run automated checks in CI.

---

# Tech Spec

## 1) Chosen stack (v1)

### Frontend framework

- **Next.js + React + TypeScript**
    - Supports content-driven pages and interactive client components.
    - First-class MDX support via Next.js tooling. ([Next.js](https://nextjs.org/docs/pages/guides/mdx?utm_source=chatgpt.com))

### Styling

- **Tailwind CSS** (or CSS Modules if you prefer minimal dependencies)
- Optional component primitives: Radix UI (only if needed)

### Timeline engine

- **TimelineJS (self-hosted)**
    - Best aligned with “guided story slides.”
    - Use its **JSON format** generated at build time. ([Timeline JS](https://timeline.knightlab.com/docs/json-format.html?utm_source=chatgpt.com))

### Hosting

- **Vercel** (recommended for Next.js)
    - Zero-config deployment, strong performance defaults. ([Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs?utm_source=chatgpt.com))

No database, no auth, no server-side data editing.

---

## 2) Architecture overview

**Build-time content → static pages + static JSON → client-side timeline rendering**

- `content/events/*.mdx` : long-form lessons (single source of truth for narrative)
- `content/events/*.mdx` frontmatter: date, title, tags, media, references, summary
- `scripts/build-timeline.ts`:
    - reads MDX frontmatter
    - validates schema
    - emits `public/timeline.json` in TimelineJS JSON format
- Next.js serves:
    - `/` timeline view (loads `timeline.json`)
    - `/events/[slug]` detail pages (MDX rendered)
    - `/chapters` index
    - `/sources` consolidated references (optional)

---

## 3) Data model

### 3.1 MDX frontmatter (authoring format)

Example (frontmatter only):

```yaml
---
slug: "owasp-top-10-early-years"
title: "OWASP Top 10 begins shaping shared language"
date: "2003-01-01"
tags: ["owasp", "web-appsec", "awareness"]
summary: "A common taxonomy accelerates education and prioritization."
media:
  type: "image"
  url: "/media/owasp-era.jpg"
  alt: "Early OWASP-era web security illustration"
references:
  - label: "OWASP Top 10 archive"
    url: "https://..."
  - label: "Paper/book/article"
    url: "https://..."
---
```

### 3.2 Generated TimelineJS JSON (rendering format)

TimelineJS expects a specific JSON structure for the overall timeline and events. ([Timeline JS](https://timeline.knightlab.com/docs/json-format.html?utm_source=chatgpt.com))

You’ll generate something like:

```json
{
  "title": {
    "text": { "headline": "Application Security: A Guided History", "text": "..." }
  },
  "events": [
    {
      "start_date": { "year": "2003", "month": "1", "day": "1" },
      "text": {
        "headline": "OWASP Top 10 begins shaping shared language",
        "text": "Short summary HTML/text here…"
      },
      "media": { "url": "/media/owasp-era.jpg", "alt": "..." },
      "unique_id": "owasp-top-10-early-years"
    }
  ]
}
```

**Decision:** keep “short slide text” separate from long-form MDX. The slide text comes from `summary` (or a dedicated `slideText` field).

---

## 4) Key UI components & routing

### Pages

- `GET /`
    - Hero + “Start the story” CTA
    - Timeline component (client-rendered)
    - Optional chapter jump menu
- `GET /events/[slug]`
    - MDX lesson page
    - References list and “Back to timeline” link
- `GET /chapters`
    - Grouped list of events (by era)
- `GET /glossary` (optional v1.1)
- `GET /sources` (optional)

### Components

- `<TimelineStory />`
    - Loads `/timeline.json`
    - Instantiates TimelineJS on the client
    - Handles slide change events to update URL (shallow routing)
- `<ChapterNav />`
    - Jump to specific event/era (calls TimelineJS `goToId()` or equivalent)
- `<References />`
    - Standard rendering of citations

---

## 5) TimelineJS integration details

### Approach

- **Self-host TimelineJS assets** (either via npm package or vendored JS/CSS).
- Instantiate timeline in a client component and pass `timeline.json`.

Why self-host:

- Avoid runtime dependency on external embed services
- Control caching, privacy, and future compatibility

TimelineJS supports building timelines via spreadsheets or JSON, but for security/control the JSON + self-host route is cleaner. ([Timeline JS](https://timeline.knightlab.com/docs/faq.html?utm_source=chatgpt.com))

(You can still use the spreadsheet workflow during drafting if you want; TimelineJS explicitly supports that authoring model. ([Timeline JS](https://timeline.knightlab.com/docs/using-spreadsheets.html?utm_source=chatgpt.com)))

---

## 6) Content pipeline & validation

### Build step

- Parse MDX frontmatter with `gray-matter`
- Validate with `zod`:
    - `slug` unique
    - `date` valid ISO date
    - `media.alt` required when `media.type === "image"`
    - `references[]` must have label + url
- Emit:
    - `public/timeline.json`
    - `public/search-index.json` (optional, for fast client search)

### Linting rules (quality gates)

- Reject build if:
    - missing references
    - missing alt text for images
    - duplicate slug
    - invalid date

---

## 7) SEO & metadata

- Each event page sets:
    - title, description, OpenGraph tags
- Generate `sitemap.xml` and `robots.txt`
- Add canonical URLs
- Ensure event pages are indexable even though the timeline itself is JS-driven

---

## 8) Security considerations

Even though this is “just content,” it’s still a web app:

- **No arbitrary HTML** from user input (you’re the only author, but mistakes happen).
- If you allow HTML inside MDX, sanitize or constrain allowed elements.
- Add security headers (at minimum):
    - CSP (tuned for TimelineJS assets and any media hosts you embed)
    - `X-Content-Type-Options: nosniff`
    - `Referrer-Policy`
- Dependency hygiene (lockfile, renovate/dependabot).

---

## 9) Testing strategy

- Unit:
    - content schema validation
    - timeline JSON generation
- E2E (Playwright):
    - homepage loads timeline
    - next/prev works
    - deep link opens correct slide
    - event page renders + references visible
- Accessibility:
    - run axe checks on key pages

---

## 10) Deployment

- Deploy to **Vercel** with standard Next.js build.
- Prefer mostly static output:
    - pre-render event pages
    - serve `timeline.json` as static
        
        Vercel’s Next.js integration is explicitly documented and maintained. ([Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs?utm_source=chatgpt.com))
        

---

## 11) Open decisions (that won’t block MVP)

- Do you want timeline slide text to allow limited formatting (links, emphasis)?
- Will you embed third-party media (YouTube, etc.) or keep media local?
- Do you want “mini-checks” to be:
    - inline MDX components (simple), or
    - a structured quiz schema (more scalable)?

---