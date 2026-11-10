import type { ProjectId } from './projects';

export type SkillGroupId = 'frontend' | 'tools';

export interface SkillGroup {
  id: SkillGroupId;
  label: string;
}

/** Where a skill appears. A `projectId` makes it clickable; without one it is a plain label. */
export interface SkillUsage {
  label: string;
  projectId?: ProjectId;
}

export interface Skill {
  id: string;
  name: string;
  group: SkillGroupId;
  /** What the technology is — descriptive only, no levels or percentages. */
  blurb: string;
  /** Only places that are backed by the project list. */
  usedIn: SkillUsage[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  { id: 'frontend', label: 'Frontend Development' },
  { id: 'tools', label: 'Tools & Libraries' },
];

const PORTFOLIO: SkillUsage = { label: 'This portfolio' };
const SUPERMART: SkillUsage = { label: 'Ali Hassan Supermart', projectId: 'supermart' };
const MUSIC: SkillUsage = { label: 'Music Hub', projectId: 'music-hub' };
const TODOLY: SkillUsage = { label: 'Todoly', projectId: 'todoly' };
const LAWS: SkillUsage = { label: '48 Laws', projectId: 'forty-eight-laws' };

export const SKILLS: Skill[] = [
  {
    id: 'html5',
    name: 'HTML5',
    group: 'frontend',
    blurb: 'Semantic structure — the foundation every page is built on.',
    usedIn: [MUSIC],
  },
  {
    id: 'css3',
    name: 'CSS3',
    group: 'frontend',
    blurb: 'Layout, typography and motion — where an interface gets its personality.',
    usedIn: [MUSIC],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    group: 'frontend',
    blurb: 'The language that makes interfaces respond and behave.',
    usedIn: [SUPERMART, MUSIC, TODOLY],
  },
  {
    id: 'react',
    name: 'React',
    group: 'frontend',
    blurb: 'Component-based interfaces built from small, reusable pieces.',
    usedIn: [SUPERMART, TODOLY, PORTFOLIO],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    group: 'frontend',
    blurb: 'JavaScript with types — safer, more readable code.',
    usedIn: [PORTFOLIO],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    group: 'frontend',
    blurb: 'Utility-first styling for fast, consistent, responsive design.',
    usedIn: [SUPERMART, TODOLY, PORTFOLIO],
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    group: 'tools',
    blurb: 'Declarative animation for React — transitions, gestures and scroll effects.',
    usedIn: [PORTFOLIO],
  },
  {
    id: 'lucide',
    name: 'Lucide React',
    group: 'tools',
    blurb: 'A clean, consistent icon set for React interfaces.',
    usedIn: [PORTFOLIO],
  },
  {
    id: 'git',
    name: 'Git',
    group: 'tools',
    blurb: 'Version control — tracking changes and keeping a history of the work.',
    usedIn: [],
  },
  {
    id: 'github',
    name: 'GitHub',
    group: 'tools',
    blurb: 'Where the source code of every project lives.',
    usedIn: [SUPERMART, MUSIC, TODOLY, LAWS],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    group: 'tools',
    blurb: 'Where the live projects are deployed.',
    usedIn: [SUPERMART, MUSIC, TODOLY, LAWS],
  },
];
