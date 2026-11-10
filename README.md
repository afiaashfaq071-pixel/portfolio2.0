# Abdul Khaliq — Portfolio

A cinematic, interactive frontend portfolio built with **React 19, TypeScript, Tailwind CSS v4, Framer Motion and Lucide React** (Vite).

## Run it

```bash
npm install
npm run dev        # development at http://localhost:5173
npm run check      # type-check + production build
npm run preview    # preview the production build
```

Requires Node 20 or newer.

## Deploy (Vercel)

Import the repository on Vercel. It detects Vite automatically (build command `npm run build`, output `dist`).

## The 5 things to fill in

Everything personal lives in **`src/data/profile.ts`**. Nothing is invented — anything left empty is shown as a clearly marked placeholder.

| What | Where | Until you add it |
| --- | --- | --- |
| Your photo | Save as `public/portrait.jpg` (portrait, about 800 × 1000) | An "AK" monogram is shown |
| Email | `PROFILE.contact.email` | Placeholder shown, "Email me" scrolls to the form |
| Phone | `PROFILE.contact.phone` | Placeholder shown |
| Instagram | `PROFILE.socials.instagram` (username or full URL) | Placeholder shown, footer icon hidden |
| Contact form delivery | `PROFILE.contact.formEndpoint` (e.g. a Formspree URL) | Uses your email (mailto) once set; otherwise tells the visitor it is not connected |

Also recommended: add real screenshots to `public/screenshots/` (`supermart.jpg`, `music-hub.jpg`, `todoly.jpg`, `forty-eight-laws.jpg`, about 1400 × 900). If they are missing, the site tries a free automatic screenshot of each live site, and then falls back to each project's own designed artwork.

The technology stack for **48 Laws** was not provided, so its stack row is hidden. Add it in `src/data/projects.ts` (`stack: [...]`).

## Structure

```
src/
  animations/   Reveal, SplitText, ScrollWords, Marquee, shared easings
  components/   Navbar, Loader, CustomCursor, Magnetic, Button, ContactForm, …
    projects/   Door, DoorArt, ProjectModal, ProjectPreview, ProjectBackdrop
  context/      ProjectViewerContext (opens the project presentation from anywhere)
  data/         profile, projects, skills, journey  ← edit content here
  hooks/        useMediaQuery, useActiveSection, useLockBodyScroll, …
  sections/     Hero, Work, Skills, Journey, About, Contact, Footer
```

## Notes

- Custom cursor only runs on desktop with a mouse; touch devices get a swipe row of doors where the centred door opens by itself.
- `prefers-reduced-motion` is respected (loader, text reveals, parallax, magnetic buttons and cursor are simplified or disabled).
- The timeline is deliberately undated so nothing unverifiable is claimed. Add real dates in `src/data/journey.ts` if you want them.
