import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q || q.length < 2) {
    return NextResponse.json({ products: [] });
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { category: { contains: q, mode: 'insensitive' } },
        ],
      },
      take: 6,
      select: {
        id: true,
        title: true,
        imageUrl: true,
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ products: [], error: 'Failed to fetch suggestions' }, { status: 500 });
  }
}
