'use client';

import React, { useState, useRef, useEffect, MouseEvent, RefObject } from 'react';
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  /** Ref to the right info column — zoom panel overlays it exactly */
  infoColRef?: RefObject<HTMLDivElement>;
}

export default function ProductImageMagnifier({ src, alt, infoColRef }: Props) {
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [panelRect, setPanelRect] = useState<{
    top: number; left: number; width: number; height: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure the info column position on mount, scroll, and resize
  useEffect(() => {
    const measure = () => {
      if (!infoColRef?.current) return;
      const r = infoColRef.current.getBoundingClientRect();
      setPanelRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true });
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
    };
  }, [infoColRef]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Keep panel rect accurate as user scrolls
    if (infoColRef?.current) {
      const r = infoColRef.current.getBoundingClientRect();
      setPanelRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    }

    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  };

  return (
    <div className="relative w-full">
      {/* Main Image */}
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

      {/* Zoom panel — fixed, covers the right info column exactly (Amazon style) */}
      {showZoom && panelRect && (
        <div
          className="hidden lg:block overflow-hidden pointer-events-none border border-gray-200 shadow-2xl bg-white"
          style={{
            position: 'fixed',
            top: panelRect.top,
            left: panelRect.left,
            width: panelRect.width,
            height: panelRect.height,
            zIndex: 200,
          }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${src})`,
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              backgroundSize: '250%',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
      )}
    </div>
  );
}
