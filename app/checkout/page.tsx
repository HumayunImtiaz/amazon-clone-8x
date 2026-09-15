'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { placeOrder } from '@/lib/actions';
import { formatPrice } from '@/lib/utils';
import { z } from 'zod';

const shippingSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Valid ZIP code is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
});

type ShippingForm = z.infer<typeof shippingSchema>;
type FieldErrors = Partial<Record<keyof ShippingForm, string>>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getItemCount, clearCart } = useCartStore();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState('');

  const [form, setForm] = useState<ShippingForm>({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const subtotal = getSubtotal();
  const itemCount = getItemCount();

  const updateField = (field: keyof ShippingForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = shippingSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const [key, msgs] of Object.entries(result.error.flatten().fieldErrors)) {
        fieldErrors[key as keyof ShippingForm] = msgs?.[0];
      }
      setErrors(fieldErrors);
      return;
    }
    setStep('payment');
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setServerError('');

    const result = await placeOrder({
      shipping: form,
      items: items.map((item) => ({
        productId: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
    });

    if (result.success) {
      clearCart();
      router.push(`/order-confirmation?orderId=${result.orderId}`);
    } else {
      setServerError('Something went wrong placing your order. Please try again.');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/" className="btn-amazon inline-block px-8 py-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Checkout header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#0F1111]">Checkout</h1>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Lock className="w-4 h-4" />
          Secure checkout
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-8 text-sm">
        <span
          className={`px-3 py-1 rounded-full ${
            step === 'shipping'
              ? 'bg-[#FFD814] font-bold text-[#0F1111]'
              : 'bg-green-100 text-green-700'
          }`}
        >
          1. Shipping
        </span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span
          className={`px-3 py-1 rounded-full ${
            step === 'payment'
              ? 'bg-[#FFD814] font-bold text-[#0F1111]'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          2. Payment & Review
        </span>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Main content */}
        <div>
          {step === 'shipping' && (
            <form
              onSubmit={handleShippingSubmit}
              className="bg-white border rounded-lg p-6"
              id="shipping-form"
            >
              <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
              <div className="grid gap-4">
                <InputField
                  label="Full Name"
                  id="fullName"
                  value={form.fullName}
                  onChange={(v) => updateField('fullName', v)}
                  error={errors.fullName}
                  required
                />
                <InputField
                  label="Address Line 1"
                  id="addressLine1"
                  value={form.addressLine1}
                  onChange={(v) => updateField('addressLine1', v)}
                  error={errors.addressLine1}
                  placeholder="Street address, P.O. box"
                  required
                />
                <InputField
                  label="Address Line 2"
                  id="addressLine2"
                  value={form.addressLine2 || ''}
                  onChange={(v) => updateField('addressLine2', v)}
                  placeholder="Apt, suite, unit, etc. (optional)"
                />
                <div className="grid sm:grid-cols-3 gap-4">
                  <InputField
                    label="City"
                    id="city"
                    value={form.city}
                    onChange={(v) => updateField('city', v)}
                    error={errors.city}
                    required
                  />
                  <InputField
                    label="State"
                    id="state"
                    value={form.state}
                    onChange={(v) => updateField('state', v)}
                    error={errors.state}
                    required
                  />
                  <InputField
                    label="ZIP Code"
                    id="zipCode"
                    value={form.zipCode}
                    onChange={(v) => updateField('zipCode', v)}
                    error={errors.zipCode}
                    required
                  />
                </div>
                <InputField
                  label="Phone Number"
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => updateField('phone', v)}
                  error={errors.phone}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-amazon w-full mt-6 py-3 text-base"
                id="continue-to-payment"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              {/* Shipping summary */}
              <div className="bg-white border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-bold">Shipping Address</h2>
                  <button
                    onClick={() => setStep('shipping')}
                    className="text-sm text-[#007185] hover:underline"
                  >
                    Change
                  </button>
                </div>
                <p className="text-sm text-gray-700">
                  {form.fullName}<br />
                  {form.addressLine1}<br />
                  {form.addressLine2 && <>{form.addressLine2}<br /></>}
                  {form.city}, {form.state} {form.zipCode}<br />
                  {form.phone}
                </p>
              </div>

              {/* Mock payment form */}
              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-lg font-bold mb-4">Payment Method</h2>
                <div className="border border-[#FFD814] bg-[#FFFBEF] rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium">💳 Demo Mode</p>
                  <p className="text-xs text-gray-500 mt-1">
                    This is a demo checkout. No real payment will be processed.
                  </p>
                </div>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50"
                      disabled
                      id="card-number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        placeholder="12/28"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order items summary */}
              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-lg font-bold mb-4">Review Items</h2>
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 py-3">
                      <div className="relative w-16 h-16 bg-gray-50 rounded shrink-0 overflow-hidden">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-1">{item.title}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-bold shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {serverError && (
                <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                  {serverError}
                </p>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="btn-amazon-orange w-full py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                id="place-order-button"
              >
                {loading ? 'Placing Order...' : 'Place Your Order'}
              </button>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:self-start">
          <div className="bg-white border rounded-lg p-5 sticky top-20">
            <h3 className="text-lg font-bold mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Items ({itemCount}):</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-[#007600]">FREE</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold text-[#B12704]">
                <span>Order total:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable form input */
function InputField({
  label,
  id,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  required,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] transition-colors ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
