'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X, LogOut, Zap } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import CheckoutHeader from './CheckoutHeader';
import Image from 'next/image';

/** Lumino wordmark — indigo spark + bold text */
function LuminoLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const textClass = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-lg' : 'text-xl';
  return (
    <span className={`inline-flex items-center gap-1.5 font-heading font-bold tracking-tight ${textClass}`}>
      <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-600 rounded-md">
        <Zap className="w-3.5 h-3.5 text-white fill-white" />
      </span>
      <span className="text-gray-900">Lumino</span>
    </span>
  );
}

export default function Header() {
  const itemCount = useCartStore((s) => s.getItemCount());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDrawerOpen, setDesktopDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(' ')[0] ?? 'Sign in';
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [suggestions, setSuggestions] = useState<{ id: string; title: string; imageUrl: string }[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    const timer = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.products && data.products.length > 0) {
            setSuggestions(data.products);
            setShowDropdown(true);
          } else {
            setSuggestions([]);
            setShowDropdown(false);
          }
        })
        .catch((err) => console.error(err));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (pathname.startsWith('/checkout')) {
    return <CheckoutHeader />;
  }

  const CATEGORIES = ['Electronics', 'Home & Kitchen', 'Clothing', 'Books', 'Beauty'];

  return (
    <header
      className={`bg-white sticky top-0 z-50 transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : 'shadow-sm border-b border-gray-100'
      }`}
    >
      {/* ── Top bar ── */}
      <div className="flex items-center gap-3 px-4 py-3 lg:gap-4 max-w-[1600px] mx-auto">
        {/* Logo */}
        <Link href="/" aria-label="Lumino home" className="shrink-0">
          <LuminoLogo />
        </Link>

        {/* Search bar */}
        <div className="hidden sm:flex flex-1 max-w-2xl relative" ref={dropdownRef}>
          <form
            className="flex w-full"
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                setShowDropdown(false);
                router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
              }
            }}
          >
            <div className="flex w-full rounded-xl overflow-hidden border border-gray-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <input
                type="text"
                value={searchQuery}
                onFocus={() => { if (suggestions.length > 0) setShowDropdown(true); }}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Lumino..."
                className="flex-1 px-4 py-2.5 text-sm text-gray-900 bg-gray-50 focus:bg-white focus:outline-none transition-colors"
                id="search-input"
                autoComplete="off"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 px-4 flex items-center justify-center transition-colors"
                id="search-button"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </form>

          {/* Autocomplete Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden animate-slide-up">
              {suggestions.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={() => { setShowDropdown(false); setSearchQuery(''); }}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-indigo-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
                >
                  <div className="relative w-9 h-9 shrink-0 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
                    <Image src={product.imageUrl} alt={product.title} fill className="object-contain p-1" sizes="36px" />
                  </div>
                  <span className="text-sm font-medium line-clamp-2 flex-1 text-gray-800">{product.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right nav */}
        <div className="flex items-center gap-1 lg:gap-2 ml-auto">
          {session ? (
            <div className="hidden sm:flex items-center gap-1">
              <Link
                href="/account"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700 font-medium transition-colors"
                id="account-link"
              >
                <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="hidden lg:inline">{firstName}</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1.5 text-sm"
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
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700 font-medium transition-colors"
              id="account-link"
            >
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-500" />
              </div>
              <span className="hidden lg:inline">Sign in</span>
            </Link>
          )}

          <Link
            href="/account"
            className="hidden md:flex px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 font-medium transition-colors"
            id="orders-link"
          >
            Orders
          </Link>

          <Link
            href="/cart"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors relative"
            id="cart-link"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-medium text-sm text-gray-700">Cart</span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="sm:hidden p-2 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Category nav ── */}
      <nav className="hidden sm:block bg-indigo-600 px-4">
        <div className="max-w-[1600px] mx-auto">
          <ul className="flex items-center gap-0.5 text-sm overflow-x-auto hide-scrollbar py-1">
            <li>
              <button
                onClick={() => setDesktopDrawerOpen(true)}
                className="flex items-center gap-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg px-3 py-1.5 font-semibold whitespace-nowrap transition-colors focus:outline-none"
              >
                <Menu className="w-4 h-4" />
                All
              </button>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/?category=${encodeURIComponent(cat)}`}
                  className="block text-white/85 hover:text-white hover:bg-white/10 rounded-lg px-3 py-1.5 whitespace-nowrap transition-colors"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100 px-4 py-4 animate-slide-up">
          <form
            className="flex mb-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
                setMobileMenuOpen(false);
              }
            }}
          >
            <div className="flex w-full rounded-xl overflow-hidden border border-gray-200 focus-within:border-indigo-400 transition-all">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Lumino..."
                className="flex-1 px-4 py-2.5 text-sm text-gray-900 bg-gray-50 focus:outline-none"
              />
              <button type="submit" className="bg-indigo-600 px-4 flex items-center" aria-label="Search">
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </form>
          <div className="flex flex-col gap-1 text-sm">
            <Link href="/login" className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-indigo-50 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>
              <User className="w-4 h-4 text-indigo-500" /> Sign In
            </Link>
            <Link href="/account" className="px-3 py-2.5 rounded-lg hover:bg-indigo-50 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>
              Orders
            </Link>
            <div className="h-px bg-gray-100 my-1" />
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/?category=${encodeURIComponent(cat)}`}
                className="px-3 py-2.5 rounded-lg hover:bg-indigo-50 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Desktop Drawer ── */}
      {desktopDrawerOpen && (
        <div className="fixed inset-0 z-[9999] flex text-gray-900">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm drawer-overlay-fade"
            onClick={() => setDesktopDrawerOpen(false)}
          />

          {/* Drawer panel */}
          <div className="relative w-[340px] bg-white h-full shadow-2xl flex flex-col z-10 drawer-slide-in">
            <button
              onClick={() => setDesktopDrawerOpen(false)}
              className="absolute top-4 -right-12 text-white hover:text-gray-200 transition-colors z-50 bg-white/10 rounded-full p-1.5"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Drawer header */}
            <div className="bg-indigo-600 text-white flex items-center gap-3 px-6 pt-6 pb-5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg font-heading">Hello, {firstName}</span>
            </div>

            <div className="flex-1 overflow-y-auto pb-10 bg-white">
              <div className="pt-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 px-6 pt-4 pb-1">Trending</h3>
                <ul>
                  {['Best Sellers', 'New Releases', 'Grocery'].map((item) => (
                    <li key={item}>
                      <Link onClick={() => setDesktopDrawerOpen(false)} href="#" className="block px-6 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="h-px bg-gray-100 mx-4 my-2" />

              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 px-6 pt-4 pb-1">Shop by Department</h3>
                <ul>
                  {CATEGORIES.map((cat) => (
                    <li key={cat}>
                      <Link
                        onClick={() => setDesktopDrawerOpen(false)}
                        href={`/?category=${encodeURIComponent(cat)}`}
                        className="flex justify-between items-center px-6 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                      >
                        {cat}
                        <span className="text-gray-300 text-xl leading-none">›</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
