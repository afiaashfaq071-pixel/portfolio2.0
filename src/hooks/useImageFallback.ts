import { useCallback, useState } from 'react';

interface ImageFallback {
  /** The source currently being tried, or undefined once every source has failed. */
  src: string | undefined;
  /** True once the current source has loaded successfully. */
  loaded: boolean;
  onLoad: () => void;
  onError: () => void;
}

/** Tries each image source in order and moves on whenever one fails to load. */
export function useImageFallback(sources: readonly string[]): ImageFallback {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const exhausted = index >= sources.length;

  const onLoad = useCallback(() => setLoaded(true), []);
  const onError = useCallback(() => {
    setLoaded(false);
    setIndex((i) => i + 1);
  }, []);

  return {
    src: exhausted ? undefined : sources[index],
    loaded: loaded && !exhausted,
    onLoad,
    onError,
  };
}
