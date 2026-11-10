import type { Project } from '../../data/projects';
import { cn } from '../../lib/cn';

interface ProjectBackdropProps {
  project: Project;
  className?: string;
}

/**
 * Atmospheric artwork unique to each project. Used behind the modal and as the
 * fallback when no screenshot is available.
 */
export function ProjectBackdrop({ project, className }: ProjectBackdropProps) {
  const t = project.theme;

  return (
    <div aria-hidden="true" className={cn('absolute inset-0 overflow-hidden', className)} style={{ background: t.bg }}>
      {project.id === 'supermart' && (
        <>
          <div
            className="absolute inset-x-0 top-0 h-[40%] opacity-[0.18]"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, ${t.accent2} 0 3.5rem, transparent 3.5rem 7rem)`,
              WebkitMaskImage: 'linear-gradient(#000, transparent)',
              maskImage: 'linear-gradient(#000, transparent)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage: `radial-gradient(${t.fg} 1.2px, transparent 1.2px)`,
              backgroundSize: '26px 26px',
            }}
          />
          <div
            className="absolute -bottom-1/4 -right-1/4 size-[75%] rounded-full"
            style={{ background: `radial-gradient(closest-side, ${t.accent}33, transparent)` }}
          />
        </>
      )}

      {project.id === 'music-hub' && (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-radial-gradient(circle at 78% 30%, ${t.accent}2e 0 1px, transparent 1px 20px)`,
              WebkitMaskImage: 'radial-gradient(circle at 78% 30%, #000 10%, transparent 70%)',
              maskImage: 'radial-gradient(circle at 78% 30%, #000 10%, transparent 70%)',
            }}
          />
          <div
            className="absolute -left-1/4 top-1/3 size-[70%] rounded-full"
            style={{ background: `radial-gradient(closest-side, ${t.accent2}40, transparent)` }}
          />
        </>
      )}

      {project.id === 'todoly' && (
        <>
          <div
            className="absolute inset-0 opacity-[0.7]"
            style={{
              backgroundImage: `linear-gradient(${t.fg}0f 1px, transparent 1px), linear-gradient(90deg, ${t.fg}0f 1px, transparent 1px)`,
              backgroundSize: '44px 44px',
              WebkitMaskImage: 'radial-gradient(circle at 25% 20%, #000, transparent 75%)',
              maskImage: 'radial-gradient(circle at 25% 20%, #000, transparent 75%)',
            }}
          />
          <div
            className="absolute -left-1/4 -top-1/4 size-[70%] rounded-full"
            style={{ background: `radial-gradient(closest-side, ${t.accent}2b, transparent)` }}
          />
        </>
      )}

      {project.id === 'forty-eight-laws' && (
        <>
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(90% 70% at 50% 25%, ${t.surface}, ${t.bg})` }}
          />
          <span
            className="absolute -bottom-[8%] -right-[4%] select-none font-serif text-[clamp(10rem,32vw,26rem)] italic leading-none"
            style={{ color: `${t.accent}12` }}
          >
            XLVIII
          </span>
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, ${t.accent}14 0 1px, transparent 1px 38px)`,
            }}
          />
        </>
      )}
    </div>
  );
}
