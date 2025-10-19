import type {
  Account,
  ChatMessage,
  CustomerIssue,
  IndustryIntelligence,
  Priority,
  Project,
  Ticket,
  UpcomingDate
} from '../types';

const now = new Date();

const iso = (date: Date) => date.toISOString();

export const accounts: Account[] = [
  {
    id: 'acct_cloudworks',
    name: 'Customer Success 720',
    industry: 'Technology',
    status: 'active',
    salesforceData: {
      accountId: '001xx000003NGSAAA4',
      accountName: 'Customer Success 720',
      accountOwner: 'Sarah Lin',
      region: 'North America',
      segment: 'Enterprise',
      annualRevenue: 320000000,
      employeeCount: 5200,
      website: 'https://cloudworks.example.com',
      billingAddress: {
        street: '55 Market Street',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA'
      }
    },
    metadata: {
      lastViewed: iso(new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)),
      isFavorite: true,
      siteCount: 420
    },
    createdAt: iso(new Date(now.getTime() - 120 * 24 * 60 * 60 * 1000)),
    updatedAt: iso(now)
  },
  {
    id: 'acct_omnitech',
    name: 'OmniTech Solutions',
    industry: 'Financial Services',
    status: 'at-risk',
    salesforceData: {
      accountId: '001xx000004RSTBBB5',
      accountName: 'OmniTech Solutions',
      accountOwner: 'Marcus Flint',
      region: 'EMEA',
      segment: 'Enterprise',
      annualRevenue: 220000000,
      employeeCount: 3100,
      website: 'https://omnitech.example.com',
      billingAddress: {
        street: '110 Bishopsgate',
        city: 'London',
        state: '',
        postalCode: 'EC2N 4AY',
        country: 'UK'
      }
    },
    metadata: {
      lastViewed: iso(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)),
      isFavorite: false,
      siteCount: 280
    },
    createdAt: iso(new Date(now.getTime() - 200 * 24 * 60 * 60 * 1000)),
    updatedAt: iso(now)
  }
];

export const priorities: Priority[] = [
  {
    id: 'priority_1',
    accountId: 'acct_cloudworks',
    text: 'Upsell cloud storage tier to enterprise plus before Q4 planning cycle.',
    source: 'Executive QBR Notes',
    sourceDocumentIds: ['doc_qbr_2024_08'],
    importance: 'high',
    timing: 'this-quarter',
    category: 'upsell',
    createdAt: iso(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000))
  },
  {
    id: 'priority_2',
    accountId: 'acct_cloudworks',
    text: 'Stabilize dashboard performance to under 5 seconds for daily executive checks.',
    source: 'Support Escalation Call',
    sourceDocumentIds: ['doc_support_perf'],
    importance: 'high',
    timing: 'this-month',
    category: 'technical',
    createdAt: iso(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000))
  },
  {
    id: 'priority_3',
    accountId: 'acct_cloudworks',
    text: 'Complete security audit remediation checklist ahead of Oct 25 deadline.',
    source: 'Security Audit Tracker',
    sourceDocumentIds: ['doc_security_audit'],
    importance: 'medium',
    timing: 'this-month',
    category: 'strategic',
    createdAt: iso(new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000))
  }
];

export const upcomingDates: UpcomingDate[] = [
  {
    id: 'date_qbr',
    accountId: 'acct_cloudworks',
    eventType: 'qbr',
    title: 'QBR with executive team',
    date: iso(new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000)),
    daysUntil: 21,
    severity: 'soon',
    description: 'Quarterly business review focused on platform expansion and risk posture.',
    relatedDocuments: ['doc_qbr_2024_08']
  },
  {
    id: 'date_security_audit',
    accountId: 'acct_cloudworks',
    eventType: 'milestone',
    title: 'Security audit remediation deadline',
    date: iso(new Date(now.getTime() + 18 * 24 * 60 * 60 * 1000)),
    daysUntil: 18,
    severity: 'urgent',
    description: 'Need sign-off from risk & compliance by Oct 25.',
    relatedDocuments: ['doc_security_audit']
  }
];

