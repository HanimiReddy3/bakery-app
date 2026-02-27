"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/features/cart/store";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export function CartSheet({ children }: { children: React.ReactNode }) {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateItem = useCartStore((s) => s.updateItem);

  const handleIncrease = (id: string, currentQty: number) => {
    updateItem(id, Math.min(10, currentQty + 1));
  };

  const handleDecrease = (id: string, currentQty: number) => {
    const newQty = Math.max(0, currentQty - 1);
    updateItem(id, newQty);
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>

      <SheetContent className="w-[400px] sm:w-[450px]">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4 flex-1 overflow-y-auto">

          {items.length === 0 && (
            <p className="text-neutral-500 text-sm">
              Your cart is empty.
            </p>
          )}

          {items.map((item) => (
            <div key={item.id} className="flex gap-3 items-start border-b pb-4 px-5">
              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-sm text-orange-600 font-semibold">
                  ${item.price.toFixed(2)}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2 bg-orange-50 rounded-lg p-1 w-fit">
                  <button
                    onClick={() => handleDecrease(item.id, item.quantity)}
                    className="w-6 h-6 rounded flex items-center justify-center bg-white hover:bg-orange-100 transition"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-orange-600">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncrease(item.id, item.quantity)}
                    className="w-6 h-6 rounded flex items-center justify-center bg-white hover:bg-orange-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-neutral-400 hover:text-red-500 transition flex-shrink-0"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

        </div>

        <Separator className="my-6" />

        <SheetFooter className="flex flex-col gap-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link href="/cart">
            <Button className="w-full bg-orange-500 hover:bg-orange-600">
              View Cart
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
