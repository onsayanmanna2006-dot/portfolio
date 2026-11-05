import { profile } from "@/data/portfolio";
import { withBasePath } from "@/lib/utils";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import Monogram from "./ui/Monogram";
import { GraduationIcon, MapPinIcon } from "./ui/Icons";

/** About: photo (or SM monogram) + bio + quick facts. */
export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading id="about-heading" eyebrow="About" title="A builder who learns by shipping." />

      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
        {/* Photo or monogram */}
        <Reveal className="mx-auto w-full max-w-[280px] md:max-w-none">
          {profile.photo ? (
            // Plain <img> so it works for static export (GitHub Pages) without image optimization.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={withBasePath(profile.photo)}
              alt={`Portrait of ${profile.name}`}
              className="aspect-square w-full rounded-[2rem] border border-white/10 object-cover"
            />
          ) : (
            <Monogram initials={profile.initials} className="w-full" />
          )}
        </Reveal>

        <div>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-ink/90 md:text-xl">{profile.bio}</p>
          </Reveal>

          <Reveal delay={0.2} className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="glass glass-hover p-5">
              <GraduationIcon className="mb-3 h-6 w-6 text-crimson-bright" />
              <p className="font-heading font-semibold">{profile.education.degree}</p>
              <p className="mt-1 text-sm text-muted">{profile.education.school}</p>
              <p className="mt-1 text-sm text-muted">{profile.education.status}</p>
            </div>
            <div className="glass glass-hover p-5">
              <MapPinIcon className="mb-3 h-6 w-6 text-crimson-bright" />
              <p className="font-heading font-semibold">Based in</p>
              <p className="mt-1 text-sm text-muted">{profile.location}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
