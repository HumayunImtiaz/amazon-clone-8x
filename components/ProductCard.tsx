import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden flex flex-col card-hover"
      id={`product-card-${product.id}`}
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-contain mix-blend-multiply p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Category badge */}
        <span className="absolute top-2.5 left-2.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-indigo-100">
          {product.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-3.5 flex flex-col flex-1">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
          {product.title}
        </h3>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-base font-bold text-indigo-600">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="text-xs text-emerald-600 mt-1.5 font-medium flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Free shipping
        </p>
      </div>
    </Link>
  );
}
