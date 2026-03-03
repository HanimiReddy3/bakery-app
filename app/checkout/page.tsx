"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/features/cart/store";
import { useAuthStore } from "@/features/auth/store";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const fulfillment = useCartStore((s) => s.fulfillment);
  const deliveryFee = useCartStore((s) => s.deliveryFee);
  const clearCart = useCartStore((s) => s.clearCart);
  const user = useAuthStore((s) => s.user);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f1e6] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/products" className="inline-block px-6 py-3 bg-[#4f6b4f] text-white rounded-lg hover:bg-[#3f5a3f]">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate order submission
    setTimeout(() => {
      const orderData = {
        id: "ORD-" + Date.now(),
        items,
        subtotal,
        deliveryFee,
        total,
        fulfillment,
        customer: formData,
        createdAt: new Date().toISOString(),
      };

      // Store in session/localStorage for confirmation page
      if (typeof window !== "undefined") {
        localStorage.setItem("lastOrder", JSON.stringify(orderData));
      }

      // Clear cart after successful order
      clearCart();

      setLoading(false);
      router.push("/order-confirmation");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f7f1e6]">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/cart" className="inline-flex items-center gap-2 text-[#4f6b4f] hover:text-[#3f5a3f] font-medium">
            <ArrowLeft size={20} />
            Back to Cart
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Info */}
              <div className="border rounded-lg p-6">
                <h2 className="text-lg font-bold mb-4">Contact Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4f6b4f] focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4f6b4f] focus:border-transparent outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="col-span-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4f6b4f] focus:border-transparent outline-none"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="col-span-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4f6b4f] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Delivery Address (only if delivery) */}
              {fulfillment === "delivery" && (
                <div className="border rounded-lg p-6">
                  <h2 className="text-lg font-bold mb-4">Delivery Address</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4f6b4f] focus:border-transparent outline-none"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4f6b4f] focus:border-transparent outline-none"
                      />
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4f6b4f] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              <div className="border rounded-lg p-6">
                <h2 className="text-lg font-bold mb-4">Special Instructions (Optional)</h2>
                <textarea
                  name="notes"
                  placeholder="Any special requests or instructions..."
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4f6b4f] focus:border-transparent outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#4f6b4f] text-white rounded-lg font-semibold hover:bg-[#3f5a3f] disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? "Processing Order..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-[#fbf7ef] rounded-lg border border-[#e1d7c6] p-6 sticky top-20">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="capitalize">
                    {fulfillment === "collection"
                      ? "Pickup"
                      : fulfillment === "delivery"
                        ? "Delivery"
                        : "Table"}
                  </span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2 p-3 bg-[#efe7d7] rounded-lg border border-[#d7cfbf]">
                <p className="text-xs font-semibold text-[#4f6b4f]">Fulfillment</p>
                <p className="text-xs text-[#4f6b4f]">
                  {fulfillment === "collection"
                    ? "Ready for pickup in approximately 20 minutes"
                    : fulfillment === "delivery"
                      ? "Delivery within 30-45 minutes"
                      : "Table reservation confirmed. We'll see you soon."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
