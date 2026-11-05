"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolio";
import { useMediaQuery } from "@/lib/hooks";
import { ArrowDownIcon, DownloadIcon, MapPinIcon } from "./ui/Icons";

/* The 3D scene is client-only and code-split so it never blocks first paint. */
const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

/** Lightweight placeholder shown while three.js loads. */
function SceneFallback() {
  return (
    <div className="grid h-full w-full place-items-center" aria-hidden="true">
      <div className="h-40 w-40 rotate-45 rounded-3xl border border-crimson/40 bg-forest/60 shadow-glow" />
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const reduce = useReducedMotion() ?? false;

  // Pause the WebGL render loop when the hero is scrolled out of view (saves battery/GPU)
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const [first, ...rest] = profile.name.split(" ");

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-6 px-5 pb-16 pt-24 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-4 lg:pt-16"
    >
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

      {/* ---------- 3D scene ---------- */}
      <motion.div
        ref={sceneRef}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative order-1 h-[300px] w-full sm:h-[380px] lg:order-2 lg:h-[560px]"
      >
        {/* Soft glow behind the crystal */}
        <div
          aria-hidden="true"
          className="absolute inset-[15%] rounded-full bg-crimson/20 blur-[90px]"
        />
        <HeroScene lite={isMobile} paused={!visible} reducedMotion={reduce} />
      </motion.div>

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
