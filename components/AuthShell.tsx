/**
 * Shared Amazon-style auth page shell.
 * White background, centered logo with orange smile SVG, card slot, and mini footer.
 */
export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8 px-4" style={{ fontFamily: 'Amazon Ember, Arial, sans-serif' }}>
      {/* Amazon logo with orange smile */}
      <a href="/" className="mb-5 block" aria-label="Amazon.clone home">
        <div className="flex flex-col items-center gap-0">
          <span
            className="text-[28px] font-bold tracking-tight text-[#0F1111]"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.5px' }}
          >
            amazon<span className="text-[#FF9900]">.clone</span>
          </span>
          {/* Orange smile arc */}
          <svg width="80" height="10" viewBox="0 0 80 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="-mt-1">
            <path
              d="M2 4 Q40 14 78 4"
              stroke="#FF9900"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M70 2 L78 4 L72 8"
              stroke="#FF9900"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      </a>

      {/* Page content (card + below-card links) */}
      {children}

      {/* Auth footer */}
      <div className="mt-8 w-full max-w-md">
        <div className="relative flex items-center mb-4">
          <div className="flex-1 border-t border-gray-300" />
          <div className="flex-1 border-t border-gray-300" />
        </div>
        <div className="flex justify-center gap-4 text-xs text-[#007185]">
          <a href="#" className="hover:underline hover:text-[#C7511F]">Conditions of Use</a>
          <a href="#" className="hover:underline hover:text-[#C7511F]">Privacy Notice</a>
          <a href="#" className="hover:underline hover:text-[#C7511F]">Help</a>
        </div>
        <p className="text-center text-xs text-gray-500 mt-2">
          © 1996-2026, Amazon.clone, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
}
