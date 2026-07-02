import { forwardRef } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  function SearchBar(
    { value, onChange, placeholder = "Search by username or name..." },
    ref,
  ) {
    return (
      <div className="relative w-full max-w-md group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)] group-focus-within:text-[var(--accent-indigo)] transition-colors duration-200" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex h-11 w-full rounded-xl glass pl-10 pr-9 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-indigo)]/50 focus:border-[var(--border-glow)] transition-all duration-200"
          aria-label="Search influencers"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    );
  },
);
