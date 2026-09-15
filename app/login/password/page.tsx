'use client';

import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthShell from '@/components/AuthShell';

function PasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Enter your password');
      return;
    }

    setLoading(true);
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Your password is incorrect");
      setLoading(false);
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  const handleChangeEmail = () => {
    router.push('/login');
  };

  return (
    <AuthShell>
      <div className="w-full max-w-[348px]">
        <div className="border border-[#D5D9D9] rounded-lg p-6">
          <h1 className="text-[28px] font-normal text-[#0F1111] mb-4 leading-tight">
            Sign in
          </h1>

          {/* Email row */}
          <div className="mb-4 pb-3 border-b border-[#D5D9D9]">
            <span className="text-sm font-bold text-[#0F1111]">{email}</span>
            {' '}
            <button
              onClick={handleChangeEmail}
              className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline"
              id="change-email-btn"
            >
              Change
            </button>
          </div>

          <form onSubmit={handleSignIn} id="password-form">
            <label htmlFor="password" className="block text-sm font-bold text-[#0F1111] mb-1">
              Password
            </label>

            {error && (
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-red-600 text-sm">{error}</span>
              </div>
            )}

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              autoComplete="current-password"
              autoFocus
              className={`w-full border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E77600] focus:border-[#E77600] ${
                error ? 'border-red-500' : 'border-[#888C8C]'
              }`}
            />

            <div className="text-right mt-1 mb-3">
              <a href="#" className="text-xs text-[#007185] hover:text-[#C7511F] hover:underline">
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              id="signin-button"
              className="w-full py-1.5 px-4 bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#E6BB00] border border-[#FCD200] rounded-full text-sm font-normal text-[#0F1111] transition-colors disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-4 text-xs text-[#0F1111] leading-snug">
            By continuing, you agree to Amazon&apos;s{' '}
            <a href="#" className="text-[#007185] hover:text-[#C7511F] hover:underline">Conditions of Use</a>
            {' '}and{' '}
            <a href="#" className="text-[#007185] hover:text-[#C7511F] hover:underline">Privacy Notice</a>.
          </p>
        </div>

        {/* Keep me signed in */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <a href="/login" className="text-[#007185] hover:text-[#C7511F] hover:underline">
            ← Sign in with a different account
          </a>
        </div>
      </div>
    </AuthShell>
  );
}

export default function PasswordPage() {
  return (
    <Suspense>
      <PasswordForm />
    </Suspense>
  );
}
