"use client";

import { useState } from "react";
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
  const [open, setOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateItem = useCartStore((s) => s.updateItem);
  const fulfillment = useCartStore((s) => s.fulfillment);
  const deliveryFee = useCartStore((s) => s.deliveryFee);
  const setFulfillment = useCartStore((s) => s.setFulfillment);

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

  const totalWithFee = total + (deliveryFee || 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>

      <SheetContent className="w-[90vw] max-w-xs sm:w-[400px] sm:max-w-sm md:w-[450px] md:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-4 sm:mt-6 space-y-4 flex-1 overflow-y-auto px-2 sm:px-0">

          {items.length === 0 && (
            <p className="text-neutral-500 text-sm text-center">
              Your cart is empty.
            </p>
          )}

          {items.map((item) => (
            <div key={item.id} className="flex flex-row gap-2 sm:gap-3 items-start border-b pb-4 px-2 sm:px-5 relative">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{item.name}</p>
                {/* Hide this price, move summary to the right */}
                {/* <p className="text-sm text-[#4f6b4f] font-semibold">
                  ₹{item.price.toFixed(2)}
                </p> */}

                {/* Quantity Controls */}
                <div className="flex items-center gap-1 sm:gap-2 mt-2 bg-[#f2eadb] rounded-lg p-1 w-fit">
                  <button
                    onClick={() => handleDecrease(item.id, item.quantity)}
                    className="w-6 h-6 rounded flex items-center justify-center bg-white hover:bg-[#e5dccb] transition"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-[#4f6b4f]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncrease(item.id, item.quantity)}
                    className="w-6 h-6 rounded flex items-center justify-center bg-white hover:bg-[#e5dccb] transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-neutral-400 hover:text-red-500 transition flex-shrink-0 self-start mt-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="ml-auto self-start text-right min-w-[80px]">
                <p className="font-bold text-lg text-[#4f6b4f]">₹{item.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{item.quantity} x ₹{item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}

        </div>

        {/* Fulfillment Option */}
        <div className="px-2 sm:px-5">
          <p className="text-sm font-medium mb-2">Fulfillment</p>
          <div className="flex gap-2">
            <button
              onClick={() => setFulfillment("collection")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition w-full ${
                fulfillment === "collection"
                  ? "bg-[#4f6b4f] text-white"
                  : "bg-[#efe7d7] text-[#4a5a4a] hover:bg-[#e5dccb]"
              }`}
            >
              Collection (Pickup)
            </button>
            <button
              onClick={() => setFulfillment("delivery")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition w-full ${
                fulfillment === "delivery"
                  ? "bg-[#4f6b4f] text-white"
                  : "bg-[#efe7d7] text-[#4a5a4a] hover:bg-[#e5dccb]"
              }`}
            >
              Delivery {deliveryFee ? `(+₹${deliveryFee.toFixed(2)})` : ""}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {fulfillment === "collection"
              ? "Pick up your items in-store. Ready in ~20 minutes."
              : "Delivery fee may apply. Estimated delivery 30-45 minutes."}
          </p>
        </div>

        <Separator className="my-6" />

        <SheetFooter className="flex flex-col gap-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{totalWithFee.toFixed(2)}</span>
          </div>

          <Link href="/cart" onClick={() => setOpen(false)}>
            <Button className="w-full bg-[#4f6b4f] hover:bg-[#3f5a3f]">
              View Cart
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
