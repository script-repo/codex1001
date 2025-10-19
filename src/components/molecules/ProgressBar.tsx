interface ProgressBarProps {
  value: number;
  ariaLabel?: string;
}

export const ProgressBar = ({ value, ariaLabel }: ProgressBarProps) => (
  <div className="h-2 w-full rounded-full bg-white/10" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={ariaLabel}>
    <div
      className="h-full rounded-full bg-gradient-to-r from-primary via-purple-500 to-emerald-400 transition-all"
      style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
    />
  </div>
);
