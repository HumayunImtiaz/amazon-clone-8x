'use client';

import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthShell from '@/components/AuthShell';
import { checkEmailExists } from '@/lib/auth-actions';

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      const exists = await checkEmailExists(email.toLowerCase().trim());
      const encoded = encodeURIComponent(email.toLowerCase().trim());
      if (exists) {
        router.push(`/login/password?email=${encoded}`);
      } else {
        router.push(`/login/new-user?email=${encoded}`);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="w-full max-w-sm">
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-card">
          <h1 className="text-2xl font-bold text-gray-900 font-heading mb-1">Welcome back</h1>
          <p className="text-sm text-gray-500 mb-6">Sign in or create a Lumino account</p>

          <form onSubmit={handleContinue} id="login-step-a-form" className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email address
              </label>
              {error && (
                <p className="text-red-600 text-xs mb-1.5 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                autoComplete="email"
                autoFocus
                placeholder="you@example.com"
                className={`input-lumino ${error ? 'input-lumino-error' : ''}`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              id="continue-button"
              className="btn-primary w-full py-2.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Checking…' : 'Continue'}
            </button>
          </form>

          <p className="mt-5 text-xs text-gray-400 leading-relaxed">
            By continuing, you agree to Lumino&apos;s{' '}
            <a href="#" className="text-indigo-500 hover:text-indigo-700">Terms of Use</a> and{' '}
            <a href="#" className="text-indigo-500 hover:text-indigo-700">Privacy Policy</a>.
          </p>
        </div>

        <div className="mt-5 text-center">
          <p className="text-sm text-gray-500">
            New to Lumino?{' '}
            <a href="/register" className="text-indigo-500 hover:text-indigo-700 font-semibold">
              Create a free account
            </a>
          </p>
        </div>
      </div>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
