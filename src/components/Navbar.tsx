import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, PROFILE } from '../data/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { EASE_CINE, EASE_OUT } from '../animations/variants';
import { cn } from '../lib/cn';
import { Container } from './Container';
import { GitHubIcon } from './BrandIcons';

const SECTION_IDS: readonly string[] = ['top', ...NAV_ITEMS.map((item) => item.id)];

interface NavbarProps {
  /** Slides the bar in once the intro curtain opens. */
  play: boolean;
}

export function Navbar({ play }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useLockBodyScroll(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={play ? { y: 0, opacity: 1 } : { y: -90, opacity: 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.5 }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500',
          scrolled && !open
            ? 'border-white/10 bg-bg/75 backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <Container className="flex h-16 items-center justify-between md:h-20">
          <a
            href="#top"
            aria-label={`${PROFILE.name} — back to top`}
            className="flex items-baseline gap-3"
            onClick={() => setOpen(false)}
          >
            <span className="font-display text-2xl font-extrabold tracking-tight">
              AK<span className="text-ember">.</span>
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-muted sm:inline">
              {PROFILE.name}
            </span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-9">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'true' : undefined}
                    className="group relative block py-2 font-mono text-[12px] uppercase tracking-[0.2em] text-white/65 transition-colors hover:text-white aria-[current=true]:text-white"
                  >
                    <span className="mr-2 text-ember/80">0{i + 1}</span>
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out-expo group-hover:scale-x-100 group-aria-[current=true]:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="grid size-12 place-items-center rounded-full border border-white/15 transition-colors hover:bg-white/5 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </Container>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-bg px-5 pb-10 pt-28 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE_CINE }}
          >
            <nav aria-label="Mobile">
              <ul>
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.25 + i * 0.07 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="flex min-h-16 items-baseline gap-4 border-b border-white/10 py-4 font-display text-[clamp(2.25rem,11vw,3.5rem)] font-extrabold leading-none tracking-tight"
                    >
                      <span className="font-mono text-xs font-normal text-ember">0{i + 1}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto flex items-center justify-between pt-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{PROFILE.role}</p>
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abdul Khaliq on GitHub"
                className="grid size-12 place-items-center rounded-full border border-white/15 transition-colors hover:bg-white/5"
              >
                <GitHubIcon className="size-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
