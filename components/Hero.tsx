"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolio";
import { useMediaQuery } from "@/lib/hooks";
import type { Anchor } from "./three/HeroScene";
import { ArrowDownIcon, DownloadIcon, MapPinIcon } from "./ui/Icons";

/* The 3D scene is client-only and code-split so it never blocks first paint. */
const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

/**
 * Hero layout:
 *  - One full-width WebGL canvas sits behind the whole section, so the star
 *    field covers the entire screen (including behind the name).
 *  - An invisible "anchor" box (right column on desktop, top on mobile) tells
 *    the 3D scene where to place the crystal, so it always lines up with the layout.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const [visible, setVisible] = useState(true);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const reduce = useReducedMotion() ?? false;

  // Pause the WebGL render loop when the hero is scrolled out of view (saves battery/GPU)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Measure the anchor box (relative to the section) whenever the layout changes
  useEffect(() => {
    const section = sectionRef.current;
    const box = anchorRef.current;
    if (!section || !box) return;
    const measure = () => {
      const s = section.getBoundingClientRect();
      const b = box.getBoundingClientRect();
      setAnchor({ x: b.left - s.left, y: b.top - s.top, w: b.width, h: b.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  const [first, ...rest] = profile.name.split(" ");

  return (
    <section id="top" ref={sectionRef} aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* ---------- Full-section 3D background (stars + crystal) ---------- */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0"
      >
        {/* Soft crimson glow behind the crystal (drawn under the canvas) */}
        {anchor && (
          <div
            className="absolute rounded-full bg-crimson/20 blur-[90px]"
            style={{
              left: anchor.x + anchor.w * 0.15,
              top: anchor.y + anchor.h * 0.15,
              width: anchor.w * 0.7,
              height: anchor.h * 0.7,
            }}
          />
        )}
        <HeroScene lite={isMobile} paused={!visible} reducedMotion={reduce} anchor={anchor} />
      </motion.div>

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-6 px-5 pb-16 pt-24 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-4 lg:pt-16">
        {/* ---------- Copy ---------- */}
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 order-2 lg:order-1">
          {profile.status && (
            <motion.p
              variants={item}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson-bright" />
              </span>
              {profile.status}
            </motion.p>
          )}

          <motion.h1
            id="hero-heading"
            variants={item}
            className="font-heading text-5xl font-bold leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            {first} <span className="gradient-text">{rest.join(" ")}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 font-heading text-lg font-medium text-ink/90 sm:text-xl">
            {profile.title}
          </motion.p>

          <motion.p variants={item} className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.tagline}
          </motion.p>

          <motion.p variants={item} className="mt-4 flex items-center gap-2 text-sm text-muted">
            <MapPinIcon className="h-4 w-4 text-crimson-bright" />
            {profile.location}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              View Projects
              <ArrowDownIcon />
            </a>
            <a href="#contact" className="btn-outline">
              Contact Me
            </a>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} className="btn-outline" target="_blank" rel="noopener noreferrer">
                <DownloadIcon /> Resume
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* ---------- Crystal anchor (empty box the 3D crystal is centred in) ---------- */}
        <div
          ref={anchorRef}
          aria-hidden="true"
          className="relative order-1 h-[300px] w-full sm:h-[380px] lg:order-2 lg:h-[560px]"
        />
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted transition-colors hover:text-ink md:flex"
      >
        Scroll
        <span className="h-10 w-px bg-gradient-to-b from-crimson to-transparent" />
      </a>
    </section>
  );
}
