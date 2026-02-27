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

  // Sync with cart store on mount and when items change
  useEffect(() => {
    const cartItem = items.find((i) => i.id === product.id);
    setQty(cartItem ? cartItem.quantity : 0);
    setIsInCart(!!cartItem);
  }, [items, product.id]);

  const handleAddClick = () => {
    setQty(1);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
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
          <p className="text-orange-600 font-bold ml-4">${product.price.toFixed(2)}</p>
        </div>

        <p className="text-sm text-neutral-500 line-clamp-2">{product.description}</p>
      </CardContent>

      <CardFooter className="mt-auto">
        {!isInCart || qty === 0 ? (
          <button
            onClick={handleAddClick}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition shadow-md flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6h15l-1.5 9h-12z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            Add to Cart
          </button>
        ) : (
          <div className="w-full flex items-center gap-2 bg-orange-50 rounded-lg p-2">
            <button
              onClick={handleDecrease}
              className="w-8 h-8 rounded-md bg-white hover:bg-orange-100 flex items-center justify-center font-bold text-orange-600 transition"
            >
              −
            </button>

            <span className="flex-1 text-center font-bold text-orange-600 text-lg">{qty}</span>

            <button
              onClick={handleIncrease}
              className="w-8 h-8 rounded-md bg-white hover:bg-orange-100 flex items-center justify-center font-bold text-orange-600 transition"
            >
              +
            </button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
