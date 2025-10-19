import { useMemo, useState } from "react";

import type { AccountStatus } from "../../types";
import { Badge } from "../atoms/Badge";
import { formatRelativeTime } from "../../utils/dateFormat";

interface SidebarAccount {
  id: string;
  name: string;
  status: AccountStatus;
  isFavorite: boolean;
  lastViewed: string | null;
}

interface SidebarProps {
  accounts: SidebarAccount[];
  activeAccountId: string | null;
  onSelectAccount: (accountId: string) => void;
  onToggleFavorite?: (accountId: string) => void;
}

const statusVariant: Record<AccountStatus, "success" | "warning" | "danger"> = {
  active: "success",
  "at-risk": "warning",
  churned: "danger"
};

const statusLabel: Record<AccountStatus, string> = {
  active: "Active",
  "at-risk": "At Risk",
  churned: "Churned"
};

export const Sidebar = ({ accounts, activeAccountId, onSelectAccount, onToggleFavorite }: SidebarProps) => {
  const [query, setQuery] = useState("");

  const filteredAccounts = useMemo(() => {
    if (!query) return accounts;
    return accounts.filter((account) => account.name.toLowerCase().includes(query.toLowerCase()));
  }, [accounts, query]);

  return (
    <div className="flex h-full flex-col px-4 py-6">
      <div className="mb-4 space-y-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Customer Accounts</p>
          <p className="text-sm text-white/60">{accounts.length} synced</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search accounts"
            className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        {filteredAccounts.map((account) => {
          const isActive = account.id === activeAccountId;
          return (
            <button
              type="button"
              key={account.id}
              onClick={() => onSelectAccount(account.id)}
              className={`group flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm transition ${
                isActive
                  ? "border-primary/50 bg-primary/20 text-white shadow-inner shadow-primary/40"
                  : "border-transparent bg-white/0 text-white/80 hover:border-white/10 hover:bg-white/5"
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium">{account.name}</span>
                  <Badge variant={statusVariant[account.status]} className="text-[11px]">
                    {statusLabel[account.status]}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-white/40">
                  {account.lastViewed ? `Last viewed ${formatRelativeTime(account.lastViewed)}` : "Not viewed yet"}
                </p>
              </div>
              <span
                role="button"
                tabIndex={0}
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleFavorite?.(account.id);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onToggleFavorite?.(account.id);
                  }
                }}
                className="ml-3 text-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label={account.isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {account.isFavorite ? "\u2605" : "\u2606"}
              </span>
            </button>
          );
        })}
        {filteredAccounts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-white/50">
            No accounts match "{query}"
          </div>
        ) : null}
      </div>
    </div>
  );
};
