export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: string;
  shippingAddress: string;
  orderItems: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}
