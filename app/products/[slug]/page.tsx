"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/lib/products";
import { Heart, ShoppingCart, ArrowLeft, Star } from "lucide-react";
import { useCartStore } from "@/features/cart/store";
import Image from "next/image";

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const product = products.find((p) => p.slug === params.slug);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCartStore();

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition"
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
              <span className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
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
                ${product.price.toFixed(2)}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ${(product.price * 1.2).toFixed(2)}
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
                <p className="font-semibold text-gray-900">Free on orders $30+</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Ingredients</p>
                <p className="font-semibold text-gray-900">Premium Quality</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Availability</p>
                <p className="font-semibold text-green-600">In Stock</p>
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
                    className="px-4 py-2 text-gray-600 hover:text-orange-600 transition"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold text-gray-900 border-l border-r border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="px-4 py-2 text-gray-600 hover:text-orange-600 transition"
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
                    ? "bg-green-600 text-white"
                    : "bg-orange-600 text-white hover:bg-orange-700"
                }`}
              >
                <ShoppingCart size={24} />
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
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
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                ✓ 100% Fresh Guarantee | ✓ Satisfaction Guaranteed | ✓ Easy Returns
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="bg-gray-50 py-12 border-t mt-16">
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
                    <p className="text-orange-600 font-bold">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
