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
    title: `${product.title} — Amazon.clone`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = (await prisma.product.findUnique({
    where: { id: params.id },
  })) as Product | null;

  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#C7511F] hover:underline">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link
          href={`/?category=${encodeURIComponent(product.category)}`}
          className="hover:text-[#C7511F] hover:underline"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 line-clamp-1">{product.title}</span>
      </nav>

      <ProductDetailLayout product={product} />
    </div>
  );
}
