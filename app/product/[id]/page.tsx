import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Product } from '@/types';
import type { Metadata } from 'next';
import ProductDetailLayout from '@/components/ProductDetailLayout';

interface ProductPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.title} — Lumino`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = (await prisma.product.findUnique({
    where: { id: params.id },
  })) as Product | null;

  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-indigo-500 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <Link
          href={`/?category=${encodeURIComponent(product.category)}`}
          className="hover:text-indigo-500 transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <span className="text-gray-600 font-medium line-clamp-1">{product.title}</span>
      </nav>

      <ProductDetailLayout product={product} />
    </div>
  );
}
