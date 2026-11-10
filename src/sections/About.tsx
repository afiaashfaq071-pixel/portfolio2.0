import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ABOUT_PARAGRAPHS, PROFILE } from '../data/profile';
import { Marquee } from '../animations/Marquee';
import { Reveal } from '../animations/Reveal';
import { ScrollWords } from '../animations/ScrollWords';
import { Container } from '../components/Container';
import { Portrait } from '../components/Portrait';
import { SectionHeading } from '../components/SectionHeading';

function RotatingBadge() {
  return (
    <div className="relative size-full text-ember">
      <svg viewBox="0 0 120 120" aria-hidden="true" className="badge-spin size-full">
        <defs>
          <path id="about-badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text fill="currentColor" fontSize="9" letterSpacing="2.6" className="font-mono uppercase">
          <textPath href="#about-badge-circle">Dreaming high • Building higher • </textPath>
        </text>
      </svg>
      <span
        aria-hidden="true"
        className="absolute inset-0 grid place-items-center font-serif text-3xl italic text-white"
      >
        AK
      </span>
    </div>
  );
}

export function About() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() === true;
  const { scrollYProgress } = useScroll({ target: portraitRef, offset: ['start end', 'end start'] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  const [lead, belief, learning, ambition] = ABOUT_PARAGRAPHS;

  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden py-24 md:py-36">
      <Container>
        <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Portrait */}
          <div ref={portraitRef} className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <Reveal>
              <div className="relative mx-auto w-[min(80vw,24rem)] lg:mx-0 lg:w-full lg:max-w-md">
                <motion.div style={reduce ? undefined : { y: portraitY }}>
                  <Portrait className="aspect-[4/5] rounded-t-full" />
                </motion.div>
                <div className="absolute -bottom-8 -right-2 size-28 md:-right-8 md:size-36">
                  <RotatingBadge />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Copy */}
          <div className="lg:col-span-7">
            <SectionHeading
              id="about-title"
              eyebrow="04 — About"
              title="Code is the craft. Experience is the goal."
              accent={['experience']}
            />

            <div className="mt-12 space-y-8">
              <ScrollWords
                text={lead}
                className="font-display text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]"
              />
              <ScrollWords
                text={belief}
                className="font-display text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]"
              />
              <Reveal>
                <p className="max-w-2xl text-base text-muted md:text-lg">{learning}</p>
              </Reveal>
              <Reveal>
                <p className="max-w-2xl font-serif text-[clamp(1.6rem,3vw,2.4rem)] italic leading-[1.2] text-ember">
                  {ambition}
                </p>
              </Reveal>
            </div>

            <Reveal className="mt-12">
              <dl className="grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
                <div>
                  <dt className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Focus</dt>
                  <dd>{PROFILE.role}</dd>
                </div>
                <div>
                  <dt className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Education</dt>
                  <dd>{PROFILE.education}</dd>
                </div>
                <div>
                  <dt className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Philosophy</dt>
                  <dd>{PROFILE.philosophy}</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>

      <Marquee
        items={['Dreaming high.', 'Building higher.']}
        className="text-outline mt-28 font-display text-[clamp(3.5rem,11vw,9rem)] font-extrabold uppercase leading-none tracking-[-0.03em] md:mt-40"
      />
    </section>
  );
}
