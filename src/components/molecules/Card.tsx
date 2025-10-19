import type { ReactNode } from 'react';

import { Button } from '../atoms/Button';

interface CardProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  children: ReactNode;
}

export const Card = ({ title, subtitle, actionLabel, onAction, children }: CardProps) => {
  return (
    <div className="rounded-2xl border border-white/5 bg-surface p-6 shadow-lg shadow-black/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle ? <p className="mt-1 text-sm text-white/50">{subtitle}</p> : null}
        </div>
        {actionLabel ? (
          <Button variant="ghost" size="sm" onClick={onAction} className="rounded-full border border-white/10 px-3 py-1.5 text-xs">
            {actionLabel}
          </Button>
        ) : null}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
};
