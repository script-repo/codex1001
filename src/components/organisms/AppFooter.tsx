import { Button } from '../atoms/Button';

interface AppFooterProps {
  lastSyncedAt?: string | null;
  status?: 'online' | 'offline';
  onSyncNow?: () => void;
}

export const AppFooter = ({ lastSyncedAt, status = 'online', onSyncNow }: AppFooterProps) => {
  return (
    <div className="flex flex-col gap-3 px-6 py-4 text-sm text-white/70 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${status === 'online' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
        <span>{status === 'online' ? 'Online' : 'Offline mode'}</span>
      </div>
      <div className="flex items-center gap-3">
        <span>{lastSyncedAt ? `Last synced ${lastSyncedAt}` : 'Sync has not been run yet'}</span>
        <Button variant="secondary" size="sm" onClick={onSyncNow}>
          Sync Now
        </Button>
      </div>
      <a
        href="#/settings"
        className="inline-flex items-center gap-2 text-xs font-medium text-white/60 transition hover:text-white/90"
      >
        Need help?
      </a>
    </div>
  );
};
