import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cloud, Loader2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import useAuthStore from '../store/authStore';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/signup', { name, email, password });
      login(res.data);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-surface-50 dark:bg-surface-950
      flex items-center justify-center px-4 py-12">

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[420px]"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl
            bg-primary-600 shadow-sm">
            <Cloud size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            CloudVault
          </h1>
          <p className="text-sm text-surface-500 mt-1">Start your journey today.</p>
        </div>

        {/* Form Card */}
        <div className="rounded-xl border border-surface-200 dark:border-surface-700
          bg-white dark:bg-surface-900 p-8 shadow-sm">

          <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-1">
            Create an account
          </h2>
          <p className="text-surface-500 mb-6 text-sm">
            Get started with your free account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full h-11 px-3.5 rounded-lg text-sm
                  bg-white dark:bg-surface-800
                  border border-surface-200 dark:border-surface-700
                  text-surface-900 dark:text-surface-100
                  placeholder:text-surface-400 dark:placeholder:text-surface-500
                  focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                  transition-colors duration-150"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                Email Address
              </label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 px-3.5 rounded-lg text-sm
                  bg-white dark:bg-surface-800
                  border border-surface-200 dark:border-surface-700
                  text-surface-900 dark:text-surface-100
                  placeholder:text-surface-400 dark:placeholder:text-surface-500
                  focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                  transition-colors duration-150"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full h-11 px-3.5 pr-11 rounded-lg text-sm
                    bg-white dark:bg-surface-800
                    border border-surface-200 dark:border-surface-700
                    text-surface-900 dark:text-surface-100
                    placeholder:text-surface-400 dark:placeholder:text-surface-500
                    focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                    transition-colors duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400
                    hover:text-surface-600 dark:hover:text-surface-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full h-11 px-3.5 pr-11 rounded-lg text-sm
                    bg-white dark:bg-surface-800
                    border border-surface-200 dark:border-surface-700
                    text-surface-900 dark:text-surface-100
                    placeholder:text-surface-400 dark:placeholder:text-surface-500
                    focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                    transition-colors duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400
                    hover:text-surface-600 dark:hover:text-surface-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="signup-submit"
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg text-sm font-semibold text-white mt-1
                bg-primary-600 hover:bg-primary-700
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-150 cursor-pointer
                flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Create Account
            </button>
          </form>
        </div>

        {/* Bottom link */}
        <p className="mt-6 text-center text-sm text-surface-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
