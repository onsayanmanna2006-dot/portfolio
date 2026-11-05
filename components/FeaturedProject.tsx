import { featuredProject as p, moreProjects } from "@/data/portfolio";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import Counter from "./ui/Counter";
import { ArrowUpRightIcon, CheckIcon, GithubIcon } from "./ui/Icons";

/**
 * Compact featured case study.
 *
 *  ┌ header: name + tagline ─────────────── [Live Demo] [GitHub] ┐
 *  ├ 01 Problem      │ 02 Solution        │ 03 Impact (stat)     ┤
 *  └ What I learned                       │ Tech stack           ┘
 *
 * Followed by any extra projects, or a "coming soon" placeholder.
 */
export default function FeaturedProject() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-28">
      <SectionHeading
        id="projects-heading"
        eyebrow="Projects"
        title="Selected Work"
        subtitle="A closer look at what I've built: the problem, the approach, and the measurable result."
      />

      <Reveal>
        <article
          aria-labelledby="certiproof-title"
          className="glass overflow-hidden bg-gradient-to-br from-forest/80 via-forest/50 to-charcoal/60"
        >
          {/* Decorative glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-crimson/15 blur-[90px]"
          />

          {/* ---------- Header ---------- */}
          <header className="relative flex flex-col gap-5 border-b border-white/10 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-crimson-bright">Case study</p>
              <h3 id="certiproof-title" className="mt-1.5 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                {p.name}
              </h3>
              <p className="mt-1 text-sm text-muted sm:text-base">{p.tagline}</p>
            </div>
            <div className="flex shrink-0 gap-2.5">
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary px-5 py-2.5">
                  Live Demo <ArrowUpRightIcon />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {p.githubUrl && (
                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline px-5 py-2.5">
                  <GithubIcon className="h-4 w-4" /> GitHub
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          </header>

          {/* ---------- Problem → Solution → Impact ---------- */}
          <div className="relative grid divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
            <div className="p-6 sm:p-8">
              <StepLabel n="01" label="Problem" />
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{p.problem}</p>
            </div>

            <div className="p-6 sm:p-8">
              <StepLabel n="02" label="Solution" />
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{p.solution.intro}</p>
              <ul className="mt-3 space-y-2">
                {p.solution.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm leading-snug text-ink/80">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-crimson-bright" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 sm:p-8">
              <StepLabel n="03" label="Impact" />
              <p className="mt-3 flex items-baseline gap-2">
                <span className="font-heading text-5xl font-bold leading-none tracking-tighter text-crimson-bright">
                  <Counter to={p.impact.stat} suffix={p.impact.statSuffix} />
                </span>
                <span className="font-heading text-base font-semibold">{p.impact.statLabel}</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{p.impact.text}</p>
            </div>
          </div>

          {/* ---------- Learned + tech ---------- */}
          <footer className="relative grid gap-6 border-t border-white/10 bg-charcoal/30 p-6 sm:p-8 md:grid-cols-[1.6fr_1fr] md:gap-10">
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">What I learned</h4>
              <ul className="mt-3 space-y-1.5">
                {p.learned.map((l) => (
                  <li key={l} className="flex gap-2.5 text-sm leading-relaxed text-ink/80">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-crimson-bright" aria-hidden="true" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Tech stack</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </footer>
        </article>
      </Reveal>

      {/* ---------- More projects ---------- */}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {moreProjects.map((mp, i) => (
          <Reveal key={mp.name} delay={i * 0.1}>
            <article className="glass glass-hover h-full p-6">
              <h3 className="font-heading text-lg font-semibold">{mp.name}</h3>
              <p className="mt-1.5 text-sm text-muted">{mp.tagline}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {mp.tech.map((t) => (
                  <li key={t} className="chip">{t}</li>
                ))}
              </ul>
              <div className="mt-5 flex gap-4 text-sm font-semibold">
                {mp.liveUrl && (
                  <a href={mp.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-crimson-bright hover:underline">
                    Live <ArrowUpRightIcon />
                  </a>
                )}
                {mp.githubUrl && (
                  <a href={mp.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-ink hover:text-crimson-bright">
                    GitHub <ArrowUpRightIcon />
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal delay={0.1} className={moreProjects.length % 2 === 0 ? "md:col-span-2" : ""}>
          <div className="flex h-full flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-white/15 px-6 py-7 text-center sm:flex-row sm:gap-3">
            <span className="flex gap-1" aria-hidden="true">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson [animation-delay:200ms]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson [animation-delay:400ms]" />
            </span>
            <p className="font-heading text-base font-semibold">More projects coming soon</p>
            <p className="text-sm text-muted">· Building in full-stack, AI/ML and zero-knowledge.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Small numbered label used for Problem / Solution / Impact. */
function StepLabel({ n, label }: { n: string; label: string }) {
  return (
    <h4 className="flex items-center gap-2.5 font-heading text-xs font-semibold uppercase tracking-[0.2em]">
      <span className="text-crimson-bright">{n}</span>
      <span className="h-px w-5 bg-white/20" aria-hidden="true" />
      <span className="text-ink">{label}</span>
    </h4>
  );
}
