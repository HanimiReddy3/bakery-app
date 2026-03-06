"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/features/cart/store";
import { Trash2, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateItem = useCartStore((s) => s.updateItem);
  const fulfillment = useCartStore((s) => s.fulfillment);
  const deliveryFee = useCartStore((s) => s.deliveryFee);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + (deliveryFee || 0);

  const handleIncrease = (id: string, qty: number) => {
    updateItem(id, Math.min(10, qty + 1));
  };

  const handleDecrease = (id: string, qty: number) => {
    const newQty = Math.max(0, qty - 1);
    updateItem(id, newQty);
  };

  return (
    <div className="min-h-screen bg-[#f7f1e6]">
      {/* Back Link */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/products" className="inline-flex items-center gap-2 text-[#4f6b4f] hover:text-[#3f5a3f] font-medium">
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
            <Link href="/products" className="inline-block px-6 py-3 bg-[#4f6b4f] text-white rounded-lg hover:bg-[#3f5a3f]">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border">
                {items.map((item, idx) => (
                  <div key={item.id} className={`p-6 flex gap-6 ${idx !== items.length - 1 ? "border-b" : ""}`}>
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      <p className="text-[#4f6b4f] font-bold mb-4">₹{item.price.toFixed(2)}</p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleDecrease(item.id, item.quantity)}
                            className="px-3 py-2 hover:bg-gray-100 transition"
                          >
                            −
                          </button>
                          <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => handleIncrease(item.id, item.quantity)}
                            className="px-3 py-2 hover:bg-gray-100 transition"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right max-w-[90px] w-full break-words truncate sm:max-w-none ml-auto self-start">
                      <p className="font-bold text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{item.quantity} x ₹{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-[#fbf7ef] rounded-lg border border-[#e1d7c6] p-6 sticky top-20">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4 pb-4 border-b">
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
                </div>

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                <div className="space-y-2 mb-6 p-3 bg-[#efe7d7] rounded-lg border border-[#d7cfbf]">
                  <p className="text-xs text-[#4f6b4f]">
                      <strong>Fulfillment:</strong>{" "}
                      {fulfillment === "collection"
                        ? "Pickup ready in ~20 minutes"
                        : fulfillment === "delivery"
                          ? "Delivery 30-45 minutes"
                          : "Table reservation confirmed"}
                  </p>
                </div>

                <Link href="/checkout" className="block w-full py-3 bg-[#4f6b4f] text-white rounded-lg font-semibold text-center hover:bg-[#3f5a3f] transition">
                  Proceed to Checkout
                </Link>

                <Link href="/products" className="block w-full py-2 mt-3 text-center border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
