import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Search", href: "/" },
  { label: "My List", href: "#" },
];

const platforms = [
  { label: "Instagram", href: "/?platform=instagram" },
  { label: "YouTube", href: "/?platform=youtube" },
  { label: "TikTok", href: "/?platform=tiktok" },
];

export function Footer() {
  return (
    <footer className="relative mt-20">
      {/* CTA Section */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 sm:p-12 text-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-[var(--font-display)] mb-3">
              Discover Your Next Brand Partnership
            </h2>
            <p className="text-indigo-100 text-sm sm:text-base max-w-xl mx-auto mb-6">
              Search through thousands of verified influencers and build the
              perfect creator roster for your campaign.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-indigo-700 font-semibold text-sm hover:bg-indigo-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              Start Searching
            </Link>
          </div>
          {/* Decorative orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Footer Content */}
      <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4 group">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
                  I
                </div>
                <span className="text-lg font-bold text-[var(--text-primary)] font-[var(--font-display)]">
                  InfluencerSearch
                </span>
              </Link>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
                The modern platform for discovering and managing influencer
                partnerships across all major social networks.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-accent)] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platforms */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
                Platforms
              </h3>
              <ul className="space-y-2.5">
                {platforms.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-accent)] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
                Built With
              </h3>
              <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
                <li>React 19 + TypeScript</li>
                <li>Vite + Tailwind CSS v4</li>
                <li>Framer Motion</li>
                <li>Zustand</li>
              </ul>
            </div>
          </div>

          {/* Divider + Copyright */}
          <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[var(--text-muted)]">
              &copy; {new Date().getFullYear()} InfluencerSearch. Built as a
              demo project.
            </p>
            <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
              <span>Made with</span>
              <span className="text-pink-500">♥</span>
              <span>using React & Vite</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
