import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

interface ScrollWordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function ScrollWord({ word, progress, range }: ScrollWordProps) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className="inline-block">
        {word}
      </motion.span>{' '}
    </>
  );
}

interface ScrollWordsProps {
  text: string;
  className?: string;
}

/** Words light up one by one as the paragraph scrolls through the viewport. */
export function ScrollWords({ text, className }: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.5'],
  });

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  const words = text.split(' ');

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <ScrollWord
            key={`${word}-${i}`}
            word={word}
            progress={scrollYProgress}
            range={[i / words.length, Math.min((i + 1.6) / words.length, 1)]}
          />
        ))}
      </span>
    </p>
  );
}
