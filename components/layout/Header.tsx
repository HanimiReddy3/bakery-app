"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, User, X, Menu, Home, ShoppingBag, Phone, LogOut, Settings, ChevronDown } from "lucide-react";
import { useCartStore } from "@/features/cart/store";
import { useAuthStore } from "@/features/auth/store";
import { Input } from "@/components/ui/input";
import { CartSheet } from "../cart/CartSheet";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const items = useCartStore((s) => s.items);
  const user = useAuthStore((s) => s.user);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const logout = useAuthStore((s) => s.logout);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"products" | "custom" | "contact" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const menuCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const headerClassName = isHome
    ? "fixed top-0 left-0 right-0 z-50"
    : "sticky top-0 z-50 bg-[#4f6b4f] shadow-sm";

  const linkClassName = isHome
    ? "text-[#7a3f2b] hover:text-[#5f2e1f] transition inline-flex items-center px-2 py-2 h-10"
    : "text-white/90 hover:text-white transition inline-flex items-center px-2 py-2 h-10";

  const iconClassName = isHome
    ? "text-[#7a3f2b] hover:text-[#5f2e1f]"
    : "text-white/90 hover:text-white";

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

  const openMenuWithCancel = (menu: "products" | "custom" | "contact") => {
    if (menuCloseTimeoutRef.current) {
      clearTimeout(menuCloseTimeoutRef.current);
      menuCloseTimeoutRef.current = null;
    }
    setOpenMenu(menu);
  };

  const closeMenuWithDelay = () => {
    if (menuCloseTimeoutRef.current) {
      clearTimeout(menuCloseTimeoutRef.current);
    }
    menuCloseTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
      menuCloseTimeoutRef.current = null;
    }, 180);
  };

  return (
    <header className={headerClassName}>
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

      <div className="mx-auto px-4 sm:px-6">
        <div
          className={`flex items-center justify-between gap-4 h-16 ${
            isHome
              ? "my-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg px-6"
              : "py-3"
          }`}
        >

        {/* Logo */}
        <Link
          href="/"
          className={`text-xl sm:text-2xl font-bold flex items-center gap-3 whitespace-nowrap flex-shrink-0 ${
            isHome ? "text-[#7a3f2b]" : "text-white"
          }`}
        >
          <Image
            src="/logo-pera.webp"
            alt="Pera"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-contain"
          />
          <span className="hidden sm:inline">perapatisserie</span>
          <span className="sm:hidden text-sm">perapatisserie</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium flex-1 justify-center">
          <Link href="/" className={`${linkClassName} gap-1`}>
            <Home size={16} />
            Home
          </Link>
          <Link href="/story" className={linkClassName}>
            About
          </Link>
          <div
            className="relative"
            onMouseEnter={() => openMenuWithCancel("products")}
            onMouseLeave={closeMenuWithDelay}
          >
            <button
              type="button"
              className={`${linkClassName} gap-1 h-10`}
              aria-haspopup="true"
              aria-expanded={openMenu === "products"}
              onClick={() => setOpenMenu(openMenu === "products" ? null : "products")}
            >
              <ShoppingBag size={16} />
              Products
              <ChevronDown size={14} />
            </button>
            <div
              onMouseEnter={() => openMenuWithCancel("products")}
              onMouseLeave={closeMenuWithDelay}
              className={`absolute left-0 top-full mt-2 w-60 rounded-2xl bg-[#f7f1e6] text-[#4f6b4f] shadow-xl border border-[#d7cfbf] transition ${
                openMenu === "products"
                  ? "opacity-100 visible pointer-events-auto"
                  : "opacity-0 invisible pointer-events-none"
              }`}
            >
              <div className="py-2">
                <Link href="/products" onClick={() => setOpenMenu(null)} className="block px-5 py-2 text-sm hover:bg-[#efe7d7]">
                  All Products
                </Link>
                <Link href="/products?category=Cupcakes" onClick={() => setOpenMenu(null)} className="block px-5 py-2 text-sm hover:bg-[#efe7d7]">
                  Cupcakes
                </Link>
                <Link href="/products?category=Bread" onClick={() => setOpenMenu(null)} className="block px-5 py-2 text-sm hover:bg-[#efe7d7]">
                  Bread
                </Link>
                <Link href="/products?category=Tarts" onClick={() => setOpenMenu(null)} className="block px-5 py-2 text-sm hover:bg-[#efe7d7]">
                  Tarts
                </Link>
                <Link href="/products?category=Pastries" onClick={() => setOpenMenu(null)} className="block px-5 py-2 text-sm hover:bg-[#efe7d7]">
                  Pastries
                </Link>
              </div>
            </div>
          </div>
          <div
            className="relative"
            onMouseEnter={() => openMenuWithCancel("custom")}
            onMouseLeave={closeMenuWithDelay}
          >
            <button
              type="button"
              className={`${linkClassName} gap-1 h-10`}
              aria-haspopup="true"
              aria-expanded={openMenu === "custom"}
              onClick={() => setOpenMenu(openMenu === "custom" ? null : "custom")}
            >
              Custom Orders
              <ChevronDown size={14} />
            </button>
            <div
              onMouseEnter={() => openMenuWithCancel("custom")}
              onMouseLeave={closeMenuWithDelay}
              className={`absolute left-0 top-full mt-2 w-60 rounded-2xl bg-[#f7f1e6] text-[#4f6b4f] shadow-xl border border-[#d7cfbf] transition ${
                openMenu === "custom"
                  ? "opacity-100 visible pointer-events-auto"
                  : "opacity-0 invisible pointer-events-none"
              }`}
            >
              <div className="py-2">
                <Link href="/collections#gifting" onClick={() => setOpenMenu(null)} className="block px-5 py-2 text-sm hover:bg-[#efe7d7]">
                  Gifting
                </Link>
                <Link href="/collections#corporate-orders" onClick={() => setOpenMenu(null)} className="block px-5 py-2 text-sm hover:bg-[#efe7d7]">
                  Corporate Orders
                </Link>
              </div>
            </div>
          </div>
          <Link href="/products?category=Custom%20Cake" className={linkClassName}>
            Customised Cake
          </Link>
          <Link href="/blog" className={linkClassName}>
            Blogs
          </Link>
          <div
            className="relative"
            onMouseEnter={() => openMenuWithCancel("contact")}
            onMouseLeave={closeMenuWithDelay}
          >
            <button
              type="button"
              className={`${linkClassName} gap-1 h-10`}
              aria-haspopup="true"
              aria-expanded={openMenu === "contact"}
              onClick={() => setOpenMenu(openMenu === "contact" ? null : "contact")}
            >
              Contact
              <ChevronDown size={14} />
            </button>
            <div
              onMouseEnter={() => openMenuWithCancel("contact")}
              onMouseLeave={closeMenuWithDelay}
              className={`absolute left-0 top-full mt-2 w-60 rounded-2xl bg-[#f7f1e6] text-[#4f6b4f] shadow-xl border border-[#d7cfbf] transition ${
                openMenu === "contact"
                  ? "opacity-100 visible pointer-events-auto"
                  : "opacity-0 invisible pointer-events-none"
              }`}
            >
              <div className="py-2">
                <Link href="/contact" onClick={() => setOpenMenu(null)} className="block px-5 py-2 text-sm hover:bg-[#efe7d7]">
                  Contact Us
                </Link>
                <Link href="/products?menu=1" onClick={() => setOpenMenu(null)} className="block px-5 py-2 text-sm hover:bg-[#efe7d7]">
                  Order for Collection
                </Link>
                <Link href="/collections" onClick={() => setOpenMenu(null)} className="block px-5 py-2 text-sm hover:bg-[#efe7d7]">
                  Custom Orders
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Bar */}
          {/* <div 
            ref={searchRef}
            className={`flex items-center gap-2 rounded-full px-3 h-10 overflow-hidden transition-all ${
              searchOpen 
                ? "bg-white search-expanding shadow-md" 
                : isHome
                ? "bg-[#f7f1e6]/70 search-collapsing"
                : "bg-white/50 search-collapsing"
            }`}
          >
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`transition flex-shrink-0 ${iconClassName}`}
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
          </div> */}

          {/* Cart Icon */}
          <CartSheet>
            <div className="relative cursor-pointer hover:scale-110 transition">
              <ShoppingCart size={20} className={iconClassName} />
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
              className={`transition p-1 rounded-full ${
                isHome ? "text-[#7a3f2b] hover:text-[#5f2e1f] hover:bg-[#f7f1e6]" : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <User size={20} />
            </button>

            {/* User Dropdown Menu */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                {!isLoggedIn ? (
                  <>
                    <div className="px-4 py-3 border-b bg-[#efe7d7]">
                      <p className="text-sm font-semibold text-gray-900 mb-3">Welcome to perapatisserie!</p>
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
            className={`lg:hidden transition p-1 ${iconClassName}`}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white px-4 py-3 space-y-2">
          <Link href="/" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#efe7d7] rounded-lg transition">
            Home
          </Link>
          <Link href="/story" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#efe7d7] rounded-lg transition">
            About
          </Link>
          <Link href="/products" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#efe7d7] rounded-lg transition">
            Products
          </Link>
          <div className="px-4 py-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Custom Orders</div>
            <div className="space-y-1">
              <Link href="/collections#gifting" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-[#efe7d7] rounded-lg transition">
                Gifting
              </Link>
              <Link href="/collections#corporate-orders" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-[#efe7d7] rounded-lg transition">
                Corporate Orders
              </Link>
            </div>
          </div>
          <Link href="/products?category=Custom%20Cake" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#efe7d7] rounded-lg transition">
            Customised Cake
          </Link>
          <Link href="/blog" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#efe7d7] rounded-lg transition">
            Blogs
          </Link>
          <Link href="/contact" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#efe7d7] rounded-lg transition">
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
