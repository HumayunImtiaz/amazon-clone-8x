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
      <div className="flex items-center justify-between mb-5 px-1">
        <h2 className="text-xl font-bold text-gray-900 font-heading">{title}</h2>
        {category && (
          <Link
            href={`/?category=${encodeURIComponent(category)}`}
            className="text-sm font-semibold text-indigo-500 hover:text-indigo-700 flex items-center gap-0.5 transition-colors"
          >
            Shop all <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory hide-scrollbar">
        {products.map((product) => (
          <div key={product.id} className="min-w-[170px] sm:min-w-[210px] max-w-[210px] shrink-0 snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
