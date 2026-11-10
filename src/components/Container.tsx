import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Consistent page gutters and max width. */
export function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-[90rem] px-5 md:px-10', className)}>{children}</div>;
}
