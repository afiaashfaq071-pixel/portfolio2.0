import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { PROJECTS, type ProjectId } from '../data/projects';
import { Reveal } from '../animations/Reveal';
import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { Door } from '../components/projects/Door';
import { useProjectViewer } from '../context/ProjectViewerContext';
import { useMediaQuery } from '../hooks/useMediaQuery';

/** The experimental gallery: four doors, one per project. */
export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const armed = useInView(sectionRef, { once: true, margin: '300px 0px' });
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [activeId, setActiveId] = useState<ProjectId | null>(null);
  const { openProject } = useProjectViewer();

  return (
    <section id="work" ref={sectionRef} aria-labelledby="work-title" className="relative py-24 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-3/5"
        style={{ background: 'radial-gradient(60% 50% at 50% 0%, rgb(232 184 109 / 0.08), transparent)' }}
      />

      <Container className="relative">
        <SectionHeading
          id="work-title"
          eyebrow="01 — Selected work"
          title="Four projects. Four doors."
          accent={['doors']}
          description="Each door leads into one project I built. Step inside to see what it is, how it was made and where to find it live."
        />

        <Reveal delay={0.1} className="mt-14 md:mt-20">
          <div className="no-scrollbar -mx-5 flex scroll-px-5 snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 lg:mx-0 lg:snap-none lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0">
            {PROJECTS.map((project) => (
              <Door
                key={project.id}
                project={project}
                isDesktop={isDesktop}
                active={activeId === project.id}
                dimmed={isDesktop && activeId !== null && activeId !== project.id}
                armed={armed}
                onActivate={() => setActiveId(project.id)}
                onDeactivate={() => setActiveId((current) => (current === project.id ? null : current))}
                onOpen={() => openProject(project.id)}
              />
            ))}
          </div>

          {/* The floor the doors stand on */}
          <div
            aria-hidden="true"
            className="mx-auto mt-5 hidden h-px w-[92%] bg-gradient-to-r from-transparent via-white/30 to-transparent lg:block"
          />

          <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            {isDesktop ? 'Hover a door to look inside · Click to step in' : 'Swipe to browse · Tap a door to step in'}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
