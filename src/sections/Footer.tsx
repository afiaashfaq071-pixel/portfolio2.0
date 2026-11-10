import { ArrowUp } from 'lucide-react';
import { NAV_ITEMS, PROFILE, getInstagramHref } from '../data/profile';
import { Container } from '../components/Container';
import { GitHubIcon, InstagramIcon } from '../components/BrandIcons';

const socialClass =
  'grid size-12 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-ember hover:text-ember';

export function Footer() {
  const year = new Date().getFullYear();
  const instagramHref = getInstagramHref();

  return (
    <footer className="relative border-t border-line pb-10 pt-16 md:pt-24">
      <Container>
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-[clamp(2.5rem,8vw,6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]">
              {PROFILE.name}
            </p>
            <p className="mt-4 font-serif text-2xl italic text-ember md:text-3xl">{PROFILE.role}</p>
            <p className="mt-6 max-w-sm text-muted">{PROFILE.footerTagline}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Navigate</p>
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex min-h-11 items-center text-lg text-white/80 transition-colors hover:text-ember"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Elsewhere</p>
            <div className="flex gap-3">
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abdul Khaliq on GitHub"
                className={socialClass}
              >
                <GitHubIcon className="size-5" />
              </a>
              {instagramHref && (
                <a
                  href={instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abdul Khaliq on Instagram"
                  className={socialClass}
                >
                  <InstagramIcon className="size-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            © {year} {PROFILE.name}
          </p>
          <a
            href="#top"
            className="group inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/70 transition-colors hover:text-ember"
          >
            Back to top
            <ArrowUp
              size={14}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </Container>
    </footer>
  );
}
