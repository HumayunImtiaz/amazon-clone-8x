'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { registerUser } from '@/lib/auth-actions';

type FieldErrors = Record<string, string | undefined>;

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState('');

  const update = (field: keyof typeof form, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    setLoading(true);

    const result = await registerUser(form);

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const [key, msgs] of Object.entries(result.error)) {
        if (msgs && msgs.length > 0) fieldErrors[key] = msgs[0];
      }
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    // Auto sign-in after registration
    const signInResult = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (signInResult?.error) {
      setServerError('Account created! Please sign in.');
      router.push('/login');
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#EAEDED] flex flex-col items-center pt-8 px-4 pb-16">
      {/* Logo */}
      <Link href="/" className="mb-6">
        <span className="text-3xl font-bold tracking-tight text-[#131921]">
          <span className="text-[#FF9900]">a</span>mazon
        </span>
        <span className="text-[#FF9900] text-sm">.clone</span>
      </Link>

      {/* Card */}
      <div className="bg-white border border-gray-300 rounded-lg p-8 w-full max-w-sm shadow-sm">
        <h1 className="text-2xl font-medium text-[#0F1111] mb-6">Create account</h1>

        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded text-sm text-red-700">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" id="register-form">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#0F1111] mb-1">
              Your name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                required
                autoComplete="name"
                className={`w-full border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900] ${
                  errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="First and last name"
              />
            </div>
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#0F1111] mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                required
                autoComplete="email"
                className={`w-full border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900] ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#0F1111] mb-1">
              Password
            </label>
            <p className="text-xs text-gray-500 mb-1">At least 8 characters</p>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                required
                autoComplete="new-password"
                className={`w-full border rounded-md pl-9 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900] ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            id="register-button"
            className="w-full py-2.5 px-4 bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#E6BB00] border border-[#FCD200] rounded-lg text-sm font-medium text-[#0F1111] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account…' : 'Create your Amazon.clone account'}
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500 leading-snug">
          By creating an account, you agree to Amazon.clone&apos;s{' '}
          <span className="text-[#007185] hover:underline cursor-pointer">Conditions of Use</span>{' '}
          and{' '}
          <span className="text-[#007185] hover:underline cursor-pointer">Privacy Notice</span>.
        </p>
      </div>

      {/* Sign in link */}
      <div className="mt-4 text-sm text-[#0F1111]">
        Already have an account?{' '}
        <Link href="/login" className="text-[#007185] hover:text-[#C7511F] hover:underline" id="signin-link">
          Sign in
        </Link>
      </div>
    </div>
  );
}
