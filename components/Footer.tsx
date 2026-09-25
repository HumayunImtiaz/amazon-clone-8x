'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';

const FOOTER_LINKS = [
  {
    heading: 'Company',
    links: [
      { label: 'Careers', href: '/' },
      { label: 'Blog', href: '/' },
      { label: 'About Lumino', href: '/' },
      { label: 'Press', href: '/' },
    ],
  },
  {
    heading: 'Sell with Us',
    links: [
      { label: 'Become a Seller', href: '/' },
      { label: 'Affiliate Program', href: '/' },
      { label: 'Advertise', href: '/' },
    ],
  },
  {
    heading: 'Payments',
    links: [
      { label: 'Business Card', href: '/' },
      { label: 'Shop with Points', href: '/' },
      { label: 'Reload Balance', href: '/' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'Your Account', href: '/account' },
      { label: 'Your Cart', href: '/cart' },
      { label: 'Help Center', href: '/' },
      { label: 'Returns', href: '/' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm py-3 transition-colors font-medium"
      >
        ↑ Back to top
      </button>

      {/* Links grid */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {FOOTER_LINKS.map((section) => (
          <div key={section.heading}>
            <h3 className="text-white font-semibold mb-4 font-heading">{section.heading}</h3>
            <ul className="space-y-2.5">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-indigo-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Brand bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-1.5 font-heading font-bold text-lg text-white tracking-tight">
            <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-600 rounded">
              <Zap className="w-3 h-3 text-white fill-white" />
            </span>
            Lumino
          </Link>

          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} Lumino, Inc. — Demo project, not affiliated with any real retailer.
          </p>

          <div className="flex gap-4 text-xs">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
