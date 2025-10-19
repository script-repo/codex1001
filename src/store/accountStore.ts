import { create } from 'zustand';

import { db } from '../db/schema';
import { accounts as mockAccounts } from '../services/mockData';
import type { Account } from '../types';

interface AccountStore {
  accounts: Account[];
  activeAccountId: string | null;
  loading: boolean;
  error: string | null;
  setActiveAccount: (accountId: string) => void;
  toggleFavorite: (accountId: string) => void;
  updateLastViewed: (accountId: string) => Promise<void>;
  loadAccounts: () => Promise<void>;
}

export const useAccountStore = create<AccountStore>((set, get) => ({
  accounts: mockAccounts,
  activeAccountId: mockAccounts[0]?.id ?? null,
  loading: false,
  error: null,
  setActiveAccount: (accountId) => {
    set({ activeAccountId: accountId });
    void get().updateLastViewed(accountId);
  },
  toggleFavorite: (accountId) => {
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account.id === accountId
          ? {
              ...account,
              metadata: {
                ...account.metadata,
                isFavorite: !account.metadata.isFavorite
              }
            }
          : account
      )
    }));
  },
  updateLastViewed: async (accountId) => {
    const timestamp = new Date().toISOString();
    try {
      await db.accounts.update(accountId, {
        metadata: {
          ...get().accounts.find((account) => account.id === accountId)?.metadata,
          lastViewed: timestamp
        },
        updatedAt: timestamp
      });
    } catch {
      // Dexie update is best-effort during development
    }
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account.id === accountId
          ? {
              ...account,
              metadata: {
                ...account.metadata,
                lastViewed: timestamp
              },
              updatedAt: timestamp
            }
          : account
      )
    }));
  },
  loadAccounts: async () => {
    set({ loading: true, error: null });
    try {
      const rows = await db.accounts.toArray();
      if (rows.length > 0) {
        set({ accounts: rows, loading: false });
        return;
      }
      // Seed Dexie with mock data for now
      await db.accounts.bulkPut(mockAccounts);
      set({ accounts: mockAccounts, loading: false });
    } catch (error) {
      set({ accounts: mockAccounts, loading: false, error: error instanceof Error ? error.message : String(error) });
    }
  }
}));
