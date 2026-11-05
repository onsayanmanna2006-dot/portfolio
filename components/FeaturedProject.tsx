import { featuredProject as p, moreProjects } from "@/data/portfolio";
import { withBasePath } from "@/lib/utils";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import Counter from "./ui/Counter";
import { ArrowUpRightIcon, CheckIcon, ChevronDownIcon, GithubIcon } from "./ui/Icons";

/**
 * Compact featured project card.
 *
 *  ┌──────────────────────┬────────────────────────────────┐
 *  │ Browser-framed shot  │ status · name · tagline        │
 *  │                      │ 91 users verified              │
 *  │                      │ tech chips · [Live] [Source]   │
 *  ├──────────────────────┴────────────────────────────────┤
 *  │ ▸ Read the case study   (expands: Problem/Solution/…) │
 *  └───────────────────────────────────────────────────────┘
 */
export default function FeaturedProject() {
  const live = p.liveUrl ? new URL(p.liveUrl) : null;
  const host = live ? live.host + live.pathname.replace(/\/$/, "") : "";

  return (
    <section id="projects" aria-labelledby="projects-heading" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
      <SectionHeading id="projects-heading" eyebrow="Projects" title="Selected Work" />

      <Reveal>
        <article
          aria-labelledby="certiproof-title"
          className="group/card relative overflow-hidden rounded-2xl border border-white/10 bg-forest/60 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-colors duration-300 hover:border-white/20"
        >
          {/* Top hairline accent */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson/70 to-transparent"
          />

          <div className="grid md:grid-cols-[1fr_1.05fr]">
            {/* ---------- Preview ---------- */}
            {p.image && (
              <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-forest-light/60 via-forest to-charcoal p-4 sm:p-5 md:border-b-0 md:border-r">
                <div aria-hidden="true" className="absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-crimson/20 blur-[80px]" />
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open the ${p.name} live demo (opens in a new tab)`}
                  className="relative block overflow-hidden rounded-lg border border-white/10 bg-charcoal shadow-xl shadow-black/50"
                >
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2.5 border-b border-white/10 bg-white/[0.03] px-3 py-2">
                    <span className="flex gap-1" aria-hidden="true">
                      <span className="h-2 w-2 rounded-full bg-white/15" />
                      <span className="h-2 w-2 rounded-full bg-white/15" />
                      <span className="h-2 w-2 rounded-full bg-white/15" />
                    </span>
                    <span className="min-w-0 flex-1 truncate rounded bg-white/5 px-2.5 py-0.5 text-center font-mono text-[10px] text-muted">
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
                    className="block aspect-[16/9] w-full object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-[1.03]"
                  />
                </a>
              </div>
            )}

            {/* ---------- Summary ---------- */}
            <div className="flex flex-col p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  Live · Midnight Preprod
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">Featured</span>
              </div>

              <h3 id="certiproof-title" className="mt-3 font-heading text-2xl font-bold tracking-tight">
                {p.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/75">{p.tagline}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.solution.intro}</p>

              {/* Key metric */}
              <div className="mt-4 flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="font-heading text-3xl font-bold leading-none tracking-tighter text-crimson-bright">
                  <Counter to={p.impact.stat} suffix={p.impact.statSuffix} />
                </span>
                <span className="text-xs leading-snug text-muted">
                  <span className="block text-sm font-semibold text-ink">Real {p.impact.statLabel}</span>
                  each one checkable on-chain
                </span>
              </div>

              {/* Tech */}
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
                {p.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10.5px] text-ink/75"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary px-4 py-2 text-[13px]">
                    Live Demo <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline px-4 py-2 text-[13px]">
                    <GithubIcon className="h-3.5 w-3.5" /> Source
                    <span className="sr-only">on GitHub (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ---------- Expandable case study (native, keyboard-accessible) ---------- */}
          <details className="group/cs border-t border-white/10 bg-charcoal/40">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 text-[13px] font-semibold text-ink/85 transition-colors hover:text-ink sm:px-6 [&::-webkit-details-marker]:hidden">
              <span>
                Read the case study
                <span className="ml-2 font-normal text-muted">Problem · Solution · What I learned</span>
              </span>
              <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-open/cs:rotate-180" />
            </summary>

            <div className="grid divide-y divide-white/10 border-t border-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
              <div className="p-5 sm:p-6">
                <StepLabel n="01" label="Problem" />
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.problem}</p>
              </div>
              <div className="p-5 sm:p-6">
                <StepLabel n="02" label="Solution" />
                <ul className="mt-2.5 space-y-1.5">
                  {p.solution.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm leading-snug text-muted">
                      <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-crimson-bright" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 sm:p-6">
                <StepLabel n="03" label="What I learned" />
                <ul className="mt-2.5 space-y-1.5">
                  {p.learned.map((l) => (
                    <li key={l} className="flex gap-2 text-sm leading-snug text-muted">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-crimson-bright" aria-hidden="true" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        </article>
      </Reveal>

      {/* ---------- More projects ---------- */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {moreProjects.map((mp, i) => (
          <Reveal key={mp.name} delay={i * 0.1}>
            <article className="glass glass-hover h-full p-5">
              <h3 className="font-heading text-lg font-semibold">{mp.name}</h3>
              <p className="mt-1 text-sm text-muted">{mp.tagline}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {mp.tech.map((t) => (
                  <li key={t} className="chip">{t}</li>
                ))}
              </ul>
              <div className="mt-4 flex gap-4 text-sm font-semibold">
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
          <p className="flex items-center justify-center gap-2.5 rounded-xl border border-dashed border-white/10 px-5 py-3.5 text-center text-[13px] text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" aria-hidden="true" />
            <span>
              <span className="font-semibold text-ink/85">More projects coming soon</span> · full-stack, AI/ML and zero-knowledge
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** Small numbered label used inside the case study. */
function StepLabel({ n, label }: { n: string; label: string }) {
  return (
    <h4 className="flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-[0.18em]">
      <span className="font-mono text-crimson-bright">{n}</span>
      <span className="text-ink">{label}</span>
    </h4>
  );
}
