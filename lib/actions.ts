'use server';

import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const shippingSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  phone: z.string().min(10, 'Phone number is required'),
});

const orderItemSchema = z.object({
  productId: z.string(),
  title: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

const placeOrderSchema = z.object({
  userId: z.string().optional(),
  shipping: shippingSchema,
  items: z.array(orderItemSchema).min(1, 'Cart is empty'),
});

export type PlaceOrderInput = z.infer<typeof placeOrderSchema>;

export async function placeOrder(input: PlaceOrderInput) {
  const parsed = placeOrderSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false as const, error: parsed.error.flatten().fieldErrors };
  }

  const { shipping, items, userId } = parsed.data;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingAddress = [
    shipping.fullName,
    shipping.addressLine1,
    shipping.addressLine2,
    `${shipping.city}, ${shipping.state} ${shipping.zipCode}`,
    shipping.phone,
  ]
    .filter(Boolean)
    .join('\n');

  const order = await prisma.order.create({
    data: {
      userId: userId || 'guest',
      totalAmount,
      status: 'COMPLETED',
      shippingAddress,
      orderItems: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      orderItems: {
        include: { product: true },
      },
    },
  });

  return { success: true as const, orderId: order.id };
}
