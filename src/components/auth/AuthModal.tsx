'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, User, Mail, Phone, Lock } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';

interface AuthModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode]       = useState<'login' | 'register' | 'forgot'>('login');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent]   = useState(false);
  const setAuth = useAuthStore(s => s.setAuth);

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '',
  });

  const switchMode = (m: 'login' | 'register') => {
    setMode(m);
    setForgotSent(false);
    setForm({ firstName: '', lastName: '', email: '', phone: '', password: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Email and password are required');
      return;
    }
    setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = mode === 'login'
        ? { email: form.email, password: form.password }
        : { firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone, password: form.password };

      const res  = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();

      if (!json.success) {
        toast.error(json.message || 'Something went wrong');
        return;
      }

      setAuth(json.data.user, json.data.token);
      toast.success(mode === 'login' ? 'Welcome back!' : 'Account created!');
      onSuccess?.();
      onClose();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) { toast.error('Enter your email'); return; }
    setLoading(true);
    try {
      const res  = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const json = await res.json();
      if (json.success) {
        setForgotSent(true);
      } else {
        toast.error(json.message || 'Failed to send reset email');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl z-10 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Forgot Password'}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {mode === 'login' ? 'Save your wishlist & track orders' : mode === 'register' ? 'Join to save wishlist & track orders' : 'We\'ll send a reset link to your email'}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Tab toggle — only for login/register */}
        {mode !== 'forgot' && (
          <div className="flex mx-6 mt-5 bg-gray-100 rounded-xl p-1">
            {(['login', 'register'] as const).map(m => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                  mode === m ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>
        )}

        {/* Forgot Password View */}
        {mode === 'forgot' && (
          <div className="px-6 py-5">
            {forgotSent ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-7 h-7 text-green-600" />
                </div>
                <p className="text-gray-800 font-semibold mb-1">Check your inbox!</p>
                <p className="text-gray-500 text-sm mb-5">We sent a password reset link to <strong>{forgotEmail}</strong></p>
                <button onClick={() => { setMode('login'); setForgotSent(false); }} className="text-indigo-600 text-sm font-semibold hover:underline">
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</> : 'Send Reset Link'}
                </button>
                <button type="button" onClick={() => setMode('login')} className="w-full text-center text-sm text-gray-500 hover:text-indigo-600 transition">
                  ← Back to Sign In
                </button>
              </form>
            )}
          </div>
        )}

        {/* Form */}
        {/* hidden inputs to prevent browser autofill on real fields */}
        {mode !== 'forgot' && <div style={{ display: 'none' }}>
          <input type="email" name="fake-email" autoComplete="username" />
          <input type="password" name="fake-password" autoComplete="current-password" />
        </div>}

        {mode !== 'forgot' && <form onSubmit={handleSubmit} autoComplete="off" className="px-6 py-5 space-y-3">
          <AnimatePresence>
            {mode === 'register' && (
              <motion.div
                key="register-extra"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: 'hidden' }}
                className="space-y-3"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      name="firstName" value={form.firstName} onChange={handleChange}
                      placeholder="First name" autoComplete="off"
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 transition"
                    />
                  </div>
                  <input
                    name="lastName" value={form.lastName} onChange={handleChange}
                    placeholder="Last name" autoComplete="off"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 transition"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="phone" value={form.phone} onChange={handleChange}
                    placeholder="Phone number" type="tel" autoComplete="off"
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 transition"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              name="email" value={form.email} onChange={handleChange}
              placeholder="Email address" type="email" autoComplete="off"
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              name="password" value={form.password} onChange={handleChange}
              placeholder="Password" type={showPass ? 'text' : 'password'}
              autoComplete="new-password"
              className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Forgot password link — only on login */}
          {mode === 'login' && (
            <div className="text-right -mt-1">
              <button
                type="button"
                onClick={() => { setMode('forgot'); setForgotEmail(form.email); }}
                className="text-xs text-indigo-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
          >
            {loading ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Please wait...</>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>}

        {/* Footer note */}
        {mode !== 'forgot' && <p className="text-center text-xs text-gray-400 pb-5 px-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>}
      </motion.div>
    </div>
  );
}
