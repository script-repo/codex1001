import type { HTMLAttributes } from 'react';

import { cn } from '../../utils/cn';

export const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={cn('animate-pulse rounded-lg bg-white/5', className)}
  />
);
