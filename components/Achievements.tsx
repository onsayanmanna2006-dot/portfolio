import { achievements } from "@/data/portfolio";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { TrophyIcon } from "./ui/Icons";

/** Achievements as a vertical timeline of glass cards. */
export default function Achievements() {
  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="border-y border-white/5 bg-forest/40 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="achievements-heading" eyebrow="Achievements" title="Milestones so far." />

        <ol className="relative grid gap-4 md:grid-cols-3">
          {achievements.map((a, i) => (
            <li key={a.title}>
              <Reveal delay={i * 0.1} className="h-full">
                <article className="glass glass-hover flex h-full gap-4 p-5">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-crimson text-white">
                    <TrophyIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold">{a.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.description}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
