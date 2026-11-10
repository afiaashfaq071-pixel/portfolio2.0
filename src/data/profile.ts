/**
 * Everything personal lives here. Edit this one file to update the site.
 *
 * Leave `email`, `phone` and `instagram` empty until you are ready — the site
 * shows them as clearly marked placeholders and nothing is invented.
 */

export interface NavItem {
  id: string;
  label: string;
}

export interface ContactConfig {
  /** e.g. "you@example.com". Empty = shown as a placeholder. */
  email: string;
  /** e.g. "+92 300 0000000". Empty = shown as a placeholder. */
  phone: string;
  /** Optional Formspree / Web3Forms style endpoint. Empty = the form uses your email (mailto). */
  formEndpoint: string;
}

export interface SocialConfig {
  github: string;
  /** Either a username ("yourname") or a full URL. Empty = shown as a placeholder. */
  instagram: string;
}

export interface Profile {
  name: string;
  role: string;
  education: string;
  tagline: string;
  philosophy: string;
  footerTagline: string;
  positioning: string;
  /** Put your photo at public/portrait.jpg (portrait orientation, ~800 x 1000). */
  portrait: string;
  contact: ContactConfig;
  socials: SocialConfig;
}

export const PROFILE: Profile = {
  name: 'Abdul Khaliq',
  role: 'Frontend Developer',
  education: 'Intermediate (ICS), First Year',
  tagline: 'Turning ideas into interactive digital experiences.',
  philosophy: 'Dreaming high. Building higher.',
  footerTagline: 'Designed with creativity. Built with code.',
  positioning:
    'A passionate beginner frontend developer focused on building modern, responsive, interactive, and visually impressive websites.',
  portrait: '/portrait.jpg',
  contact: {
    email: 'abdulkhaliqdev9@gmail.com',
    phone: '+92-3418469866',
    formEndpoint: '',
  },
  socials: {
    github: 'https://github.com/afiaashfaq071-pixel',
    instagram: 'https://www.instagram.com/abdul_khaliq1126?srtk=MWw3NzJ2ZTF6MjRsOA==',
  },
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const ABOUT_PARAGRAPHS: string[] = [
  "I'm Abdul Khaliq, an aspiring frontend developer who enjoys transforming ideas into beautiful, functional digital experiences.",
  'I believe great websites are not just about writing code. They are about creating experiences that people remember.',
  "I'm continuously learning, experimenting with modern technologies, and building projects that challenge my creativity and technical abilities.",
  'My ambition is simple: Dream big, build consistently, and create something meaningful.',
];

export function hasValue(value: string): boolean {
  return value.trim().length > 0;
}

export function getEmailHref(): string {
  return hasValue(PROFILE.contact.email) ? `mailto:${PROFILE.contact.email.trim()}` : '#contact-form';
}

export function getPhoneHref(): string {
  return hasValue(PROFILE.contact.phone) ? `tel:${PROFILE.contact.phone.replace(/[^\d+]/g, '')}` : '';
}

export function getInstagramHref(): string {
  const raw = PROFILE.socials.instagram.trim();
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://www.instagram.com/${raw.replace(/^@/, '')}`;
}
