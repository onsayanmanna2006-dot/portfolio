/**
 * Fixed, full-page animated backdrop:
 * a slowly shifting charcoal ↔ forest gradient with soft crimson glow spots
 * and a faint grain/grid. Pure CSS — no JS cost. Paused under reduced motion.
 */
export default function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 animate-gradient bg-[linear-gradient(120deg,#171717_0%,#06110c_35%,#171717_60%,#06110c_100%)] bg-[length:300%_300%]" />

      {/* Glow spots */}
      <div className="absolute -left-[10%] top-[5%] h-[45vmax] w-[45vmax] animate-drift rounded-full bg-crimson/[0.12] blur-[120px]" />
      <div className="absolute -right-[15%] top-[40%] h-[50vmax] w-[50vmax] animate-drift-slow rounded-full bg-forest-light/60 blur-[120px]" />
      <div className="absolute bottom-[-15%] left-[30%] h-[35vmax] w-[35vmax] animate-drift rounded-full bg-crimson/[0.08] blur-[120px]" />

      {/* Subtle grid that fades toward the edges */}
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,10,0.7)_100%)]" />
    </div>
  );
}
