import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import ProductCarousel from '@/components/ProductCarousel';
import type { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import BannerCarousel from '@/components/BannerCarousel';

export const dynamic = 'force-dynamic';

interface HomeProps {
  searchParams: { category?: string; search?: string };
}

export default async function HomePage({ searchParams }: HomeProps) {
  const category = searchParams.category;
  const search = searchParams.search;

  const products = (await prisma.product.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(search ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } },
        ],
      } : {}),
    },
    orderBy: { createdAt: 'desc' },
  })) as Product[];

  const categories = await prisma.product
    .findMany({
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    })
    .then((rows) => rows.map((r) => r.category));

  if (category || search) {
    return (
      <div className="max-w-[1500px] mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 hide-scrollbar">
          <Link
            href="/"
            className="shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/?category=${encodeURIComponent(cat)}`}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${category === cat
                  ? 'bg-[#131921] text-white border-[#131921]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
            >
              {cat}
            </Link>
          ))}
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-[#0F1111]">
            {search ? `Results for "${search}"` : `Results for "${category}"`}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {products.length} {products.length === 1 ? 'result' : 'results'}
          </p>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found for this search.</p>
          </div>
        )}
      </div>
    );
  }

  // Group products for carousels
  const keepShopping = products.filter((p) => p.category === 'Beauty' || p.category === 'Clothing').slice(0, 8);
  const bestSellers = products.filter((p) => p.category === 'Home & Kitchen' || p.category === 'Books').slice(0, 8);
  const deals = products.filter((p) => p.category === 'Electronics').slice(0, 8);

  return (
    <div className="bg-[#EAEDED] min-h-screen">
      {/* Background bleed for hero section */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-[#232F3E] to-[#EAEDED] -z-10 hidden sm:block"></div>

      <div className="max-w-[1500px] mx-auto px-4 z-10 relative pt-4 pb-8">

        {/* Horizontal Banners List */}
        <BannerCarousel />

        {/* Categories / Sign in Banner below hero images if not logged in */}
        {/* Carousels */}
        <ProductCarousel title="Keep shopping for Beauty & Clothing" products={keepShopping} category="Beauty" />
        <ProductCarousel title="Best Sellers in Home & Books" products={bestSellers} category="Home & Kitchen" />
        <ProductCarousel title="Deals on Electronics" products={deals} category="Electronics" />

      </div>
    </div>
  );
}
