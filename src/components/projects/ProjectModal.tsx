import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import type { Project } from '../../data/projects';
import { EASE_CINE, EASE_OUT } from '../../animations/variants';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { cn } from '../../lib/cn';
import { GitHubIcon } from '../BrandIcons';
import { LinkButton } from '../Button';
import { ProjectBackdrop } from './ProjectBackdrop';
import { ProjectPreview } from './ProjectPreview';
import { TITLE_FONT_CLASS } from './titleFont';

const LEAF_LEFT: Variants = {
  hidden: { x: '-100%' },
  open: {
    x: ['-100%', '0%', '-100%'],
    transition: { duration: 1.6, times: [0, 0.3, 1], ease: EASE_CINE },
  },
  exit: { x: '0%', transition: { duration: 0.65, ease: EASE_CINE } },
};

const LEAF_RIGHT: Variants = {
  hidden: { x: '100%' },
  open: {
    x: ['100%', '0%', '100%'],
    transition: { duration: 1.6, times: [0, 0.3, 1], ease: EASE_CINE },
  },
  exit: { x: '0%', transition: { duration: 0.65, ease: EASE_CINE } },
};

const CONTENT: Variants = {
  hidden: { opacity: 0 },
  open: { opacity: 1, transition: { delay: 0.55, duration: 0.6 } },
  exit: { opacity: 0, transition: { delay: 0.3, duration: 0.3 } },
};

const FOCUSABLE = 'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

interface ProjectContentProps {
  project: Project;
  nextProject: Project;
  total: number;
  onStep: (direction: 1 | -1) => void;
}

function ProjectContent({ project, nextProject, total, onStep }: ProjectContentProps) {
  const [mode, setMode] = useState<'screenshot' | 'live'>('screenshot');
  const { theme } = project;
  const host = new URL(project.liveUrl).host;
  const faint = `${theme.fg}1f`;

  return (
    <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:gap-y-10">
      {/* Title */}
      <div className="lg:col-span-5 lg:row-start-1">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
          {project.index} / {String(total).padStart(2, '0')} · {project.category}
        </p>
        <h2
          id={`project-title-${project.id}`}
          className={cn(
            'text-[clamp(2.75rem,9vw,4.5rem)] leading-[0.95] lg:text-[clamp(3rem,5.2vw,5rem)]',
            TITLE_FONT_CLASS[theme.titleFont],
          )}
        >
          {project.name}
        </h2>
      </div>

      {/* Preview (second in the DOM so it follows the title on phones) */}
      <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
        <div
          role="group"
          aria-label="Preview mode"
          className="mb-4 inline-flex rounded-full p-1"
          style={{ background: `${theme.fg}0f`, border: `1px solid ${faint}` }}
        >
          {(['screenshot', 'live'] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
              className="min-h-10 rounded-full px-4 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors"
              style={
                mode === value
                  ? { background: theme.accent, color: theme.bg }
                  : { background: 'transparent', color: theme.muted }
              }
            >
              {value === 'screenshot' ? 'Screenshot' : 'Live preview'}
            </button>
          ))}
        </div>

        <div
          className="overflow-hidden rounded-2xl shadow-2xl"
          style={{ border: `1px solid ${faint}`, background: theme.surface }}
        >
          <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: `1px solid ${theme.fg}14` }}>
            <span className="flex gap-1.5" aria-hidden="true">
              {[0, 1, 2].map((dot) => (
                <i key={dot} className="block size-2.5 rounded-full" style={{ background: `${theme.fg}33` }} />
              ))}
            </span>
            <span
              className="min-w-0 flex-1 truncate rounded-full px-3 py-1 text-center font-mono text-[11px]"
              style={{ background: `${theme.fg}0f`, color: theme.muted }}
            >
              {host}
            </span>
          </div>

          <div className="relative aspect-[16/12] w-full sm:aspect-[16/10]">
            {mode === 'screenshot' ? (
              <ProjectPreview project={project} eager className="absolute inset-0" />
            ) : (
              <iframe
                src={project.liveUrl}
                title={`${project.name} — live preview`}
                loading="lazy"
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                className="absolute inset-0 h-full w-full border-0 bg-white"
              />
            )}
          </div>
        </div>

        {mode === 'live' && (
          <p className="mt-3 text-sm" style={{ color: theme.muted }}>
            Some browsers block sites from being shown inside other pages. If the preview stays blank, use the
            Live Demo button to open it in a new tab.
          </p>
        )}
      </div>

      {/* Details */}
      <div className="lg:col-span-5 lg:row-start-2">
        <p className="text-lg leading-relaxed md:text-xl" style={{ color: theme.fg }}>
          {project.description}
        </p>

        {project.stack.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: theme.muted }}>
              Technology
            </p>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full px-4 py-2 font-mono text-xs"
                  style={{ border: `1px solid ${theme.accent}66`, color: theme.accent }}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton
            href={project.liveUrl}
            external
            icon={<ArrowUpRight size={18} />}
            className="hover:brightness-110"
            style={{ background: theme.accent, color: theme.bg }}
          >
            Live Demo
          </LinkButton>
          <LinkButton
            href={project.githubUrl}
            external
            variant="outline"
            icon={<GitHubIcon className="size-[18px]" />}
            style={{ borderColor: `${theme.fg}44`, color: theme.fg }}
          >
            GitHub
          </LinkButton>
        </div>

        <div className="mt-10 pt-6" style={{ borderTop: `1px solid ${faint}` }}>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: theme.muted }}>
            Design direction
          </p>
          <p className="leading-relaxed" style={{ color: theme.muted }}>
            {project.visual}
          </p>
        </div>
      </div>

      {/* Next project */}
      <div className="lg:col-span-12" style={{ borderTop: `1px solid ${faint}` }}>
        <button
          type="button"
          onClick={() => onStep(1)}
          className="group flex min-h-20 w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span>
            <span className="block font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: theme.muted }}>
              Next project
            </span>
            <span
              className={cn('mt-1 block text-2xl md:text-4xl', TITLE_FONT_CLASS[nextProject.theme.titleFont])}
              style={{ color: theme.fg }}
            >
              {nextProject.name}
            </span>
          </span>
          <ArrowRight
            aria-hidden="true"
            className="size-7 shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-2"
            style={{ color: theme.accent }}
          />
        </button>
      </div>
    </div>
  );
}

