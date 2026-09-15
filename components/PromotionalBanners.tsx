"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function PromotionalBanners() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      setShowLeftArrow(scrollLeft > 10);
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <div className="relative group mb-2">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Banner 1 */}
        <Link href="/?category=Clothing" className="snap-start shrink-0 w-[85vw] sm:w-[480px] lg:w-[500px] h-[400px] bg-white rounded flex flex-col overflow-hidden relative hover:shadow-lg transition-shadow">
          <div className="bg-[#F2E5D5] p-5 h-[160px] flex flex-col justify-between">
            <h2 className="text-[22px] font-bold leading-tight text-gray-900">The fall edit</h2>
            <p className="text-[15px] font-medium text-gray-800">Shop premium brands</p>
          </div>
          <div className="flex-1 relative bg-white flex justify-center items-end pb-4">
             <Image src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop" alt="Fall Edit" fill className="object-cover" sizes="500px" />
          </div>
        </Link>

        {/* Banner 2 */}
        <Link href="/?category=Electronics" className="snap-start shrink-0 w-[85vw] sm:w-[320px] lg:w-[320px] h-[400px] bg-white rounded flex flex-col overflow-hidden relative hover:shadow-lg transition-shadow">
          <div className="bg-[#FF8F00] p-5 h-[160px] flex flex-col justify-between">
            <h2 className="text-[22px] font-bold leading-tight text-white">Deals on Amazon Devices</h2>
            <p className="text-[15px] font-medium text-orange-50">Shop and save</p>
          </div>
          <div className="flex-1 relative bg-white flex justify-center items-end pb-4">
             <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop" alt="Tech Deals" fill className="object-cover" sizes="320px" />
          </div>
        </Link>

        {/* Banner 3 */}
        <Link href="/?category=Clothing" className="snap-start shrink-0 w-[85vw] sm:w-[320px] lg:w-[320px] h-[400px] bg-white rounded flex flex-col overflow-hidden relative hover:shadow-lg transition-shadow">
          <div className="bg-[#1C3E61] p-5 h-[160px] flex flex-col justify-between">
            <h2 className="text-[22px] font-bold leading-tight text-white">Stay active with Nike</h2>
            <p className="text-[15px] font-medium text-blue-100">New sportswear</p>
          </div>
          <div className="flex-1 relative bg-white flex justify-center items-end pb-4">
             <Image src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop" alt="Nike" fill className="object-cover" sizes="320px" />
          </div>
        </Link>

        {/* Banner 4 */}
        <Link href="/?category=Beauty" className="snap-start shrink-0 w-[85vw] sm:w-[310px] lg:w-[310px] h-[400px] bg-white rounded flex flex-col overflow-hidden relative hover:shadow-lg transition-shadow">
          <div className="bg-[#E4F2F1] p-5 h-[160px] flex flex-col justify-between">
            <h2 className="text-[22px] font-bold leading-tight text-teal-900">Focus on your health</h2>
            <p className="text-[15px] font-medium text-teal-700">Get meds to your door</p>
          </div>
          <div className="flex-1 relative bg-white flex justify-center items-end pb-4">
             <Image src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop" alt="Pharmacy" fill className="object-cover" sizes="310px" />
          </div>
        </Link>
        
        {/* Banner 5 */}
        <Link href="/?category=Home%20%26%20Kitchen" className="snap-start shrink-0 w-[85vw] sm:w-[280px] lg:w-[280px] h-[400px] bg-white rounded flex flex-col overflow-hidden relative hover:shadow-lg transition-shadow">
          <div className="bg-[#E53E3E] p-5 h-[160px] flex flex-col justify-between">
            <h2 className="text-[22px] font-bold leading-tight text-white">Small business gems</h2>
            <p className="text-[15px] font-medium text-red-100">Under $25</p>
          </div>
          <div className="flex-1 relative bg-white flex justify-center items-end pb-4">
             <Image src="https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?w=400&h=400&fit=crop" alt="Essentials" fill className="object-cover" sizes="280px" />
          </div>
        </Link>
      </div>

      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 
                     bg-white/80 hover:bg-white shadow-md border border-gray-200 
                     rounded-full p-2 text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 
                     bg-white/80 hover:bg-white shadow-md border border-gray-200 
                     rounded-full p-2 text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
