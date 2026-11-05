import { profile } from "@/data/portfolio";
import { withBasePath } from "@/lib/utils";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import Monogram from "./ui/Monogram";
import { GraduationIcon, MapPinIcon } from "./ui/Icons";

/** About: photo (or SM monogram) + bio + quick facts, in a compact two-column layout. */
export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
      <SectionHeading id="about-heading" eyebrow="About" title="A builder who learns by shipping." />

      <div className="grid items-center gap-8 md:grid-cols-[200px_1fr] md:gap-12">
        {/* Photo or monogram */}
        <Reveal className="w-full max-w-[120px] md:max-w-none">
          {profile.photo ? (
            // Plain <img> so it works for static export (GitHub Pages) without image optimization.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={withBasePath(profile.photo)}
              alt={`Portrait of ${profile.name}`}
              className="aspect-square w-full rounded-[2rem] border border-white/10 object-cover"
            />
          ) : (
            <Monogram initials={profile.initials} className="w-full [&>span]:text-[clamp(3rem,8vw,4.5rem)]" />
          )}
        </Reveal>

        <div>
          <Reveal delay={0.1}>
            <p className="max-w-3xl text-base leading-relaxed text-ink/85 md:text-lg">{profile.bio}</p>
          </Reveal>

          {/* Quick facts */}
          <Reveal delay={0.2}>
            <dl className="mt-6 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
              <div className="flex items-start gap-3 bg-forest/70 p-4">
                <GraduationIcon className="mt-0.5 h-5 w-5 shrink-0 text-crimson-bright" />
                <div>
                  <dt className="sr-only">Education</dt>
                  <dd className="text-sm font-semibold">{profile.education.degree}</dd>
                  <dd className="mt-0.5 text-xs text-muted">
                    {profile.education.school} · {profile.education.status}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-forest/70 p-4">
                <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-crimson-bright" />
                <div>
                  <dt className="sr-only">Location</dt>
                  <dd className="text-sm font-semibold">Based in {profile.location.split(",")[0]}</dd>
                  <dd className="mt-0.5 text-xs text-muted">{profile.location}</dd>
                </div>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
