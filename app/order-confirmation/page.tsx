import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Package, Zap } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmation — Lumino',
};

interface OrderConfirmationProps {
  searchParams: { orderId?: string };
}

export default async function OrderConfirmationPage({
  searchParams,
}: OrderConfirmationProps) {
  const orderId = searchParams.orderId;
  if (!orderId) notFound();

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: { product: true },
      },
    },
  });

  if (!order) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Success Hero */}
      <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center mb-8 shadow-card relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-emerald-50 rounded-full blur-2xl opacity-60 pointer-events-none" />
        
        <div className="relative z-10 w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Zap className="w-8 h-8 text-emerald-600 fill-emerald-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-3 font-heading">
          Order placed successfully!
        </h1>
        <p className="text-gray-600 mb-4 text-lg">
          Thank you for shopping with Lumino.
        </p>
        <div className="inline-block bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-500 font-mono">
          Order ID: {order.id.slice(0, 12).toUpperCase()}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Order Details */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card h-full">
          <h2 className="text-lg font-bold mb-5 flex items-center gap-2 font-heading text-gray-900 border-b border-gray-100 pb-3">
            <Package className="w-5 h-5 text-indigo-500" />
            Items Ordered
          </h2>

          <div className="divide-y divide-gray-100 mb-4">
            {order.orderItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-3">
                <div className="pr-4">
                  <p className="text-sm font-medium text-gray-800 line-clamp-1 mb-0.5">
                    {item.product?.title || 'Product'}
                  </p>
                  <p className="text-xs text-gray-500 bg-gray-100 inline-block px-2 py-0.5 rounded">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-bold text-gray-900 shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Total Charged</span>
              <span className="text-xl font-bold text-indigo-600">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Shipping details */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card h-full">
          <h2 className="text-lg font-bold mb-5 font-heading text-gray-900 border-b border-gray-100 pb-3">
            Shipping Information
          </h2>
          <p className="text-sm text-gray-700 leading-loose whitespace-pre-line bg-gray-50 p-4 rounded-xl border border-gray-100">
            {order.shippingAddress}
          </p>
          
          <div className="mt-6 pt-5 border-t border-gray-100 text-sm text-gray-500">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Standard Delivery
            </p>
            <p className="mt-1 ml-4">Estimated arrival: Tomorrow</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="btn-primary inline-flex px-10 py-3"
          id="back-to-shopping"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
