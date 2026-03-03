"use client";

import { useAuthStore } from "@/features/auth/store";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";

export default function MyOrdersPage() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const orders = useAuthStore((s) => s.orders);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f7f1e6] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please Sign In</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your orders.</p>
          <Link href="/auth/signin" className="inline-block px-6 py-3 bg-[#4f6b4f] text-white rounded-lg hover:bg-[#3f5a3f]">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f1e6]">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-[#4f6b4f] hover:text-[#3f5a3f] font-medium">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
            <Link href="/products" className="inline-block px-6 py-3 bg-[#4f6b4f] text-white rounded-lg hover:bg-[#3f5a3f]">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-6">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order #</p>
                    <p className="font-semibold">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date</p>
                    <p className="font-semibold">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total</p>
                    <p className="font-semibold">₹{order.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <p className="font-semibold text-green-600">Completed</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Items:</p>
                  <ul className="space-y-1 text-sm">
                    {order.items.map((item) => (
                      <li key={item.id} className="text-gray-600">
                        {item.name} x{item.quantity} - ₹{(item.price * item.quantity).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-4 border-t flex gap-2">
                  <button className="px-4 py-2 bg-[#4f6b4f] text-white rounded-lg text-sm hover:bg-[#3f5a3f]">
                    Reorder
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
