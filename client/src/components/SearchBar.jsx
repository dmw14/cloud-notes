import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full sm:w-72">
      <Search
        size={16}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400"
      />
      <input
        id="search-notes"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search items..."
        className="w-full h-10 rounded-lg py-2 pl-10 pr-10 text-sm
          bg-white dark:bg-surface-900
          border border-surface-200 dark:border-surface-800
          text-surface-900 dark:text-surface-100
          placeholder:text-surface-400 dark:placeholder:text-surface-500
          focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
          transition-colors duration-150"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-surface-400
            hover:text-surface-600 dark:hover:text-surface-300 transition-colors cursor-pointer"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
