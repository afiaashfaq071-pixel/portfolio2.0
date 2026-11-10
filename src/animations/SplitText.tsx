import { Fragment, type ElementType } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '../lib/cn';
import { EASE_OUT } from './variants';

interface SplitTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  /** Reveal word by word, or letter by letter. */
  by?: 'word' | 'char';
  className?: string;
  /** Words (case/punctuation ignored) that get the accent style. */
  accent?: string[];
  accentClassName?: string;
  delay?: number;
  stagger?: number;
  /**
   * Controlled start (e.g. after the loader). When omitted, the text reveals
   * the first time it scrolls into view.
   */
  play?: boolean;
}

const DEFAULT_ACCENT = 'font-serif italic font-normal text-ember';

function normalise(word: string): string {
  return word.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** Masked text reveal: each word (or letter) rises out from behind a clipping line. */
export function SplitText({
  text,
  as = 'span',
  by = 'word',
  className,
  accent = [],
  accentClassName = DEFAULT_ACCENT,
  delay = 0,
  stagger,
  play,
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const Tag: ElementType = as;
  const step = stagger ?? (by === 'char' ? 0.035 : 0.07);
  const words = text.split(' ');
  const accentSet = accent.map(normalise);
  const isAccent = (word: string) => accentSet.includes(normalise(word));

  if (reduce) {
    return (
      <Tag className={className}>
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span className={isAccent(word) ? accentClassName : undefined}>{word}</span>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </Tag>
    );
  }

  const variants: Variants = {
    hidden: { y: '115%' },
    visible: (i: number) => ({
      y: '0%',
      transition: { duration: 1.05, ease: EASE_OUT, delay: delay + i * step },
    }),
  };

  let unitIndex = 0;
  const content = words.map((word, wi) => {
    const accented = isAccent(word);
    const units = by === 'char' ? Array.from(word) : [word];

    return (
      <Fragment key={`${word}-${wi}`}>
        <span className="inline-block whitespace-nowrap">
          {units.map((unit, ui) => {
            const i = unitIndex++;
            return (
              <span
                key={ui}
                className="-mx-[0.04em] -mb-[0.16em] -mt-[0.06em] inline-block overflow-hidden px-[0.04em] pb-[0.16em] pt-[0.06em] align-bottom"
              >
                <motion.span
                  custom={i}
                  variants={variants}
                  className={cn('inline-block will-change-transform', accented && accentClassName)}
                >
                  {unit}
                </motion.span>
              </span>
            );
          })}
        </span>
        {wi < words.length - 1 && ' '}
      </Fragment>
    );
  });

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      {play === undefined ? (
        <motion.span
          aria-hidden="true"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        >
          {content}
        </motion.span>
      ) : (
        <motion.span aria-hidden="true" initial="hidden" animate={play ? 'visible' : 'hidden'}>
          {content}
        </motion.span>
      )}
    </Tag>
  );
}
