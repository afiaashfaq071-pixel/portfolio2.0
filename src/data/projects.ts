export type ProjectId = 'supermart' | 'music-hub' | 'todoly' | 'forty-eight-laws';

/** How the project title is typeset — gives every project its own voice. */
export type TitleFont = 'display' | 'wide' | 'mono' | 'serif';

export interface ProjectTheme {
  bg: string;
  surface: string;
  fg: string;
  muted: string;
  accent: string;
  accent2: string;
  titleFont: TitleFont;
}

export interface Project {
  id: ProjectId;
  index: string;
  name: string;
  category: string;
  description: string;
  /** Technologies as provided. Leave empty and the stack row is simply not shown. */
  stack: string[];
  liveUrl: string;
  githubUrl: string;
  /** Image sources tried in order; the first one that loads is used. */
  screenshots: string[];
  /** Visual direction, in my own words. */
  visual: string;
  theme: ProjectTheme;
}

/**
 * Screenshot sources, tried in order:
 *  1. a file you add yourself at public/screenshots/<slug>.jpg  (best quality, recommended)
 *  2. a free automatic screenshot of the live site
 *  3. a second automatic screenshot service
 * If all fail, the project's designed artwork is shown instead.
 */
function screenshotSources(slug: string, liveUrl: string): string[] {
  return [
    `/screenshots/${slug}.jpg`,
    `https://api.microlink.io/?url=${encodeURIComponent(liveUrl)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1366&viewport.height=860`,
    `https://image.thum.io/get/width/1400/crop/900/${liveUrl}`,
  ];
}

const SUPERMART_URL = 'https://alihassansuperstore.vercel.app/';
const MUSIC_URL = 'https://music-hub-omega-livid.vercel.app/';
const TODOLY_URL = 'https://project-todoly.vercel.app/';
const LAWS_URL = 'https://laws-ashen.vercel.app/';

export const PROJECTS: Project[] = [
  {
    id: 'supermart',
    index: '01',
    name: 'Ali Hassan Supermart',
    category: 'E-commerce demo',
    description:
      'A modern grocery e-commerce demonstration website featuring product categories, shopping cart functionality, and a responsive shopping experience.',
    stack: ['React', 'Tailwind CSS', 'JavaScript'],
    liveUrl: SUPERMART_URL,
    githubUrl: 'https://github.com/afiaashfaq071-pixel/store',
    screenshots: screenshotSources('supermart', SUPERMART_URL),
    visual:
      'A premium grocery shopping interface with attractive product imagery and a polished e-commerce presentation.',
    theme: {
      bg: '#0b1710',
      surface: '#12261a',
      fg: '#f6efdc',
      muted: '#a8b8a6',
      accent: '#41c878',
      accent2: '#ff8a3d',
      titleFont: 'display',
    },
  },
  {
    id: 'music-hub',
    index: '02',
    name: 'Music Hub',
    category: 'Music-themed web experience',
    description:
      'A custom music-themed web experience with a modern dark interface and an immersive visual identity.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: MUSIC_URL,
    githubUrl: 'https://github.com/afiaashfaq071-pixel/Music-Hub',
    screenshots: screenshotSources('music-hub', MUSIC_URL),
    visual: 'Dark cinematic music atmosphere, creative typography, and sophisticated purple accents.',
    theme: {
      bg: '#0a0610',
      surface: '#160c24',
      fg: '#f3ecff',
      muted: '#a99bc4',
      accent: '#b794f6',
      accent2: '#7c4dff',
      titleFont: 'wide',
    },
  },
  {
    id: 'todoly',
    index: '03',
    name: 'Todoly',
    category: 'Task management app',
    description:
      'A modern task management application designed to help users organize and manage their daily tasks.',
    stack: ['React', 'Tailwind CSS', 'JavaScript'],
    liveUrl: TODOLY_URL,
    githubUrl: 'https://github.com/afiaashfaq071-pixel/Project-Todoly',
    screenshots: screenshotSources('todoly', TODOLY_URL),
    visual: 'Minimal, premium, dark interface with modern glass effects and elegant interactions.',
    theme: {
      bg: '#090e10',
      surface: '#121b1e',
      fg: '#eefafa',
      muted: '#8ea5a8',
      accent: '#7ee6d3',
      accent2: '#38bdf8',
      titleFont: 'mono',
    },
  },
  {
    id: 'forty-eight-laws',
    index: '04',
    name: '48 Laws',
    category: 'Interactive learning experience',
    description:
      'An interactive learning experience presenting the 48 Laws with search functionality, progress tracking, and learning controls.',
    // The technology stack for this project was not provided — add it here when ready,
    // e.g. ['React', 'Tailwind CSS']. While empty, the stack row is hidden.
    stack: [],
    liveUrl: LAWS_URL,
    githubUrl: 'https://github.com/afiaashfaq071-pixel/laws',
    screenshots: screenshotSources('forty-eight-laws', LAWS_URL),
    visual:
      'Elegant editorial design with a sophisticated dark theme, readable typography, and interactive learning elements.',
    theme: {
      bg: '#0d0808',
      surface: '#1a0e0e',
      fg: '#f1e7d6',
      muted: '#b3a28a',
      accent: '#c9a45c',
      accent2: '#8f2d3a',
      titleFont: 'serif',
    },
  },
];

export function getProject(id: ProjectId): Project {
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) {
    throw new Error(`Unknown project id: ${id}`);
  }
  return project;
}
