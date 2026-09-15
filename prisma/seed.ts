import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    title: 'Apple AirPods Pro (2nd Generation)',
    description:
      'Active Noise Cancellation, Transparency mode, Adaptive Audio, Personalized Spatial Audio with dynamic head tracking, MagSafe Charging Case (USB-C), Dust, Sweat, and Water Resistant.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&h=500&fit=crop',
    category: 'Electronics',
  },
  {
    title: 'Kindle Paperwhite (16 GB)',
    description:
      'The thinnest, lightest Kindle Paperwhite yet, with a flush-front design and 300 ppi glare-free display that reads like real paper, even in bright sunlight.',
    price: 139.99,
    imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop',
    category: 'Electronics',
  },
  {
    title: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    description:
      '7-in-1 functionality: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, food warmer, and yogurt maker. 6 Quart capacity serves up to 6 people.',
    price: 89.95,
    imageUrl: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&h=500&fit=crop',
    category: 'Home & Kitchen',
  },
  {
    title: 'Levi\'s Men\'s 501 Original Fit Jeans',
    description:
      'The original jean since 1873, the 501 Original Fit Jeans sit at the waist and are regular through the thigh with a straight leg. Button fly.',
    price: 59.50,
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
    category: 'Clothing',
  },
  {
    title: 'Sony WH-1000XM5 Wireless Headphones',
    description:
      'Industry-leading noise cancellation with Auto NC Optimizer. Crystal clear hands-free calling with 4 beamforming microphones. Up to 30-hour battery life.',
    price: 348.00,
    imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&h=500&fit=crop',
    category: 'Electronics',
  },
  {
    title: 'Ninja Professional Plus Blender',
    description:
      'The Ninja Professional Plus Blender with Auto-iQ features a powerful 1400-peak-watt motor and Auto-iQ programs for smoothies, frozen drinks, and more.',
    price: 99.99,
    imageUrl: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&h=500&fit=crop',
    category: 'Home & Kitchen',
  },
  {
    title: 'Samsung Galaxy Tab S9 FE',
    description:
      'Large 10.9" display with Vision Booster for indoor and outdoor use. IP68 water and dust resistance. Included S Pen for note-taking and sketching.',
    price: 449.99,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop',
    category: 'Electronics',
  },
  {
    title: 'Nike Men\'s Air Max 270 Shoes',
    description:
      'The Nike Air Max 270 delivers visible cushioning under every step. Updated for modern comfort, it features Nike\'s biggest heel Air unit yet for a super-soft ride.',
    price: 160.00,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    category: 'Clothing',
  },
  {
    title: 'Crockpot Electric Lunch Box',
    description:
      'Portable food warmer for travel, car, on-the-go. Holds 20oz of soup plus a separate snack tray. Heats food in as little as 15 minutes.',
    price: 44.99,
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=500&fit=crop',
    category: 'Home & Kitchen',
  },
  {
    title: 'Anker USB C Charger Block 67W',
    description:
      'Compact 3-port wall charger with GaN technology. One USB-C port delivers max 45W for laptops and tablets. Foldable plug for easy portability.',
    price: 35.99,
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop',
    category: 'Electronics',
  },
  {
    title: 'The Subtle Art of Not Giving a F*ck',
    description:
      '#1 New York Times Bestseller. In this generation-defining self-help guide, a superstar blogger cuts through the crap to show us how to stop trying to be positive all the time.',
    price: 15.29,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop',
    category: 'Books',
  },
  {
    title: 'COSRX Snail Mucin 96% Power Repairing Essence',
    description:
      'Lightweight, fast-absorbing essence with 96.3% snail secretion filtrate. Deeply hydrates and repairs damaged skin barrier for a healthy, glowing complexion.',
    price: 21.00,
    imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=500&fit=crop',
    category: 'Beauty',
  },
  {
    title: 'JBL Charge 5 Portable Bluetooth Speaker',
    description:
      'Powerful JBL Original Pro Sound with an IP67 waterproof and dustproof rating. Up to 20 hours of playtime. Built-in power bank to charge your devices.',
    price: 179.95,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    category: 'Electronics',
  },
  {
    title: 'Lodge Cast Iron Skillet 10.25 Inch',
    description:
      'Seasoned and ready to use. Unparalleled heat retention for searing steaks, frying eggs, and baking cornbread. Made in the USA since 1896.',
    price: 29.90,
    imageUrl: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&h=500&fit=crop',
    category: 'Home & Kitchen',
  },
  {
    title: 'Atomic Habits by James Clear',
    description:
      'No matter your goals, Atomic Habits offers a proven framework for improving — every day. James Clear reveals practical strategies for forming good habits and breaking bad ones.',
    price: 13.79,
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop',
    category: 'Books',
  },
  {
    title: 'Maybelline Lash Sensational Sky High Mascara',
    description:
      'Limitless length and full volume in a buildable, lightweight formula. Flex Tower brush bends to coat every single lash from root to tip.',
    price: 9.98,
    imageUrl: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=500&h=500&fit=crop',
    category: 'Beauty',
  },
];

async function main() {
  // Clear existing products
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  for (const product of products) {
    await prisma.product.create({ data: product });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    throw e;
  });
