'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import AuthShell from '@/components/AuthShell';
import { registerUser } from '@/lib/auth-actions';

type FieldErrors = Record<string, string | undefined>;

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get('email') || '';

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    setErrors({});
    setLoading(true);

    const result = await registerUser({
      name,
      email: emailFromUrl,
      password,
      confirmPassword,
    });

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
      email: emailFromUrl,
      password,
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
    <AuthShell>
      <div className="w-full max-w-[348px]">
        <div className="border border-[#D5D9D9] rounded-lg p-6">
          <h1 className="text-[28px] font-normal text-[#0F1111] mb-4 leading-tight">
            Create account
          </h1>

          {serverError && (
            <p className="mb-3 text-sm text-red-600">{serverError}</p>
          )}

          <form onSubmit={handleSubmit} id="register-form" className="space-y-3">
            {/* Email (locked, from URL param) */}
            <div>
              <span className="block text-sm font-bold text-[#0F1111]">Email</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-sm text-[#0F1111]">{emailFromUrl || '—'}</span>
                <a
                  href="/login"
                  className="text-xs text-[#007185] hover:text-[#C7511F] hover:underline"
                  id="change-email-link"
                >
                  Change
                </a>
              </div>
              {errors.email && <p className="text-red-600 text-xs mt-0.5">{errors.email}</p>}
            </div>

            {/* Your name */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-[#0F1111] mb-1">
                Your name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
                autoComplete="name"
                autoFocus
                placeholder="First and last name"
                className={`w-full border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E77600] focus:border-[#E77600] ${
                  errors.name ? 'border-red-500' : 'border-[#888C8C]'
                }`}
              />
              {errors.name && <p className="text-red-600 text-xs mt-0.5">{errors.name}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-[#0F1111] mb-1">
                Password <span className="font-normal text-[#565959]">(at least 6 characters)</span>
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })); }}
                autoComplete="new-password"
                className={`w-full border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E77600] focus:border-[#E77600] ${
                  errors.password ? 'border-red-500' : 'border-[#888C8C]'
                }`}
              />
              {errors.password ? (
                <p className="text-red-600 text-xs mt-0.5">{errors.password}</p>
              ) : (
                <div className="flex items-center gap-1.5 mt-1">
                  <svg className="w-3.5 h-3.5 text-[#007185] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 7v5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="16" r="1" fill="white"/>
                  </svg>
                  <p className="text-xs text-[#565959]">Passwords must be at least 6 characters.</p>
                </div>
              )}
            </div>

            {/* Re-enter password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-[#0F1111] mb-1">
                Re-enter password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setErrors(p => ({ ...p, confirmPassword: undefined })); }}
                autoComplete="new-password"
                className={`w-full border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E77600] focus:border-[#E77600] ${
                  errors.confirmPassword ? 'border-red-500' : 'border-[#888C8C]'
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs mt-0.5">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              id="register-button"
              className="w-full py-1.5 px-4 bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#E6BB00] border border-[#FCD200] rounded-full text-sm font-normal text-[#0F1111] transition-colors disabled:opacity-60 mt-1"
            >
              {loading ? 'Creating account…' : 'Continue'}
            </button>

            <div className="pt-2 border-t border-[#D5D9D9]">
              <p className="text-sm text-[#0F1111]">
                Already a customer?{' '}
                <a href="/login" className="text-[#007185] hover:text-[#C7511F] hover:underline" id="signin-instead-link">
                  Sign in instead
                </a>
              </p>
            </div>
          </form>

          <p className="mt-3 text-xs text-[#0F1111] leading-snug">
            By creating an account, you agree to Amazon&apos;s{' '}
            <a href="#" className="text-[#007185] hover:text-[#C7511F] hover:underline">Conditions of Use</a>
            {' '}and{' '}
            <a href="#" className="text-[#007185] hover:text-[#C7511F] hover:underline">Privacy Notice</a>.
          </p>
        </div>
      </div>
    </AuthShell>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
