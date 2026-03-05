"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCartStore } from "@/features/cart/store";
import Link from "next/link";
import { Heart } from "lucide-react";

export function ProductCard({ product }: any) {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const updateItem = useCartStore((s) => s.updateItem);
  
  const [qty, setQty] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [addonsOpen, setAddonsOpen] = useState(false);

  const isDrink = product.category === "Drinks" || product.category === "Cold Drinks";

  const addonGroups = [
    {
      title: "Alternative Milk Opt",
      items: [
        { id: "almond-milk", label: "Almond Milk", price: 0.5 },
        { id: "coconut-milk", label: "Coconut Milk", price: 0.5 },
        { id: "oat-milk", label: "Oat Milk", price: 0.5 }
      ]
    },
    {
      title: "Add Syrup",
      items: [
        { id: "add-decaf", label: "Add Decaf", price: 0.5 },
        { id: "hazelnut", label: "Hazelnut", price: 0.5 },
        { id: "vanilla", label: "Vanilla", price: 0.5 },
        { id: "caramel", label: "Caramel", price: 0.5 }
      ]
    },
    {
      title: "Extras",
      items: [
        { id: "whipped-cream", label: "Extras Whipped Cream", price: 0.8 },
        { id: "extra-marshmellow", label: "Extra Marshmellow", price: 0.8 }
      ]
    }
  ];

  const selectedAddonSet = new Set(selectedAddons);
  const addonsTotal = addonGroups
    .flatMap((group) => group.items)
    .filter((item) => selectedAddonSet.has(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Sync with cart store on mount and when items change
  useEffect(() => {
    const cartItem = items.find((i) => i.id === product.id);
    setQty(cartItem ? cartItem.quantity : 0);
    setIsInCart(!!cartItem);
  }, [items, product.id]);

  const handleAddClick = () => {
    if (isDrink) {
      setAddonsOpen(true);
      return;
    }
    setQty(1);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  const handleConfirmAddons = () => {
    setQty(1);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price + addonsTotal,
      image: product.image,
      quantity: 1
    });
    setAddonsOpen(false);
  };

  const handleIncrease = () => {
    const newQty = Math.min(10, qty + 1);
    setQty(newQty);
    updateItem(product.id, newQty);
  };

  const handleDecrease = () => {
    const newQty = Math.max(0, qty - 1);
    setQty(newQty);
    if (newQty === 0) {
      setIsInCart(false);
    }
    updateItem(product.id, newQty);
  };

  return (
    <>
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition h-full flex flex-col">
      <div className="relative">
        <Link href={`/products/${product.slug}`}>
          <div className="relative h-72 w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-t-2xl"
            />
          </div>
        </Link>

        <button
          aria-label="Like"
          onClick={() => setLiked((v) => !v)}
          className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow flex items-center justify-center hover:bg-white transition"
        >
          <Heart
            size={20}
            className={liked ? "fill-red-500 text-red-500" : "text-neutral-600"}
          />
        </button>
      </div>

      <CardContent className="space-y-2 mt-4 flex-1">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-[#4f6b4f] font-bold ml-4">₹{product.price.toFixed(2)}</p>
        </div>

        <p className="text-sm text-neutral-500 line-clamp-2">{product.description}</p>
      </CardContent>

      <CardFooter className="mt-auto">
        {!isInCart || qty === 0 ? (
          <button
            onClick={handleAddClick}
            className="w-full bg-[#4f6b4f] hover:bg-[#3f5a3f] text-white font-semibold py-3 px-4 rounded-lg transition shadow-md flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6h15l-1.5 9h-12z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            Add to Cart
          </button>
        ) : (
          <div className="w-full flex items-center gap-2 bg-[#f2eadb] rounded-lg p-2">
            <button
              onClick={handleDecrease}
              className="w-8 h-8 rounded-md bg-white hover:bg-[#e5dccb] flex items-center justify-center font-bold text-[#4f6b4f] transition"
            >
              −
            </button>

            <span className="flex-1 text-center font-bold text-[#4f6b4f] text-lg">{qty}</span>

            <button
              onClick={handleIncrease}
              className="w-8 h-8 rounded-md bg-white hover:bg-[#e5dccb] flex items-center justify-center font-bold text-[#4f6b4f] transition"
            >
              +
            </button>
          </div>
        )}
      </CardFooter>
    </Card>

    {isDrink && addonsOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
            <button
              onClick={() => setAddonsOpen(false)}
              className="text-gray-500 hover:text-gray-800"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto p-5 space-y-6">
            {addonGroups.map((group) => (
              <div key={group.title} className="bg-white rounded-xl border border-[#e5dccb] shadow-sm">
                <div className="px-4 py-3 border-b bg-[#f7f1e6]">
                  <h3 className="text-lg font-semibold text-gray-900">{group.title}</h3>
                </div>
                <div className="divide-y">
                  {group.items.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center justify-between px-4 py-3 text-sm cursor-pointer hover:bg-[#fbf7ef]"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedAddonSet.has(item.id)}
                          onChange={() => toggleAddon(item.id)}
                          className="h-4 w-4 rounded border-gray-300 text-[#4f6b4f] focus:ring-[#4f6b4f]"
                        />
                        <span className="text-gray-800">{item.label}</span>
                      </div>
                      <span className="text-gray-700 font-medium">+ £{item.price.toFixed(2)}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleConfirmAddons}
            className="w-full px-5 py-4 border-t bg-[#4f6b4f] text-white flex items-center justify-between font-semibold tracking-wide"
          >
            <span>ADD TO MY ORDER</span>
            <span>£{(product.price + addonsTotal).toFixed(2)}</span>
          </button>
        </div>
      </div>
    )}
    </>
  );
}
