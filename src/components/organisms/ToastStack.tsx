import { useEffect } from 'react';

import { useUIStore } from '../../store/uiStore';
import { cn } from '../../utils/cn';

const variantStyles: Record<'success' | 'error' | 'warning' | 'info', string> = {
  success: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200',
  error: 'border-rose-500/40 bg-rose-500/10 text-rose-200',
  warning: 'border-amber-400/40 bg-amber-500/10 text-amber-100',
  info: 'border-accent/40 bg-accent/10 text-accent'
};

export const ToastStack = () => {
  const toasts = useUIStore((state) => state.toasts);
  const dismissToast = useUIStore((state) => state.dismissToast);

  useEffect(() => {
    const timers = toasts.map((toast) =>
      window.setTimeout(() => dismissToast(toast.id), toast.duration ?? 4000)
    );
    return () => timers.forEach(window.clearTimeout);
  }, [toasts, dismissToast]);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-3 px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'pointer-events-auto w-full max-w-md rounded-xl border px-4 py-3 text-sm shadow-lg shadow-black/40',
            variantStyles[toast.variant]
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="font-medium">{toast.message}</p>
            {toast.action ? (
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick();
                  dismissToast(toast.id);
                }}
                className="rounded-lg border border-white/10 px-2 py-1 text-xs text-white/70 transition hover:bg-white/10"
              >
                {toast.action.label}
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};
