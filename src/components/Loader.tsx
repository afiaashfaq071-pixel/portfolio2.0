import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PROFILE } from '../data/profile';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { EASE_CINE } from '../animations/variants';

interface LoaderProps {
  /** Called the moment the curtain starts to open (start the hero reveal here). */
  onOpen: () => void;
  /** Called once the curtain has fully left the screen (unmount the loader here). */
  onDone: () => void;
}

/**
 * Film-leader style intro: a counter runs while fonts and the page finish loading,
 * then the screen splits open like a cinema curtain.
 */
export function Loader({ onOpen, onDone }: LoaderProps) {
  const reduce = useReducedMotion() === true;
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  // Keep the latest callbacks without restarting the loading effect when the parent re-renders.
  const onOpenRef = useRef(onOpen);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onOpenRef.current = onOpen;
    onDoneRef.current = onDone;
  }, [onOpen, onDone]);

  useLockBodyScroll(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    let raf = 0;
    let cancelled = false;
    const duration = reduce ? 250 : 1900;
    const start = performance.now();

    const fontsReady: Promise<unknown> = document.fonts ? document.fonts.ready : Promise.resolve();
    const pageReady = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', () => resolve(), { once: true });
    });
    const assetsReady = Promise.all([fontsReady, pageReady]);
    const safetyNet = new Promise<void>((resolve) => window.setTimeout(resolve, 4000));

    const finish = () => {
      if (cancelled) return;
      setCount(100);
      setLeaving(true);
      onOpenRef.current();
      if (reduce) onDoneRef.current();
    };

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 99));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        void Promise.race([assetsReady, safetyNet]).then(finish);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  if (reduce) {
    return (
      <div
        className="fixed inset-0 z-[100] grid place-items-center bg-bg"
        role="status"
        aria-label="Loading portfolio"
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Loading</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100]" role="status" aria-live="polite" aria-label="Loading portfolio">
      {/* Curtain halves */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-bg"
        animate={{ y: leaving ? '-101%' : '0%' }}
        transition={{ duration: 1, ease: EASE_CINE }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-bg"
        animate={{ y: leaving ? '101%' : '0%' }}
        transition={{ duration: 1, ease: EASE_CINE }}
        onAnimationComplete={() => {
          if (leaving) onDoneRef.current();
        }}
      />

      {/* Content */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-between p-5 md:p-10"
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
          <span>{PROFILE.name} — Portfolio</span>
          <span className="hidden sm:block">{PROFILE.role}</span>
        </div>

        <div>
          <div className="mb-6 h-px w-full bg-white/10">
            <motion.div
              className="h-full origin-left bg-ember"
              style={{ scaleX: count / 100 }}
            />
          </div>
          <div className="flex items-end justify-between">
            <span className="font-display text-[clamp(5.5rem,24vw,17rem)] font-extrabold leading-[0.8] tracking-[-0.05em] tabular-nums">
              {String(count).padStart(3, '0')}
            </span>
            <span className="max-w-[10rem] pb-2 text-right font-serif text-xl italic text-ember md:max-w-xs md:text-3xl">
              {PROFILE.philosophy}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
