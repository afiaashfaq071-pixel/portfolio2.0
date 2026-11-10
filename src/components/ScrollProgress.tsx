import { motion, useScroll, useSpring } from 'framer-motion';

/** A thin ember line along the top edge that fills as you scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-ember"
      style={{ scaleX }}
    />
  );
}
