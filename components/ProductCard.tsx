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
      className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col"
      id={`product-card-${product.id}`}
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-[#C7511F] transition-colors">
          {product.title}
        </h3>
        <div className="mt-auto pt-2">
          <span className="text-lg font-bold text-[#0F1111]">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          FREE delivery <span className="font-bold">Tomorrow</span>
        </p>
      </div>
    </Link>
  );
}
