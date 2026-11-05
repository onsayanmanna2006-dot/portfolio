import { featuredProject as p, moreProjects } from "@/data/portfolio";
import { withBasePath } from "@/lib/utils";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import Counter from "./ui/Counter";
import { ArrowUpRightIcon, CheckIcon, GithubIcon } from "./ui/Icons";

/**
 * Featured case study.
 *
 *  ┌──────────────────────────────┬──────────────────────────┐
 *  │  Browser-framed screenshot   │  Name · tagline          │
 *  │  (links to live demo)        │  91 users verified       │
 *  │                              │  Tech · [Live] [GitHub]  │
 *  ├──────────────┬───────────────┴──┬───────────────────────┤
 *  │ 01 Problem   │ 02 Solution      │ 03 What I learned     │
 *  └──────────────┴──────────────────┴───────────────────────┘
 */
export default function FeaturedProject() {
  const host = p.liveUrl ? new URL(p.liveUrl).host + new URL(p.liveUrl).pathname.replace(/\/$/, "") : "";

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
          className="group/card relative overflow-hidden rounded-2xl border border-white/10 bg-forest/60 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl"
        >
          {/* Top hairline accent */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson/70 to-transparent"
          />

          {/* ================= Top: preview + summary ================= */}
          <div className="grid lg:grid-cols-[1.25fr_1fr]">
            {/* ---------- Preview ---------- */}
            <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-forest-light/60 via-forest to-charcoal p-5 sm:p-8 lg:border-b-0 lg:border-r">
              {/* Soft glow behind the screenshot */}
              <div aria-hidden="true" className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-crimson/20 blur-[90px]" />

              {p.image ? (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open the ${p.name} live demo (opens in a new tab)`}
                  className="relative block overflow-hidden rounded-xl border border-white/10 bg-charcoal shadow-2xl shadow-black/50 transition-transform duration-500 ease-out group-hover/card:-translate-y-1"
                >
                  {/* Browser chrome */}
                  <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-3.5 py-2.5">
                    <span className="flex gap-1.5" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    </span>
                    <span className="min-w-0 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-center font-mono text-[11px] text-muted">
                      {host}
                    </span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={withBasePath(p.image)}
                    alt={p.imageAlt ?? `${p.name} screenshot`}
                    loading="lazy"
                    width={1440}
                    height={778}
                    className="block aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-[1.03]"
                  />
                </a>
              ) : null}
            </div>

            {/* ---------- Summary ---------- */}
            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Live on Midnight Preprod
              </div>

              <h3 id="certiproof-title" className="mt-4 font-heading text-3xl font-bold tracking-tight">
                {p.name}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink/80">{p.tagline}</p>

              {/* Key metric */}
              <div className="mt-6 flex items-center gap-4 border-y border-white/10 py-5">
                <span className="font-heading text-5xl font-bold leading-none tracking-tighter text-crimson-bright">
                  <Counter to={p.impact.stat} suffix={p.impact.statSuffix} />
                </span>
                <span className="text-sm leading-snug text-muted">
                  <span className="block font-semibold text-ink">Real {p.impact.statLabel}</span>
                  each one checkable on-chain
                </span>
              </div>

              {/* Tech */}
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
                {p.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-ink/80"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div className="mt-auto flex flex-wrap gap-2.5 pt-7">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary px-5 py-2.5">
                    Live Demo <ArrowUpRightIcon />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline px-5 py-2.5">
                    <GithubIcon className="h-4 w-4" /> Source
                    <span className="sr-only">on GitHub (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ================= Bottom: case-study strip ================= */}
          <div className="grid divide-y divide-white/10 border-t border-white/10 bg-charcoal/40 md:grid-cols-3 md:divide-x md:divide-y-0">
            <div className="p-6 sm:p-7">
              <StepLabel n="01" label="Problem" />
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.problem}</p>
            </div>

            <div className="p-6 sm:p-7">
              <StepLabel n="02" label="Solution" />
              <ul className="mt-3 space-y-2">
                {p.solution.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm leading-snug text-muted">
                    <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-crimson-bright" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 sm:p-7">
              <StepLabel n="03" label="What I learned" />
              <ul className="mt-3 space-y-2">
                {p.learned.map((l) => (
                  <li key={l} className="flex gap-2.5 text-sm leading-snug text-muted">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-crimson-bright" aria-hidden="true" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
          <div className="flex h-full flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-white/15 px-6 py-6 text-center sm:flex-row sm:gap-3">
            <span className="flex gap-1" aria-hidden="true">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson [animation-delay:200ms]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson [animation-delay:400ms]" />
            </span>
            <p className="font-heading text-sm font-semibold">More projects coming soon</p>
            <p className="text-sm text-muted">· Building in full-stack, AI/ML and zero-knowledge.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Small numbered label used for the case-study strip. */
function StepLabel({ n, label }: { n: string; label: string }) {
  return (
    <h4 className="flex items-center gap-2.5 font-heading text-xs font-semibold uppercase tracking-[0.18em]">
      <span className="font-mono text-crimson-bright">{n}</span>
      <span className="text-ink">{label}</span>
    </h4>
  );
}
