import type { ProjectId } from './projects';

export type MilestoneStatus = 'done' | 'current' | 'next';

export interface Milestone {
  id: string;
  index: string;
  title: string;
  body: string;
  status: MilestoneStatus;
  /** Optional project shortcuts shown under the milestone. */
  projectIds?: ProjectId[];
}

/**
 * Deliberately undated: only things that can be verified are stated, so there are
 * no invented years, jobs, awards or clients. Add real dates here if you want them.
 */
export const JOURNEY: Milestone[] = [
  {
    id: 'learning',
    index: '01',
    title: 'Learning frontend development',
    body: 'It started with the fundamentals of the web — HTML for structure, CSS for design and JavaScript for behaviour — and learning by building.',
    status: 'done',
  },
  {
    id: 'first-experiences',
    index: '02',
    title: 'Building my first web experiences',
    body: 'Turning what I was learning into real pages and interfaces that I could open in a browser and share with anyone.',
    status: 'done',
  },
  {
    id: 'react',
    index: '03',
    title: 'Exploring React & modern frontend',
    body: 'Moving into React and Tailwind CSS to build component-based, responsive interfaces — the stack behind my grocery store and task manager projects.',
    status: 'done',
    projectIds: ['supermart', 'todoly'],
  },
  {
    id: 'projects',
    index: '04',
    title: 'Developing independent projects',
    body: 'Four projects are now live on the web: a grocery store, a music experience, a task manager and a learning app — each with its own identity.',
    status: 'done',
    projectIds: ['supermart', 'music-hub', 'todoly', 'forty-eight-laws'],
  },
  {
    id: 'portfolio',
    index: '05',
    title: 'Building my personal portfolio',
    body: 'This site — designed, structured and built with React, TypeScript, Tailwind CSS and Framer Motion as a home for everything above.',
    status: 'current',
  },
  {
    id: 'clients',
    index: '06',
    title: 'Working towards real-world client projects',
    body: 'The next chapter: sharpening my craft and getting ready to build for real people with real goals.',
    status: 'next',
  },
];
