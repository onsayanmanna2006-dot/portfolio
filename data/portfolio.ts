/**
 * ============================================================
 *  ALL PORTFOLIO CONTENT LIVES HERE.
 *  Edit this file to update text, links, skills and projects.
 *  Components read from this file — you shouldn't need to touch them.
 * ============================================================
 */

/* ---------- Types (keep these so TypeScript catches typos) ---------- */

export type SkillGroup = {
  title: string;
  icon: "code" | "layers" | "blocks"; // icon names map to components/ui/Icons.tsx
  items: string[];
};

export type Project = {
  name: string;
  tagline: string;
  problem: string;
  solution: { intro: string; points: string[] };
  impact: { stat: number; statSuffix?: string; statLabel: string; text: string };
  learned: string[];
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
};

/* ---------- Site / SEO ---------- */

export const site = {
  // Change this to your real domain once deployed (used for Open Graph / canonical URLs).
  // Can also be overridden with the NEXT_PUBLIC_SITE_URL environment variable.
  url: "https://sayanmanna.vercel.app",
  title: "Sayan Manna | Full-Stack & AI/ML Developer",
  description:
    "Portfolio of Sayan Manna — B.Tech CSE (AI & ML) student in Kolkata building full-stack web apps, AI/ML projects and zero-knowledge apps on the Midnight blockchain.",
  keywords: [
    "Sayan Manna",
    "Full-Stack Developer",
    "AI/ML",
    "Python",
    "Midnight blockchain",
    "Zero-Knowledge Proofs",
    "Kolkata",
  ],
};

/* ---------- About me ---------- */

export const profile = {
  name: "Sayan Manna",
  initials: "SM",
  title: "Full-Stack Developer | AI/ML | Python",
  /** Small badge above your name in the hero. Set to null to hide it. */
  status: "Open to internships & hackathons" as string | null,
  tagline: "I build full-stack apps and privacy-first tools with AI/ML and zero-knowledge proofs.",
  location: "Kolkata, West Bengal, India",
  education: {
    degree: "B.Tech CSE (AI & ML)",
    school: "Narula Institute of Technology",
    status: "2nd year · Graduating 2029",
  },
  bio: "I'm Sayan Manna, a B.Tech CSE (AI & ML) student at Narula Institute of Technology, Kolkata. I build full-stack web applications and explore AI/ML and blockchain to solve real-world problems. I enjoy learning fast, shipping projects, and collaborating at hackathons.",

  /**
   * PHOTO — set to a path inside /public, e.g. "/sayan.jpg" (put the file at public/sayan.jpg).
   * While null, a stylish "SM" monogram is shown instead.
   */
  photo: null as string | null,

  /**
   * RESUME — set to a PDF path inside /public (e.g. "/Sayan-Manna-Resume.pdf") or any URL.
   * While null, the resume button is hidden everywhere.
   */
  resumeUrl: null as string | null,
};

/* ---------- Skills ---------- */

export const skills: SkillGroup[] = [
  { title: "Languages", icon: "code", items: ["Python", "Java", "C"] },
  { title: "Focus Areas", icon: "layers", items: ["Full-Stack Development", "AI/ML"] },
  {
    title: "Blockchain",
    icon: "blocks",
    items: ["Midnight", "Compact (ZK smart contract language)", "Zero-Knowledge Proofs"],
  },
];

/* ---------- Featured project ---------- */

export const featuredProject: Project = {
  name: "CertiProof",
  tagline: "Prove you passed, without revealing your marks.",
  problem:
    "Sharing a certificate today exposes everything — marks, student ID, personal details. An employer only needs to know one thing: did you pass?",
  solution: {
    intro: "CertiProof uses zero-knowledge proofs on the Midnight blockchain.",
    points: [
      "Student proves “my score is 60 or more”",
      "Marks, student ID and secret salt stay private",
      "Only a certificate hash goes on-chain",
      "Employers verify in seconds, no wallet needed",
    ],
  },
  impact: {
    stat: 91,
    statLabel: "users verified",
    text: "91 real users verified on Midnight Preprod, each checkable on-chain.",
  },
  learned: [
    "Writing smart contracts in Compact",
    "Improving UX from real user feedback — added a live progress timer and clearer error messages",
    "Switching to the 1AM wallet when Lace couldn't pay fees on Preprod",
  ],
  tech: ["Compact", "Midnight Blockchain", "Zero-Knowledge Proofs", "1AM Wallet"],
  liveUrl: "https://onsayanmanna2006-dot.github.io/CertiProof/",
  githubUrl: "https://github.com/onsayanmanna2006-dot/CertiProof",
};

/**
 * More projects — add entries here later (same shape as featuredProject, or simpler).
 * While empty, a "More projects coming soon" card is shown.
 */
export const moreProjects: Pick<Project, "name" | "tagline" | "tech" | "liveUrl" | "githubUrl">[] = [];

/* ---------- Achievements ---------- */

export const achievements = [
  {
    title: "Won 60 USDT — Rise In Midnight Challenge",
    description:
      "Selected as a winner of Rise In's “New Moon to Full” September Challenge (Level 4 – Waxing Gibbous) for building CertiProof, a zero-knowledge certificate verifier on Midnight.",
  },
  {
    title: "Rise In — “New Moon to Full” program",
    description: "Completed Levels 1–4 of Rise In's 6-level “New Moon to Full” builder program on Midnight.",
  },
  {
    title: "Shipped CertiProof",
    description: "Built and shipped CertiProof with 91 verified users on Midnight Preprod.",
  },
];

/* ---------- Contact ---------- */

export const contact = {
  email: "onsayanmanna2006@gmail.com",
  github: "https://github.com/onsayanmanna2006-dot",
  linkedin: "https://www.linkedin.com/in/sayan-manna-bbab6b389/",
};

/* ---------- Navigation (section ids must match the components) ---------- */

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export const footer = {
  copyright: "© 2026 Sayan Manna",
};
