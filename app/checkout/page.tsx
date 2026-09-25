'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, ChevronRight, Check } from 'lucide-react';
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
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4 font-heading text-gray-900">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Add items to your cart to begin checkout.</p>
        <Link href="/" className="btn-primary inline-flex px-8 py-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Checkout header & progress */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 font-heading">Secure Checkout</h1>
        
        {/* Progress indicator */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <button 
            onClick={() => step === 'payment' && setStep('shipping')}
            className={`px-4 py-1.5 rounded-full flex items-center gap-2 transition-colors ${
              step === 'shipping'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-700 cursor-pointer hover:bg-emerald-100'
            }`}
          >
            {step === 'payment' && <Check className="w-3.5 h-3.5" />}
            1. Shipping
          </button>
          
          <ChevronRight className="w-4 h-4 text-gray-300" />
          
          <span
            className={`px-4 py-1.5 rounded-full transition-colors ${
              step === 'payment'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            2. Payment & Review
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        {/* Main content */}
        <div>
          {step === 'shipping' && (
            <form
              onSubmit={handleShippingSubmit}
              className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-card"
              id="shipping-form"
            >
              <h2 className="text-xl font-bold mb-6 font-heading text-gray-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm">1</span>
                Shipping Address
              </h2>
              <div className="grid gap-5">
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
                <div className="grid sm:grid-cols-3 gap-5">
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
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  className="btn-primary w-full sm:w-auto px-8 py-3"
                  id="continue-to-payment"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              {/* Shipping summary */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-50">
                  <h2 className="text-lg font-bold font-heading text-gray-900 flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-500" />
                    Shipping Details
                  </h2>
                  <button
                    onClick={() => setStep('shipping')}
                    className="text-sm font-semibold text-indigo-500 hover:text-indigo-700 transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <div className="text-sm text-gray-600 leading-relaxed pl-7">
                  <p className="font-medium text-gray-900">{form.fullName}</p>
                  <p>{form.addressLine1}</p>
                  {form.addressLine2 && <p>{form.addressLine2}</p>}
                  <p>{form.city}, {form.state} {form.zipCode}</p>
                  <p className="mt-1 text-gray-500">{form.phone}</p>
                </div>
              </div>

              {/* Mock payment form */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
                <h2 className="text-xl font-bold mb-6 font-heading text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm">2</span>
                  Payment Method
                </h2>
                
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                    💳
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-indigo-900 mb-0.5">Demo Mode Enabled</h3>
                    <p className="text-sm text-indigo-700/80">
                      This is a portfolio demonstration. No real payment will be processed.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                      disabled
                      id="card-number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="12/28"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order items summary */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
                <h2 className="text-lg font-bold mb-4 font-heading text-gray-900">Review Items</h2>
                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4">
                      <div className="relative w-16 h-16 bg-gray-50 border border-gray-100 rounded-lg shrink-0 overflow-hidden">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-contain p-1 mix-blend-multiply"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 line-clamp-1 mb-1">{item.title}</p>
                        <p className="text-xs text-gray-500 bg-gray-100 inline-block px-2 py-0.5 rounded">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-bold text-gray-900 shrink-0 mt-0.5">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {serverError && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3">
                  <span className="text-red-500">⚠️</span>
                  <p className="text-red-700 text-sm">{serverError}</p>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="btn-primary w-full sm:w-auto px-10 py-3.5 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                  id="place-order-button"
                >
                  {loading ? 'Processing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:self-start">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-6 sticky top-24">
            <h3 className="text-lg font-bold mb-4 font-heading text-gray-900">Order Summary</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Items ({itemCount}):</span>
                <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-emerald-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes:</span>
                <span className="font-medium text-gray-900">$0.00</span>
              </div>
              
              <div className="h-px bg-gray-100 my-4" />
              
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-bold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-indigo-600">{formatPrice(subtotal)}</span>
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
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5 flex justify-between">
        <span>{label} {required && <span className="text-red-500">*</span>}</span>
        {error && <span className="text-red-500 text-xs font-normal">{error}</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`input-lumino ${error ? 'input-lumino-error' : ''}`}
      />
    </div>
  );
}
