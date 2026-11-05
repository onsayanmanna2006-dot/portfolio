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
      className="border-y border-white/5 bg-forest/40 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="achievements-heading" eyebrow="Achievements" title="Milestones so far." />

        <ol className="relative grid gap-5 md:grid-cols-2">
          {achievements.map((a, i) => (
            <li key={a.title}>
              <Reveal delay={i * 0.1} className="h-full">
                <article className="glass glass-hover flex h-full gap-5 p-6 md:p-7">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-crimson text-white">
                    <TrophyIcon />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold">{a.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{a.description}</p>
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
