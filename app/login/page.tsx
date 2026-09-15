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
      setError('Enter your email or mobile phone number');
      return;
    }

    setLoading(true);
    try {
      const exists = await checkEmailExists(email.toLowerCase().trim());
      const encoded = encodeURIComponent(email.toLowerCase().trim());
      if (exists) {
        // Returning user → password page
        router.push(`/login/password?email=${encoded}`);
      } else {
        // New user → "Looks like you're new" confirmation
        router.push(`/login/new-user?email=${encoded}`);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="w-full max-w-[348px]">
        {/* Card */}
        <div className="border border-[#D5D9D9] rounded-lg p-6">
          <h1 className="text-[28px] font-normal text-[#0F1111] mb-4 leading-tight">
            Sign in or create account
          </h1>

          <form onSubmit={handleContinue} id="login-step-a-form">
            <label htmlFor="email" className="block text-sm font-bold text-[#0F1111] mb-1">
              Enter mobile number or email
            </label>

            {error && (
              <div className="flex items-start gap-1.5 mb-2">
                <span className="text-red-600 text-sm leading-snug">{error}</span>
              </div>
            )}

            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              autoComplete="email"
              autoFocus
              className={`w-full border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E77600] focus:border-[#E77600] ${
                error ? 'border-red-500' : 'border-[#888C8C]'
              }`}
            />

            <button
              type="submit"
              disabled={loading}
              id="continue-button"
              className="w-full mt-4 py-1.5 px-4 bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#E6BB00] border border-[#FCD200] rounded-full text-sm font-normal text-[#0F1111] transition-colors disabled:opacity-60"
            >
              {loading ? 'Checking…' : 'Continue'}
            </button>
          </form>

          <p className="mt-4 text-xs text-[#0F1111] leading-snug">
            By continuing, you agree to Amazon&apos;s{' '}
            <a href="#" className="text-[#007185] hover:text-[#C7511F] hover:underline">Conditions of Use</a>
            {' '}and{' '}
            <a href="#" className="text-[#007185] hover:text-[#C7511F] hover:underline">Privacy Notice</a>.
          </p>

          <p className="mt-3 text-xs">
            <a href="#" className="text-[#007185] hover:text-[#C7511F] hover:underline">Need help?</a>
          </p>
        </div>

        {/* Buying for work */}
        <div className="mt-5 border-t border-[#D5D9D9] pt-4">
          <p className="text-sm font-bold text-[#0F1111]">Buying for work?</p>
          <a href="#" className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline">
            Create a free business account
          </a>
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
