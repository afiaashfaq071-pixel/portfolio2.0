import { ArrowUpRight } from 'lucide-react';
import type { ProjectId } from '../data/projects';
import type { Skill } from '../data/skills';

interface SkillDetailProps {
  skill: Skill;
  onOpenProject: (id: ProjectId) => void;
  compact?: boolean;
}

/** What a skill is, and — where the project list backs it up — where it appears. */
export function SkillDetail({ skill, onOpenProject, compact = false }: SkillDetailProps) {
  return (
    <div>
      <p className={compact ? 'text-base text-muted' : 'text-lg text-muted md:text-xl'}>{skill.blurb}</p>

      {skill.usedIn.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">Appears in</p>
          <ul className="flex flex-wrap gap-2">
            {skill.usedIn.map((usage) => {
              const projectId = usage.projectId;
              return (
                <li key={usage.label}>
                  {projectId ? (
                    <button
                      type="button"
                      onClick={() => onOpenProject(projectId)}
                      className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-ember/50 px-4 py-2 font-mono text-xs text-ember transition-colors hover:bg-ember hover:text-bg"
                    >
                      {usage.label}
                      <ArrowUpRight
                        size={14}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </button>
                  ) : (
                    <span className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 py-2 font-mono text-xs text-white/70">
                      {usage.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
