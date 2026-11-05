import { contact, footer, profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, MailIcon } from "./ui/Icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:px-8">
        <p>{footer.copyright}</p>
        <div className="flex items-center gap-2">
          <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label={`${profile.name} on GitHub`} className="rounded-full p-2 transition-colors hover:text-crimson-bright">
            <GithubIcon />
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${profile.name} on LinkedIn`} className="rounded-full p-2 transition-colors hover:text-crimson-bright">
            <LinkedinIcon />
          </a>
          <a href={`mailto:${contact.email}`} aria-label={`Email ${profile.name}`} className="rounded-full p-2 transition-colors hover:text-crimson-bright">
            <MailIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
