'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AuthShell from '@/components/AuthShell';

function NewUserContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email') || '';

  const handleProceed = () => {
    router.push(`/register?email=${encodeURIComponent(email)}`);
  };

  const handleChange = () => {
    router.push('/login');
  };

  return (
    <AuthShell>
      <div className="w-full max-w-sm">
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-card">
          <h1 className="text-2xl font-bold text-gray-900 font-heading mb-1">
            Welcome to Lumino!
          </h1>
          <p className="text-sm text-gray-500 mb-5">
            Looks like you&apos;re new here. Let&apos;s create your account.
          </p>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 mb-5 flex items-center justify-between">
            <span className="text-sm text-gray-700 font-medium">{email}</span>
            <button
              onClick={handleChange}
              className="text-xs text-indigo-500 hover:text-indigo-700 font-semibold transition-colors"
              id="change-email-btn"
            >
              Change
            </button>
          </div>

          <button
            onClick={handleProceed}
            id="proceed-to-create-account"
            className="btn-primary w-full py-2.5"
          >
            Create account
          </button>

          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-1">Already have a Lumino account?</p>
            <button
              onClick={handleChange}
              className="text-sm text-indigo-500 hover:text-indigo-700 font-semibold transition-colors"
              id="sign-in-with-another-email"
            >
              Sign in instead
            </button>
          </div>
        </div>
      </div>
    </AuthShell>
  );
}

export default function NewUserPage() {
  return (
    <Suspense>
      <NewUserContent />
    </Suspense>
  );
}
