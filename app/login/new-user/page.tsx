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
      <div className="w-full max-w-[348px]">
        <div className="border border-[#D5D9D9] rounded-lg p-6">
          <h1 className="text-[28px] font-normal text-[#0F1111] mb-4 leading-tight">
            Looks like you&apos;re new to Amazon
          </h1>

          {/* Email row */}
          <div className="mb-2">
            <span className="text-sm text-[#0F1111]">{email}</span>
            {' '}
            <button
              onClick={handleChange}
              className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline"
              id="change-email-btn"
            >
              Change
            </button>
          </div>

          <p className="text-sm text-[#0F1111] mb-4">
            Let&apos;s create an account using your email
          </p>

          <button
            onClick={handleProceed}
            id="proceed-to-create-account"
            className="w-full py-1.5 px-4 bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#E6BB00] border border-[#FCD200] rounded-full text-sm font-normal text-[#0F1111] transition-colors"
          >
            Proceed to create an account
          </button>

          <div className="mt-5 pt-4 border-t border-[#D5D9D9]">
            <p className="text-sm font-bold text-[#0F1111] mb-1">Already a customer?</p>
            <button
              onClick={handleChange}
              className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline"
              id="sign-in-with-another-email"
            >
              Sign in with another email or mobile
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
