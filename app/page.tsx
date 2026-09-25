import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import ProductCarousel from '@/components/ProductCarousel';
import type { Product } from '@/types';
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

  /* ── Filtered / search view ── */
  if (category || search) {
    return (
      <div className="max-w-[1500px] mx-auto px-4 py-8">
        {/* Category filter pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 hide-scrollbar">
          <Link
            href="/"
            className="shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/?category=${encodeURIComponent(cat)}`}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                category === cat
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 font-heading">
            {search ? `Results for "${search}"` : category}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
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
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <p className="text-gray-500 text-lg font-medium mb-1">No products found</p>
            <p className="text-gray-400 text-sm mb-6">Try a different search or browse categories</p>
            <Link href="/" className="btn-primary px-8 py-2.5">
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    );
  }

  /* ── Homepage ── */
  const keepShopping = products.filter((p) => p.category === 'Beauty' || p.category === 'Clothing').slice(0, 8);
  const bestSellers = products.filter((p) => p.category === 'Home & Kitchen' || p.category === 'Books').slice(0, 8);
  const deals = products.filter((p) => p.category === 'Electronics').slice(0, 8);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-[1500px] mx-auto px-4 pt-6 pb-12">

        {/* Hero banner section */}
        <BannerCarousel />

        {/* Category chips — quick filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 hide-scrollbar">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/?category=${encodeURIComponent(cat)}`}
              className="shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold bg-white border border-gray-200 text-gray-600 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors shadow-sm"
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Product carousels */}
        <ProductCarousel title="Beauty & Clothing Picks" products={keepShopping} category="Beauty" />
        <ProductCarousel title="Best Sellers in Home & Books" products={bestSellers} category="Home & Kitchen" />
        <ProductCarousel title="Electronics Deals" products={deals} category="Electronics" />

      </div>
    </div>
  );
}
