import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { cn } from '../lib/cn';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';

const BASE =
  'group relative inline-flex min-h-12 select-none items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3 font-display text-sm font-semibold tracking-wide transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60';

const VARIANTS: Record<ButtonVariant, string> = {
  solid: 'bg-white text-bg hover:bg-ember',
  outline: 'border border-white/25 text-white hover:border-white hover:bg-white/5',
  ghost: 'text-white/80 hover:text-white',
};

export function buttonClasses(variant: ButtonVariant, className?: string): string {
  return cn(BASE, VARIANTS[variant], className);
}

function Icon({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-1"
    >
      {children}
    </span>
  );
}

interface CommonProps {
  variant?: ButtonVariant;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

interface ButtonProps extends CommonProps {
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

/** A real <button>. */
export function Button({
  variant = 'solid',
  icon,
  className,
  style,
  children,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={buttonClasses(variant, className)}
    >
      {children}
      {icon && <Icon>{icon}</Icon>}
    </button>
  );
}

interface LinkButtonProps extends CommonProps {
  href: string;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
  dataCursor?: string;
}

/** A real <a> that looks like a button. Use `external` for off-site links. */
export function LinkButton({
  variant = 'solid',
  icon,
  className,
  style,
  children,
  href,
  external = false,
  dataCursor,
}: LinkButtonProps) {
  return (
    <a
      href={href}
      style={style}
      data-cursor={dataCursor}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={buttonClasses(variant, className)}
    >
      {children}
      {icon && <Icon>{icon}</Icon>}
    </a>
  );
}
