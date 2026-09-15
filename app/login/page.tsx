'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Incorrect email or password. Please try again.');
      setLoading(false);
    } else {
      router.push(callbackUrl);
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
        <h1 className="text-2xl font-medium text-[#0F1111] mb-6">Sign in</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" id="login-form">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#0F1111] mb-1">
              Email or mobile phone number
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#0F1111] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full border border-gray-300 rounded-md pl-9 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
                placeholder="At least 8 characters"
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
          </div>

          <button
            type="submit"
            disabled={loading}
            id="signin-button"
            className="w-full py-2.5 px-4 bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#E6BB00] border border-[#FCD200] rounded-lg text-sm font-medium text-[#0F1111] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500 leading-snug">
          By signing in, you agree to Amazon.clone&apos;s{' '}
          <span className="text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer">
            Conditions of Use
          </span>{' '}
          and{' '}
          <span className="text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer">
            Privacy Notice
          </span>
          .
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 my-4 w-full max-w-sm">
        <div className="flex-1 border-t border-gray-300" />
        <span className="text-xs text-gray-500">New to Amazon.clone?</span>
        <div className="flex-1 border-t border-gray-300" />
      </div>

      {/* Register CTA */}
      <div className="w-full max-w-sm">
        <Link
          href="/register"
          id="create-account-link"
          className="block w-full py-2.5 px-4 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-sm font-medium text-[#0F1111] text-center transition-colors shadow-sm"
        >
          Create your Amazon.clone account
        </Link>
      </div>
    </div>
  );
}
