import { motion } from "framer-motion";
import { Search, Sparkles, TrendingUp, Users, Star } from "lucide-react";

interface HeroSectionProps {
  onSearchFocus?: () => void;
}

const stats = [
  { icon: Users, label: "Creators", value: "50K+", delay: 0.3 },
  { icon: TrendingUp, label: "Campaigns", value: "12K+", delay: 0.4 },
  { icon: Star, label: "Rating", value: "4.9★", delay: 0.5 },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function HeroSection({ onSearchFocus }: HeroSectionProps) {
  return (
    <section className="relative py-12 sm:py-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-20 h-20 border border-[var(--border-subtle)] rounded-2xl rotate-12 opacity-30 animate-float" />
      <div
        className="absolute bottom-10 left-10 w-16 h-16 border border-violet-500/20 rounded-full opacity-20 animate-float-delayed"
        style={{ animationDelay: "3s" }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        {/* Badge */}
        <motion.div variants={item} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-[var(--text-accent)] border border-indigo-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            #1 Influencer Discovery Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-[var(--font-display)] leading-[1.1] mb-6"
        >
          Discover Top{" "}
          <span className="gradient-text">Influencers</span>
          <br />
          <span className="text-[var(--text-primary)]">Worldwide.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-8 leading-relaxed"
        >
          Search and shortlist top creators across Instagram, YouTube, and
          TikTok. Build the perfect roster for your next campaign.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
        >
          <button
            onClick={onSearchFocus}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Search className="h-4 w-4" />
            Start Searching
          </button>
          <a
            href="#search"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-medium)] transition-all duration-200"
          >
            Browse Creators
          </a>
        </motion.div>

        {/* Floating Stat Cards */}
        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: stat.delay,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="glass rounded-xl px-5 py-3 flex items-center gap-3 hover:border-[var(--border-medium)] transition-all duration-300 hover:scale-105 cursor-default"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20">
                <stat.icon className="h-4 w-4 text-[var(--accent-indigo)]" />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold text-[var(--text-primary)] font-[var(--font-display)]">
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--text-muted)]">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
