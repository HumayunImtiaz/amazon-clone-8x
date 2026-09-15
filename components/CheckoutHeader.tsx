'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { useEffect, useState } from 'react';

export default function CheckoutHeader() {
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-gradient-to-r from-[#000000] to-[#1a1a1a] text-white py-4 px-6 border-b border-gray-300">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center"
        >
          <div className="flex flex-col items-start gap-0">
            <span
              className="text-2xl font-bold tracking-tight text-white leading-none"
              style={{ fontFamily: 'Georgia, serif', letterSpacing: '-1px' }}
            >
              amazon<span className="text-[#FF9900] text-xs font-sans ml-0.5">.clone</span>
            </span>
            <svg width="70" height="10" viewBox="0 0 80 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="-mt-1 ml-1">
              <path d="M2 4 Q40 14 78 4" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M70 2 L78 4 L72 8" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </Link>

        {/* Secure Checkout Text */}
        <div className="text-[22px] font-medium text-white flex items-center">
          Secure checkout
          <svg className="w-4 h-4 ml-2 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Cart */}
        <Link
          href="/cart"
          className="flex items-center text-white"
        >
          <div className="relative">
            <ShoppingCart className="w-8 h-8 opacity-90" />
            {mounted && (
              <span className="absolute -top-2 top-0 right-0 left-2.5 text-[#F08804] text-md font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
