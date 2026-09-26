'use client';

import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BANNERS = [
  {
    href: '/?category=Clothing',
    heading: 'The Fall Edit',
    sub: 'Shop premium brands & styles',
    gradient: 'from-indigo-600 via-indigo-700 to-purple-800',
    imgSrc: '/fall-edit-hero.png',
    imgAlt: 'Fall Edit',
    videoUrl: 'https://videos.pexels.com/video-files/8195083/8195083-uhd_2560_1440_25fps.mp4',
  },
  {
    href: '/?category=Electronics',
    heading: 'Tech Gadgets',
    sub: 'Upgrade your workspace',
    gradient: 'from-slate-700 via-slate-800 to-gray-900',
    imgSrc: '/banner2.jpg',
    imgAlt: 'Tech Gadgets',
  },
  {
    href: '/?category=Home%20%26%20Kitchen',
    heading: 'Home Essentials',
    sub: 'Under $20',
    gradient: 'from-emerald-600 to-teal-700',
    imgSrc: '/banner3.jpg',
    imgAlt: 'Essentials',
  },
  {
    href: '/?category=Beauty',
    heading: 'Feel Your Best',
    sub: 'Wellness delivered',
    gradient: 'from-rose-500 to-pink-600',
    imgSrc: '/banner4.jpg',
    imgAlt: 'Beauty',
  },
  {
    href: '/?category=Books',
    heading: 'Top Reads',
    sub: 'Bestselling books',
    gradient: 'from-amber-600 to-orange-600',
    imgSrc: '/banner1.jpg',
    imgAlt: 'Books',
  },
];

export default function BannerCarousel() {
  const featuredBanner = BANNERS[0];
  const gridBanners = BANNERS.slice(1);
  
  // Mobile horizontal scroll logic
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
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
    <div className="mb-14">
      {/* Desktop Grid Layout (hidden on mobile, shown on lg screens) */}
      <div className="hidden lg:grid grid-cols-12 gap-5 h-[560px]">
        {/* Featured 60% Width */}
        <Link
          href={featuredBanner.href}
          className="col-span-12 lg:col-span-7 xl:col-span-8 rounded-2xl flex flex-col overflow-hidden relative group shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 bg-white"
        >
          <div className={`bg-gradient-to-br ${featuredBanner.gradient} p-10 h-[220px] xl:h-[240px] flex flex-col justify-center items-start text-left shrink-0`}>
            <h2 className="text-4xl font-bold leading-tight text-white font-heading tracking-tight drop-shadow-sm mb-2">
              {featuredBanner.heading}
            </h2>
            <p className="text-lg font-medium text-white/90">{featuredBanner.sub}</p>
            <span className="inline-flex items-center gap-1.5 mt-6 text-white text-sm font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full px-5 py-2 transition-colors w-max">
              Explore Collection <ChevronRight className="w-4 h-4" />
            </span>
          </div>
          <div className="flex-1 relative bg-gray-50 overflow-hidden mix-blend-multiply">
            {featuredBanner.videoUrl ? (
              <video
                src={featuredBanner.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={featuredBanner.imgSrc}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <Image
                src={featuredBanner.imgSrc}
                alt={featuredBanner.imgAlt}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1200px) 60vw, 800px"
              />
            )}
          </div>
        </Link>
        
        {/* 2x2 Stack 40% Width */}
        <div className="col-span-12 lg:col-span-5 xl:col-span-4 grid grid-cols-2 gap-5">
          {gridBanners.map((banner) => (
            <Link
              key={banner.heading}
              href={banner.href}
              className="rounded-2xl flex flex-col overflow-hidden relative group shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 bg-white"
            >
              <div className={`bg-gradient-to-br ${banner.gradient} p-4 h-[110px] flex flex-col justify-center shrink-0`}>
                <h3 className="text-base font-bold leading-tight text-white font-heading">
                  {banner.heading}
                </h3>
                <p className="text-xs text-white/80 mt-1 line-clamp-1">{banner.sub}</p>
              </div>
              <div className="flex-1 relative overflow-hidden bg-gray-50 mix-blend-multiply">
                <Image
                  src={banner.imgSrc}
                  alt={banner.imgAlt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="250px"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Horizontal Carousel (shown on small screens) */}
      <div className="lg:hidden relative group/carousel -mx-4 px-4 sm:mx-0 sm:px-0 mt-4">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-6 pt-2"
        >
          {BANNERS.map((banner) => (
            <Link
              key={banner.heading}
              href={banner.href}
              className="snap-start shrink-0 w-[85vw] sm:w-[320px] h-[380px] rounded-2xl flex flex-col overflow-hidden relative group shadow-sm border border-gray-100 bg-white"
            >
              <div className={`bg-gradient-to-br ${banner.gradient} p-6 h-[160px] flex flex-col justify-center items-start text-left shrink-0`}>
                <h2 className="text-2xl font-bold leading-tight text-white font-heading">
                  {banner.heading}
                </h2>
                <p className="text-sm text-white/80 mt-1">{banner.sub}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-white text-xs font-semibold bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 w-max">
                  Shop now <ChevronRight className="w-3 h-3" />
                </span>
              </div>
              <div className="flex-1 relative overflow-hidden bg-gray-50 mix-blend-multiply">
                {banner.videoUrl ? (
                  <video
                    src={banner.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={banner.imgSrc}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <Image
                    src={banner.imgSrc}
                    alt={banner.imgAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 85vw, 320px"
                  />
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile controls */}
        {showLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-6 top-[45%] -translate-y-1/2 bg-white/95 shadow-lg border border-gray-100 rounded-full w-10 h-10 flex items-center justify-center z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
        {showRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-6 top-[45%] -translate-y-1/2 bg-white/95 shadow-lg border border-gray-100 rounded-full w-10 h-10 flex items-center justify-center z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
}
