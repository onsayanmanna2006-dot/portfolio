/**
 * Next.js config.
 *
 * - Default (Vercel / `npm run dev`): normal Next.js server build.
 * - GitHub Pages: set GITHUB_PAGES=true to produce a fully static export in `out/`.
 *   NEXT_PUBLIC_BASE_PATH should be "/<repo-name>" (e.g. "/portfolio"), or empty
 *   for a user site repo named "<username>.github.io". The included GitHub Actions
 *   workflow sets both automatically.
 */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isGithubPages && {
    output: "export",
    basePath,
    assetPrefix: basePath || undefined,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
