"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useCartStore } from "@/features/cart/store";

interface OrderData {
  id: string;
  items: any[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  fulfillment: string;
  customer: any;
  createdAt: string;
}

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const orderData = localStorage.getItem("lastOrder");
    if (orderData) {
      setOrder(JSON.parse(orderData));
      // Clear cart after successful order
      localStorage.removeItem("lastOrder");
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f7f1e6] flex items-center justify-center">
        <div className="text-center">
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  const deliveryTime = order.fulfillment === "collection"
    ? "20 minutes"
    : order.fulfillment === "delivery"
      ? "30-45 minutes"
      : "Reserved";

  const pickupOrDeliveryText = order.fulfillment === "collection"
    ? `Your order will be ready for pickup in approximately ${deliveryTime} at our bakery.`
    : order.fulfillment === "delivery"
      ? `Your order will be delivered within ${deliveryTime}.`
      : "Your table is booked. A confirmation has been sent with your reservation details.";

  return (
    <div className="min-h-screen bg-[#f7f1e6]">
      <div className="container mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">Thank you for your order.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Number & Date */}
            <div className="bg-[#efe7d7] border border-[#d7cfbf] rounded-lg p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Number</p>
                  <p className="text-2xl font-bold text-gray-900">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Date</p>
                  <p className="text-lg font-semibold">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Fulfillment Info */}
            <div className="border rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Fulfillment Details</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Method</p>
                  <p className="font-semibold capitalize">
                    {order.fulfillment === "collection"
                      ? "Pickup"
                      : order.fulfillment === "delivery"
                        ? "Delivery"
                        : "Table"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Estimated Time</p>
                  <p className="font-semibold">{deliveryTime}</p>
                </div>
                <div className="p-4 bg-[#efe7d7] border border-[#d7cfbf] rounded-lg">
                  <p className="text-sm text-[#4f6b4f]">{pickupOrDeliveryText}</p>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="border rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Customer Information</h2>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-600">Name:</span> {order.customer.firstName} {order.customer.lastName}</p>
                <p><span className="text-gray-600">Email:</span> {order.customer.email}</p>
                <p><span className="text-gray-600">Phone:</span> {order.customer.phone}</p>
                {order.fulfillment === "delivery" && (
                  <>
                    <p><span className="text-gray-600">Address:</span> {order.customer.address}</p>
                    <p><span className="text-gray-600">City:</span> {order.customer.city}, {order.customer.postalCode}</p>
                  </>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="border rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Items Ordered</h2>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start pb-3 border-b last:border-b-0">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-[#fbf7ef] border border-[#e1d7c6] rounded-lg p-6 sticky top-20">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="capitalize">
                    {order.fulfillment === "collection"
                      ? "Pickup"
                      : order.fulfillment === "delivery"
                        ? "Delivery"
                        : "Table"}
                  </span>
                  <span>₹{order.deliveryFee.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>

              <div className="space-y-3">
                <Link href="/products" className="block w-full py-3 bg-[#4f6b4f] text-white rounded-lg font-semibold text-center hover:bg-[#3f5a3f] transition">
                  Continue Shopping
                </Link>
                <Link href="/" className="block w-full py-3 border border-gray-300 rounded-lg font-semibold text-center hover:bg-gray-50 transition">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-[#efe7d7] border border-[#d7cfbf] rounded-lg p-6 text-center">
          <p className="text-sm text-[#4f6b4f]">
            A confirmation email has been sent to <strong>{order.customer.email}</strong>. You can track your order status there.
          </p>
        </div>
      </div>
    </div>
  );
}
