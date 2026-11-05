import { skills, type SkillGroup } from "@/data/portfolio";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { BlocksIcon, CodeIcon, LayersIcon } from "./ui/Icons";

const icons: Record<SkillGroup["icon"], React.ComponentType<{ className?: string }>> = {
  code: CodeIcon,
  layers: LayersIcon,
  blocks: BlocksIcon,
};

/** Skills grouped into glass cards. */
export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative border-y border-white/5 bg-forest/40 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="skills-heading"
          eyebrow="Skills"
          title="What I work with."
          subtitle="A mix of solid fundamentals, full-stack and AI/ML focus, and privacy-preserving blockchain tech."
        />

        <ul className="grid gap-5 md:grid-cols-3">
          {skills.map((group, i) => {
            const Icon = icons[group.icon];
            return (
              <li key={group.title}>
                <Reveal delay={i * 0.1} className="h-full">
                  <article className="glass glass-hover group h-full p-7">
                    <div className="mb-6 grid h-12 w-12 place-items-center rounded-xl border border-crimson/30 bg-crimson/10 text-crimson-bright transition-colors group-hover:bg-crimson group-hover:text-white">
                      <Icon />
                    </div>
                    <h3 className="font-heading text-xl font-semibold">{group.title}</h3>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
                      {group.items.map((skill) => (
                        <li key={skill} className="chip">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
