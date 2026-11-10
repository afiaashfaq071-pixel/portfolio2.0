import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { cn } from '../lib/cn';

const INTERACTIVE = '[data-cursor], a, button, summary, [role="button"]';

/**
 * A dot + ring cursor. Only mounts on devices with a fine pointer and hover,
 * and never for visitors who prefer reduced motion. Add `data-cursor="Label"` to
 * any element to show that label inside the ring.
 */
export function CustomCursor() {
  const hasFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduce = useReducedMotion();
  const enabled = hasFinePointer && !reduce;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 480, damping: 38, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 480, damping: 38, mass: 0.35 });

  const [hidden, setHidden] = useState(true);
  const [interactive, setInteractive] = useState(false);
  const [label, setLabel] = useState('');
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setHidden(false);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      if (target.closest('input, textarea, select')) {
        setHidden(true);
        return;
      }
      setHidden(false);

      const match = target.closest<HTMLElement>(INTERACTIVE);
      setInteractive(match !== null);
      setLabel(match?.dataset.cursor ?? '');
    };

    const onLeaveWindow = () => setHidden(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    root.addEventListener('mouseleave', onLeaveWindow);

    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      root.removeEventListener('mouseleave', onLeaveWindow);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const hasLabel = label.length > 0;

  return (
    <>
      {/* Ring (springy) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[999]"
        style={{ x: ringX, y: ringY }}
      >
        <div
          className={cn(
            '-translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full font-mono text-[10px] font-medium uppercase tracking-[0.2em] transition-[width,height,opacity,background-color,border-color,transform] duration-300 ease-out-expo',
            hidden ? 'opacity-0' : 'opacity-100',
            hasLabel
              ? 'size-20 border border-transparent bg-ember text-bg'
              : interactive
                ? 'size-14 border border-white/80 bg-white/10'
                : 'size-9 border border-white/50',
            pressed && 'scale-90',
          )}
        >
          {hasLabel ? label : null}
        </div>
      </motion.div>

      {/* Dot (exact) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[999]"
        style={{ x, y }}
      >
        <div
          className={cn(
            '-translate-x-1/2 -translate-y-1/2 size-1.5 rounded-full bg-white transition-opacity duration-200',
            hidden || hasLabel ? 'opacity-0' : 'opacity-100',
          )}
        />
      </motion.div>
    </>
  );
}
