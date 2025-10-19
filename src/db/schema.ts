import Dexie, { Table } from 'dexie';

import type {
  Account,
  ChatMessage,
  CustomerIssue,
  Document,
  IndustryIntelligence,
  Priority,
  Project,
  SyncJob,
  SyncMetadata,
  Ticket,
  UpcomingDate,
  UserPreferences
} from '../types';

class CS720Database extends Dexie {
  accounts!: Table<Account, string>;
  documents!: Table<Document, string>;
  priorities!: Table<Priority, string>;
  upcomingDates!: Table<UpcomingDate, string>;
  projects!: Table<Project, string>;
  customerIssues!: Table<CustomerIssue, string>;
  tickets!: Table<Ticket, string>;
  industryIntelligence!: Table<IndustryIntelligence, string>;
  chatMessages!: Table<ChatMessage, string>;
  syncJobs!: Table<SyncJob, string>;
  syncMetadata!: Table<SyncMetadata, string>;
  userPreferences!: Table<UserPreferences, string>;

  constructor() {
    super('CS720DB');

    this.version(1).stores({
      accounts: 'id, name, status, updatedAt',
      documents: 'id, accountId, documentType, [accountId+documentType], *tags, updatedAt',
      priorities: 'id, accountId, importance, [accountId+importance]',
      upcomingDates: 'id, accountId, date, eventType, [accountId+date]',
      projects: 'id, accountId, status, [accountId+status], dueDate',
      customerIssues: 'id, accountId, severity, status, [accountId+severity], reportedAt',
      tickets: 'id, accountId, status, priority, [accountId+status]',
      industryIntelligence: 'id, publishedAt, relevanceScore, *tags, *relatedAccountIds',
      chatMessages: 'id, accountId, timestamp, [accountId+timestamp]',
      syncJobs: 'id, status, startedAt',
      syncMetadata: 'id',
      userPreferences: 'id'
    });
  }
}

export const db = new CS720Database();
