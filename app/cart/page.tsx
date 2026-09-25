'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/utils';
import { useSession } from 'next-auth/react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getItemCount } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  const handleCheckout = () => {
    if (!session?.user) {
      router.push('/login?callbackUrl=/checkout');
    } else {
      router.push('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-indigo-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3 font-heading">
          Your Lumino cart is empty
        </h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything yet. Discover our premium products and find what you're looking for.
        </p>
        <Link
          href="/"
          className="btn-primary"
          id="continue-shopping"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const itemCount = getItemCount();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-[1fr_340px] gap-8">
        {/* Cart items */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 md:p-8">
          <div className="flex items-end justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900 font-heading">Shopping Cart</h1>
            <span className="text-sm font-medium text-gray-500 hidden sm:block">Price</span>
          </div>
          <div className="h-px bg-gray-100 mb-6" />

          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <div
                key={item.id}
                className="py-6 flex gap-6"
                id={`cart-item-${item.id}`}
              >
                {/* Image */}
                <Link href={`/product/${item.id}`} className="shrink-0">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-contain p-2 mix-blend-multiply"
                      sizes="128px"
                    />
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.id}`}
                    className="text-base sm:text-lg font-bold text-gray-800 hover:text-indigo-600 line-clamp-2 transition-colors leading-tight mb-2"
                  >
                    {item.title}
                  </Link>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-md border border-emerald-100 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    In Stock
                  </span>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1.5 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1.5 text-sm font-bold border-x border-gray-200 bg-gray-50 min-w-[44px] text-center text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1.5 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="w-px h-6 bg-gray-200 hidden sm:block" />

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors font-medium group"
                      aria-label="Delete item"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right shrink-0 ml-auto">
                  <span className="text-lg font-bold text-indigo-600">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="h-px bg-gray-100 mt-2 mb-6" />
          <div className="text-right flex items-center justify-end gap-3 text-lg">
            <span className="text-gray-600">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}):</span>
            <span className="text-2xl font-bold text-gray-900">{formatPrice(subtotal)}</span>
          </div>
        </div>

        {/* Checkout panel */}
        <div className="lg:self-start">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-6 sticky top-24">
            <div className="flex items-start gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 mb-6">
              <span className="inline-flex w-5 h-5 bg-emerald-100 rounded-full items-center justify-center mt-0.5 shrink-0">
                <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
              </span>
              <p className="font-medium">Your order qualifies for <strong>FREE Shipping</strong></p>
            </div>
            
            <div className="flex flex-col mb-6">
              <span className="text-gray-500 text-sm mb-1">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
              <span className="text-3xl font-bold text-gray-900">{formatPrice(subtotal)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="btn-primary w-full py-3"
              id="proceed-to-checkout"
            >
              Proceed to Checkout
            </button>
            
            {!session?.user && (
              <p className="mt-4 text-xs text-center text-gray-500 font-medium">
                You&apos;ll be asked to sign in securely
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
