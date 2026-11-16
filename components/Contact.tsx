"use client";

import { useState } from "react";
import { contact, profile } from "@/data/portfolio";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { ArrowUpRightIcon, CheckIcon, CopyIcon, DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from "./ui/Icons";

/** Contact: big email CTA with copy-to-clipboard + social cards. */
export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard unavailable (e.g. insecure context) — the mailto link still works. */
    }
  };

  // On phones a mailto: link silently does nothing when no mail app is set up
  // (or inside in-app browsers like Instagram/LinkedIn). If the page is still
  // visible shortly after the tap, assume nothing opened and offer a fallback.
  const [mailFallback, setMailFallback] = useState(false);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.email)}`;

  const handleMailClick = () => {
    let left = false;
    const markLeft = () => { left = true; };
    window.addEventListener("blur", markLeft, { once: true });
    document.addEventListener("visibilitychange", markLeft, { once: true });
    setTimeout(() => {
      window.removeEventListener("blur", markLeft);
      document.removeEventListener("visibilitychange", markLeft);
      if (!left && document.visibilityState === "visible") {
        setMailFallback(true);
        navigator.clipboard?.writeText(contact.email).catch(() => {});
      }
    }, 1200);
  };

  const socials = [
    { label: "GitHub", handle: contact.github.replace(/^https?:\/\/(www\.)?/, ""), href: contact.github, Icon: GithubIcon },
    { label: "LinkedIn", handle: contact.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\//, "").replace(/\/$/, ""), href: contact.linkedin, Icon: LinkedinIcon },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
      <SectionHeading
        id="contact-heading"
        eyebrow="Contact"
        title="Let's build something."
        subtitle="Internships, hackathon teams, collaborations or just a chat about ZK and AI — my inbox is open."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Email card */}
        <Reveal className="min-w-0">
          <div className="glass glass-hover flex h-full flex-col justify-between gap-6 overflow-hidden bg-gradient-to-br from-forest/80 to-charcoal/60 p-6 sm:p-7">
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-crimson/20 blur-[90px]" />
            <div className="relative">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                <MailIcon className="h-4 w-4 text-crimson-bright" /> Email me at
              </p>
              <a
                href={`mailto:${contact.email}`}
                onClick={handleMailClick}
                className="mt-2 block font-heading text-lg font-semibold transition-colors [overflow-wrap:anywhere] hover:text-crimson-bright min-[400px]:text-xl sm:text-2xl"
              >
                {contact.email}
              </a>
            </div>
            <div className="relative flex flex-wrap gap-2.5">
              <a href={`mailto:${contact.email}`} onClick={handleMailClick} className="btn-primary px-5 py-2.5">
                Send an email <ArrowUpRightIcon />
              </a>
              <button type="button" onClick={copyEmail} className="btn-outline px-5 py-2.5" aria-live="polite">
                {copied ? <CheckIcon /> : <CopyIcon />}
                {copied ? "Copied!" : "Copy address"}
              </button>
              {profile.resumeUrl && (
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  <DownloadIcon /> Resume
                </a>
              )}
            </div>
            {mailFallback && (
              <p role="status" className="relative text-sm text-muted">
                No mail app opened — the address is copied to your clipboard.{" "}
                <a href={gmailUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-crimson-bright underline underline-offset-2">
                  Open in Gmail
                </a>
              </p>
            )}
          </div>
        </Reveal>

        {/* Social cards */}
        <ul className="grid min-w-0 grid-cols-1 gap-4">
          {socials.map(({ label, handle, href, Icon }, i) => (
            <li key={label}>
              <Reveal delay={0.1 + i * 0.1} className="h-full">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-hover group flex h-full items-center gap-4 p-5"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 transition-colors group-hover:border-crimson group-hover:bg-crimson">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-heading text-base font-semibold">{label}</span>
                    <span className="block truncate text-sm text-muted">{handle}</span>
                  </span>
                  <ArrowUpRightIcon className="h-5 w-5 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-crimson-bright" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
