import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { SKILLS, SKILL_GROUPS } from '../data/skills';
import { Reveal } from '../animations/Reveal';
import { EASE_OUT } from '../animations/variants';
import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { SkillDetail } from '../components/SkillDetail';
import { useProjectViewer } from '../context/ProjectViewerContext';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { cn } from '../lib/cn';

/**
 * An editorial index instead of progress bars. Hover (or tap) a skill to see what it is and
 * which of the projects it appears in — no invented proficiency levels.
 */
export function Skills() {
  const [activeId, setActiveId] = useState<string>(SKILLS[0].id);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { openProject } = useProjectViewer();

  const active = SKILLS.find((skill) => skill.id === activeId) ?? SKILLS[0];
  const activeGroup = SKILL_GROUPS.find((group) => group.id === active.group);

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 md:py-36">
      <Container>
        <SectionHeading
          id="skills-title"
          eyebrow="02 — Skills"
          title="The tools I build with."
          accent={['build']}
          description="No bars, no percentages — just the technologies I work with and where they show up."
        />

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {SKILL_GROUPS.map((group, groupIndex) => (
              <Reveal key={group.id} className={groupIndex > 0 ? 'mt-14' : ''}>
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-ember">{group.label}</p>
                <ul className="border-t border-line">
                  {SKILLS.filter((skill) => skill.group === group.id).map((skill) => {
                    const isActive = skill.id === activeId;
                    const number = String(SKILLS.indexOf(skill) + 1).padStart(2, '0');

                    return (
                      <li key={skill.id} className="border-b border-line">
                        <button
                          type="button"
                          aria-expanded={isActive}
                          onClick={() => setActiveId(skill.id)}
                          onMouseEnter={() => isDesktop && setActiveId(skill.id)}
                          onFocus={() => isDesktop && setActiveId(skill.id)}
                          className={cn(
                            'flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left transition-colors duration-300 md:py-5',
                            isActive ? 'text-white' : 'text-white/35 hover:text-white/80',
                          )}
                        >
                          <span className="flex items-baseline gap-4 md:gap-6">
                            <span className="font-mono text-xs text-ember/80">{number}</span>
                            <span className="font-display text-[clamp(1.9rem,5vw,3.75rem)] font-extrabold leading-none tracking-[-0.03em]">
                              {skill.name}
                            </span>
                          </span>
                          <Plus
                            size={22}
                            aria-hidden="true"
                            className={cn(
                              'shrink-0 transition-transform duration-500 ease-out-expo lg:hidden',
                              isActive && 'rotate-45 text-ember',
                            )}
                          />
                        </button>

                        {!isDesktop && (
                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.45, ease: EASE_OUT }}
                                className="overflow-hidden"
                              >
                                <div className="pb-6 pl-9">
                                  <SkillDetail skill={skill} onOpenProject={openProject} compact />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}
          </div>

          {/* Desktop detail panel */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="glass rounded-3xl p-8 xl:p-10"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">{activeGroup?.label}</p>
                  <p className="mt-4 font-display text-[clamp(2.75rem,4.6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
                    {active.name}
                  </p>
                  <div className="mt-6">
                    <SkillDetail skill={active} onOpenProject={openProject} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
