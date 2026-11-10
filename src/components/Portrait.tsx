import { useState } from 'react';
import { PROFILE } from '../data/profile';
import { cn } from '../lib/cn';

interface PortraitProps {
  className?: string;
  /** Load immediately (use for the hero). */
  priority?: boolean;
}

/**
 * Shows the photo at public/portrait.jpg. Until that file exists it shows a
 * designed "AK" monogram instead, so the layout never looks broken.
 */
export function Portrait({ className, priority = false }: PortraitProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn('relative isolate overflow-hidden bg-bg-2', className)}>
      {/* Monogram fallback sits underneath the photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 grid place-items-center"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 25%, rgb(232 184 109 / 0.18), transparent), linear-gradient(180deg, #151515, #0b0b0b)',
        }}
      >
        <span className="font-serif text-[clamp(6rem,22vw,11rem)] italic leading-none text-white/15">AK</span>
      </div>

      {!failed && (
        <img
          src={PROFILE.portrait}
          alt={`Portrait of ${PROFILE.name}`}
          width={800}
          height={1000}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgb(8 8 8 / 0.55), transparent 45%)' }}
      />
    </div>
  );
}
