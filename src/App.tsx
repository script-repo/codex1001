const sidebarGroups = [
  {
    title: 'CloudWorks Enterprise',
    items: [
      { label: 'Overview', icon: 'grid', active: true },
      { label: 'Cloud Metrics', icon: 'cloud' },
      { label: 'Workflow Studio', icon: 'spark' },
      { label: 'Realtime Analytics', icon: 'activity' },
      { label: 'Incident Console', icon: 'shield' }
    ]
  },
  {
    title: 'Data Services',
    items: [
      { label: 'Data Lake', icon: 'layers' },
      { label: 'Pipeline Builder', icon: 'pipeline' },
      { label: 'Model Ops', icon: 'cube' },
      { label: 'Integrations', icon: 'link' }
    ]
  },
  {
    title: 'Operations',
    items: [
      { label: 'Automation Center', icon: 'switch' },
      { label: 'Security Posture', icon: 'lock' },
      { label: 'Resource Planner', icon: 'calendar' },
      { label: 'Service Registry', icon: 'database' }
    ]
  }
];

const statusPills: Record<string, string> = {
  'on track': 'bg-emerald-500/10 text-emerald-300 border border-emerald-400/30',
  delayed: 'bg-orange-500/10 text-orange-300 border border-orange-400/30',
  blocked: 'bg-rose-500/10 text-rose-300 border border-rose-400/30',
  critical: 'bg-rose-500/10 text-rose-300 border border-rose-400/30'
};

const projectUpdates = [
  {
    title: 'App Pipeline',
    description: 'Expand deployment capacity by 18% to support growth.',
    owner: 'Chloe Martinez',
    status: 'On Track',
    badge: 'on track'
  },
  {
    title: 'Zero Trust Rollout',
    description: 'Complete network segmentation in 3 remaining regions.',
    owner: 'Security Ops',
    status: 'Delayed',
    badge: 'delayed'
  },
  {
    title: 'Compliance Refresh',
    description: 'Finalize evidence package for ISO 27001 audit.',
    owner: 'Risk & Compliance',
    status: 'Blocked',
    badge: 'blocked'
  }
];

const upcomingItems = [
  {
    title: 'Capacity Review',
    date: 'Aug 15 · 09:30 AM',
    description: 'Finalize Q4 cloud infrastructure allocations.',
    cta: 'View Brief'
  },
  {
    title: 'Latency Tuning',
    date: 'Aug 18 · 11:00 AM',
    description: 'Regional CDN adjustments for APAC rollout.',
    cta: 'Join Session'
  },
  {
    title: 'DX Migration Debrief',
    date: 'Aug 21 · 04:00 PM',
    description: 'Post-mortem for data exchange migration.',
    cta: 'Add to Calendar'
  }
];

const flightProgress = [
  { label: 'Edge Services', value: 78, target: '80%' },
  { label: 'Security Controls', value: 64, target: '75%' },
  { label: 'AI Platform Optimization', value: 52, target: '60%' }
];

const satisfactionMetrics = [
  { label: 'CSAT', value: '92%', trend: '+4.2%' },
  { label: 'NPS', value: '67', trend: '+3.1%' },
  { label: 'Partner SLA', value: '98.4%', trend: '+0.6%' }
];

const velocityMetrics = [
  { label: 'Deployments', value: '312', trend: '+18%' },
  { label: 'MTTR', value: '42m', trend: '-9%' },
  { label: 'Change Failure', value: '2.4%', trend: '-0.4%' }
];

const insights = [
  {
    title: 'AI Insights',
    items: [
      'Forecasted 12% capacity buffer needed for Q4 demand.',
      'Spot instance optimization saved $86K this month.',
      'Automated patching reduced critical CVEs by 38%.'
    ]
  },
  {
    title: 'Industry Intelligence',
    items: [
      'Gartner highlights edge-first data strategy among peers.',
      'AWS announced new Graviton4 SKUs driving price relief.',
      'Major competitor investing in AI-driven anomaly detection.'
    ]
  }
];

const assistantPrompts = [
  'Summarize the latest platform health.',
  'Create an incident response briefing.',
  'Outline cost optimization priorities.'
];

