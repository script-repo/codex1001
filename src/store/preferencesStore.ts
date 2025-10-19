import { create } from 'zustand';

import type { UserPreferences } from '../types';

interface PreferencesStore {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
}

const initialPreferences: UserPreferences = {
  id: 'user-preferences',
  theme: 'dark',
  notifications: {
    desktop: true,
    syncComplete: true
  },
  ai: {
    inferenceEndpoint: 'external',
    autoSuggestions: true,
    queryHistoryRetention: 60
  },
  dashboard: {
    defaultAccount: undefined,
    cardOrder: [
      'key-priorities',
      'upcoming-dates',
      'in-flight-projects',
      'customer-sat-issues',
      'open-tickets',
      'industry-intelligence'
    ]
  },
  sync: {
    schedule: 'daily',
    scheduledTime: '06:00',
    accountScope: 'all',
    selectedAccounts: []
  },
  updatedAt: new Date().toISOString()
};

export const usePreferencesStore = create<PreferencesStore>((set) => ({
  preferences: initialPreferences,
  updatePreferences: (updates) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        ...updates,
        updatedAt: new Date().toISOString()
      }
    }))
}));
