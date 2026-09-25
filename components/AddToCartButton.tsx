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
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="space-y-3">
      {/* Quantity selector */}
      <div className="flex items-center gap-2">
        <label htmlFor="quantity-select" className="text-sm font-medium text-gray-600">
          Qty:
        </label>
        <select
          id="quantity-select"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all cursor-pointer"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAdd}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
          added
            ? 'bg-emerald-500 text-white scale-[0.99]'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-indigo'
        }`}
        id="add-to-cart-button"
      >
        {added ? (
          <>
            <Check className="w-4 h-4 animate-bounce-in" />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </>
        )}
      </button>

      {/* Buy Now */}
      <a
        href="/cart"
        onClick={handleAdd}
        className="block w-full text-center py-3 rounded-xl text-sm font-semibold border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        id="buy-now-button"
      >
        Buy Now
      </a>
    </div>
  );
}
