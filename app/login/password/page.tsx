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
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Your password is incorrect. Please try again.');
      setLoading(false);
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <AuthShell>
      <div className="w-full max-w-sm">
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-card">
          <h1 className="text-2xl font-bold text-gray-900 font-heading mb-1">Sign in</h1>
          <p className="text-sm text-gray-500 mb-5">
            Signing in as{' '}
            <span className="font-semibold text-gray-700">{email}</span>{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-indigo-500 hover:text-indigo-700 text-sm transition-colors"
              id="change-email-btn"
            >
              Change
            </button>
          </p>

          <form onSubmit={handleSignIn} id="password-form" className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              {error && (
                <p className="text-red-600 text-xs mb-1.5 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                autoComplete="current-password"
                autoFocus
                className={`input-lumino ${error ? 'input-lumino-error' : ''}`}
              />
              <div className="text-right mt-1.5">
                <a href="#" className="text-xs text-indigo-500 hover:text-indigo-700 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              id="signin-button"
              className="btn-primary w-full py-2.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-5 text-xs text-gray-400 leading-relaxed">
            By signing in, you agree to Lumino&apos;s{' '}
            <a href="#" className="text-indigo-500 hover:text-indigo-700">Terms of Use</a> and{' '}
            <a href="#" className="text-indigo-500 hover:text-indigo-700">Privacy Policy</a>.
          </p>
        </div>

        <div className="mt-4 text-center">
          <a href="/login" className="text-sm text-indigo-500 hover:text-indigo-700 transition-colors">
            ← Use a different account
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
