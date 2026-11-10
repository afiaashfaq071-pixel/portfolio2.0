import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence } from 'framer-motion';
import { PROJECTS, type Project, type ProjectId } from '../data/projects';
import { ProjectModal } from '../components/projects/ProjectModal';

interface ProjectViewerValue {
  openProject: (id: ProjectId) => void;
  closeProject: () => void;
}

const ProjectViewerContext = createContext<ProjectViewerValue | null>(null);

/**
 * Owns the "which project is open" state so any section (doors, skills, journey)
 * can open the immersive presentation, and renders the modal itself.
 */
export function ProjectViewerProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<ProjectId | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const openProject = useCallback((id: ProjectId) => {
    const current = document.activeElement;
    returnFocusRef.current = current instanceof HTMLElement ? current : null;
    setActiveId(id);
  }, []);

  const closeProject = useCallback(() => setActiveId(null), []);

  const stepProject = useCallback((direction: 1 | -1) => {
    setActiveId((current) => {
      if (current === null) return current;
      const index = PROJECTS.findIndex((p) => p.id === current);
      return PROJECTS[(index + direction + PROJECTS.length) % PROJECTS.length].id;
    });
  }, []);

  const value = useMemo<ProjectViewerValue>(() => ({ openProject, closeProject }), [openProject, closeProject]);

  const activeIndex = PROJECTS.findIndex((p) => p.id === activeId);
  const active: Project | null = activeIndex >= 0 ? PROJECTS[activeIndex] : null;
  const next: Project = PROJECTS[(Math.max(activeIndex, 0) + 1) % PROJECTS.length];

  return (
    <ProjectViewerContext.Provider value={value}>
      {children}
      <AnimatePresence onExitComplete={() => returnFocusRef.current?.focus()}>
        {active && (
          <ProjectModal
            project={active}
            nextProject={next}
            total={PROJECTS.length}
            onClose={closeProject}
            onStep={stepProject}
          />
        )}
      </AnimatePresence>
    </ProjectViewerContext.Provider>
  );
}

export function useProjectViewer(): ProjectViewerValue {
  const context = useContext(ProjectViewerContext);
  if (!context) {
    throw new Error('useProjectViewer must be used inside <ProjectViewerProvider>');
  }
  return context;
}
