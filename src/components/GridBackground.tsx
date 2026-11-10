import { cn } from '../lib/cn';

interface GridBackgroundProps {
  className?: string;
}

/** A slowly drifting grid with two soft pools of light — the "projector" behind the hero. */
export function GridBackground({ className }: GridBackgroundProps) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="grid-bg" />
      <div className="glow-a" />
      <div className="glow-b" />
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{ background: 'linear-gradient(to top, #080808, transparent)' }}
      />
    </div>
  );
}
