import type { ReactNode } from 'react';

import { ToastStack } from '../organisms/ToastStack';

interface AppLayoutProps {
  header: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
  aiPanel?: ReactNode;
  footer?: ReactNode;
}

export const AppLayout = ({ header, sidebar, aiPanel, children, footer }: AppLayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-white">
      <ToastStack />
      <header className="border-b border-white/5 bg-surface/80 backdrop-blur-lg">{header}</header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-[280px] shrink-0 border-r border-white/5 bg-surface/70 backdrop-blur-lg lg:block">
          {sidebar}
        </aside>
        <main className="flex-1 overflow-y-auto bg-background px-6 py-6 lg:px-10 lg:py-8">{children}</main>
        {aiPanel ? (
          <aside className="hidden w-[380px] shrink-0 border-l border-white/5 bg-surface/70 backdrop-blur-lg xl:block">
            {aiPanel}
          </aside>
        ) : null}
      </div>
      {footer ? <footer className="border-t border-white/5 bg-surface/80 backdrop-blur-lg">{footer}</footer> : null}
    </div>
  );
};
