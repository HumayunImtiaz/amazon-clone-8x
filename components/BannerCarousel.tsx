'use client';

import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BannerCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      // Scroll by roughly the width of one small banner
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/carousel">
      {/* Horizontal Banners List */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pt-2 pb-4 mb-2"
      >
        {/* Banner 1 */}
        <Link href="/?category=Clothing" className="snap-start shrink-0 w-[85vw] sm:w-[520px] lg:w-[600px] h-[400px] bg-white rounded flex flex-col overflow-hidden relative group hover:shadow-lg transition-shadow">
          <div className="bg-[#F2E5D5] p-5 h-[160px] flex flex-col justify-between">
            <h2 className="text-[22px] font-bold leading-tight text-gray-900">The fall edit</h2>
            <p className="text-[15px] font-medium text-gray-800">Shop premium brands</p>
          </div>
          <div className="flex-1 relative bg-white flex justify-center items-end pb-4">
            <Image src="/banner1.jpg" alt="Fall Edit" fill className="object-cover" sizes="490px" />
          </div>
        </Link>

        {/* Banner 2 */}
        <Link href="/?category=Clothing" className="snap-start shrink-0 w-[85vw] sm:w-[340px] lg:w-[370px] h-[400px] bg-white rounded flex flex-col overflow-hidden relative group hover:shadow-lg transition-shadow">
          <div className="bg-[#1C3E61] p-5 h-[160px] flex flex-col justify-between">
            <h2 className="text-[22px] font-bold leading-tight text-white">Stay active with Nike</h2>
            <p className="text-[15px] font-medium text-blue-100">New sportswear</p>
          </div>
          <div className="flex-1 relative bg-white flex justify-center items-end pb-4">
            <Image src="/banner2.jpg" alt="Nike" fill className="object-cover" sizes="340px" />
          </div>
        </Link>

        {/* Banner 3 */}
        <Link href="/?category=Home%20%26%20Kitchen" className="snap-start shrink-0 w-[85vw] sm:w-[280px] lg:w-[260px] h-[400px] bg-white rounded flex flex-col overflow-hidden relative group hover:shadow-lg transition-shadow">
          <div className="bg-[#FF8F00] p-5 h-[160px] flex flex-col justify-between">
            <h2 className="text-[22px] font-bold leading-tight text-white">Low prices on essentials</h2>
            <p className="text-[15px] font-medium text-orange-50">Shop everyday staples under $20</p>
          </div>
          <div className="flex-1 relative bg-white flex justify-center items-end pb-4">
            <Image src="/banner3.jpg" alt="Essentials" fill className="object-cover" sizes="290px" />
          </div>
        </Link>

        {/* Banner 4 */}
        <Link href="/?category=Beauty" className="snap-start shrink-0 w-[85vw] sm:w-[300px] lg:w-[310px] h-[400px] bg-white rounded flex flex-col overflow-hidden relative group hover:shadow-lg transition-shadow">
          <div className="bg-[#E4F2F1] p-5 h-[160px] flex flex-col justify-between">
            <h2 className="text-[22px] font-bold leading-tight text-teal-900">Focus on your health</h2>
            <p className="text-[15px] font-medium text-teal-700">Get meds to your door</p>
          </div>
          <div className="flex-1 relative bg-white flex justify-center items-end pb-4">
            <Image src="/banner4.jpg" alt="Pharmacy" fill className="object-cover" sizes="310px" />
          </div>
        </Link>
      </div>

      <button 
        onClick={scrollRight}
        className="absolute right-0 top-[200px] -translate-y-1/2 bg-white/90 shadow-[0_2px_15px_rgba(0,0,0,0.15)] outline-1 outline-gray-200 outline border-t-0 border-b-0 border-r-0 border shadow-md rounded-l-md w-[45px] h-[90px] flex items-center justify-center opacity-100 transition-opacity z-10 hover:bg-white text-black"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-8 h-8 opacity-70" strokeWidth={1} />
      </button>
    </div>
  );
}
