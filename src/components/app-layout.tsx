import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Footer } from "./footer";

interface AppLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function AppLayout({ children, showFooter = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] relative">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[100px] animate-float" />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[100px] animate-float-delayed"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-[120px] animate-float"
          style={{ animationDelay: "4s" }}
        />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-dot-pattern" />
      </div>

      {/* Glassmorphic Header */}
      <header className="sticky top-0 z-40 glass border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300 group-hover:scale-105">
                I
              </div>
              <span className="hidden sm:inline text-lg font-bold text-[var(--text-primary)] font-[var(--font-display)] tracking-tight">
                Influencer<span className="text-gradient">Search</span>
              </span>
            </Link>

            {/* Nav Links */}
            <nav className="flex items-center gap-1">
              <Link
                to="/"
                className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-all duration-200"
              >
                Home
              </Link>
              <a
                href="#search"
                className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-all duration-200"
              >
                Search
              </a>
              <Link
                to="/"
                className="ml-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 relative">
        {children}
      </main>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
}
