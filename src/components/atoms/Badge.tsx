import type { HTMLAttributes } from 'react';

import { cn } from '../../utils/cn';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-white/10 text-white/80',
  success: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/40',
  warning: 'bg-warning/10 text-warning border border-warning/40',
  danger: 'bg-rose-500/10 text-rose-300 border border-rose-500/40',
  info: 'bg-accent/10 text-accent border border-accent/40',
  neutral: 'bg-white/5 text-white/60 border border-white/10'
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  uppercase?: boolean;
}

export const Badge = ({ variant = 'default', uppercase = false, className, ...props }: BadgeProps) => (
  <span
    {...props}
    className={cn(
      'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide',
      uppercase && 'uppercase tracking-[0.2em]',
      variantStyles[variant],
      className
    )}
  />
);
