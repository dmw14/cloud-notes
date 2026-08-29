import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Moon, Bell, LayoutGrid, Save, Globe, Info } from 'lucide-react';

function ToggleSwitch({ id, checked, onChange }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`settings-toggle ${checked ? 'settings-toggle--active' : ''}`}
    >
      <span className={`settings-toggle-thumb ${checked ? 'settings-toggle-thumb--active' : ''}`} />
    </button>
  );
}

export default function SettingsModal({ isOpen, onClose }) {
  // Theme
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cn_theme');
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Settings (localStorage-persisted)
  const [notifications, setNotifications] = useState(
    () => localStorage.getItem('cn_notifications') !== 'false'
  );
  const [compactView, setCompactView] = useState(
    () => localStorage.getItem('cn_compact') === 'true'
  );
  const [autoSave, setAutoSave] = useState(
    () => localStorage.getItem('cn_autosave') !== 'false'
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem('cn_language') || 'en'
  );

  // Sync theme with document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('cn_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('cn_theme', 'light');
    }
  }, [isDark]);

  // Persist other settings
  useEffect(() => {
    localStorage.setItem('cn_notifications', String(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('cn_compact', String(compactView));
  }, [compactView]);

  useEffect(() => {
    localStorage.setItem('cn_autosave', String(autoSave));
  }, [autoSave]);

  useEffect(() => {
    localStorage.setItem('cn_language', language);
  }, [language]);

  // Sync if theme changed externally (e.g. header ThemeToggle)
  useEffect(() => {
    if (!isOpen) return;
    const currentTheme = localStorage.getItem('cn_theme');
    setIsDark(currentTheme === 'dark');
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ja', name: '日本語' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md max-h-[85vh] overflow-hidden rounded-xl
              bg-white dark:bg-surface-900
              border border-surface-200 dark:border-surface-700
              shadow-xl dark:shadow-black/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4
              border-b border-surface-100 dark:border-surface-800">
              <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                Settings
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-surface-400 hover:text-surface-600
                  hover:bg-surface-100 dark:hover:bg-surface-800 dark:hover:text-surface-300
                  transition-colors duration-150 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 overflow-y-auto max-h-[65vh] space-y-6">

              {/* ── Appearance ── */}
              <div>
                <h3 className="text-xs font-semibold text-surface-400 dark:text-surface-500
                  uppercase tracking-wider mb-3">
                  Appearance
                </h3>
                <div className="space-y-1">
                  {/* Day / Night toggle */}
                  <div className="flex items-center justify-between p-3 rounded-xl
                    hover:bg-surface-50 dark:hover:bg-surface-800
                    transition-colors duration-150">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-surface-100 dark:bg-surface-800
                        flex items-center justify-center">
                        {isDark
                          ? <Moon size={16} className="text-primary-500" />
                          : <Sun size={16} className="text-amber-500" />
                        }
                      </div>
                      <div>
                        <p className="text-sm font-medium text-surface-800 dark:text-surface-200">
                          {isDark ? 'Dark Mode' : 'Light Mode'}
                        </p>
                        <p className="text-xs text-surface-400 dark:text-surface-500">
                          Switch between day and night themes
                        </p>
                      </div>
                    </div>
                    <ToggleSwitch
                      id="settings-theme-toggle"
                      checked={isDark}
                      onChange={setIsDark}
                    />
                  </div>

                  {/* Compact View */}
                  <div className="flex items-center justify-between p-3 rounded-xl
                    hover:bg-surface-50 dark:hover:bg-surface-800
                    transition-colors duration-150">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-500/10
                        flex items-center justify-center">
                        <LayoutGrid size={16} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-surface-800 dark:text-surface-200">
                          Compact View
                        </p>
                        <p className="text-xs text-surface-400 dark:text-surface-500">
                          Show more items in a condensed layout
                        </p>
                      </div>
                    </div>
                    <ToggleSwitch
                      id="settings-compact-toggle"
                      checked={compactView}
                      onChange={setCompactView}
                    />
                  </div>
                </div>
              </div>

              {/* ── Preferences ── */}
              <div>
                <h3 className="text-xs font-semibold text-surface-400 dark:text-surface-500
                  uppercase tracking-wider mb-3">
                  Preferences
                </h3>
                <div className="space-y-1">
                  {/* Notifications */}
                  <div className="flex items-center justify-between p-3 rounded-xl
                    hover:bg-surface-50 dark:hover:bg-surface-800
                    transition-colors duration-150">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-500/10
                        flex items-center justify-center">
                        <Bell size={16} className="text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-surface-800 dark:text-surface-200">
                          Notifications
                        </p>
                        <p className="text-xs text-surface-400 dark:text-surface-500">
                          Receive alerts and update notifications
                        </p>
                      </div>
                    </div>
                    <ToggleSwitch
                      id="settings-notifications-toggle"
                      checked={notifications}
                      onChange={setNotifications}
                    />
                  </div>

                  {/* Auto-save */}
                  <div className="flex items-center justify-between p-3 rounded-xl
                    hover:bg-surface-50 dark:hover:bg-surface-800
                    transition-colors duration-150">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-500/10
                        flex items-center justify-center">
                        <Save size={16} className="text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-surface-800 dark:text-surface-200">
                          Auto-save Drafts
                        </p>
                        <p className="text-xs text-surface-400 dark:text-surface-500">
                          Automatically save your work as you type
                        </p>
                      </div>
                    </div>
                    <ToggleSwitch
                      id="settings-autosave-toggle"
                      checked={autoSave}
                      onChange={setAutoSave}
                    />
                  </div>

                  {/* Language */}
                  <div className="flex items-center justify-between p-3 rounded-xl
                    hover:bg-surface-50 dark:hover:bg-surface-800
                    transition-colors duration-150">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-rose-100 dark:bg-rose-500/10
                        flex items-center justify-center">
                        <Globe size={16} className="text-rose-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-surface-800 dark:text-surface-200">
                          Language
                        </p>
                        <p className="text-xs text-surface-400 dark:text-surface-500">
                          Choose your preferred language
                        </p>
                      </div>
                    </div>
                    <select
                      id="settings-language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="settings-select text-sm font-medium cursor-pointer
                        text-surface-700 dark:text-surface-300
                        bg-surface-100 dark:bg-surface-800
                        border border-surface-200 dark:border-surface-700
                        rounded-lg px-2.5 py-1.5
                        focus:outline-none focus:ring-2 focus:ring-primary-500/20
                        transition-all duration-150"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* ── About ── */}
              <div>
                <h3 className="text-xs font-semibold text-surface-400 dark:text-surface-500
                  uppercase tracking-wider mb-3">
                  About
                </h3>
                <div className="flex items-center gap-3 p-3 rounded-lg
                  bg-surface-50 dark:bg-surface-800
                  border border-surface-100 dark:border-surface-700">
                  <div className="w-9 h-9 rounded-lg bg-primary-600
                    flex items-center justify-center flex-shrink-0">
                    <Info size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-surface-800 dark:text-surface-200">
                      CloudVault
                    </p>
                    <p className="text-xs text-surface-400 dark:text-surface-500">
                      Version 1.0.0 · Built with ♥
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-surface-100 dark:border-surface-800">
              <button
                onClick={onClose}
                className="w-full min-h-11 rounded-lg px-4 py-2.5 text-sm font-medium text-white
                  bg-primary-600 hover:bg-primary-700
                  transition-colors duration-150 cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
