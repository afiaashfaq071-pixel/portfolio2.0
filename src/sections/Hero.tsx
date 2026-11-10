import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { SplitText } from '../animations/SplitText';
import { EASE_CINE, EASE_OUT } from '../animations/variants';
import { Container } from '../components/Container';
import { GridBackground } from '../components/GridBackground';
import { LinkButton } from '../components/Button';
import { Magnetic } from '../components/Magnetic';
import { Portrait } from '../components/Portrait';

interface HeroProps {
  /** Starts the reveal once the loader curtain begins to open. */
  play: boolean;
}

export function Hero({ play }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() === true;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: play ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.9, ease: EASE_OUT, delay },
  });

  return (
    <section
      id="top"
      ref={ref}
      aria-label="Introduction"
      className="relative isolate flex min-h-dvh items-center overflow-hidden pb-28 pt-28 md:pt-32"
    >
      <motion.div style={reduce ? undefined : { y: gridY }} className="absolute inset-0 -z-10">
        <GridBackground />
      </motion.div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
          <motion.div style={reduce ? undefined : { y: textY, opacity: textOpacity }} className="lg:col-span-7">
            <motion.p
              {...rise(0.2)}
              className="mb-6 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted md:text-xs"
            >
              <span aria-hidden="true" className="h-px w-10 bg-ember" />
              Portfolio · {new Date().getFullYear()}
            </motion.p>

            <h1 className="font-display text-[clamp(4rem,19vw,8.5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.045em] lg:text-[clamp(5rem,11.5vw,10.5rem)]">
              <SplitText as="span" text="ABDUL" by="char" play={play} delay={0.15} className="block" />
              <SplitText as="span" text="KHALIQ" by="char" play={play} delay={0.4} className="block" />
            </h1>

            <motion.p
              {...rise(0.95)}
              className="mt-7 font-serif text-[clamp(1.9rem,4.4vw,3.1rem)] italic leading-none text-ember"
            >
              {PROFILE.role}
            </motion.p>

            <SplitText
              as="p"
              text={PROFILE.tagline}
              play={play}
              delay={1.1}
              className="mt-5 max-w-xl text-base text-muted md:text-lg"
            />

            <motion.div {...rise(1.45)} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <LinkButton href="#work" icon={<ArrowDown size={18} />}>
                  Explore My Work
                </LinkButton>
              </Magnetic>
              <Magnetic>
                <LinkButton href="#contact" variant="outline">
                  Contact Me
                </LinkButton>
              </Magnetic>
            </motion.div>
          </motion.div>

          <motion.div
            style={reduce ? undefined : { y: portraitY }}
            className="mx-auto w-[min(70vw,20rem)] lg:col-span-5 lg:ml-auto lg:mr-0 lg:w-full lg:max-w-[28rem]"
          >
            <motion.div
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: play ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)' }}
              transition={{ duration: 1.4, ease: EASE_CINE, delay: 0.6 }}
              className="relative"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-t-full border border-white/10 md:-inset-4"
              />
              <Portrait priority className="aspect-[4/5] rounded-t-full" />
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom bar: scroll cue + philosophy */}
      <div className="absolute inset-x-0 bottom-6">
        <Container className="flex items-end justify-between gap-6">
          <a
            href="#work"
            aria-label="Scroll down to my work"
            className="group flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted transition-colors hover:text-white"
          >
            <span className="relative h-12 w-px overflow-hidden bg-white/20" aria-hidden="true">
              <span className="scroll-dot absolute inset-x-0 top-0 h-4 bg-ember" />
            </span>
            Scroll
          </a>
          <p className="max-w-[12rem] text-right font-mono text-[11px] uppercase tracking-[0.25em] text-muted md:max-w-none">
            {PROFILE.philosophy}
          </p>
        </Container>
      </div>
    </section>
  );
}
