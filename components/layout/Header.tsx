"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, User, X, Menu, Home, ShoppingBag, Phone, LogOut, Settings } from "lucide-react";
import { useCartStore } from "@/features/cart/store";
import { useAuthStore } from "@/features/auth/store";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";

const CartSheet = dynamic(
  () => import("../cart/CartSheet").then((mod) => mod.CartSheet),
  { ssr: false }
);

export function Header() {
  const items = useCartStore((s) => s.items);
  const user = useAuthStore((s) => s.user);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const logout = useAuthStore((s) => s.logout);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    if (searchOpen || userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [searchOpen, userMenuOpen]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  return (
    <header className="border-b bg-gradient-to-r from-[#f7f1e6] to-white sticky top-0 z-50 shadow-sm">
      <style>{`
        @keyframes expandSearch {
          from {
            width: 40px;
          }
          to {
            width: 250px;
          }
        }

        @keyframes collapseSearch {
          from {
            width: 250px;
          }
          to {
            width: 40px;
          }
        }

        .search-expanding {
          animation: expandSearch 0.3s ease-out forwards;
        }

        .search-collapsing {
          animation: collapseSearch 0.3s ease-out forwards;
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 h-16">

        {/* Logo */}
        <Link href="/" className="text-xl sm:text-2xl font-bold flex items-center gap-3 whitespace-nowrap flex-shrink-0">
          <Image
            src="/pera-logo.png"
            alt="Pera"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-contain"
          />
          <span className="hidden sm:inline">Pera</span>
          <span className="sm:hidden text-sm">Pera</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 text-sm font-medium flex-1 justify-center">
          <Link href="/" className="text-gray-700 hover:text-[#4f6b4f] transition flex items-center gap-1">
            <Home size={16} />
            Home
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-[#4f6b4f] transition flex items-center gap-1">
            <ShoppingBag size={16} />
            Shop
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-[#4f6b4f] transition">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-[#4f6b4f] transition flex items-center gap-1">
            <Phone size={16} />
            Contact
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Bar */}
          <div 
            ref={searchRef}
            className={`flex items-center gap-2 rounded-full px-3 h-10 overflow-hidden transition-all ${
              searchOpen 
                ? "bg-white search-expanding shadow-md" 
                : "bg-white/50 search-collapsing"
            }`}
          >
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-500 hover:text-[#4f6b4f] transition flex-shrink-0"
            >
              <Search size={18} />
            </button>

            {searchOpen && (
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="border-none bg-transparent text-sm flex-1 placeholder-gray-400 h-10 p-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none shadow-none"
                autoFocus
              />
            )}
          </div>

          {/* Cart Icon */}
          <CartSheet>
            <div className="relative cursor-pointer hover:scale-110 transition">
              <ShoppingCart size={20} className="text-gray-600 hover:text-[#4f6b4f]" />
              {cartCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-gradient-to-r from-[#4f6b4f] to-[#3f5a3f] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </div>
          </CartSheet>

          {/* User Account */}
          <div ref={userMenuRef} className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="text-gray-600 hover:text-[#4f6b4f] transition p-1 hover:bg-white/50 rounded-full"
            >
              <User size={20} />
            </button>

            {/* User Dropdown Menu */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                {!isLoggedIn ? (
                  <>
                    <div className="px-4 py-3 border-b bg-[#efe7d7]">
                      <p className="text-sm font-semibold text-gray-900 mb-3">Welcome to Pera!</p>
                    </div>
                    <Link
                      href="/auth/signin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#efe7d7] font-medium transition"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block px-4 py-2 text-sm text-[#4f6b4f] hover:bg-[#efe7d7] font-medium transition"
                    >
                      Create Account
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>

                    <Link
                      href="/account/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#efe7d7] transition"
                    >
                      My Orders
                    </Link>
                    <Link
                      href="/account/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#efe7d7] transition"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/account/favorites"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#efe7d7] transition"
                    >
                      Favorites
                    </Link>
                    <Link
                      href="/account/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#efe7d7] flex items-center gap-2 transition"
                    >
                      <Settings size={16} />
                      Settings
                    </Link>

                    <div className="border-t mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-600 hover:text-[#4f6b4f] transition p-1"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white px-4 py-3 space-y-2">
          <Link href="/" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#efe7d7] rounded-lg transition">
            Home
          </Link>
          <Link href="/products" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#efe7d7] rounded-lg transition">
            Shop
          </Link>
          <Link href="/blog" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#efe7d7] rounded-lg transition">
            Blog
          </Link>
          <Link href="/contact" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#efe7d7] rounded-lg transition">
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
