import Reveal from "./Reveal";

/** Consistent section header: small crimson eyebrow + large title + optional subtitle. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  id?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-2xl md:mb-16">
      <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-crimson-bright">
        <span className="h-px w-8 bg-crimson" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
