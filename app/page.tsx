import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types';

interface HomeProps {
  searchParams: { category?: string };
}

export default async function HomePage({ searchParams }: HomeProps) {
  const category = searchParams.category;

  const products = (await prisma.product.findMany({
    where: category ? { category } : undefined,
    orderBy: { createdAt: 'desc' },
  })) as Product[];

  const categories = await prisma.product
    .findMany({
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    })
    .then((rows) => rows.map((r) => r.category));

  return (
    <div>
      {/* Hero banner */}
      <div className="relative bg-gradient-to-b from-[#232F3E] to-[#EAEDED] h-40 sm:h-56 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
            Welcome to Amazon.clone
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Shop deals in every department
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Category filter pills */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <a
            href="/"
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              !category
                ? 'bg-[#131921] text-white border-[#131921]'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            All
          </a>
          {categories.map((cat) => (
            <a
              key={cat}
              href={`/?category=${encodeURIComponent(cat)}`}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                category === cat
                  ? 'bg-[#131921] text-white border-[#131921]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {cat}
            </a>
          ))}
        </div>

        {/* Results heading */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-[#0F1111]">
            {category ? `Results for "${category}"` : 'Featured Products'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {products.length} {products.length === 1 ? 'result' : 'results'}
          </p>
        </div>

        {/* Product grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
            <a href="/" className="text-[#007185] hover:underline text-sm mt-2 inline-block">
              View all products
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
