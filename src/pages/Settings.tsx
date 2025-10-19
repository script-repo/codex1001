import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppLayout } from '../components/layouts/AppLayout';
import { AppFooter } from '../components/organisms/AppFooter';
import { AIAssistantPanel } from '../components/organisms/AIAssistantPanel';
import { GlobalHeader } from '../components/organisms/GlobalHeader';
import { Sidebar } from '../components/organisms/Sidebar';
import { useAccountStore } from '../store/accountStore';
import { useChatStore } from '../store/chatStore';
import { useSyncStore } from '../store/syncStore';
import { formatRelativeTime } from '../utils/dateFormat';

const tabs = ['Data Sources', 'Sync', 'Preferences'] as const;

export const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Data Sources');

  const { accounts, loadAccounts } = useAccountStore();
  const { messages, loading, sendMessage } = useChatStore();
  const { metadata } = useSyncStore();

  useEffect(() => {
    void loadAccounts();
  }, [loadAccounts]);

  return (
    <AppLayout
      header={
        <GlobalHeader
          title="Settings"
          subtitle="Manage data sources, sync cadence, and workspace preferences."
          onOpenSettings={() => undefined}
        />
      }
      sidebar={
        <Sidebar
          accounts={accounts.map((account) => ({
            id: account.id,
            name: account.name,
            status: account.status,
            isFavorite: account.metadata.isFavorite,
            lastViewed: account.metadata.lastViewed
          }))}
          activeAccountId={null}
          onSelectAccount={(id) => navigate(`/dashboard/${id}`)}
        />
      }
      aiPanel={
        <AIAssistantPanel
          messages={messages}
          loading={loading}
          suggestions={['How do I connect Salesforce?', 'Can we run a manual sync?', 'What is stored locally?']}
          onSend={(content) => {
            const fallbackAccount = accounts[0]?.id;
            if (fallbackAccount) {
              void sendMessage(content, fallbackAccount);
            }
          }}
        />
      }
      footer={
        <AppFooter
          lastSyncedAt={metadata.lastSyncTime ? formatRelativeTime(metadata.lastSyncTime) : null}
          onSyncNow={() => undefined}
        />
      }
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
            onClick={() => navigate('/dashboard')}
          >
            Back to dashboard
          </button>
          <h2 className="text-2xl font-semibold text-white">Workspace preferences</h2>
        </div>

        <div className="flex flex-wrap gap-4">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === activeTab
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30'
                  : 'border border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-white/5 bg-surface p-6 shadow-lg shadow-black/30">
          {activeTab === 'Data Sources' ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Salesforce</h3>
                <p className="mt-1 text-sm text-white/50">Connected - 25 accounts synced</p>
                <button className="mt-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 transition hover:bg-white/10">
                  Re-authenticate
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">OneDrive</h3>
                <p className="mt-1 text-sm text-white/50">Connected - 500 documents indexed</p>
                <button className="mt-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 transition hover:bg-white/10">
                  Manage folders
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Industry Intelligence</h3>
                <p className="mt-1 text-sm text-white/50">TechCrunch, Gartner, AWS Insights</p>
                <button className="mt-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 transition hover:bg-white/10">
                  Configure sources
                </button>
              </div>
            </div>
          ) : null}

          {activeTab === 'Sync' ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Daily sync schedule</h3>
                <p className="mt-1 text-sm text-white/50">Runs every day at 06:00 local time.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Sync scope</h3>
                <p className="mt-1 text-sm text-white/50">All active accounts - subset mode</p>
              </div>
              <button className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary/80">
                Run manual sync
              </button>
            </div>
          ) : null}

          {activeTab === 'Preferences' ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Theme</h3>
                <p className="mt-1 text-sm text-white/50">Dark mode (default)</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">AI inference endpoint</h3>
                <p className="mt-1 text-sm text-white/50">External (OpenAI) with local fallback (Ollama)</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Notification preferences</h3>
                <p className="mt-1 text-sm text-white/50">Desktop alerts on sync completion</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </AppLayout>
  );
};
