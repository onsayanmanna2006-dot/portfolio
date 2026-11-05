import { featuredProject as p, moreProjects } from "@/data/portfolio";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import Counter from "./ui/Counter";
import { ArrowUpRightIcon, CheckIcon, GithubIcon, ShieldIcon, SparkIcon } from "./ui/Icons";

/**
 * Featured case study: Problem → Solution → Impact,
 * with a big animated stat, what I learned, tech stack and links.
 * Followed by any extra projects, or a "coming soon" placeholder.
 */
export default function FeaturedProject() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        id="projects-heading"
        eyebrow="Featured Project"
        title={p.name}
        subtitle={p.tagline}
      />

      <Reveal>
        <article
          aria-label={`${p.name} case study`}
          className="glass group overflow-hidden border-white/10 bg-gradient-to-br from-forest/80 via-forest/50 to-charcoal/60"
        >
          {/* Decorative glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-crimson/20 blur-[100px] transition-opacity duration-500 group-hover:opacity-100 md:opacity-70"
          />

          <div className="relative grid gap-px bg-white/5 lg:grid-cols-[1fr_340px]">
            {/* ---------- Left: story ---------- */}
            <div className="space-y-10 bg-forest/60 p-7 sm:p-10">
              {/* Problem */}
              <div>
                <StepLabel n="01" label="Problem" />
                <p className="mt-3 text-lg leading-relaxed text-ink/90">{p.problem}</p>
              </div>

              {/* Solution */}
              <div>
                <StepLabel n="02" label="Solution" />
                <p className="mt-3 text-lg leading-relaxed text-ink/90">{p.solution.intro}</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {p.solution.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-crimson text-white">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span className="text-sm leading-relaxed text-ink/90">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact */}
              <div>
                <StepLabel n="03" label="Impact" />
                <p className="mt-3 text-lg leading-relaxed text-ink/90">{p.impact.text}</p>
              </div>

              {/* What I learned */}
              <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6">
                <h3 className="flex items-center gap-2 font-heading text-base font-semibold">
                  <SparkIcon className="h-5 w-5 text-crimson-bright" />
                  What I learned
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {p.learned.map((l) => (
                    <li key={l} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson-bright" aria-hidden="true" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ---------- Right: stat + tech + links ---------- */}
            <aside className="flex flex-col gap-8 bg-forest/40 p-7 sm:p-10">
              <div className="rounded-2xl border border-crimson/30 bg-crimson/[0.07] p-6 text-center">
                <ShieldIcon className="mx-auto h-7 w-7 text-crimson-bright" />
                <p className="mt-3 font-heading text-7xl font-bold leading-none tracking-tighter text-crimson-bright md:text-8xl">
                  <Counter to={p.impact.stat} suffix={p.impact.statSuffix} />
                </p>
                <p className="mt-2 font-heading text-lg font-semibold">{p.impact.statLabel}</p>
                <p className="mt-1 text-xs text-muted">on Midnight Preprod · each checkable on-chain</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Tech stack</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto flex flex-col gap-3">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
                    Live Demo <ArrowUpRightIcon />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline w-full">
                    <GithubIcon className="h-4 w-4" /> GitHub
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </aside>
          </div>
        </article>
      </Reveal>

      {/* ---------- More projects ---------- */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {moreProjects.map((mp, i) => (
          <Reveal key={mp.name} delay={i * 0.1}>
            <article className="glass glass-hover h-full p-7">
              <h3 className="font-heading text-xl font-semibold">{mp.name}</h3>
              <p className="mt-2 text-muted">{mp.tagline}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {mp.tech.map((t) => (
                  <li key={t} className="chip">{t}</li>
                ))}
              </ul>
              <div className="mt-6 flex gap-4 text-sm font-semibold">
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
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 p-10 text-center">
            <div className="mb-4 flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 animate-pulse rounded-full bg-crimson" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-crimson [animation-delay:200ms]" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-crimson [animation-delay:400ms]" />
            </div>
            <p className="font-heading text-xl font-semibold">More projects coming soon</p>
            <p className="mt-2 max-w-md text-sm text-muted">
              Currently building in full-stack, AI/ML and zero-knowledge. Follow along on GitHub.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Small numbered label used for Problem / Solution / Impact. */
function StepLabel({ n, label }: { n: string; label: string }) {
  return (
    <h3 className="flex items-center gap-3 font-heading text-sm font-semibold uppercase tracking-[0.2em]">
      <span className="text-crimson-bright">{n}</span>
      <span className="h-px w-6 bg-white/20" aria-hidden="true" />
      <span className="text-ink">{label}</span>
    </h3>
  );
}
