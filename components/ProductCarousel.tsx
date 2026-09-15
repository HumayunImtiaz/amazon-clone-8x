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
    <div className="bg-white p-4 mb-4 border-t border-gray-100">
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-xl font-bold text-[#0F1111]">{title}</h2>
        {category && (
          <Link href={`/?category=${encodeURIComponent(category)}`} className="text-[#007185] hover:text-[#C7511F] hover:underline text-sm font-semibold flex items-center">
            Shop more <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
        {products.map((product) => (
          <div key={product.id} className="min-w-[160px] sm:min-w-[200px] max-w-[200px] shrink-0 snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
