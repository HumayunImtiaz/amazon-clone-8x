'use client';

import { useRef } from 'react';
import { Star, Truck } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import AddToCartButton from '@/components/AddToCartButton';
import ProductImageMagnifier from '@/components/ProductImageMagnifier';
import type { Product } from '@/types';

interface Props {
  product: Product;
}

export default function ProductDetailLayout({ product }: Props) {
  const infoColRef = useRef<HTMLDivElement>(null);

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {/* Product Image */}
      <div className="bg-white rounded-2xl p-6 flex items-center justify-center border border-gray-100 shadow-card relative">
        <ProductImageMagnifier
          src={product.imageUrl}
          alt={product.title}
          infoColRef={infoColRef}
        />
      </div>

      {/* Product Info */}
      <div ref={infoColRef} className="space-y-4">
        {/* Category chip */}
        <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-indigo-100">
          {product.category}
        </span>

        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading leading-tight">
          {product.title}
        </h1>

        {/* Mock rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
              />
            ))}
          </div>
          <span className="text-sm text-indigo-500 hover:text-indigo-700 cursor-pointer font-medium">
            1,247 ratings
          </span>
        </div>

        <div className="h-px bg-gray-100" />

        {/* Price */}
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-indigo-600">
              {formatPrice(product.price)}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">& FREE Returns</p>
        </div>

        {/* In stock */}
        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-sm font-semibold px-3 py-1.5 rounded-full border border-emerald-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          In Stock
        </span>

        {/* Delivery */}
        <div className="flex items-center gap-3 bg-indigo-50 rounded-xl px-4 py-3 border border-indigo-100">
          <Truck className="w-5 h-5 text-indigo-500 shrink-0" />
          <div>
            <span className="text-sm font-bold text-indigo-700">FREE delivery </span>
            <span className="text-sm font-bold text-gray-800">Tomorrow</span>
            <p className="text-xs text-gray-500 mt-0.5">Order within 2 hrs 14 mins</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="font-bold text-sm mb-2 text-gray-800 uppercase tracking-wide">About this item</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Add to Cart panel */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5 max-w-xs">
          <p className="text-2xl font-bold text-indigo-600 mb-1">
            {formatPrice(product.price)}
          </p>
          <span className="inline-flex items-center gap-1.5 text-emerald-700 text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            In Stock
          </span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