const Icon = ({ name }: { name: string }) => {
  const common = 'w-4 h-4';
  switch (name) {
    case 'grid':
      return (
        <svg className={common} viewBox="0 0 20 20" fill="none" stroke="currentColor">
          <rect x="2" y="2" width="6" height="6" rx="1.2" strokeWidth="1.4" />
          <rect x="12" y="2" width="6" height="6" rx="1.2" strokeWidth="1.4" />
          <rect x="2" y="12" width="6" height="6" rx="1.2" strokeWidth="1.4" />
          <rect x="12" y="12" width="6" height="6" rx="1.2" strokeWidth="1.4" />
        </svg>
      );
    case 'cloud':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M7 18a4 4 0 0 1 0-8c.2-3 2.6-5 5.2-5 2.7 0 5 2.2 5.3 4.8h.5a3.5 3.5 0 0 1 0 7H7z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'spark':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="m12 3 1.8 5.5H19l-4.4 3.2L16.5 17 12 13.8 7.5 17l1-5.3L4 8.5h5.2z" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case 'activity':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M4 12h3l2.2-6 3.6 12 2.2-6H20"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'shield':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M12 3.5 5 6v6.6c0 4 2.9 6.8 7 8 4.1-1.2 7-4 7-8V6l-7-2.5z"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'layers':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="m12 3 9 5-9 5-9-5 9-5z" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="m3 12 9 5 9-5" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="m3 17 9 5 9-5" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case 'pipeline':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="6" cy="12" r="2.5" strokeWidth="1.5" />
          <circle cx="12" cy="6" r="2.5" strokeWidth="1.5" />
          <circle cx="12" cy="18" r="2.5" strokeWidth="1.5" />
          <circle cx="18" cy="12" r="2.5" strokeWidth="1.5" />
          <path d="M8 12h2m4 0h2M12 8v2m0 4v2" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'cube':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 3 4 7v10l8 4 8-4V7l-8-4z" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 3v18" strokeWidth="1.5" strokeLinecap="round" />
          <path d="m4 7 8 4 8-4" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case 'link':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M8.5 14.5a4 4 0 0 0 5.6 5.6l2.1-2.1m-5.8-5.8 2.1-2.1a4 4 0 1 1 5.6 5.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m9.8 14.2 4.4-4.4" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'switch':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3.5" y="5" width="17" height="6" rx="3" strokeWidth="1.5" />
          <rect x="3.5" y="13" width="17" height="6" rx="3" strokeWidth="1.5" />
          <circle cx="8.5" cy="8" r="2.5" strokeWidth="1.5" />
          <circle cx="15.5" cy="16" r="2.5" strokeWidth="1.5" />
        </svg>
      );
    case 'lock':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth="1.5" />
          <path d="M8 11V8a4 4 0 1 1 8 0v3" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'calendar':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.5" />
          <path d="M8 2v4m8-4v4M3 10h18" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'database':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <ellipse cx="12" cy="5" rx="8" ry="3" strokeWidth="1.5" />
          <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
};

