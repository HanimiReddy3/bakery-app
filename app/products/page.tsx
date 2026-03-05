"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Search, Plus } from "lucide-react";
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
      setTimeout(() => menuSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const base = "/products";
    const url = category === "All" ? base : `${base}?category=${encodeURIComponent(category)}`;
    if (typeof window !== "undefined") window.history.pushState(null, "", url);
  };

  // Menu section state
  const menuSectionRef = useRef<HTMLDivElement | null>(null);
  const productsRef = useRef<HTMLDivElement | null>(null);
  const [menuCategory, setMenuCategory] = useState<string>("");

  const setFulfillment = useCartStore((s) => s.setFulfillment);

  const openCategoryAndClose = (category: string) => {
    handleCategorySelect(category);
    setTimeout(() => productsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const orderCollection = (category?: string) => {
    setFulfillment("collection");
    if (category) openCategoryAndClose(category);
    else {
      setTimeout(() => productsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  // Categories list
  const categories = [
    "All",
    "Drinks",
    "Cold Drinks",
    "Baklava KG",
    "Baklava Portion",
    "Cakes",
    "Eclair",
    "Pudding",
    "Loaf Cake",
    "Pastry-Borek",
    "Pastry",
    "Savoury Sweet Bisc"
  ];
  const menuCategories = useMemo(() => categories.filter((c) => c !== "All"), [categories]);

  useEffect(() => {
    if (!menuCategory && menuCategories.length > 0) {
      setMenuCategory(menuCategories[0]);
    }
  }, [menuCategory, menuCategories]);

  const menuItems = useMemo(() => {
    if (!menuCategory) return [];
    return products.filter((p) => p.category === menuCategory);
  }, [menuCategory]);

  const scrollToMenu = () => {
    setTimeout(() => menuSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

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
    <div className="min-h-screen bg-[#f7f1e6]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#f7f1e6] to-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Shop
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our delicious selection of freshly baked pastries, breads, and desserts
          </p>

          {/* <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={scrollToMenu}
              className="px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md text-sm font-medium"
            >
              View Menu
            </button>

            <button
              onClick={() => orderCollection()}
              className="px-4 py-2 bg-[#4f6b4f] text-white rounded-md text-sm font-medium hover:bg-[#3f5a3f]"
            >
              Order for Collection
            </button>
          </div> */}

        </div>
      </section>

      {/* Products Section */}
      <section className="bg-[#f7f1e6] py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
            {/* Side Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-[#d7e3d7] overflow-hidden h-fit lg:sticky lg:top-24">
              <div className="bg-[#4f6b4f] text-white text-center font-semibold py-3 text-sm tracking-widest">
                CATEGORIES
              </div>
              <div className="divide-y">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full text-left px-4 py-3 text-sm transition ${
                      selectedCategory === category
                        ? "bg-[#f1f6f1] text-[#3f5a3f] font-semibold"
                        : "bg-white text-gray-700 hover:bg-[#f7f1e6]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Content */}
            <div ref={productsRef} id="products-grid" className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-[#d7e3d7] p-4">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4f6b4f] focus:border-transparent outline-none transition"
                    />
                  </div>

                  <div className="flex items-center gap-3 justify-start lg:justify-end">
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

                <div className="mt-4 text-sm text-gray-600">
                  Showing {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""}
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-[#d7e3d7] p-10 text-center">
                  <p className="text-xl text-gray-600">
                    No products found matching your search.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
