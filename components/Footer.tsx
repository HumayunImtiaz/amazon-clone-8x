'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#232F3E] text-gray-300 mt-auto">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-[#37475A] hover:bg-[#485769] text-white text-sm py-3"
      >
        Back to top
      </button>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="text-white font-bold mb-3">Get to Know Us</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:underline">Careers</Link></li>
            <li><Link href="/" className="hover:underline">Blog</Link></li>
            <li><Link href="/" className="hover:underline">About Amazon.clone</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-3">Make Money with Us</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:underline">Sell products</Link></li>
            <li><Link href="/" className="hover:underline">Become an Affiliate</Link></li>
            <li><Link href="/" className="hover:underline">Advertise Your Products</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-3">Amazon Payment</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:underline">Business Card</Link></li>
            <li><Link href="/" className="hover:underline">Shop with Points</Link></li>
            <li><Link href="/" className="hover:underline">Reload Your Balance</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-3">Let Us Help You</h3>
          <ul className="space-y-2">
            <li><Link href="/account" className="hover:underline">Your Account</Link></li>
            <li><Link href="/cart" className="hover:underline">Your Cart</Link></li>
            <li><Link href="/" className="hover:underline">Help</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Amazon.clone — This is a demo project, not affiliated with Amazon.com
        </div>
      </div>
    </footer>
  );
}
