import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const getCategoryGradient = (category: string) => {
  switch (category.toLowerCase()) {
    case 'electronics':
      return 'from-slate-400 to-gray-500';
    case 'clothing':
      return 'from-indigo-400 to-purple-500';
    case 'books':
      return 'from-amber-400 to-orange-500';
    case 'home & kitchen':
      return 'from-emerald-400 to-teal-500';
    case 'beauty':
      return 'from-rose-400 to-pink-500';
    default:
      return 'from-gray-300 to-gray-400';
  }
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group bg-white rounded-2xl border border-transparent shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col transition-all duration-300 relative"
      id={`product-card-${product.id}`}
    >
      {/* Top Gradient Edge */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-80 group-hover:opacity-100 transition-opacity ${getCategoryGradient(product.category)}`} />

      {/* Image container */}
      <div className="relative aspect-[4/5] bg-gray-50/50 overflow-hidden px-4 pt-6 pb-2">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-contain mix-blend-multiply p-4 group-hover:scale-[1.03] transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 border-t border-gray-50/50">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">
          {product.category}
        </span>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-relaxed">
          {product.title}
        </h3>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-base font-extrabold text-gray-900 tracking-tight">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="text-[11px] text-gray-500 mt-2 font-medium flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          Free express shipping
        </p>
      </div>
    </Link>
  );
}
