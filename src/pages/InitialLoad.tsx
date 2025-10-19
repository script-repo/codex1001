import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppFooter } from '../components/organisms/AppFooter';
import { AIAssistantPanel } from '../components/organisms/AIAssistantPanel';
import { GlobalHeader } from '../components/organisms/GlobalHeader';
import { Sidebar } from '../components/organisms/Sidebar';
import { AppLayout } from '../components/layouts/AppLayout';
import { useAccountStore } from '../store/accountStore';
import { useChatStore } from '../store/chatStore';
import { useSyncStore } from '../store/syncStore';
import { formatRelativeTime } from '../utils/dateFormat';

const suggestions = ['How do I get started?', 'What data sources are connected?', 'How often do we sync?'];

export const InitialLoad = () => {
  const navigate = useNavigate();
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
          title="Customer Intelligence Platform"
          subtitle="Select an account to activate the executive dashboard experience."
          onOpenSettings={() => navigate('/settings')}
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
          onSelectAccount={(accountId) => navigate(`/dashboard/${accountId}`)}
        />
      }
      aiPanel={
        <AIAssistantPanel
          messages={messages}
          loading={loading}
          suggestions={suggestions}
          onSend={(content) => {
            const firstAccount = accounts[0];
            if (firstAccount) {
              void sendMessage(content, firstAccount.id);
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
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Welcome
        </div>
        <h2 className="text-3xl font-semibold">Select an account to unlock instant customer context.</h2>
        <p className="mt-4 max-w-xl text-sm text-white/60">
          CS720 combines Salesforce, OneDrive, and industry intelligence to help you understand customer priorities in
          minutes. Choose an account from the left sidebar to begin.
        </p>
        <button
          type="button"
          onClick={() => navigate(`/dashboard/${accounts[0]?.id ?? ''}`)}
          className="mt-8 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/40 transition hover:shadow-primary/60"
        >
          View Customer Success 720 executive dashboard
        </button>
      </div>
    </AppLayout>
  );
};
