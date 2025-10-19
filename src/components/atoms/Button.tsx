import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const baseStyles =
  'inline-flex items-center justify-center rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-60';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary/80',
  secondary: 'border border-white/10 bg-white/5 text-white/80 hover:bg-white/10',
  tertiary: 'text-white/70 hover:text-white focus-visible:ring-0',
  danger: 'bg-danger text-white hover:bg-danger/80',
  ghost: 'border border-white/10 bg-transparent text-white/70 hover:bg-white/10'
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base'
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], fullWidth && 'w-full', className)}
      disabled={loading || props.disabled}
    >
      {icon && iconPosition === 'left' ? <span className="mr-2">{icon}</span> : null}
      <span className="flex items-center gap-2">
        {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-transparent" /> : null}
        {children}
      </span>
      {icon && iconPosition === 'right' ? <span className="ml-2">{icon}</span> : null}
    </button>
  );
};
