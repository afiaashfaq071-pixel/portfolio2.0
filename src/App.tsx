import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import { ProjectViewerProvider } from './context/ProjectViewerContext';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { Hero } from './sections/Hero';
import { Journey } from './sections/Journey';
import { Skills } from './sections/Skills';
import { Work } from './sections/Work';

export default function App() {
  // `revealed` flips when the loader curtain starts opening; `loaded` when it has fully gone.
  const [revealed, setRevealed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <ProjectViewerProvider>
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-bg"
        >
          Skip to my work
        </a>

        <CustomCursor />
        <ScrollProgress />
        {!loaded && <Loader onOpen={() => setRevealed(true)} onDone={() => setLoaded(true)} />}

        <Navbar play={revealed} />

        <main>
          <Hero play={revealed} />
          <Work />
          <Skills />
          <Journey />
          <About />
          <Contact />
        </main>

        <Footer />
        <div aria-hidden="true" className="grain" />
      </ProjectViewerProvider>
    </MotionConfig>
  );
}
