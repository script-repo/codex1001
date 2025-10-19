import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { formatRelativeTime } from '../../utils/dateFormat';

interface GlobalHeaderProps {
  title: string;
  subtitle?: string;
  lastSyncedAt?: string | null;
  onOpenSettings?: () => void;
}

export const GlobalHeader = ({ title, subtitle, lastSyncedAt, onOpenSettings }: GlobalHeaderProps) => (
  <div className="flex items-center justify-between px-6 py-4 lg:px-10">
    <div className="space-y-1">
      <div className="flex items-center gap-3">
        <Badge className="rounded-xl bg-gradient-to-r from-primary to-accent px-3 py-1 text-sm font-semibold uppercase tracking-[0.4em] text-white/90">
          CS720
        </Badge>
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h1>
      </div>
      {subtitle ? <p className="text-sm text-white/60">{subtitle}</p> : null}
    </div>
    <div className="flex items-center gap-3">
      <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 md:flex">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
        <span>{lastSyncedAt ? `Synced ${formatRelativeTime(lastSyncedAt)}` : 'Sync pending'}</span>
      </div>
      <Button variant="secondary" size="md" onClick={onOpenSettings} className="gap-2">
        <span className="hidden md:inline">Settings</span>
        <span aria-hidden="true">⚙️</span>
      </Button>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
        SL
      </div>
    </div>
  </div>
);
