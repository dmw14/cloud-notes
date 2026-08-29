import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cn_theme');
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('cn_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('cn_theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      id="theme-toggle"
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-lg transition-colors duration-150 cursor-pointer
        text-surface-500 hover:text-surface-700 hover:bg-surface-100
        dark:text-surface-400 dark:hover:text-surface-200 dark:hover:bg-surface-800"
      aria-label="Toggle theme"
    >
      {isDark ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
