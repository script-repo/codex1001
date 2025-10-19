export type AccountStatus = 'active' | 'at-risk' | 'churned';

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface SalesforceAccount {
  accountId: string;
  accountName: string;
  accountOwner: string;
  region: string;
  segment: string;
  annualRevenue: number;
  employeeCount: number;
  website: string;
  billingAddress: Address;
}

export interface AccountMetadata {
  lastViewed: string | null;
  isFavorite: boolean;
  siteCount: number;
}

export interface Account {
  id: string;
  name: string;
  industry: string;
  status: AccountStatus;
  salesforceData: SalesforceAccount;
  metadata: AccountMetadata;
  createdAt: string;
  updatedAt: string;
}

export type DocumentSource = 'salesforce' | 'onedrive';
export type DocumentType =
  | 'sales-note'
  | 'technical-doc'
  | 'meeting-notes'
  | 'contract'
  | 'other';

export interface DocumentMetadata {
  author?: string;
  createdDate: string;
  modifiedDate: string;
  fileSize?: number;
}

export interface Document {
  id: string;
  accountId: string;
  title: string;
  content: string;
  source: DocumentSource;
  sourceId: string;
  sourceUrl?: string;
  documentType: DocumentType;
  tags: string[];
  metadata: DocumentMetadata;
  embedding?: number[];
  createdAt: string;
  updatedAt: string;
}

export type PriorityImportance = 'high' | 'medium' | 'low';
export type PriorityTiming = 'this-week' | 'this-month' | 'this-quarter';
export type PriorityCategory = 'upsell' | 'retention' | 'technical' | 'strategic';

export interface Priority {
  id: string;
  accountId: string;
  text: string;
  source: string;
  sourceDocumentIds: string[];
  importance: PriorityImportance;
  timing: PriorityTiming;
  category: PriorityCategory;
  createdAt: string;
}

export type UpcomingEventType = 'renewal' | 'qbr' | 'eol' | 'milestone' | 'other';
export type EventSeverity = 'urgent' | 'soon' | 'normal';

export interface UpcomingDate {
  id: string;
  accountId: string;
  eventType: UpcomingEventType;
  title: string;
  date: string;
  daysUntil: number;
  severity: EventSeverity;
  description?: string;
  relatedDocuments: string[];
}

export type ProjectStatus = 'on-track' | 'at-risk' | 'blocked' | 'completed';

export interface Milestone {
  id: string;
  name: string;
  dueDate: string;
  completed: boolean;
  completedDate?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  email?: string;
}

export type RiskSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface Risk {
  id: string;
  description: string;
  severity: RiskSeverity;
  mitigation?: string;
}

export interface Project {
  id: string;
  accountId: string;
  name: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
  dueDate: string;
  lead: string;
  teamMembers: TeamMember[];
  budget?: number;
  description: string;
  milestones: Milestone[];
  risks: Risk[];
  notes: string;
  relatedDocuments: string[];
}

export type IssueSeverity = 'critical' | 'high' | 'medium' | 'low';
export type IssueCategory = 'performance' | 'bug' | 'security' | 'feature' | 'other';
export type IssueStatus = 'open' | 'in-progress' | 'escalated' | 'resolved';

export interface SLA {
  responseDeadline: string;
  resolutionDeadline: string;
  breachRisk: boolean;
}

export interface CustomerIssue {
  id: string;
  accountId: string;
  ticketId: string;
  title: string;
  severity: IssueSeverity;
  category: IssueCategory;
  status: IssueStatus;
  reportedBy: string;
  reportedAt: string;
  sla: SLA;
  affectedUsers?: number;
  description: string;
  relatedDocuments: string[];
}

export type TicketStatus = 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed';
export type TicketPriority = 'urgent' | 'high' | 'medium' | 'low';
export type TicketCategory = 'bug' | 'feature' | 'performance' | 'security' | 'question';

export interface Ticket {
  id: string;
  accountId: string;
  ticketNumber: string;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}

export type InsightImpact = 'positive' | 'neutral' | 'negative';

export interface IndustryIntelligence {
  id: string;
  headline: string;
  summary: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  tags: string[];
  impact: InsightImpact;
  relevanceScore: number;
  relatedAccountIds: string[];
  retrievedAt: string;
}

export type ChatRole = 'user' | 'assistant';

export interface SourceCitation {
  documentId: string;
  title: string;
  excerpt: string;
  relevanceScore: number;
}

export interface ChatMessage {
  id: string;
  accountId: string;
  role: ChatRole;
  content: string;
  sources?: SourceCitation[];
  timestamp: string;
  metadata?: {
    model?: string;
    tokenCount?: number;
    responseTime?: number;
  };
}

export type SyncStatus = 'synced' | 'stale' | 'syncing' | 'error';

export interface SyncProgress {
  total: number;
  processed: number;
  failed: number;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
}

export interface SyncError {
  source: 'salesforce' | 'onedrive' | 'bi';
  errorType: 'auth-failed' | 'quota-exceeded' | 'network-error' | 'parse-error';
  message: string;
  timestamp: string;
  accountId?: string;
}

export type SyncJobType = 'scheduled' | 'manual';

export interface SyncJob {
  id: string;
  jobType: SyncJobType;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  progress: {
    salesforce: SyncProgress;
    onedrive: SyncProgress;
    businessIntelligence: SyncProgress;
  };
  accountsProcessed: string[];
  errors: SyncError[];
  metadata: {
    triggeredBy: 'user' | 'schedule' | 'service-worker';
  };
}

export interface SyncMetadata {
  id: string;
  lastSyncTime: string | null;
  nextScheduledSync: string | null;
  syncStatus: SyncStatus;
  staleSince?: string;
}

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastNotification {
  id: string;
  message: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  duration: number;
  action?: ToastAction;
}

export type ModalType = 'project-detail' | 'ticket-detail' | 'priority-detail' | 'industry-intelligence';

export interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  data: Project | Ticket | Priority | IndustryIntelligence | CustomerIssue | null;
}

export type CardType =
  | 'key-priorities'
  | 'upcoming-dates'
  | 'in-flight-projects'
  | 'customer-sat-issues'
  | 'open-tickets'
  | 'industry-intelligence';

export interface CardState<TData = unknown> {
  type: CardType;
  loading: boolean;
  error: string | null;
  data: TData;
  isEmpty: boolean;
}

export interface SidebarState {
  isCollapsed: boolean;
  searchQuery: string;
  filteredAccountIds: string[];
}

export interface UserPreferences {
  id: string;
  theme: 'dark' | 'light';
  notifications: {
    desktop: boolean;
    syncComplete: boolean;
  };
  ai: {
    inferenceEndpoint: 'external' | 'local';
    autoSuggestions: boolean;
    queryHistoryRetention: 30 | 60 | 90;
  };
  dashboard: {
    defaultAccount?: string;
    cardOrder: CardType[];
  };
  sync: {
    schedule: 'daily' | 'manual';
    scheduledTime?: string;
    accountScope: 'all' | 'selected';
    selectedAccounts?: string[];
  };
  updatedAt: string;
}
