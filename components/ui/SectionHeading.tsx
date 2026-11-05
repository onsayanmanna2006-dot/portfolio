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
    <Reveal className="mb-8 max-w-2xl md:mb-10">
      <p className="mb-2.5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-crimson-bright">
        <span className="h-px w-8 bg-crimson" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{subtitle}</p>}
    </Reveal>
  );
}
