import type { TitleFont } from '../../data/projects';

/** One typographic voice per project. */
export const TITLE_FONT_CLASS: Record<TitleFont, string> = {
  display: 'font-display font-extrabold tracking-[-0.03em]',
  wide: 'font-display font-semibold uppercase tracking-[0.14em]',
  mono: 'font-mono font-medium tracking-[-0.04em]',
  serif: 'font-serif font-normal italic tracking-[-0.01em]',
};
