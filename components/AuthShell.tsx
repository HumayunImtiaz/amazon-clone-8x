import { Zap } from 'lucide-react';

/**
 * Lumino auth page shell.
 * Light indigo-tinted gradient background, centered Lumino wordmark, card slot.
 */
export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center py-10 px-4 font-sans">
      {/* Lumino logo */}
      <a href="/" className="mb-8 block" aria-label="Lumino home">
        <span className="inline-flex items-center gap-2 font-heading font-bold text-2xl tracking-tight text-gray-900">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-lg shadow-indigo">
            <Zap className="w-4 h-4 text-white fill-white" />
          </span>
          Lumino
        </span>
      </a>

      {/* Page content */}
      {children}

      {/* Auth footer */}
      <div className="mt-10 w-full max-w-sm">
        <div className="flex justify-center gap-6 text-xs text-gray-400">
          <a href="#" className="hover:text-indigo-500 transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-indigo-500 transition-colors">Privacy</a>
          <a href="#" className="hover:text-indigo-500 transition-colors">Help</a>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          © {new Date().getFullYear()} Lumino, Inc.
        </p>
      </div>
    </div>
  );
}
