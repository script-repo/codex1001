import { create } from 'zustand';

import { chatHistory } from '../services/mockData';
import type { ChatMessage } from '../types';

const randomId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
};

interface ChatStore {
  messages: ChatMessage[];
  loading: boolean;
  sendMessage: (content: string, accountId: string) => Promise<void>;
  clearHistory: (accountId?: string) => void;
  loadHistory: (accountId: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: chatHistory,
  loading: false,
  loadHistory: (accountId) => {
    set({
      messages: chatHistory.filter((message) => message.accountId === accountId)
    });
  },
  clearHistory: (accountId) => {
    if (!accountId) {
      set({ messages: [] });
      return;
    }
    set({
      messages: chatHistory.filter((message) => message.accountId !== accountId)
    });
  },
  sendMessage: async (content, accountId) => {
    const userMessage: ChatMessage = {
      id: randomId(),
      accountId,
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      loading: true
    }));

    await new Promise((resolve) => setTimeout(resolve, 500));

    const assistantMessage: ChatMessage = {
      id: randomId(),
      accountId,
      role: 'assistant',
      content:
        'This is a placeholder response. Integrate with the AI service to fetch real answers based on indexed customer data.',
      timestamp: new Date().toISOString()
    };

    set((state) => ({
      messages: [...state.messages, userMessage, assistantMessage],
      loading: false
    }));
  }
}));
