import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl animate-[gradient-shift_8s_ease_infinite]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl animate-[gradient-shift_8s_ease_infinite_2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-400/5 dark:bg-pink-600/5 rounded-full blur-3xl animate-[gradient-shift_12s_ease_infinite_4s]" />
      </div>
      <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
                I
              </div>
              <span className="hidden sm:inline">InfluencerSearch</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 relative">
        {children}
      </main>
    </div>
  );
}
