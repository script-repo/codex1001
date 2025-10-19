import { create } from 'zustand';

import {
  customerIssues as mockCustomerIssues,
  industryIntelligence as mockIndustryIntelligence,
  priorities as mockPriorities,
  projects as mockProjects,
  tickets as mockTickets,
  upcomingDates as mockUpcomingDates
} from '../services/mockData';
import type {
  CardType,
  CustomerIssue,
  IndustryIntelligence,
  Priority,
  Project,
  Ticket,
  UpcomingDate
} from '../types';

type LoadingState = Record<CardType, boolean>;
type ErrorState = Record<CardType, string | null>;

const defaultLoading: LoadingState = {
  'key-priorities': false,
  'upcoming-dates': false,
  'in-flight-projects': false,
  'customer-sat-issues': false,
  'open-tickets': false,
  'industry-intelligence': false
};

const defaultErrors: ErrorState = {
  'key-priorities': null,
  'upcoming-dates': null,
  'in-flight-projects': null,
  'customer-sat-issues': null,
  'open-tickets': null,
  'industry-intelligence': null
};

interface DashboardStore {
  priorities: Priority[];
  upcomingDates: UpcomingDate[];
  projects: Project[];
  customerIssues: CustomerIssue[];
  tickets: Ticket[];
  industryIntelligence: IndustryIntelligence[];
  loading: LoadingState;
  errors: ErrorState;
  loadAccountData: (accountId: string) => Promise<void>;
  setLoading: (cardType: CardType, loading: boolean) => void;
  setError: (cardType: CardType, error: string | null) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  priorities: [],
  upcomingDates: [],
  projects: [],
  customerIssues: [],
  tickets: [],
  industryIntelligence: mockIndustryIntelligence,
  loading: defaultLoading,
  errors: defaultErrors,
  setLoading: (cardType, isLoading) =>
    set((state) => ({
      loading: {
        ...state.loading,
        [cardType]: isLoading
      }
    })),
  setError: (cardType, error) =>
    set((state) => ({
      errors: {
        ...state.errors,
        [cardType]: error
      }
    })),
  loadAccountData: async (accountId) => {
    set({ loading: { ...defaultLoading, 'industry-intelligence': true } });

    const priorities = mockPriorities.filter((item) => item.accountId === accountId);
    const upcomingDates = mockUpcomingDates.filter((item) => item.accountId === accountId);
    const projects = mockProjects.filter((item) => item.accountId === accountId);
    const customerIssues = mockCustomerIssues.filter((item) => item.accountId === accountId);
    const tickets = mockTickets.filter((item) => item.accountId === accountId);
    const industry = mockIndustryIntelligence.filter((item) => item.relatedAccountIds.includes(accountId));

    set({
      priorities,
      upcomingDates,
      projects,
      customerIssues,
      tickets,
      industryIntelligence: industry,
      loading: defaultLoading,
      errors: defaultErrors
    });
  }
}));
