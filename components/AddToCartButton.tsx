'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import type { Product } from '@/types';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-3">
      {/* Quantity selector */}
      <div className="flex items-center gap-2">
        <label htmlFor="quantity-select" className="text-sm font-medium text-gray-700">
          Qty:
        </label>
        <select
          id="quantity-select"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAdd}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
          added
            ? 'bg-green-600 text-white'
            : 'bg-gradient-to-b from-[#FFD814] to-[#F7CA00] border border-[#FCD200] text-[#0F1111] hover:from-[#F7CA00] hover:to-[#E7A100]'
        }`}
        id="add-to-cart-button"
      >
        {added ? (
          <>
            <Check className="w-5 h-5" /> Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </>
        )}
      </button>

      {/* Buy Now */}
      <a
        href="/cart"
        onClick={handleAdd}
        className="block w-full text-center py-3 rounded-full text-sm font-medium bg-gradient-to-b from-[#FFA41C] to-[#FF8F00] border border-[#FF8F00] text-white hover:from-[#FA8900] hover:to-[#E47911] transition-all duration-200 active:scale-[0.98]"
        id="buy-now-button"
      >
        Buy Now
      </a>
    </div>
  );
}
