"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Search } from "lucide-react";
import { useCartStore } from "@/features/cart/store";

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  // Read `category` and `menu` from URL on mount (client-side) to avoid SSR suspense issues
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat) setSelectedCategory(cat);
    if (params.get("menu")) {
      setMenuOpen(true);
    }
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const base = "/products";
    const url = category === "All" ? base : `${base}?category=${encodeURIComponent(category)}`;
    if (typeof window !== "undefined") window.history.pushState(null, "", url);
  };

  // Hero menu state
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const productsRef = useRef<HTMLDivElement | null>(null);

  const setFulfillment = useCartStore((s) => s.setFulfillment);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  const openCategoryAndClose = (category: string) => {
    handleCategorySelect(category);
    setMenuOpen(false);
    // scroll to products
    setTimeout(() => productsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const orderCollection = (category?: string) => {
    setFulfillment("collection");
    if (category) openCategoryAndClose(category);
    else {
      setMenuOpen(false);
      setTimeout(() => productsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  // Get unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter products
  const filteredProducts = useMemo(() => {
    let list = products.filter((product) => {
      const matchCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        list = list.slice().sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = list.slice().sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list = list.slice().sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        list = list.slice().sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return list;
  }, [searchQuery, selectedCategory, sortOption]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-blue-50 py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Shop
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our delicious selection of freshly baked pastries, breads, and desserts
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setMenuOpen((s) => !s)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md text-sm font-medium"
            >
              View Menu
            </button>

            <button
              onClick={() => orderCollection()}
              className="px-4 py-2 bg-orange-600 text-white rounded-md text-sm font-medium hover:bg-orange-700"
            >
              Order for Collection
            </button>
          </div>

          {menuOpen && (
            <div ref={menuRef} className="mt-4 bg-white rounded-lg shadow-md inline-block p-4 text-left">
              <p className="text-sm font-semibold mb-2">Menu</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {categories.filter(c => c !== "All").map((cat) => (
                  <button
                    key={cat}
                    onClick={() => openCategoryAndClose(cat)}
                    className="text-left px-3 py-2 rounded-md hover:bg-gray-50 text-sm"
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="mt-3 border-t pt-3">
                <p className="text-xs text-gray-500 mb-2">Quick actions</p>
                <div className="flex gap-2">
                  <button onClick={() => orderCollection()} className="px-3 py-2 bg-orange-600 text-white rounded text-sm">Start Collection</button>
                  <button onClick={() => { setFulfillment("delivery"); setMenuOpen(false); }} className="px-3 py-2 border rounded text-sm">Delivery</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Filters Section */}
      <div className="bg-white sticky top-16 z-40 border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === category
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div ref={productsRef} id="products-grid" className="container mx-auto px-4 py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">
              No products found matching your search.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-gray-600">
                Showing {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>

              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">Sort:</label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border rounded-md px-3 py-2 text-sm bg-white"
                >
                  <option value="default">Recommended</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="name-asc">Name: A → Z</option>
                  <option value="name-desc">Name: Z → A</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
