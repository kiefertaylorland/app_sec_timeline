# 📱 AppSec Through Time

An educational, interactive timeline that teaches the key historical developments in application security through curated "story slides," primary sources, and credible references.

## 🌟 Features

- **Guided Timeline**: Navigate through application security history in a linear narrative
- **Event Detail Pages**: In-depth lessons with references and sources for each event
- **Chapter View**: Browse events organized by decade
- **Credible Sources**: Every claim backed by references and citations
- **Fast & Mobile-Friendly**: Built with Next.js for optimal performance
- **Accessible**: Keyboard navigation and WCAG 2.1 AA compliance

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/kiefertaylorland/app_sec_timeline.git
cd app_sec_timeline

# Install dependencies
npm install

# Build the timeline data
npm run build-timeline

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

### Building for Production

```bash
# Build the timeline and the Next.js app
npm run build

# Start the production server
npm start
```

## 📁 Project Structure

```
app_sec_timeline/
├── content/
│   └── events/          # Event content in Markdown format
├── public/
│   ├── timeline.json    # Generated timeline data
│   └── media/          # Media files (images, etc.)
├── scripts/
│   └── build-timeline.ts # Script to generate timeline.json
├── src/
│   ├── app/            # Next.js app router pages
│   │   ├── page.tsx    # Homepage
│   │   ├── timeline/   # Timeline view
│   │   ├── chapters/   # Chapter index
│   │   └── events/     # Event detail pages
│   ├── components/     # React components
│   └── lib/            # Utility functions and types
└── package.json
```

## ✍️ Adding Events

Events are stored as Markdown files in `content/events/`. Each event requires frontmatter with the following fields:

```markdown
---
slug: "event-slug"
title: "Event Title"
date: "2003-01-01"
tags: ["tag1", "tag2"]
summary: "Brief summary for the timeline"
references:
  - label: "Reference Title"
    url: "https://example.com"
---

Full event content goes here...
```

### Required Fields

- `slug`: Unique identifier for the event (used in URLs)
- `title`: Event title
- `date`: ISO date string (YYYY-MM-DD)
- `summary`: Short description shown on the timeline
- `references`: Array of citation objects with `label` and `url`

### Optional Fields

- `tags`: Array of tag strings for categorization
- `media`: Media object with `type`, `url`, and `alt` properties

After adding or modifying events, run:

```bash
npm run build-timeline
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes timeline generation)
- `npm run build-timeline` - Generate timeline.json from events
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown with frontmatter validation (Zod)
- **Deployment**: Optimized for Vercel

## 🔒 Security

Security headers are configured in `next.config.ts`:
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- X-Frame-Options: DENY

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Add or update events in `content/events/`
4. Run `npm run build-timeline` to generate the timeline data
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [OWASP Foundation](https://owasp.org/)
- [Application Security Wiki](https://appsecwiki.com/)

## 🙏 Acknowledgments

This project was created to help developers and security professionals understand the historical context of application security practices and vulnerabilities.
