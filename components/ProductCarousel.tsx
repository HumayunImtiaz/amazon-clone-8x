import ProductCard from './ProductCard';
import { Product } from '@/types';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ProductCarouselProps {
  title: string;
  category?: string;
  products: Product[];
}

export default function ProductCarousel({ title, category, products }: ProductCarouselProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mb-10">
      {/* Section header */}
      <div className="flex items-end justify-between mb-8 px-1">
        <div>
          <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-[0.2em] mb-2 block">
            {category ? `Curated ${category}` : 'Featured Collection'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-heading tracking-tight">{title}</h2>
        </div>
        {category && (
          <Link
            href={`/?category=${encodeURIComponent(category)}`}
            className="text-sm font-bold text-gray-400 hover:text-indigo-600 flex items-center gap-1 transition-colors group mb-1"
          >
            View all <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {/* Horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
        {products.map((product) => (
          <div key={product.id} className="min-w-[170px] sm:min-w-[210px] max-w-[210px] shrink-0 snap-start">
            <ProductCard product={product} />
          </div>
        ))}
        {/* Sponsored Card Placeholder */}
        {products.length < 6 && (
          <div className="min-w-[356px] sm:min-w-[436px] max-w-[436px] shrink-0 snap-start">
            <div className="h-full bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-2xl border border-indigo-100/60 shadow-sm hover:shadow-md hover:-translate-y-1 overflow-hidden flex flex-col transition-all duration-300 relative p-6 cursor-pointer group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-300 to-purple-400 opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="mb-4">
                <span className="inline-block bg-white/80 backdrop-blur-sm border border-indigo-100 text-indigo-700 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                  Sponsored
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center text-center mt-2">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
                  <span className="text-xl">✨</span>
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1 leading-tight group-hover:text-indigo-600 transition-colors">
                  Grow Your Brand
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Showcase your products to millions of shoppers.
                </p>
              </div>
              <div className="mt-6 text-center">
                <span className="text-[11px] font-bold text-indigo-600 opacity-80 group-hover:opacity-100">
                  Learn more &rarr;
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
