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
      <div className="w-full max-w-sm">
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-card">
          <h1 className="text-2xl font-bold text-gray-900 font-heading mb-1">Create account</h1>
          <p className="text-sm text-gray-500 mb-6">Join Lumino and shop smarter.</p>

          {serverError && (
            <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {serverError}
            </p>
          )}

          <form onSubmit={handleSubmit} id="register-form" className="space-y-4">
            {/* Email (locked) */}
            <div>
              <span className="block text-sm font-semibold text-gray-700 mb-1">Email</span>
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2.5 flex items-center justify-between">
                <span className="text-sm text-gray-700">{emailFromUrl || '—'}</span>
                <a
                  href="/login"
                  className="text-xs text-indigo-500 hover:text-indigo-700 font-semibold"
                  id="change-email-link"
                >
                  Change
                </a>
              </div>
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
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
                className={`input-lumino ${errors.name ? 'input-lumino-error' : ''}`}
              />
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password <span className="font-normal text-gray-400 text-xs">(at least 6 characters)</span>
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })); }}
                autoComplete="new-password"
                className={`input-lumino ${errors.password ? 'input-lumino-error' : ''}`}
              />
              {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setErrors(p => ({ ...p, confirmPassword: undefined })); }}
                autoComplete="new-password"
                className={`input-lumino ${errors.confirmPassword ? 'input-lumino-error' : ''}`}
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              id="register-button"
              className="btn-primary w-full py-2.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>

            <div className="pt-4 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <a href="/login" className="text-indigo-500 hover:text-indigo-700 font-semibold" id="signin-instead-link">
                  Sign in
                </a>
              </p>
            </div>
          </form>

          <p className="mt-4 text-xs text-gray-400 leading-relaxed">
            By creating an account, you agree to Lumino&apos;s{' '}
            <a href="#" className="text-indigo-500 hover:text-indigo-700">Terms of Use</a> and{' '}
            <a href="#" className="text-indigo-500 hover:text-indigo-700">Privacy Policy</a>.
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
