import { useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Project } from '../../data/projects';
import { cn } from '../../lib/cn';
import { DoorArt } from './DoorArt';
import { ProjectBackdrop } from './ProjectBackdrop';
import { ProjectPreview } from './ProjectPreview';
import { TITLE_FONT_CLASS } from './titleFont';

interface DoorProps {
  project: Project;
  isDesktop: boolean;
  /** Desktop only: this door is hovered or focused. */
  active: boolean;
  /** Desktop only: another door is active, so this one steps back. */
  dimmed: boolean;
  /** True once the section is near the viewport, so previews start loading. */
  armed: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  onOpen: () => void;
}

/**
 * One project door. On desktop it widens on hover and its two leaves part to reveal a live preview.
 * On touch screens there is no hover, so the door that is centred in the swipe row opens by itself.
 */
export function Door({
  project,
  isDesktop,
  active,
  dimmed,
  armed,
  onActivate,
  onDeactivate,
  onOpen,
}: DoorProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const centred = useInView(ref, { amount: 0.7 });
  const isActive = isDesktop ? active : centred;
  const { theme } = project;

  const vars = {
    '--accent': theme.accent,
    '--accent2': theme.accent2,
    background: theme.bg,
  } as CSSProperties;

  const onMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      data-cursor="Open"
      data-active={isActive}
      aria-label={`Open project: ${project.name} — ${project.category}`}
      onPointerEnter={isDesktop ? onActivate : undefined}
      onPointerLeave={isDesktop ? onDeactivate : undefined}
      onFocus={isDesktop ? onActivate : undefined}
      onBlur={isDesktop ? onDeactivate : undefined}
      onPointerMove={onMove}
      onClick={onOpen}
      animate={isDesktop ? { flexGrow: active ? 3.4 : dimmed ? 0.8 : 1 } : undefined}
      transition={{ type: 'spring', stiffness: 130, damping: 22 }}
      style={vars}
      className={cn(
        'group relative isolate h-[30rem] w-[78vw] max-w-[22rem] shrink-0 snap-center overflow-hidden rounded-3xl border border-white/10 text-left transition-[filter,box-shadow] duration-500 ease-out-expo data-[active=true]:shadow-[0_0_90px_-20px_var(--accent)]',
        'lg:h-[min(42rem,78vh)] lg:w-auto lg:max-w-none lg:shrink lg:grow lg:basis-0',
        dimmed && 'brightness-[0.55]',
      )}
    >
      {/* Behind the doors: the preview that appears when they open */}
      <div className="absolute inset-0 scale-[1.07] opacity-0 transition-[opacity,transform] duration-[900ms] ease-out-expo group-data-[active=true]:scale-100 group-data-[active=true]:opacity-100">
        {armed ? (
          <ProjectPreview project={project} className="absolute inset-0" />
        ) : (
          <ProjectBackdrop project={project} />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${theme.bg} 6%, transparent 58%)` }}
        />
      </div>

      {/* The two door leaves — each is a half of the same artwork */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 transition-transform duration-[900ms] ease-cine group-data-[active=true]:-translate-x-[42%]"
        style={{ clipPath: 'inset(0 49.7% 0 0)' }}
      >
        <DoorArt project={project} />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 transition-transform duration-[900ms] ease-cine group-data-[active=true]:translate-x-[42%]"
        style={{ clipPath: 'inset(0 0 0 49.7%)' }}
      >
        <DoorArt project={project} />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-black/70 transition-opacity duration-500 group-data-[active=true]:opacity-0"
      />

      {/* Light spilling from the gap, following the pointer */}
      <div
        aria-hidden="true"
        className="door-light pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-700 group-data-[active=true]:opacity-100"
      />

      {/* Number */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between p-5 lg:p-7">
        <span className="font-mono text-xs tracking-[0.25em]" style={{ color: theme.fg }}>
          {project.index}
        </span>
        <ArrowUpRight
          size={20}
          aria-hidden="true"
          className="-translate-x-1 translate-y-1 opacity-0 transition-[opacity,transform] duration-500 ease-out-expo group-data-[active=true]:translate-x-0 group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100 max-lg:translate-x-0 max-lg:translate-y-0 max-lg:opacity-100"
          style={{ color: theme.accent }}
        />
      </div>

      {/* Name */}
      <div className="absolute inset-x-0 bottom-0 z-30 p-5 lg:p-7">
        <p
          className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] opacity-80"
          style={{ color: theme.accent }}
        >
          {project.category}
        </p>
        <h3
          className={cn(
            'translate-y-4 text-[clamp(1.75rem,3.4vw,2.9rem)] leading-[0.95] opacity-0 transition-[opacity,transform] delay-100 duration-700 ease-out-expo group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100 max-lg:translate-y-0 max-lg:text-[2rem] max-lg:opacity-100',
            TITLE_FONT_CLASS[theme.titleFont],
          )}
          style={{ color: theme.fg }}
        >
          {project.name}
        </h3>
        <span
          className="mt-4 inline-flex translate-y-3 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] opacity-0 transition-[opacity,transform] delay-200 duration-700 ease-out-expo group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100 max-lg:translate-y-0 max-lg:opacity-100"
          style={{ color: theme.fg }}
        >
          Step inside <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
    </motion.button>
  );
}
