'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const itemCount = useCartStore((s) => s.getItemCount());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(' ')[0] ?? 'Sign in';

  return (
    <header className="bg-[#131921] text-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-2 lg:gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1 shrink-0 border border-transparent hover:border-white rounded px-2 py-1"
        >
          <span className="text-xl font-bold tracking-tight">
            <span className="text-[#FF9900]">a</span>mazon
          </span>
          <span className="text-[#FF9900] text-xs">.clone</span>
        </Link>

        {/* Search bar */}
        <form
          className="hidden sm:flex flex-1 max-w-3xl"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex w-full rounded-md overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Amazon.clone"
              className="flex-1 px-4 py-2 text-black text-sm focus:outline-none"
              id="search-input"
            />
            <button
              type="submit"
              className="bg-[#FEBD69] hover:bg-[#F3A847] px-4 flex items-center justify-center"
              id="search-button"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-[#131921]" />
            </button>
          </div>
        </form>

        {/* Right nav */}
        <div className="flex items-center gap-1 lg:gap-3 ml-auto">
          {session ? (
            <div className="hidden sm:flex items-center gap-1">
              <Link
                href="/account"
                className="flex flex-col border border-transparent hover:border-white rounded px-2 py-1 text-xs"
                id="account-link"
              >
                <span className="text-gray-300">Hello, {firstName}</span>
                <span className="font-bold text-sm">Account &amp; Lists</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="border border-transparent hover:border-white rounded px-2 py-1 flex items-center gap-1 text-xs"
                id="signout-button"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline">Sign out</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:flex flex-col border border-transparent hover:border-white rounded px-2 py-1 text-xs"
              id="account-link"
            >
              <span className="text-gray-300">Hello, Sign in</span>
              <span className="font-bold text-sm">Account &amp; Lists</span>
            </Link>
          )}

          <Link
            href="/account"
            className="hidden md:flex flex-col border border-transparent hover:border-white rounded px-2 py-1 text-xs"
            id="orders-link"
          >
            <span className="text-gray-300">Returns</span>
            <span className="font-bold text-sm">&amp; Orders</span>
          </Link>

          <Link
            href="/cart"
            className="flex items-center border border-transparent hover:border-white rounded px-2 py-1 relative"
            id="cart-link"
          >
            <div className="relative">
              <ShoppingCart className="w-7 h-7" />
              <span className="absolute -top-2 -right-1 bg-[#F08804] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            </div>
            <span className="hidden sm:inline font-bold text-sm ml-1">Cart</span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="sm:hidden border border-transparent hover:border-white rounded p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Category nav bar */}
      <nav className="bg-[#232F3E] px-4 py-1.5 hidden sm:block">
        <ul className="flex items-center gap-1 text-sm overflow-x-auto">
          {['All', 'Electronics', 'Home & Kitchen', 'Clothing', 'Books', 'Beauty'].map(
            (cat) => (
              <li key={cat}>
                <Link
                  href={cat === 'All' ? '/' : `/?category=${encodeURIComponent(cat)}`}
                  className="border border-transparent hover:border-white rounded px-2 py-1 whitespace-nowrap block"
                >
                  {cat}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#232F3E] px-4 py-3 border-t border-gray-600">
          <form
            className="flex mb-3"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex w-full rounded-md overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Amazon.clone"
                className="flex-1 px-4 py-2 text-black text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#FEBD69] hover:bg-[#F3A847] px-4 flex items-center"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-[#131921]" />
              </button>
            </div>
          </form>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/login" className="flex items-center gap-2 py-1" onClick={() => setMobileMenuOpen(false)}>
              <User className="w-4 h-4" /> Sign In
            </Link>
            <Link href="/account" className="py-1" onClick={() => setMobileMenuOpen(false)}>
              Orders
            </Link>
            <hr className="border-gray-600 my-1" />
            {['Electronics', 'Home & Kitchen', 'Clothing', 'Books', 'Beauty'].map(
              (cat) => (
                <Link
                  key={cat}
                  href={`/?category=${encodeURIComponent(cat)}`}
                  className="py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
