import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../components/atoms/Button';
import { Badge } from '../components/atoms/Badge';
import { AppLayout } from '../components/layouts/AppLayout';
import { Card } from '../components/molecules/Card';
import { ProgressBar } from '../components/molecules/ProgressBar';
import { AppFooter } from '../components/organisms/AppFooter';
import { AIAssistantPanel } from '../components/organisms/AIAssistantPanel';
import { GlobalHeader } from '../components/organisms/GlobalHeader';
import { Sidebar } from '../components/organisms/Sidebar';
import { useAccountStore } from '../store/accountStore';
import { useChatStore } from '../store/chatStore';
import { useDashboardStore } from '../store/dashboardStore';
import { usePreferencesStore } from '../store/preferencesStore';
import { useSyncStore } from '../store/syncStore';
import { useUIStore } from '../store/uiStore';
import { formatRelativeTime } from '../utils/dateFormat';
import { truncate } from '../utils/markdown';

const suggestions = [
  'Summarize the latest platform health.',
  'Create an incident response briefing.',
  'Outline cost optimization priorities.'
];

const issueSeverityVariant: Record<string, 'danger' | 'warning' | 'info' | 'success'> = {
  critical: 'danger',
  high: 'warning',
  medium: 'info',
  low: 'success'
};

const priorityCategoryVariant: Record<string, 'info' | 'warning' | 'success' | 'danger'> = {
  upsell: 'success',
  retention: 'warning',
  technical: 'info',
  strategic: 'info'
};

