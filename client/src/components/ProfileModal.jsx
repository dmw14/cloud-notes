import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Calendar, FolderOpen, Shield } from 'lucide-react';

export default function ProfileModal({ isOpen, onClose, user, itemCount = 0 }) {
  if (!user) return null;

  const initials = user.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'N/A';

  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'N/A';

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
            className="relative w-full max-w-md overflow-hidden rounded-xl
              bg-white dark:bg-surface-900
              border border-surface-200 dark:border-surface-700
              shadow-xl dark:shadow-black/30"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-white/70
                hover:text-white hover:bg-white/10
                transition-colors duration-150 cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Profile Header with gradient */}
            <div className="relative px-6 pt-8 pb-12 bg-primary-600
              overflow-hidden">

              <div className="relative flex flex-col items-center">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-xl bg-white/20
                  border border-white/25
                  flex items-center justify-center text-white text-xl font-bold
                  mb-4">
                  {initials}
                </div>
                <h2 className="text-xl font-bold text-white mb-0.5">
                  {user.name}
                </h2>
                <p className="text-sm text-white/70">
                  Member since {memberSince}
                </p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="px-6 py-5 space-y-1">
              {/* Email */}
              <div className="flex items-center gap-4 p-3 rounded-xl
                hover:bg-surface-50 dark:hover:bg-surface-800
                transition-colors duration-150">
                <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-500/10
                  flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-primary-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-surface-400 dark:text-surface-500 uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-sm font-medium text-surface-800 dark:text-surface-200 break-all">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Joined */}
              <div className="flex items-center gap-4 p-3 rounded-xl
                hover:bg-surface-50 dark:hover:bg-surface-800
                transition-colors duration-150">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/10
                  flex items-center justify-center flex-shrink-0">
                  <Calendar size={18} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-surface-400 dark:text-surface-500 uppercase tracking-wider">
                    Joined
                  </p>
                  <p className="text-sm font-medium text-surface-800 dark:text-surface-200">
                    {joinDate}
                  </p>
                </div>
              </div>

              {/* Total Items */}
              <div className="flex items-center gap-4 p-3 rounded-xl
                hover:bg-surface-50 dark:hover:bg-surface-800
                transition-colors duration-150">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-500/10
                  flex items-center justify-center flex-shrink-0">
                  <FolderOpen size={18} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-surface-400 dark:text-surface-500 uppercase tracking-wider">
                    Vault Items
                  </p>
                  <p className="text-sm font-medium text-surface-800 dark:text-surface-200">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>

              {/* Account Status */}
              <div className="flex items-center gap-4 p-3 rounded-xl
                hover:bg-surface-50 dark:hover:bg-surface-800
                transition-colors duration-150">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-500/10
                  flex items-center justify-center flex-shrink-0">
                  <Shield size={18} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-surface-400 dark:text-surface-500 uppercase tracking-wider">
                    Account Status
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      Active
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-5">
              <button
                onClick={onClose}
                className="w-full min-h-11 rounded-lg px-4 py-2.5 text-sm font-medium
                  text-surface-600 dark:text-surface-400
                  bg-surface-100 dark:bg-surface-800
                  hover:bg-surface-200 dark:hover:bg-surface-700
                  transition-colors duration-150 cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
