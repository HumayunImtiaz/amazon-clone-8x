'use client';

import { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
}

export default function ProductImageMagnifier({ src, alt }: Props) {
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate percentage based on mouse position
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    // Clamp values between 0 and 100 to prevent edge glitching
    setZoomPos({ 
      x: Math.max(0, Math.min(100, x)), 
      y: Math.max(0, Math.min(100, y)) 
    });
  };

  return (
    <div className="relative w-full z-20">
      {/* Main Image Container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-square max-w-md mx-auto cursor-crosshair bg-white"
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Magnified Output (Renders to the right) */}
      {showZoom && (
        <div className="absolute top-0 left-full ml-4 w-[500px] h-[500px] bg-white border border-gray-300 shadow-2xl hidden lg:block overflow-hidden pointer-events-none z-50">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${src})`,
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              backgroundSize: '250%', // 2.5x Zoom
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
      )}
    </div>
  );
}
