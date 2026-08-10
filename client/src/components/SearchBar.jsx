import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full sm:w-80">
      <Search
        size={17}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-surface-400 dark:text-purple-400/50"
      />
      <input
        id="search-notes"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search notes..."
        className="w-full min-h-11 rounded-xl py-2.5 pl-11 pr-11 text-sm font-medium
          bg-white dark:bg-[rgba(15,15,18,0.6)]
          border border-surface-200 dark:border-[rgba(168,85,247,0.15)]
          text-surface-900 dark:text-surface-100
          placeholder:text-surface-400 dark:placeholder:text-surface-500
          focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500
          dark:shadow-[0_0_0_1px_rgba(168,85,247,0.05)]
          transition-all duration-200"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-surface-400
            hover:text-surface-600 dark:hover:text-surface-300 transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
