import type { Project } from '../../data/projects';
import { useImageFallback } from '../../hooks/useImageFallback';
import { cn } from '../../lib/cn';
import { ProjectBackdrop } from './ProjectBackdrop';

interface ProjectPreviewProps {
  project: Project;
  /**
   * Must include a positioning class (e.g. "absolute inset-0"), because the
   * artwork and image layers are positioned inside this element.
   */
  className: string;
  eager?: boolean;
}

/**
 * Screenshot of a project with graceful fallbacks: local file → screenshot services →
 * the project's own artwork (which is always underneath, so nothing ever looks broken).
 */
export function ProjectPreview({ project, className, eager = false }: ProjectPreviewProps) {
  const { src, loaded, onLoad, onError } = useImageFallback(project.screenshots);

  return (
    <div className={cn('overflow-hidden', className)}>
      <ProjectBackdrop project={project} />
      {src && (
        <img
          key={src}
          src={src}
          alt={`Screenshot of ${project.name}`}
          width={1366}
          height={860}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={onLoad}
          onError={onError}
          className={cn(
            'absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
    </div>
  );
}
