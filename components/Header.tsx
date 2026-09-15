'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import CheckoutHeader from './CheckoutHeader';
import { useEffect } from 'react';

export default function Header() {
  const itemCount = useCartStore((s) => s.getItemCount());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDrawerOpen, setDesktopDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(' ')[0] ?? 'Sign in';
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname.startsWith('/checkout')) {
    return <CheckoutHeader />;
  }

  return (
    <header className="bg-[#131921] text-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-2 lg:gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0 border border-transparent hover:border-white rounded px-2 py-1 pt-2 pb-1 bg-transparent"
          aria-label="Amazon.clone home"
        >
          <div className="flex flex-col items-start gap-0">
            <span
              className="text-xl font-bold tracking-tight text-white leading-none"
              style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.5px' }}
            >
              amazon<span className="text-[#FF9900] text-[10px] font-sans ml-0.5">.clone</span>
            </span>
            {/* Orange smile arc */}
            <svg width="60" height="8" viewBox="0 0 80 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="-mt-0.5 ml-1">
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
              {mounted && (
                <span className="absolute -top-2 -right-1 bg-[#F08804] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
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
      <nav className="bg-[#232F3E] px-4 py-1 hidden sm:block">
        <ul className="flex items-center gap-1 text-sm overflow-x-auto">
          <li key="All" className="flex items-center">
            <button
              onClick={() => setDesktopDrawerOpen(true)}
              className="border border-transparent hover:border-white rounded px-2 py-1 flex items-center gap-1 font-bold whitespace-nowrap focus:outline-none font-sans"
            >
              <Menu className="w-5 h-5 -ml-1" />
              All
            </button>
          </li>
          {['Electronics', 'Home & Kitchen', 'Clothing', 'Books', 'Beauty'].map(
            (cat) => (
              <li key={cat}>
                <Link
                  href={`/?category=${encodeURIComponent(cat)}`}
                  className="border border-transparent hover:border-white rounded px-2 py-1 whitespace-nowrap block font-sans"
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
      
      {/* Desktop Drawer */}
      {desktopDrawerOpen && (
        <div className="fixed inset-0 z-[9999] flex text-black" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/70 drawer-overlay-fade" 
            onClick={() => setDesktopDrawerOpen(false)}
          ></div>
          
          {/* Drawer */}
          <div className="relative w-[365px] bg-white h-full shadow-xl flex flex-col z-10 text-[#111] drawer-slide-in">
            <button 
              onClick={() => setDesktopDrawerOpen(false)}
              className="absolute top-4 -right-[50px] text-white hover:text-gray-200 transition-colors focus:outline-none z-50 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-[#232F3E] text-white flex items-center gap-2 px-9 pt-7 pb-4 shrink-0 rounded-tr-[2px]">
              <User className="w-7 h-7 bg-white text-[#232F3E] rounded-full p-1 border-2 border-transparent" />
              <span className="font-bold text-[19px] font-sans tracking-wide">Hello, {firstName}</span>
            </div>
            
            <div className="flex-1 overflow-y-auto pb-10 font-sans bg-white relative">
              <div className="pt-2">
                <h3 className="text-[18px] font-bold px-9 pt-3 pb-1 text-gray-900 tracking-wide">Trending</h3>
                <ul>
                  <li><Link onClick={() => setDesktopDrawerOpen(false)} href="#" className="block px-9 py-3 text-[14px] text-gray-700 hover:bg-gray-100">Best Sellers</Link></li>
                  <li><Link onClick={() => setDesktopDrawerOpen(false)} href="#" className="block px-9 py-3 text-[14px] text-gray-700 hover:bg-gray-100">New Releases</Link></li>
                  <li><Link onClick={() => setDesktopDrawerOpen(false)} href="#" className="block px-9 py-3 text-[14px] text-gray-700 hover:bg-gray-100">Grocery</Link></li>
                </ul>
              </div>
              <hr className="my-2 border-gray-300 mx-1" />

              <div>
                <h3 className="text-[18px] font-bold px-9 pt-4 pb-1 text-gray-900 tracking-wide">Digital Content & Devices</h3>
                <ul>
                  <li><Link onClick={() => setDesktopDrawerOpen(false)} href="#" className="flex justify-between items-center px-9 py-3 text-[14px] text-gray-700 hover:bg-gray-100">Prime Video <span className="text-gray-400 font-light text-2xl leading-none">›</span></Link></li>
                  <li><Link onClick={() => setDesktopDrawerOpen(false)} href="#" className="flex justify-between items-center px-9 py-3 text-[14px] text-gray-700 hover:bg-gray-100">Amazon Music <span className="text-gray-400 font-light text-2xl leading-none">›</span></Link></li>
                  <li><Link onClick={() => setDesktopDrawerOpen(false)} href="#" className="flex justify-between items-center px-9 py-3 text-[14px] text-gray-700 hover:bg-gray-100">Echo & Alexa <span className="text-gray-400 font-light text-2xl leading-none">›</span></Link></li>
                </ul>
              </div>
              <hr className="my-2 border-gray-300 mx-1" />

              <div>
                <h3 className="text-[18px] font-bold px-9 pt-4 pb-1 text-gray-900 tracking-wide">Shop by Department</h3>
                <ul>
                  {['Electronics', 'Home & Kitchen', 'Clothing', 'Books', 'Beauty'].map(cat => (
                    <li key={cat}>
                      <Link 
                        onClick={() => setDesktopDrawerOpen(false)}
                        href={`/?category=${encodeURIComponent(cat)}`} 
                        className="flex justify-between items-center px-9 py-3 text-[14px] text-gray-700 hover:bg-gray-100"
                      >
                        {cat} <span className="text-gray-400 font-light text-2xl leading-none">›</span>
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
