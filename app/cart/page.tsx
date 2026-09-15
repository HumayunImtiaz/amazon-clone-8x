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
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-[#0F1111] mb-2">
          Your Amazon.clone Cart is empty
        </h1>
        <p className="text-gray-500 mb-6">
          Your shopping cart is waiting. Give it purpose — fill it with groceries,
          clothing, household supplies, electronics, and more.
        </p>
        <Link
          href="/"
          className="inline-block btn-amazon px-8 py-3 text-base"
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
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        {/* Cart items */}
        <div className="bg-white rounded-lg border p-6">
          <h1 className="text-2xl font-bold text-[#0F1111] mb-1">Shopping Cart</h1>
          <p className="text-sm text-gray-500 text-right mb-2">Price</p>
          <hr className="mb-4" />

          <div className="divide-y">
            {items.map((item) => (
              <div
                key={item.id}
                className="py-4 flex gap-4"
                id={`cart-item-${item.id}`}
              >
                {/* Image */}
                <Link href={`/product/${item.id}`} className="shrink-0">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.id}`}
                    className="text-sm sm:text-base font-medium text-[#0F1111] hover:text-[#C7511F] line-clamp-2"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-[#007600] mt-1">In Stock</p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1.5 hover:bg-gray-100 text-gray-600 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1.5 text-sm font-medium border-x border-gray-300 bg-gray-50 min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1.5 hover:bg-gray-100 text-gray-600 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-gray-300">|</span>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline flex items-center gap-1"
                      aria-label="Delete item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right shrink-0">
                  <span className="font-bold text-[#0F1111]">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <hr className="mt-4" />
          <div className="text-right pt-4">
            <span className="text-lg">
              Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}):{' '}
              <span className="font-bold">{formatPrice(subtotal)}</span>
            </span>
          </div>
        </div>

        {/* Checkout panel */}
        <div className="lg:self-start">
          <div className="bg-white border rounded-lg p-5 sticky top-20">
            <p className="text-sm text-[#007600] mb-3 flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-[#007600] rounded-full"></span>
              Your order qualifies for FREE Shipping
            </p>
            <p className="text-lg mb-4">
              Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}):{' '}
              <span className="font-bold">{formatPrice(subtotal)}</span>
            </p>
            <button
              onClick={handleCheckout}
              className="block w-full text-center btn-amazon py-3"
              id="proceed-to-checkout"
            >
              Proceed to Checkout
            </button>
            {!session?.user && (
              <p className="mt-2 text-xs text-center text-gray-500">
                You&apos;ll be asked to sign in
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
