import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmation — Amazon.clone',
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
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white border rounded-lg p-8 text-center mb-8">
        <CheckCircle className="w-16 h-16 text-[#007600] mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-[#0F1111] mb-2">
          Order Placed, thank you!
        </h1>
        <p className="text-gray-600 mb-1">
          Confirmation will be sent to your email.
        </p>
        <p className="text-sm text-gray-500">
          Order #{order.id.slice(0, 8).toUpperCase()}
        </p>
      </div>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Order Details
        </h2>

        <div className="divide-y">
          {order.orderItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-3">
              <div>
                <p className="text-sm font-medium">
                  {item.product?.title || 'Product'}
                </p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <span className="text-sm font-bold">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-[#B12704]">{formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <h2 className="text-lg font-bold mb-2">Shipping Address</h2>
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {order.shippingAddress}
        </p>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="btn-amazon inline-block px-8 py-3 text-base"
          id="back-to-shopping"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