const eventSeverityVariant: Record<string, 'danger' | 'warning' | 'info'> = {
  urgent: 'danger',
  soon: 'warning',
  normal: 'info'
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const { accountId: routeAccountId } = useParams<{ accountId?: string }>();

  const {
    accounts,
    activeAccountId,
    loading: accountsLoading,
    setActiveAccount,
    toggleFavorite,
    loadAccounts
  } = useAccountStore();

  const {
    priorities,
    upcomingDates,
    projects,
    customerIssues,
    tickets,
    industryIntelligence,
    loadAccountData
  } = useDashboardStore();

  const { messages, loading: chatLoading, sendMessage, loadHistory } = useChatStore();

  const { metadata } = useSyncStore();
  const { preferences } = usePreferencesStore();
  const { openModal } = useUIStore();

  useEffect(() => {
    void loadAccounts();
  }, [loadAccounts]);

  const activeAccount = useMemo(
    () => accounts.find((account) => account.id === activeAccountId) ?? null,
    [accounts, activeAccountId]
  );

  useEffect(() => {
    if (routeAccountId && routeAccountId !== activeAccountId) {
      setActiveAccount(routeAccountId);
    }
  }, [routeAccountId, activeAccountId, setActiveAccount]);

  useEffect(() => {
    if (!routeAccountId && activeAccountId) {
      navigate(`/dashboard/${activeAccountId}`, { replace: true });
    }
  }, [routeAccountId, activeAccountId, navigate]);

  useEffect(() => {
    if (activeAccountId) {
      void loadAccountData(activeAccountId);
      loadHistory(activeAccountId);
    }
  }, [activeAccountId, loadAccountData, loadHistory]);

  const totalSignals =
    priorities.length + upcomingDates.length + projects.length + customerIssues.length + tickets.length;

  const favoriteAccounts = useMemo(
    () =>
      preferences.dashboard.cardOrder.includes('key-priorities')
        ? accounts.filter((account) => account.metadata.isFavorite)
        : [],
    [accounts, preferences.dashboard.cardOrder]
  );

  return (
    <AppLayout
      header={
        <GlobalHeader
          title={activeAccount ? activeAccount.name : 'Customer Dashboard'}
          subtitle={
            activeAccount
              ? `${activeAccount.industry} • ${activeAccount.metadata.siteCount} sites`
              : 'Select an account to begin'
          }
          lastSyncedAt={metadata.lastSyncTime}
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
          activeAccountId={activeAccountId}
          onSelectAccount={(id) => navigate(`/dashboard/${id}`)}
          onToggleFavorite={toggleFavorite}
        />
      }
      aiPanel={
        <AIAssistantPanel
          messages={messages}
          suggestions={suggestions}
          loading={chatLoading}
          onSend={(content) => {
            if (activeAccountId) {
              void sendMessage(content, activeAccountId);
            }
          }}
        />
      }
      footer={
        <AppFooter
          lastSyncedAt={metadata.lastSyncTime ? formatRelativeTime(metadata.lastSyncTime) : null}
          status="online"
          onSyncNow={() => undefined}
        />
      }
    >
      {accountsLoading && !activeAccount ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-6 py-12 text-center text-white/60">
          Loading accounts…
        </div>
      ) : null}

      {!accountsLoading && !activeAccount ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-6 py-12 text-center text-white/60">
          Select an account from the sidebar to view the executive dashboard.
        </div>
      ) : null}

      {activeAccount ? (
        <div className="space-y-8">
          <section>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary/80">Executive View</p>
                  {favoriteAccounts.some((account) => account.id === activeAccount.id) ? (
                    <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      Favorite
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-2 text-2xl font-semibold">Unified platform intelligence</h2>
                <p className="mt-2 text-sm text-white/60">
                  Synthesized telemetry from {totalSignals} records in the last 24 hours.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary">Share Report</Button>
                <Button>New Initiative</Button>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 2xl:grid-cols-[2fr_1fr] 2xl:gap-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card title="Key Priorities" subtitle="Mission-critical initiatives across the platform">
                <div className="space-y-4 text-sm text-white/70">
                  {priorities.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-center text-white/40">
                      No priorities documented yet. Try running a sync.
                    </div>
                  ) : null}
                  {priorities.map((priority) => (
                    <button
                      key={priority.id}
                      type="button"
                      onClick={() => openModal('priority-detail', priority)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-primary/50 hover:bg-primary/10"
                    >
                      <p className="font-medium text-white">{priority.text}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/40">
                        <Badge variant="neutral">{priority.source}</Badge>
                        <Badge variant={priorityCategoryVariant[priority.category] ?? 'info'}>
                          {priority.category}
                        </Badge>
                        <span className="capitalize">{priority.timing.replace('-', ' ')}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              <Card title="Upcoming Dates" subtitle="Strategic checkpoints for the next 30 days">
                <div className="space-y-4 text-sm text-white/70">
                  {upcomingDates.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-center text-white/40">
                      No strategic checkpoints scheduled.
                    </div>
                  ) : null}
                  {upcomingDates.map((event) => (
                    <div key={event.id} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-white">{event.title}</p>
                        <Badge variant="neutral">{event.daysUntil} days</Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/40">
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        <span>{event.eventType.toUpperCase()}</span>
                        <Badge variant={eventSeverityVariant[event.severity] ?? 'info'} uppercase>
                          {event.severity}
                        </Badge>
                      </div>
                      {event.description ? <p className="mt-2 text-xs text-white/50">{event.description}</p> : null}
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="In-Flight Projects" subtitle="Progress toward strategic objectives" actionLabel="View details">
                <div className="space-y-4 text-sm text-white/70">
                  {projects.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-center text-white/40">
                      No active projects in flight.
                    </div>
                  ) : null}
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => openModal('project-detail', project)}
                      className="w-full space-y-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-primary/50 hover:bg-primary/10"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-white">{project.name}</p>
                        <Badge variant={project.status === 'at-risk' || project.status === 'blocked' ? 'warning' : 'success'} uppercase>
                          {project.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <ProgressBar value={project.progress} ariaLabel={`${project.name} progress`} />
                      <div className="flex items-center justify-between text-xs text-white/40">
                        <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
                        <span>{project.teamMembers.length} contributors</span>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              <Card title="Customer Satisfaction" subtitle="Experience metrics and active issues">
                <div className="space-y-4 text-sm text-white/70">
                  {customerIssues.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-center text-white/40">
                      No active customer satisfaction issues.
                    </div>
                  ) : null}
                  {customerIssues.map((issue) => (
                    <button
                      key={issue.id}
                      type="button"
                      onClick={() => openModal('ticket-detail', issue)}
                      className="w-full space-y-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-primary/50 hover:bg-primary/10"
                    >
                      <div className="flex items-center justify-between text-white">
                        <p className="font-medium">{issue.title}</p>
                        <Badge variant={issueSeverityVariant[issue.severity] ?? 'info'} uppercase>
                          {issue.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-white/50">{truncate(issue.description, 140)}</p>
                      <p className="text-xs text-white/40">
                        Reported {formatRelativeTime(issue.reportedAt)} · SLA breach risk{' '}
                        {issue.sla.breachRisk ? 'Yes' : 'No'}
                      </p>
                    </button>
                  ))}
                </div>
              </Card>

              <Card title="Open Tickets" subtitle="Engineering throughput & reliability">
                <div className="space-y-4 text-sm text-white/70">
                  {tickets.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-center text-white/40">
                      No open tickets for this account.
                    </div>
                  ) : null}
                  {tickets.map((ticket) => (
                    <button
                      key={ticket.id}
                      type="button"
                      onClick={() => openModal('ticket-detail', ticket)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-primary/50 hover:bg-primary/10"
                    >
                      <div className="flex items-center justify-between text-white">
                        <p className="font-medium">{ticket.title}</p>
                        <span className="text-xs uppercase tracking-[0.2em] text-white/50">{ticket.priority}</span>
                      </div>
                      <p className="text-xs text-white/50">{truncate(ticket.description, 140)}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-white/40">
                        <span>Assigned to {ticket.assignedTo ?? 'Unassigned'}</span>
                        <span>Updated {formatRelativeTime(ticket.updatedAt)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              <Card title="Industry Intelligence" subtitle="Insights curated by Aurora" actionLabel="Open feed">
                <div className="space-y-4 text-sm text-white/70">
                  {industryIntelligence.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-center text-white/40">
                      No recent industry intelligence available.
                    </div>
                  ) : null}
                  {industryIntelligence.map((insight) => (
                    <button
                      key={insight.id}
                      type="button"
                      onClick={() => openModal('industry-intelligence', insight)}
                      className="w-full space-y-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-primary/50 hover:bg-primary/10"
                    >
                      <p className="font-medium text-white">{insight.headline}</p>
                      <p className="text-xs text-white/50">{insight.summary}</p>
                      <div className="flex items-center justify-between text-xs text-white/40">
                        <span>{insight.source}</span>
                        <span>{new Date(insight.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card title="Operations Pulse" subtitle="Live status from global control plane">
                <div className="space-y-4 text-sm text-white/70">
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white">Active Incidents</p>
                      <span className="text-xs text-emerald-300">None</span>
                    </div>
                    <p className="mt-2 text-xs text-white/50">All 214 services operating within normal parameters.</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white">Change Window</p>
                      <span className="text-xs text-orange-300">In Progress</span>
                    </div>
                    <p className="mt-2 text-xs text-white/50">7 planned updates deploying across EU-West clusters.</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white">Cost Run Rate</p>
                      <span className="text-xs text-emerald-300">-6.2%</span>
                    </div>
                    <p className="mt-2 text-xs text-white/50">Spot utilization efficiency improved across ML workloads.</p>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        </div>
      ) : null}
    </AppLayout>
  );
};