export const projects: Project[] = [
  {
    id: 'project_security_audit',
    accountId: 'acct_cloudworks',
    name: 'Security Audit Remediation',
    status: 'on-track',
    progress: 60,
    startDate: iso(new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000)),
    dueDate: iso(new Date(now.getTime() + 18 * 24 * 60 * 60 * 1000)),
    lead: 'Chloe Martinez',
    teamMembers: [
      { id: 'person_chloe', name: 'Chloe Martinez', role: 'Program Lead', email: 'chloe@cloudworks.com' },
      { id: 'person_vik', name: 'Vik Rajan', role: 'Security Engineer' },
      { id: 'person_asha', name: 'Asha Patel', role: 'Compliance Analyst' }
    ],
    budget: 85000,
    description:
      'Coordinated remediation of high-risk findings from Q3 security audit, covering IAM hardening, patching automation, and DR policy updates.',
    milestones: [
      {
        id: 'ms_findings_review',
        name: 'Findings review and prioritization',
        dueDate: iso(new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000)),
        completed: true,
        completedDate: iso(new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000))
      },
      {
        id: 'ms_patch_window',
        name: 'Patch automation rollout',
        dueDate: iso(new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)),
        completed: false
      },
      {
        id: 'ms_final_review',
        name: 'Final compliance review',
        dueDate: iso(new Date(now.getTime() + 18 * 24 * 60 * 60 * 1000)),
        completed: false
      }
    ],
    risks: [
      {
        id: 'risk_capacity',
        description: 'Limited engineering capacity for final remediation sprint.',
        severity: 'medium'
      }
    ],
    notes: 'Automation coverage currently at 82%. Need validation for EU-West workloads next week.',
    relatedDocuments: ['doc_security_audit']
  },
  {
    id: 'project_dashboard_perf',
    accountId: 'acct_cloudworks',
    name: 'Dashboard Performance Tuning',
    status: 'at-risk',
    progress: 35,
    startDate: iso(new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000)),
    dueDate: iso(new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000)),
    lead: 'Danielle Zhang',
    teamMembers: [
      { id: 'person_danielle', name: 'Danielle Zhang', role: 'Engineering Manager' },
      { id: 'person_jordan', name: 'Jordan Lee', role: 'Frontend Engineer' },
      { id: 'person_mason', name: 'Mason Brooks', role: 'SRE' }
    ],
    description:
      'Address executive dashboard load regressions, focusing on query optimization and CDN configuration for APAC regions.',
    milestones: [
      {
        id: 'ms_query_audit',
        name: 'Query audit complete',
        dueDate: iso(new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)),
        completed: true,
        completedDate: iso(new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000))
      },
      {
        id: 'ms_cdn_rollout',
        name: 'CDN configuration rollout',
        dueDate: iso(new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000)),
        completed: false
      },
      {
        id: 'ms_perf_validation',
        name: 'Performance validation',
        dueDate: iso(new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000)),
        completed: false
      }
    ],
    risks: [
      {
        id: 'risk_cdn',
        description: 'Dependency on partner CDN team availability.',
        severity: 'high',
        mitigation: 'Escalated to account manager for resource allocation.'
      }
    ],
    notes: 'APAC latency still averaging 18s (target <5s). Upcoming latency tuning session scheduled.',
    relatedDocuments: ['doc_support_perf', 'doc_cdn_rollout']
  }
];

export const customerIssues: CustomerIssue[] = [
  {
    id: 'issue_dashboard_latency',
    accountId: 'acct_cloudworks',
    ticketId: 'TCK-48211',
    title: 'Executive dashboard load times exceeding 30 seconds',
    severity: 'critical',
    category: 'performance',
    status: 'escalated',
    reportedBy: 'Emily Rodriguez',
    reportedAt: iso(new Date(now.getTime() - 2 * 60 * 60 * 1000)),
    sla: {
      responseDeadline: iso(new Date(now.getTime() - 30 * 60 * 1000)),
      resolutionDeadline: iso(new Date(now.getTime() + 20 * 60 * 60 * 1000)),
      breachRisk: true
    },
    affectedUsers: 52,
    description:
      'Executive dashboard reports intermittent 30-45 second load times during morning check-ins across North America and APAC.',
    relatedDocuments: ['doc_support_perf']
  },
  {
    id: 'issue_login_timeout',
    accountId: 'acct_cloudworks',
    ticketId: 'TCK-48245',
    title: 'Login sessions timing out for Chicago office',
    severity: 'high',
    category: 'security',
    status: 'in-progress',
    reportedBy: 'Noah Bennett',
    reportedAt: iso(new Date(now.getTime() - 4 * 60 * 60 * 1000)),
    sla: {
      responseDeadline: iso(new Date(now.getTime() - 2 * 60 * 60 * 1000)),
      resolutionDeadline: iso(new Date(now.getTime() + 40 * 60 * 60 * 1000)),
      breachRisk: false
    },
    affectedUsers: 18,
    description: 'Chicago office reports SSO session timeouts after 5 minutes, blocking daily workflows.',
    relatedDocuments: ['doc_security_audit']
  }
];

