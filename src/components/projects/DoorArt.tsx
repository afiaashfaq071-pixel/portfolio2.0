import type { Project, ProjectTheme } from '../../data/projects';

/*
 * Each project gets its own door. These are drawn with plain CSS (no images) and react to the
 * parent's `data-active="true"` state through Tailwind's `group-data-[active=true]:` variant.
 */

const CRATES: number[][] = [
  [2.6, 3.4, 2.2, 3.8, 2.8],
  [3.2, 2.2, 3.6, 2.4, 3.0],
  [2.4, 3.8, 2.6, 3.2, 2.2],
];

function SupermartArt({ t }: { t: ProjectTheme }) {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: `linear-gradient(180deg, ${t.surface}, ${t.bg})` }}>
      {/* Striped awning */}
      <div
        className="relative h-[17%] shrink-0 transition-transform duration-700 ease-out-expo group-data-[active=true]:-translate-y-1"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${t.accent2} 0 2rem, ${t.fg} 2rem 4rem)`,
          boxShadow: '0 16px 30px -12px rgb(0 0 0 / 0.7)',
        }}
      >
        <div
          className="absolute inset-x-0 bottom-0 h-2"
          style={{ background: 'repeating-linear-gradient(90deg, transparent 0 1rem, rgb(0 0 0 / 0.2) 1rem 2rem)' }}
        />
      </div>

      {/* Hanging sign */}
      <div
        className="absolute left-1/2 top-[19.5%] -translate-x-1/2 rounded-sm px-3 py-1 font-mono text-[10px] font-medium tracking-[0.3em]"
        style={{ background: t.fg, color: t.bg }}
      >
        OPEN
      </div>

      {/* Shelves of produce crates */}
      <div className="flex flex-1 flex-col justify-evenly px-[12%] pb-8 pt-12">
        {CRATES.map((row, r) => (
          <div key={r} className="flex items-end gap-2 border-b-2 pb-1" style={{ borderColor: `${t.fg}22` }}>
            {row.map((height, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-md transition-transform duration-500 ease-out-expo group-data-[active=true]:-translate-y-1.5"
                style={{
                  height: `${height}rem`,
                  background: (r + i) % 2 === 0 ? t.accent : t.accent2,
                  opacity: 0.88,
                  transitionDelay: `${(r * 5 + i) * 35}ms`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function MusicArt({ t }: { t: ProjectTheme }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: `radial-gradient(120% 80% at 50% 0%, ${t.surface}, ${t.bg})` }}
    >
      {/* Arched doorway */}
      <div
        className="absolute inset-x-[9%] bottom-0 top-[6%] rounded-t-[999px]"
        style={{
          border: `1px solid ${t.accent}55`,
          background: `linear-gradient(180deg, ${t.accent}22, transparent 70%)`,
        }}
      />

      {/* Vinyl */}
      <div
        className="vinyl absolute left-1/2 top-[20%] aspect-square w-[64%] -translate-x-1/2 rounded-full"
        style={{
          background: 'repeating-radial-gradient(circle, #09090b 0 2px, #1a1128 2px 4px)',
          boxShadow: `0 0 0 1px ${t.accent}44, 0 34px 70px -24px ${t.accent}88`,
        }}
      >
        <div
          className="absolute inset-[33%] rounded-full"
          style={{ background: `conic-gradient(from 0deg, ${t.accent}, ${t.accent2}, ${t.accent})` }}
        />
        <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
      </div>

      {/* Equaliser */}
      <div className="absolute inset-x-[16%] bottom-[6%] flex h-[15%] items-end gap-[3%]">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className="eq-bar h-full flex-1 rounded-sm"
            style={{
              background: `linear-gradient(0deg, ${t.accent2}, ${t.accent})`,
              animationDelay: `${i * 0.09}s`,
              animationDuration: `${0.6 + ((i * 7) % 5) * 0.12}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const TASK_ROWS = [78, 56, 88, 44];

function TodolyArt({ t }: { t: ProjectTheme }) {
  return (
    <div className="absolute inset-0 grid place-items-center" style={{ background: `linear-gradient(160deg, ${t.surface}, ${t.bg})` }}>
      <div
        className="w-[72%] rounded-2xl p-5"
        style={{
          background: `${t.fg}0d`,
          border: `1px solid ${t.fg}1f`,
          boxShadow: `0 30px 60px -30px ${t.accent}55`,
        }}
      >
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: t.muted }}>
          Today
        </p>
        {TASK_ROWS.map((width, i) => (
          <div key={i} className="mb-4 flex items-center gap-3 last:mb-0">
            <span
              className="size-5 shrink-0 rounded-md border border-white/30 transition-[background-color,border-color] duration-500 group-data-[active=true]:border-[var(--accent)] group-data-[active=true]:bg-[var(--accent)]"
              style={{ transitionDelay: `${i * 170}ms` }}
            />
            <span className="relative h-2 rounded-full" style={{ width: `${width}%`, background: `${t.fg}26` }}>
              <span
                className="absolute inset-y-0 left-0 w-0 rounded-full opacity-60 transition-[width] duration-700 ease-out-expo group-data-[active=true]:w-full"
                style={{ background: t.accent, transitionDelay: `${i * 170 + 120}ms` }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LawsArt({ t }: { t: ProjectTheme }) {
  return (
    <div className="absolute inset-0" style={{ background: `radial-gradient(90% 70% at 50% 30%, ${t.surface}, ${t.bg})` }}>
      <div className="absolute inset-[6%] border" style={{ borderColor: `${t.accent}55` }} />
      <div className="absolute inset-[9%] border" style={{ borderColor: `${t.accent}22` }} />
      <div className="absolute inset-0 grid place-items-center">
        <span
          className="font-serif text-[clamp(5.5rem,10vw,9.5rem)] leading-[0.82] transition-[text-shadow] duration-700 [text-orientation:upright] [writing-mode:vertical-rl] group-data-[active=true]:[text-shadow:0_0_44px_var(--accent)]"
          style={{ color: t.accent }}
        >
          XLVIII
        </span>
      </div>
      <p
        className="absolute inset-x-0 bottom-[11%] text-center font-mono text-[10px] uppercase tracking-[0.5em]"
        style={{ color: t.muted }}
      >
        Laws
      </p>
    </div>
  );
}

interface DoorArtProps {
  project: Project;
}

/** The closed door: unique artwork per project, plus a handle and an inner shadow. */
export function DoorArt({ project }: DoorArtProps) {
  const t = project.theme;

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: t.bg }}>
      {project.id === 'supermart' && <SupermartArt t={t} />}
      {project.id === 'music-hub' && <MusicArt t={t} />}
      {project.id === 'todoly' && <TodolyArt t={t} />}
      {project.id === 'forty-eight-laws' && <LawsArt t={t} />}

      {/* Handle */}
      <div
        className="absolute right-[7%] top-[54%] h-16 w-1.5 -translate-y-1/2 rounded-full"
        style={{ background: t.accent, boxShadow: `0 0 18px ${t.accent}88` }}
      />
      {/* Inner shadow */}
      <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 90px rgb(0 0 0 / 0.55)' }} />
    </div>
  );
}
