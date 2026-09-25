'use client';

import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BANNERS = [
  {
    href: '/?category=Clothing',
    heading: 'The Fall Edit',
    sub: 'Shop premium brands',
    gradient: 'from-indigo-600 via-indigo-700 to-purple-700',
    imgSrc: '/banner1.jpg',
    imgAlt: 'Fall Edit',
    width: 'w-[85vw] sm:w-[520px] lg:w-[600px]',
  },
  {
    href: '/?category=Clothing',
    heading: 'Stay Active',
    sub: 'New sportswear arrivals',
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    imgSrc: '/banner2.jpg',
    imgAlt: 'Activewear',
    width: 'w-[85vw] sm:w-[340px] lg:w-[370px]',
  },
  {
    href: '/?category=Home%20%26%20Kitchen',
    heading: 'Everyday Essentials',
    sub: 'Great prices under $20',
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    imgSrc: '/banner3.jpg',
    imgAlt: 'Essentials',
    width: 'w-[85vw] sm:w-[280px] lg:w-[260px]',
  },
  {
    href: '/?category=Beauty',
    heading: 'Feel Your Best',
    sub: 'Beauty & wellness delivered',
    gradient: 'from-pink-500 via-rose-500 to-fuchsia-600',
    imgSrc: '/banner4.jpg',
    imgAlt: 'Beauty',
    width: 'w-[85vw] sm:w-[300px] lg:w-[310px]',
  },
];

export default function BannerCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: dir === 'right' ? 380 : -380, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeft(scrollLeft > 10);
      setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="relative group/carousel mb-10">
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pt-2 pb-4"
      >
        {BANNERS.map((banner) => (
          <Link
            key={banner.heading}
            href={banner.href}
            className={`snap-start shrink-0 ${banner.width} h-[400px] rounded-2xl flex flex-col overflow-hidden relative group shadow-md hover:shadow-xl transition-shadow duration-300`}
          >
            {/* Gradient header */}
            <div className={`bg-gradient-to-br ${banner.gradient} p-6 h-[170px] flex flex-col justify-center items-start text-left`}>
              <h2 className="text-2xl font-bold leading-tight text-white font-heading drop-shadow-sm">
                {banner.heading}
              </h2>
              <p className="text-sm font-medium text-white/80 mt-1">{banner.sub}</p>
              <span className="inline-flex items-center gap-1 mt-3 text-white text-xs font-semibold bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 w-max">
                Shop now <ChevronRight className="w-3 h-3" />
              </span>
            </div>
            {/* Image area */}
            <div className="flex-1 relative bg-white overflow-hidden">
              <Image
                src={banner.imgSrc}
                alt={banner.imgAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="600px"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Left arrow */}
      {showLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 shadow-lg border border-gray-100 rounded-full w-10 h-10 flex items-center justify-center z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-indigo-50 hover:border-indigo-200"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
      )}

      {/* Right arrow */}
      {showRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 shadow-lg border border-gray-100 rounded-full w-10 h-10 flex items-center justify-center z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-indigo-50 hover:border-indigo-200"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      )}
    </div>
  );
}
