import { create } from 'zustand';

import type { SyncJob, SyncMetadata } from '../types';

interface SyncStore {
  metadata: SyncMetadata;
  history: SyncJob[];
  currentJob: SyncJob | null;
  updateMetadata: (metadata: Partial<SyncMetadata>) => void;
  logJob: (job: SyncJob) => void;
  startSync: (job: SyncJob) => void;
  completeSync: (jobId: string, status: SyncJob['status']) => void;
}

const initialMetadata: SyncMetadata = {
  id: 'sync-metadata',
  lastSyncTime: null,
  nextScheduledSync: null,
  syncStatus: 'stale'
};

export const useSyncStore = create<SyncStore>((set) => ({
  metadata: initialMetadata,
  history: [],
  currentJob: null,
  updateMetadata: (metadata) =>
    set((state) => ({
      metadata: {
        ...state.metadata,
        ...metadata
      }
    })),
  logJob: (job) =>
    set((state) => ({
      history: [job, ...state.history].slice(0, 10)
    })),
  startSync: (job) =>
    set(() => ({
      currentJob: job,
      metadata: {
        ...initialMetadata,
        syncStatus: 'syncing'
      }
    })),
  completeSync: (jobId, status) =>
    set((state) => ({
      currentJob: null,
      metadata: {
        ...state.metadata,
        syncStatus: status === 'completed' ? 'synced' : 'error',
        lastSyncTime: new Date().toISOString()
      },
      history: state.history.map((job) =>
        job.id === jobId
          ? {
              ...job,
              status,
              completedAt: new Date().toISOString()
            }
          : job
      )
    }))
}));
