"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function FeaturedProducts() {
  const Slider = dynamic(() => import("react-slick"), { ssr: false }) as any;
  const sliderRef = useRef<any>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="container mx-auto px-6 relative">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Daily Specials & Top Sellers</h2>

      <div className="absolute right-6 top-2 flex gap-3 z-20">
        <button
          aria-label="Previous"
          onClick={() => sliderRef.current?.slickPrev()}
          className="w-10 h-10 rounded-full bg-white/90 text-neutral-700 shadow flex items-center justify-center hover:bg-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          aria-label="Next"
          onClick={() => sliderRef.current?.slickNext()}
          className="w-10 h-10 rounded-full bg-white/90 text-neutral-700 shadow flex items-center justify-center hover:bg-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <Slider ref={sliderRef} {...settings} className="px-2">
        {products.map((product) => (
          <div key={product.id} className="px-4 flex">
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>

    </section>
  );
}
