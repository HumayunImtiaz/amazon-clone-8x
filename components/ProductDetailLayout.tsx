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
      <div className="bg-white rounded-lg p-4 flex items-center justify-center border relative">
        <ProductImageMagnifier
          src={product.imageUrl}
          alt={product.title}
          infoColRef={infoColRef}
        />
      </div>

      {/* Product Info */}
      <div ref={infoColRef}>
        <h1 className="text-xl lg:text-2xl font-medium text-[#0F1111] mb-2">
          {product.title}
        </h1>

        {/* Mock rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < 4 ? 'text-[#FFA41C] fill-[#FFA41C]' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-[#007185] hover:text-[#C7511F] cursor-pointer">
            1,247 ratings
          </span>
        </div>

        <hr className="my-3" />

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-gray-500">Price:</span>
            <span className="text-2xl font-medium text-[#B12704]">
              {formatPrice(product.price)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">&amp; FREE Returns</p>
        </div>

        {/* Delivery */}
        <div className="flex items-center gap-2 mb-4 text-sm">
          <Truck className="w-5 h-5 text-[#0F1111]" />
          <div>
            <span className="font-bold">FREE delivery</span>{' '}
            <span className="font-bold text-[#0F1111]">Tomorrow</span>
            <p className="text-gray-500 text-xs">Order within 2 hrs 14 mins</p>
          </div>
        </div>

        {/* Stock */}
        <p className="text-lg text-[#007600] font-medium mb-4">In Stock</p>

        {/* Description */}
        <div className="mb-6">
          <h2 className="font-bold text-sm mb-2 text-[#0F1111]">About this item</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Add to Cart area */}
        <div className="bg-white border rounded-lg p-4 max-w-xs">
          <p className="text-2xl font-medium text-[#B12704] mb-3">
            {formatPrice(product.price)}
          </p>
          <p className="text-lg text-[#007600] font-medium mb-4">In Stock</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
