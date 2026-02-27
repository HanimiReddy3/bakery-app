"use client";

import Link from "next/link";
import { ShoppingCart, Search, User, X } from "lucide-react";
import { useCartStore } from "@/features/cart/store";
import { Input } from "@/components/ui/input";
import { CartSheet } from "../cart/CartSheet";
import { useState, useRef, useEffect } from "react";

export function Header() {
  const items = useCartStore((s) => s.items);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [searchOpen]);

  return (
    <header className="border-b bg-blue-50 sticky top-0 z-50">
      <style>{`
        @keyframes expandSearch {
          from {
            width: 40px;
          }
          to {
            width: 200px;
          }
        }

        @keyframes collapseSearch {
          from {
            width: 200px;
          }
          to {
            width: 40px;
          }
        }

        .search-expanding {
          animation: expandSearch 0.4s ease-out forwards;
        }

        .search-collapsing {
          animation: collapseSearch 0.4s ease-out forwards;
        }
      `}</style>

      <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-8">

        <Link href="/" className="text-2xl font-bold flex items-center gap-2 whitespace-nowrap">
          <span className="text-3xl">🍞</span>
          <span>Bakery Delights</span>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium flex-1 justify-end">
          <Link href="/" className="text-gray-900 hover:text-orange-600 transition">
            Home
          </Link>
          <Link href="/products" className="text-gray-900 hover:text-orange-600 transition">
            Shop
          </Link>
          <button className="text-gray-900 hover:text-orange-600 transition">
            Our Story
          </button>
          <button className="text-gray-900 hover:text-orange-600 transition">
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-4 flex-1 justify-end">
          {/* Animated Search Bar */}
          <div 
            ref={searchRef}
            className={`flex items-center gap-2 rounded-lg px-3 py-1 overflow-hidden ${
              searchOpen 
                ? "bg-white search-expanding" 
                : "search-collapsing"
            }`}
          >
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-400 hover:text-gray-600 transition flex-shrink-0"
            >
              {searchOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </button>

            {searchOpen && (
              <Input
                type="text"
                placeholder="Search pastries..."
                className="border-none bg-transparent text-sm flex-1 placeholder-gray-400 h-6 p-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none shadow-none"
                autoFocus
              />
            )}
          </div>
          <CartSheet>
            <div className="relative cursor-pointer">
              <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-gray-900 transition" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </div>
          </CartSheet>


          <button className="text-gray-600 hover:text-gray-900 transition">
            <User className="w-5 h-5" />
          </button>

        </div>
      </div>
    </header>
  );
}
