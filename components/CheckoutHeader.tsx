'use client';

import Link from 'next/link';
import { ShoppingCart, Zap, Lock } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { useEffect, useState } from 'react';

export default function CheckoutHeader() {
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm py-4 px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Lumino Logo */}
        <Link href="/" aria-label="Lumino home" className="inline-flex items-center gap-1.5 font-heading font-bold text-xl tracking-tight">
          <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-600 rounded-md">
            <Zap className="w-3.5 h-3.5 text-white fill-white" />
          </span>
          <span className="text-gray-900">Lumino</span>
        </Link>

        {/* Secure checkout badge */}
        <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
          <Lock className="w-4 h-4 text-indigo-400" />
          <span>Secure checkout</span>
        </div>

        {/* Cart */}
        <Link href="/cart" className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 transition-colors">
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {mounted && itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-sm font-medium hidden sm:inline">Cart</span>
        </Link>
      </div>
    </header>
  );
}
