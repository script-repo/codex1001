import { useMemo, useState } from 'react';

import type { ChatMessage } from '../../types';
import { formatRelativeTime } from '../../utils/dateFormat';
import { truncate } from '../../utils/markdown';

interface AIAssistantPanelProps {
  messages: ChatMessage[];
  suggestions: string[];
  loading?: boolean;
  onSend: (message: string) => void;
}

export const AIAssistantPanel = ({ messages, suggestions, loading = false, onSend }: AIAssistantPanelProps) => {
  const [draft, setDraft] = useState('');
  const hasMessages = useMemo(() => messages.length > 0, [messages]);

  const handleSend = (message: string) => {
    if (!message.trim()) return;
    onSend(message.trim());
    setDraft('');
  };

  return (
    <div className="flex h-full flex-col px-4 py-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">AI Assistant</p>
          <p className="text-lg font-semibold text-white">Aurora</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
          Live
        </span>
      </div>

      <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-2xl border px-4 py-3 text-sm leading-relaxed ${
              message.role === 'assistant'
                ? 'border-white/10 bg-surfaceMuted/70 text-white/80'
                : 'ml-auto max-w-[85%] border-primary/40 bg-primary/20 text-white'
            }`}
          >
            <p>{message.content}</p>
            <p className="mt-2 text-xs text-white/40">{formatRelativeTime(message.timestamp)}</p>
            {message.sources ? (
              <div className="mt-3 space-y-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-xs text-white/60">
                <p className="font-medium uppercase tracking-[0.2em] text-white/40">Sources</p>
                {message.sources.map((source) => (
                  <div key={source.documentId} className="space-y-1">
                    <p className="text-white/70">{source.title}</p>
                    <p>{truncate(source.excerpt, 120)}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        {loading ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-center text-sm text-white/60">
            Generating response…
          </div>
        ) : null}
        {!hasMessages && !loading ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-sm text-white/50">
            No conversation yet. Ask Aurora anything about this account to get started.
          </div>
        ) : null}
      </div>

      <div className="mt-4 space-y-3">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Suggested prompts</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSend(suggestion)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/10"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSend(draft);
              }
            }}
            placeholder="Type a command..."
            className="flex-1 rounded-xl border border-white/10 bg-surfaceMuted/70 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60"
          />
          <button
            type="button"
            onClick={() => handleSend(draft)}
            disabled={loading}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
