import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import { JOURNEY, type Milestone } from '../data/journey';
import { getProject, type ProjectId } from '../data/projects';
import { PROFILE } from '../data/profile';
import { Reveal } from '../animations/Reveal';
import { EASE_OUT } from '../animations/variants';
import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { useProjectViewer } from '../context/ProjectViewerContext';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { cn } from '../lib/cn';

interface MilestoneItemProps {
  milestone: Milestone;
  side: 'left' | 'right';
  isWide: boolean;
  onOpenProject: (id: ProjectId) => void;
}

function MilestoneItem({ milestone, side, isWide, onOpenProject }: MilestoneItemProps) {
  const isLeft = side === 'left';
  const { status } = milestone;

  const label = status === 'current' ? 'Now' : status === 'next' ? 'Next' : `Chapter ${milestone.index}`;

  return (
    <motion.li
      initial={{ opacity: 0, x: isWide ? (isLeft ? -48 : 48) : 0, y: isWide ? 0 : 28 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      className="relative pb-14 pl-12 last:pb-0 md:grid md:grid-cols-2 md:pb-20 md:pl-0"
    >
      {/* Node on the line */}
      <span
        aria-hidden="true"
        className="absolute left-4 top-2 z-10 grid size-4 -translate-x-1/2 place-items-center md:left-1/2"
      >
        {status === 'current' && <span className="ping-ring absolute inset-0 rounded-full bg-ember/60" />}
        <span
          className={cn(
            'relative size-4 rounded-full border-2',
            status === 'next' ? 'border-dashed border-white/50 bg-bg' : 'border-ember bg-ember',
          )}
        />
      </span>

      <div
        className={cn(
          isLeft ? 'md:col-start-1 md:pr-16 md:text-right' : 'md:col-start-2 md:pl-16',
        )}
      >
        <p
          className={cn(
            'mb-3 font-mono text-[11px] uppercase tracking-[0.3em]',
            status === 'done' ? 'text-muted' : 'text-ember',
          )}
        >
          {label}
        </p>
        <h3 className="font-display text-[clamp(1.5rem,3.4vw,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
          {milestone.title}
        </h3>
        <p className="mt-4 max-w-md text-base text-muted md:inline-block md:text-lg">{milestone.body}</p>

        {milestone.projectIds && (
          <ul className={cn('mt-5 flex flex-wrap gap-2', isLeft && 'md:justify-end')}>
            {milestone.projectIds.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onOpenProject(id)}
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-xs text-white/80 transition-colors hover:border-ember hover:text-ember"
                >
                  {getProject(id).name}
                  <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.li>
  );
}

/** A vertical timeline whose line draws itself as you scroll. Undated on purpose. */
export function Journey() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion() === true;
  const isWide = useMediaQuery('(min-width: 768px)');
  const { openProject } = useProjectViewer();

  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.65', 'end 0.6'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <section id="journey" aria-labelledby="journey-title" className="relative py-24 md:py-36">
      <Container>
        <SectionHeading
          id="journey-title"
          eyebrow="03 — Development journey"
          title="From fundamentals to full projects."
          accent={['fundamentals']}
        />

        <Reveal delay={0.1} className="mt-8">
          <p className="inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white/80">
            <GraduationCap size={16} aria-hidden="true" className="text-ember" />
            Currently · {PROFILE.education}
          </p>
        </Reveal>

        <ol ref={listRef} className="relative mx-auto mt-16 max-w-5xl md:mt-24">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-white/10 md:left-1/2"
          >
            <motion.div
              className="h-full w-full origin-top bg-ember"
              style={{ scaleY: reduce ? 1 : lineScale }}
            />
          </div>

          {JOURNEY.map((milestone, i) => (
            <MilestoneItem
              key={milestone.id}
              milestone={milestone}
              side={i % 2 === 0 ? 'left' : 'right'}
              isWide={isWide}
              onOpenProject={openProject}
            />
          ))}
        </ol>
      </Container>
    </section>
  );
}
