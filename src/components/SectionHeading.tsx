import { SplitText } from '../animations/SplitText';
import { Reveal } from '../animations/Reveal';
import { cn } from '../lib/cn';

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: string;
  /** Words from the title to set in the italic serif accent. */
  accent?: string[];
  description?: string;
  className?: string;
}

export function SectionHeading({ id, eyebrow, title, accent, description, className }: SectionHeadingProps) {
  return (
    <header className={cn('max-w-4xl', className)}>
      <Reveal>
        <p className="mb-6 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted md:text-xs">
          <span aria-hidden="true" className="h-px w-10 bg-ember" />
          {eyebrow}
        </p>
      </Reveal>
      <h2
        id={id}
        className="font-display text-[clamp(2.5rem,7vw,5.75rem)] font-extrabold leading-[0.95] tracking-[-0.035em]"
      >
        <SplitText text={title} accent={accent} />
      </h2>
      {description && (
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-base text-muted md:text-lg">{description}</p>
        </Reveal>
      )}
    </header>
  );
}
