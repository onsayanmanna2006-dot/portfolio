# Sayan Manna — Portfolio

Personal portfolio built with **Next.js (App Router) + TypeScript + Tailwind CSS**, **React Three Fiber** for the 3D hero, and **Framer Motion** for animations.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # TypeScript check
```

## Editing content

**Everything lives in [`data/portfolio.ts`](data/portfolio.ts)**: name, bio, skills, projects, achievements, links.

- **Add a photo:** put `sayan.jpg` in `public/` and set `profile.photo = "/sayan.jpg"`.
- **Add a resume:** put the PDF in `public/` and set `profile.resumeUrl = "/Sayan-Manna-Resume.pdf"`. Resume buttons then appear in the Hero and Contact sections.
- **Add projects:** add entries to `moreProjects`.
- **Live domain:** update `site.url` (used for Open Graph / SEO).

## Project structure

```
app/            layout (fonts, SEO), page, globals.css, icon.svg (favicon), opengraph-image.tsx
components/     one file per section (Navbar, Hero, About, Skills, FeaturedProject, Achievements, Contact, Footer)
components/three/HeroScene.tsx   the interactive 3D crystal + particles
components/ui/  Reveal (scroll animation), Counter, SectionHeading, Monogram, Icons
data/           portfolio.ts (all content)
lib/            helpers + hooks
```

## Deploy

- **Vercel:** import the GitHub repo at vercel.com/new. No configuration is needed.
- **GitHub Pages:** in your repo go to Settings → Pages → Source: **GitHub Actions**. `.github/workflows/deploy-pages.yml` builds a static export on every push to `main`.

## Performance and accessibility notes

- The 3D scene is code-split and client-only. It pauses when the hero scrolls out of view, and on mobile it uses fewer particles and a lower pixel ratio.
- `prefers-reduced-motion` freezes the 3D scene, CSS animations, smooth scroll and Framer Motion transforms.
- The site includes semantic landmarks, a skip link, visible focus rings, ARIA labels on icon links, and text colors with at least 4.5:1 contrast.
