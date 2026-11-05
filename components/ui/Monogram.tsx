import { cn } from "@/lib/utils";

/**
 * Stylish "SM" monogram used in place of a profile photo.
 * Layered gradient ring + glass tile + subtle crimson glow.
 */
export default function Monogram({ initials, className }: { initials: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${initials} monogram`}
      className={cn("relative grid aspect-square place-items-center", className)}
    >
      {/* Glow */}
      <div className="absolute inset-[12%] rounded-full bg-crimson/30 blur-3xl" aria-hidden="true" />
      {/* Gradient ring */}
      <div
        className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-crimson via-forest-light to-forest p-[2px]"
        aria-hidden="true"
      >
        <div className="h-full w-full rounded-[calc(2rem-2px)] bg-gradient-to-br from-forest via-charcoal to-forest" />
      </div>
      {/* Grid texture */}
      <div
        className="absolute inset-[2px] rounded-[calc(2rem-2px)] opacity-[0.15] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]"
        aria-hidden="true"
      />
      <span
        className="relative font-heading text-[clamp(4rem,12vw,7.5rem)] font-bold leading-none tracking-tighter text-ink"
        aria-hidden="true"
      >
        {initials.charAt(0)}
        <span className="text-crimson-bright">{initials.slice(1)}</span>
      </span>
    </div>
  );
}
