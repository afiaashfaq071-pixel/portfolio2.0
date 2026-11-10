import { cn } from '../lib/cn';

interface MarqueeProps {
  items: string[];
  className?: string;
}

/** Endless horizontal ticker (pure CSS — stops automatically for reduced-motion users). */
export function Marquee({ items, className }: MarqueeProps) {
  const row = (key: string, hidden: boolean) => (
    <div
      key={key}
      className="flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={hidden ? 'true' : undefined}
    >
      {items.map((item, i) => (
        <span key={`${key}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
          {item}
          <span className="inline-block size-2 rotate-45 bg-ember" />
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn('overflow-hidden', className)}>
      <div className="marquee-track flex w-max">
        {row('a', false)}
        {row('b', true)}
      </div>
    </div>
  );
}
