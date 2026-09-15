import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Package, User, MapPin, CreditCard, ChevronRight, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Account — Amazon.clone',
  description: 'Manage your account, track orders, and view your order history.',
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login?callbackUrl=/account');
  }

  const userId = session.user.id;

  const orders = userId
    ? await prisma.order.findMany({
        where: { userId },
        include: {
          orderItems: {
            include: { product: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      })
    : [];

  const firstName = session.user.name?.split(' ')[0] ?? 'there';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F1111]">Your Account</h1>
        <p className="text-gray-500 mt-1">Hello, {firstName}. Welcome back.</p>
      </div>

      {/* Account tiles */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <AccountTile
          icon={<Package className="w-6 h-6 text-[#FF9900]" />}
          title="Your Orders"
          description="Track, return, or buy again"
          href="#orders"
        />
        <AccountTile
          icon={<User className="w-6 h-6 text-[#FF9900]" />}
          title="Login & Security"
          description="Edit login, name, and mobile number"
          href="#"
        />
        <AccountTile
          icon={<MapPin className="w-6 h-6 text-[#FF9900]" />}
          title="Your Addresses"
          description="Edit addresses for orders and gifts"
          href="#"
        />
        <AccountTile
          icon={<CreditCard className="w-6 h-6 text-[#FF9900]" />}
          title="Payment Methods"
          description="Edit or add your payment methods"
          href="#"
        />
        <AccountTile
          icon={<ShoppingBag className="w-6 h-6 text-[#FF9900]" />}
          title="Start Shopping"
          description="Browse thousands of products"
          href="/"
        />
      </div>

      {/* Orders section */}
      <section id="orders">
        <h2 className="text-2xl font-bold text-[#0F1111] mb-4">Your Orders</h2>

        {orders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">No orders yet</p>
            <p className="text-sm text-gray-500 mb-6">Looks like you haven&apos;t placed any orders.</p>
            <Link
              href="/"
              className="inline-block py-2.5 px-8 bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-lg text-sm font-medium text-[#0F1111] transition-colors"
              id="start-shopping-button"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const placedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <div
                  key={order.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  {/* Order header */}
                  <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-medium">Order placed</p>
                        <p className="font-medium text-[#0F1111]">{placedDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-medium">Total</p>
                        <p className="font-medium text-[#0F1111]">{formatPrice(order.totalAmount)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-medium">Status</p>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                            order.status === 'COMPLETED'
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'CANCELLED'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      ORDER # <span className="font-mono">{order.id.slice(-8).toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Order items */}
                  <div className="px-5 py-4 divide-y divide-gray-100">
                    {order.orderItems.map((item) => (
                      <div key={item.id} className="flex gap-4 py-3">
                        <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded overflow-hidden shrink-0">
                          {item.product?.imageUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#0F1111] line-clamp-2">
                            {item.product?.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                          <p className="text-sm font-bold text-[#B12704] mt-0.5">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                        {item.product && (
                          <div className="shrink-0">
                            <Link
                              href={`/product/${item.product.id}`}
                              className="text-xs text-[#007185] hover:text-[#C7511F] hover:underline"
                            >
                              Buy again
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Shipping address */}
                  <div className="border-t border-gray-100 px-5 py-3 bg-gray-50">
                    <p className="text-xs text-gray-500">
                      <span className="font-medium text-gray-700">Shipped to:</span>{' '}
                      {order.shippingAddress.replace(/\n/g, ', ')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function AccountTile({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-lg hover:border-[#FF9900] hover:shadow-sm transition-all"
    >
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-[#0F1111] group-hover:text-[#C7511F] transition-colors">
          {title}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 self-center group-hover:text-[#FF9900] transition-colors" />
    </Link>
  );
}
