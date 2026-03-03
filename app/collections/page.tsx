"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import { Coffee, Cake } from "lucide-react";

export default function CollectionsPage() {
  const categories = [...new Set(products.map((p) => p.category))];

  const icons: Record<string, any> = {
    Cupcakes: Cake,
    Tarts: Cake,
    Pastries: Cake,
  };

  return (
    <div className="min-h-screen bg-[#f7f1e6]">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Collections</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = icons[cat] || Coffee;
            return (
              <div key={cat} className="bg-white rounded-lg shadow p-6 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-[#efe7d7] rounded-md">
                    <Icon size={28} className="text-[#4f6b4f]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{cat}</h3>
                    <p className="text-sm text-gray-500">Browse our selection of {cat.toLowerCase()}.</p>
                  </div>
                </div>

                <div className="mt-auto flex gap-2">
                  <Link href={`/products?category=${encodeURIComponent(cat)}`} className="px-4 py-2 bg-[#4f6b4f] text-white rounded-md hover:bg-[#3f5a3f] transition">
                    Order Collection
                  </Link>
                  <Link href="/products" className="px-4 py-2 border rounded-md text-gray-700">
                    View All
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