interface ProjectModalProps {
  project: Project;
  nextProject: Project;
  total: number;
  onClose: () => void;
  onStep: (direction: 1 | -1) => void;
}

/**
 * The immersive presentation. Two door leaves slide shut over the page, then swing open to
 * reveal the project. Esc closes it, ← / → move between projects and focus stays inside.
 */
export function ProjectModal({ project, nextProject, total, onClose, onStep }: ProjectModalProps) {
  const reduce = useReducedMotion() === true;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { theme } = project;

  useLockBodyScroll(true);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        onStep(1);
      } else if (event.key === 'ArrowLeft') {
        onStep(-1);
      } else if (event.key === 'Tab') {
        const root = dialogRef.current;
        if (!root) return;
        const focusable = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onStep]);

  const rootVars = {
    background: theme.bg,
    color: theme.fg,
  } as CSSProperties;

  const leafStyle = (side: 'left' | 'right'): CSSProperties => {
    const seam = `1px solid ${theme.accent}`;
    return {
      background: `linear-gradient(${side === 'left' ? '90deg' : '270deg'}, ${theme.surface}, ${theme.bg})`,
      ...(side === 'left' ? { borderRight: seam } : { borderLeft: seam }),
      boxShadow: `0 0 80px ${theme.accent}33`,
    };
  };

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`project-title-${project.id}`}
      className="fixed inset-0 z-[80]"
      initial="hidden"
      animate="open"
      exit="exit"
    >
      {/* Content */}
      <motion.div
        variants={reduce ? undefined : CONTENT}
        initial={reduce ? { opacity: 0 } : undefined}
        animate={reduce ? { opacity: 1 } : undefined}
        exit={reduce ? { opacity: 0 } : undefined}
        className="absolute inset-0 overflow-y-auto overscroll-contain transition-colors duration-500"
        style={rootVars}
      >
        <div aria-hidden="true" className="pointer-events-none fixed inset-0">
          <ProjectBackdrop project={project} />
        </div>

        <div
          className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 backdrop-blur-md md:px-10"
          style={{ background: `${theme.bg}cc` }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: theme.muted }}>
            Project {project.index} <span aria-hidden="true">/</span> {String(total).padStart(2, '0')}
          </p>

          <div className="flex items-center gap-2">
            <span className="mr-2 hidden font-mono text-[11px] uppercase tracking-[0.25em] md:block" style={{ color: theme.muted }}>
              ← → to browse
            </span>
            {([-1, 1] as const).map((direction) => (
              <button
                key={direction}
                type="button"
                onClick={() => onStep(direction)}
                aria-label={direction === 1 ? 'Next project' : 'Previous project'}
                className="grid size-12 place-items-center rounded-full transition-colors hover:bg-white/10"
                style={{ border: `1px solid ${theme.fg}33` }}
              >
                {direction === 1 ? <ArrowRight size={18} aria-hidden="true" /> : <ArrowLeft size={18} aria-hidden="true" />}
              </button>
            ))}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project"
              className="grid size-12 place-items-center rounded-full transition-opacity hover:opacity-90"
              style={{ background: theme.accent, color: theme.bg }}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-8 md:px-10 md:pt-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              <ProjectContent project={project} nextProject={nextProject} total={total} onStep={onStep} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Door leaves */}
      {!reduce && (
        <>
          <motion.div
            aria-hidden="true"
            variants={LEAF_LEFT}
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2"
            style={leafStyle('left')}
          />
          <motion.div
            aria-hidden="true"
            variants={LEAF_RIGHT}
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1/2"
            style={leafStyle('right')}
          />
        </>
      )}
    </motion.div>
  );
}