export const tickets: Ticket[] = [
  {
    id: 'ticket_perf',
    accountId: 'acct_cloudworks',
    ticketNumber: 'CS-19422',
    title: 'Executive dashboard load regression',
    status: 'in-progress',
    priority: 'urgent',
    category: 'performance',
    assignedTo: 'Jordan Lee',
    createdAt: iso(new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)),
    updatedAt: iso(new Date(now.getTime() - 2 * 60 * 60 * 1000)),
    description: 'Investigation into slow dashboard loads. Root cause suspected in analytics query pipeline.'
  },
  {
    id: 'ticket_sso',
    accountId: 'acct_cloudworks',
    ticketNumber: 'CS-19485',
    title: 'SSO timeout for regional office',
    status: 'open',
    priority: 'high',
    category: 'security',
    assignedTo: 'Mason Brooks',
    createdAt: iso(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)),
    updatedAt: iso(new Date(now.getTime() - 3 * 60 * 60 * 1000)),
    description: 'Shortened session tokens causing login friction. Need to coordinate with identity provider.'
  }
];

export const industryIntelligence: IndustryIntelligence[] = [
  {
    id: 'insight_cloud_spend',
    headline: 'Global enterprise cloud infrastructure spending projected to grow 32% in Q3',
    summary:
      'Gartner reports sustained investment in cloud infrastructure despite cost optimization trends. Storage and AI workloads drive growth.',
    source: 'Gartner',
    sourceUrl: 'https://example.com/gartner-cloud-spend',
    publishedAt: iso(new Date(now.getTime() - 6 * 60 * 60 * 1000)),
    tags: ['cloud', 'infrastructure', 'spending'],
    impact: 'positive',
    relevanceScore: 86,
    relatedAccountIds: ['acct_cloudworks'],
    retrievedAt: iso(now)
  },
  {
    id: 'insight_ai_savings',
    headline: 'Spot instance optimization leads to 28% cost savings for ML workloads',
    summary:
      'AWS showcases customer example of automated spot scaling, mirroring CloudWorks initiative. Potential case study for joint marketing.',
    source: 'AWS Blog',
    sourceUrl: 'https://example.com/aws-spot-optimization',
    publishedAt: iso(new Date(now.getTime() - 20 * 60 * 60 * 1000)),
    tags: ['ai', 'cost-optimization'],
    impact: 'positive',
    relevanceScore: 72,
    relatedAccountIds: ['acct_cloudworks', 'acct_omnitech'],
    retrievedAt: iso(new Date(now.getTime() - 18 * 60 * 60 * 1000))
  }
];

export const chatHistory: ChatMessage[] = [
  {
    id: 'chat_1',
    accountId: 'acct_cloudworks',
    role: 'assistant',
    content:
      'Morning! Platform performance exceeded SLO by 6% in the last 24 hours. Would you like a summary for the executive sync?',
    timestamp: iso(new Date(now.getTime() - 2 * 60 * 1000))
  },
  {
    id: 'chat_2',
    accountId: 'acct_cloudworks',
    role: 'user',
    content: 'Summarize the top risks before the QBR.',
    timestamp: iso(new Date(now.getTime() - 90 * 1000))
  },
  {
    id: 'chat_3',
    accountId: 'acct_cloudworks',
    role: 'assistant',
    content:
      'Key risks: (1) Dashboard performance regression impacting exec workflows, (2) Security audit remediation pending for EU-West workloads, (3) SSO session timeout affecting Chicago office adoption.',
    timestamp: iso(new Date(now.getTime() - 60 * 1000)),
    sources: [
      {
        documentId: 'doc_support_perf',
        title: 'Support Escalation: Dashboard Performance',
        excerpt: 'Executive team experiencing 30+ second load times on daily dashboards.',
        relevanceScore: 0.92
      }
    ]
  }
];
