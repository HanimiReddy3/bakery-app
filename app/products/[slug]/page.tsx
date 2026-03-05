"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { products } from "@/lib/products";
import { Heart, ShoppingCart, ArrowLeft, Star } from "lucide-react";
import { useCartStore } from "@/features/cart/store";
import Image from "next/image";

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params?.slug) ? params?.slug[0] : params?.slug;
  const product = products.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [addonsOpen, setAddonsOpen] = useState(false);
  const { addItem } = useCartStore();

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f7f1e6] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#4f6b4f] text-white rounded-lg hover:bg-[#3f5a3f] transition"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

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

  const handleAddToCart = () => {
    if (isDrink) {
      setAddonsOpen(true);
      return;
    }
      addItem({
        id: product.id,
        name: product.name,
        price: product.price + (isDrink ? addonsTotal : 0),
        image: product.image,
        quantity
      });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleConfirmAddons = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price + addonsTotal,
      image: product.image,
      quantity
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    setAddonsOpen(false);
  };

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="min-h-screen bg-[#f7f1e6]">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[#4f6b4f] hover:text-[#3f5a3f] font-medium transition"
        >
          <ArrowLeft size={20} />
          Back to Shop
        </button>
      </div>

      {/* Product Detail Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden h-96 md:h-[500px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            {/* Category & Rating */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-medium text-[#4f6b4f] bg-[#efe7d7] px-3 py-1 rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">(28 reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ₹{(product.price + (isDrink ? addonsTotal : 0)).toFixed(2)}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ₹{(product.price * 1.2).toFixed(2)}
              </span>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                Save 17%
              </span>
            </div>


            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8 py-6 border-y">
              <div>
                <p className="text-sm text-gray-600 mb-1">Freshness</p>
                <p className="font-semibold text-gray-900">Made Fresh Daily</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Delivery</p>
                <p className="font-semibold text-gray-900">Free on orders ₹299+</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Ingredients</p>
                <p className="font-semibold text-gray-900">Premium Quality</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Availability</p>
                <p className="font-semibold text-[#4f6b4f]">In Stock</p>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={handleDecrease}
                    className="px-4 py-2 text-gray-600 hover:text-[#4f6b4f] transition"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold text-gray-900 border-l border-r border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="px-4 py-2 text-gray-600 hover:text-[#4f6b4f] transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`flex items-center justify-center gap-2 w-full py-4 rounded-lg font-semibold text-lg transition ${
                  addedToCart
                    ? "bg-[#3f5a3f] text-white"
                    : "bg-[#4f6b4f] text-white hover:bg-[#3f5a3f]"
                }`}
              >
                <ShoppingCart size={24} />
                {addedToCart
                  ? "Added to Cart!"
                  : `Add to Cart — ₹${(product.price + (isDrink ? addonsTotal : 0)).toFixed(2)}`}
              </button>

              {/* Like Button */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center justify-center gap-2 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:border-red-500 hover:text-red-500 transition"
              >
                <Heart
                  size={24}
                  className={isLiked ? "fill-red-500 text-red-500" : ""}
                />
                {isLiked ? "Liked" : "Add to Favorites"}
              </button>
            </div>

            {/* Guarantee */}
            <div className="mt-8 p-4 bg-[#efe7d7] border border-[#d7cfbf] rounded-lg">
              <p className="text-sm text-[#4f6b4f]">
                ✓ 100% Fresh Guarantee | ✓ Satisfaction Guaranteed | ✓ Easy Returns
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="bg-[#fbf7ef] py-12 border-t mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  onClick={() => router.push(`/products/${relatedProduct.slug}`)}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
                >
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-[#4f6b4f] font-bold">
                      ₹{relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

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
    </div>
  );
}
