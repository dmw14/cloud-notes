import { motion } from 'framer-motion';
import { FolderOpen } from 'lucide-react';

export default function EmptyState({ onCreateNote }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-24 px-6"
    >
      <div className="w-16 h-16 rounded-2xl bg-surface-100 dark:bg-surface-800
        flex items-center justify-center mb-6">
        <FolderOpen size={28} className="text-surface-400" />
      </div>

      <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
        Your vault is empty
      </h2>
      <p className="text-surface-500 text-center max-w-sm mb-8 text-sm leading-relaxed">
        Start capturing your ideas, notes, photos, and files. Your first item is just a click away.
      </p>

      <button
        id="empty-state-create"
        onClick={onCreateNote}
        className="h-10 rounded-lg px-5 text-sm font-medium text-white
          bg-primary-600 hover:bg-primary-700
          transition-colors duration-150 cursor-pointer"
      >
        Create your first item
      </button>
    </motion.div>
  );
}