const Pill = ({ label }: { label: string }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusPills[label.toLowerCase()] ?? ''}`}>
    {label}
  </span>
);

const Card = ({
  title,
  action,
  children,
  subtitle
}: {
  title: string;
  subtitle?: string;
  action?: string;
  children: React.ReactNode;
}) => (
  <div className="bg-surface rounded-2xl border border-white/5 shadow-lg shadow-black/40 p-6 flex flex-col gap-4">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle ? <p className="text-sm text-white/50 mt-1">{subtitle}</p> : null}
      </div>
      {action ? (
        <button className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 text-white/70 hover:bg-white/10 transition">
          {action}
        </button>
      ) : null}
    </div>
    {children}
  </div>
);

const Divider = () => <div className="h-px bg-white/10" />;

const AssistantCard = () => (
  <div className="bg-surface rounded-2xl border border-white/5 shadow-lg shadow-black/40 p-6 flex flex-col gap-6 h-full">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2a7 7 0 0 0-7 7v2.5A4.5 4.5 0 0 0 3 15.5 4.5 4.5 0 0 0 7.5 20H9l3 3 3-3h1.5a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0-2-3.7V9a7 7 0 0 0-7-7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <p className="text-sm text-white/50">AI Assistant</p>
        <p className="text-base font-semibold">Aurora</p>
      </div>
    </div>
    <div className="bg-surfaceMuted/60 border border-white/5 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
          AI
        </div>
        <div className="flex-1">
          <p className="text-sm text-white/80 leading-relaxed">
            Morning! Platform performance exceeded SLO by 6% in the last 24 hours. Would you like a summary for the executive sync?
          </p>
          <div className="flex items-center gap-2 text-xs text-white/40 mt-3">
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Live
            </span>
            <span>Updated 2m ago</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Suggested Prompts</p>
      <div className="space-y-2">
        {assistantPrompts.map((prompt) => (
          <button
            key={prompt}
            className="w-full text-left text-sm text-white/80 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl px-4 py-3 transition"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
    <div className="mt-auto">
      <label className="text-xs text-white/50 block mb-2" htmlFor="assistant-input">
        Ask Aurora
      </label>
      <div className="flex gap-2">
        <input
          id="assistant-input"
          placeholder="Type a command..."
          className="flex-1 bg-surfaceMuted/70 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
        />
        <button className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/80 transition">
          Send
        </button>
      </div>
    </div>
  </div>
);

const StatTile = ({ label, value, trend }: { label: string; value: string; trend: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs uppercase tracking-[0.2em] text-white/40">{label}</span>
    <span className="text-2xl font-semibold">{value}</span>
    <span className="text-xs text-emerald-300">{trend}</span>
  </div>
);

const ProgressBar = ({ value }: { value: number }) => (
  <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
    <div className="h-full bg-gradient-to-r from-primary via-purple-500 to-emerald-400" style={{ width: `${value}%` }} />
  </div>
);

const UpcomingList = () => (
  <div className="space-y-4">
    {upcomingItems.map((item) => (
      <div key={item.title} className="bg-surfaceMuted/60 border border-white/5 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">{item.title}</h4>
          <span className="text-xs text-white/40">{item.date}</span>
        </div>
        <p className="text-sm text-white/60 mt-2">{item.description}</p>
        <button className="mt-3 text-xs font-medium text-primary hover:text-primary/80">
          {item.cta}
        </button>
      </div>
    ))}
  </div>
);

const ProjectList = () => (
  <div className="space-y-4">
    {projectUpdates.map((project) => (
      <div key={project.title} className="bg-surfaceMuted/60 border border-white/5 rounded-xl p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-white">{project.title}</h4>
            <p className="text-sm text-white/60 mt-1">{project.description}</p>
          </div>
          <Pill label={project.badge} />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-white/40">
          <span>{project.owner}</span>
          <span>{project.status}</span>
        </div>
      </div>
    ))}
  </div>
);

const InsightsColumn = () => (
  <div className="grid gap-4">
    {insights.map((section) => (
      <div key={section.title} className="bg-surfaceMuted/60 border border-white/5 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-white mb-3">{section.title}</h4>
        <ul className="space-y-2 text-sm text-white/70">
          {section.items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const PlatformHealth = () => (
  <div className="space-y-4">
    {flightProgress.map((item) => (
      <div key={item.label} className="bg-surfaceMuted/60 border border-white/5 rounded-xl p-4">
        <div className="flex items-center justify-between text-sm">
          <p className="font-medium text-white">{item.label}</p>
          <span className="text-white/50">Target {item.target}</span>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <ProgressBar value={item.value} />
          <span className="text-sm font-semibold text-white">{item.value}%</span>
        </div>
      </div>
    ))}
  </div>
);

const CustomerSatisfaction = () => (
  <div className="grid grid-cols-3 gap-6">
    {satisfactionMetrics.map((metric) => (
      <StatTile key={metric.label} {...metric} />
    ))}
  </div>
);

const DeliveryVelocity = () => (
  <div className="grid grid-cols-3 gap-6">
    {velocityMetrics.map((metric) => (
      <div key={metric.label} className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-[0.2em] text-white/40">{metric.label}</span>
        <span className="text-2xl font-semibold">{metric.value}</span>
        <span className={metric.trend.startsWith('-') ? 'text-xs text-rose-300' : 'text-xs text-emerald-300'}>
          {metric.trend}
        </span>
      </div>
    ))}
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen bg-background text-white">
      <div className="flex h-screen max-h-screen overflow-hidden">
        <aside className="w-72 border-r border-white/5 bg-surface/70 backdrop-blur-lg p-6 flex flex-col gap-8 overflow-y-auto">
          <div className="flex items-center gap-3">
            <div className="min-w-[3.5rem] h-10 px-2 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
              CS720
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-[0.3em]">Suite</p>
              <p className="text-lg font-semibold">CS720</p>
            </div>
          </div>
          <nav className="space-y-8">
            {sidebarGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">{group.title}</p>
                <div className="space-y-1.5">
                  {group.items.map((item) => (
                    <button
                      key={item.label}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition ${
                        item.active
                          ? 'bg-primary/20 text-white border border-primary/40 shadow-inner shadow-primary/40'
                          : 'text-white/70 hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <span className="text-white/60">
                        <Icon name={item.icon} />
                      </span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          <div className="mt-auto bg-surfaceMuted/70 border border-white/5 rounded-2xl p-4 space-y-3">
            <p className="text-sm font-semibold text-white">Upgrade to Enterprise+</p>
            <p className="text-xs text-white/50">
              Unlock advanced governance controls, predictive automation, and premium support.
            </p>
            <button className="w-full rounded-xl bg-primary/20 text-primary font-medium text-sm py-2 hover:bg-primary/30 transition">
              Explore Plans
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto px-10 py-8 space-y-8">
          <header className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary/80">Executive View</p>
              <h1 className="text-3xl font-semibold mt-2">CloudWorks Enterprise</h1>
              <p className="text-sm text-white/60 mt-2 max-w-2xl">
                Unified command center for platform operations, reliability, and growth. Synthesized telemetry from 42 services in the last 24 hours.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-xl bg-white/5 text-sm font-medium text-white/80 hover:bg-white/10 transition">
                Share Report
              </button>
              <button className="px-4 py-2 rounded-xl bg-primary text-sm font-medium hover:bg-primary/80 transition">
                New Initiative
              </button>
            </div>
          </header>

          <section className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card title="Key Projects" subtitle="Mission-critical initiatives across the platform" action="View All">
                <ProjectList />
              </Card>
              <Card title="Upcoming Syncs" subtitle="Strategic checkpoints for the next 7 days" action="Manage">
                <UpcomingList />
              </Card>
              <Card title="Flight Path" subtitle="Progress toward strategic objectives" action="See Roadmap">
                <PlatformHealth />
              </Card>
              <Card title="Customer Sentiment" subtitle="Experience metrics for core segments" action="Open Dashboard">
                <CustomerSatisfaction />
              </Card>
              <Card title="Delivery Velocity" subtitle="Engineering throughput & reliability" action="View Details">
                <DeliveryVelocity />
              </Card>
              <Card title="Strategic Intelligence" subtitle="Insights curated by Aurora">
                <InsightsColumn />
              </Card>
            </div>
            <div className="flex flex-col gap-8">
              <Card title="Operations Pulse" subtitle="Live status from global control plane" action="Open Console">
                <div className="space-y-4">
                  <div className="bg-surfaceMuted/60 border border-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Active Incidents</p>
                      <span className="text-xs text-emerald-300">None</span>
                    </div>
                    <p className="text-sm text-white/60 mt-2">All 214 services operating within normal parameters.</p>
                  </div>
                  <div className="bg-surfaceMuted/60 border border-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Change Window</p>
                      <span className="text-xs text-orange-300">In Progress</span>
                    </div>
                    <p className="text-sm text-white/60 mt-2">7 planned updates deploying across EU-West clusters.</p>
                  </div>
                  <div className="bg-surfaceMuted/60 border border-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Cost Run Rate</p>
                      <span className="text-xs text-emerald-300">-6.2%</span>
                    </div>
                    <p className="text-sm text-white/60 mt-2">Spot utilization efficiency improved across ML workloads.</p>
                  </div>
                </div>
              </Card>
              <AssistantCard />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
