import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cloud, Loader2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import useAuthStore from '../store/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data);
      toast.success(`Welcome back, ${res.data.name}!`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden auth-bg bg-surface-50 dark:bg-surface-950">

      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-primary-200/60 blur-3xl dark:bg-purple-500/20" />
      <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-sky-200/60 blur-3xl dark:bg-purple-700/15" />
      <div className="pointer-events-none absolute top-1/2 left-8 h-28 w-28 -translate-y-1/2 rounded-3xl rotate-12 border border-primary-200/60 bg-white/60 backdrop-blur-sm dark:border-purple-500/15 dark:bg-[rgba(15,15,18,0.3)]" />
      <div className="pointer-events-none absolute top-24 right-12 h-20 w-20 -rotate-6 rounded-2xl border border-primary-200/60 bg-white/70 backdrop-blur-sm dark:border-purple-500/15 dark:bg-[rgba(15,15,18,0.3)]" />
      
      {/* Ambient orbs */}
      <div className="ambient-orb absolute w-96 h-96 bg-purple-500/10 top-1/4 -left-48" />
      <div className="ambient-orb absolute w-80 h-80 bg-fuchsia-500/8 bottom-1/4 -right-40" style={{ animationDelay: '-10s' }} />

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg"
        >
        {/* Logo + Branding */}
        <div className="text-center mb-8">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-violet-600 to-purple-800 shadow-lg shadow-purple-500/40">
            <Cloud size={30} className="text-white" />
          </div>
          <h1 className="mb-1 text-3xl font-extrabold text-surface-900 text-gradient-purple">CloudVault</h1>
          <p className="text-sm text-surface-600 dark:text-surface-400">Your ideas, anywhere.</p>
        </div>

        {/* Form Card */}
        <div className="glass-card rounded-3xl border border-surface-200/80 bg-white/95 p-8 sm:p-10 shadow-2xl shadow-surface-900/10 backdrop-blur-xl dark:bg-[rgba(15,15,18,0.7)] dark:border-[rgba(168,85,247,0.15)] dark:shadow-purple-500/5">

          <h2 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-1 text-center">
            Welcome back
          </h2>
          <p className="text-surface-500 dark:text-surface-400 mb-7 text-center text-sm">
            Sign in to access your notes
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full min-h-13 px-5 py-3.5 rounded-2xl text-[15px]
                  bg-surface-50 dark:bg-surface-800/60
                  border-2 border-surface-200 dark:border-surface-700/50
                  text-surface-900 dark:text-surface-100
                  placeholder:text-surface-400 dark:placeholder:text-surface-500
                  focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500
                  transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full min-h-13 px-5 pr-14 py-3.5 rounded-2xl text-[15px]
                    bg-surface-50 dark:bg-surface-800/60
                    border-2 border-surface-200 dark:border-surface-700/50
                    text-surface-900 dark:text-surface-100
                    placeholder:text-surface-400 dark:placeholder:text-surface-500
                    focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500
                    transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-surface-400
                    hover:text-surface-600 dark:hover:text-surface-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="btn-purple-glow w-full min-h-12 rounded-xl px-5 py-3.5 text-sm font-bold text-white tracking-wide
                disabled:opacity-50 disabled:cursor-not-allowed
                transform hover:-translate-y-0.5 active:translate-y-0
                transition-all duration-200 cursor-pointer
                flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              Sign In
            </button>
          </form>
        </div>

        {/* Bottom link */}
        <p className="mt-6 text-center text-sm text-surface-600 dark:text-surface-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-purple-400 hover:text-purple-300 transition-colors">
            Sign up
          </Link>
        </p>
        </motion.div>
      </div>
    </div>
  );
}
