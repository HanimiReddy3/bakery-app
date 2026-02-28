"use client";

import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const testimonials = [
  {
    name: "Emily H.",
    role: "Customer",
    text: "The sourdough is absolutely life-changing. You can taste the love in every bite.",
    rating: 5
  },
  {
    name: "Michael J.",
    role: "Customer",
    text: "Best croissants outside of Paris. Flaky, buttery and fresh every morning.",
    rating: 5
  },
  {
    name: "Sarah C.",
    role: "Customer",
    text: "Delivery service is impeccable. My tarts arrived perfectly fresh.",
    rating: 5
  },
  {
    name: "David W.",
    role: "Customer",
    text: "Love that they use organic ingredients throughout. Highly recommended!",
    rating: 5
  }
];

export function Testimonials() {
  const Slider = dynamic(() => import("react-slick"), { ssr: false }) as any;
  const sliderRef = useRef<any>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="container mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">What Our Customers Are Saying</h2>

      <p className="text-neutral-500 mb-8">Real stories from our beloved pastry lovers</p>

      <div className="relative">
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 z-20">
          <button
            aria-label="Previous review"
            onClick={() => sliderRef.current?.slickPrev()}
            className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-700" />
          </button>
        </div>

        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 z-20">
          <button
            aria-label="Next review"
            onClick={() => sliderRef.current?.slickNext()}
            className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5 text-neutral-700" />
          </button>
        </div>

        <Slider ref={sliderRef} {...settings} className="py-4">
          {testimonials.map((t, index) => (
            <div key={index} className="px-3">
              <Card className="rounded-2xl shadow-sm border-0 h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1 justify-start">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                  <p className="text-neutral-600 italic text-left text-sm">"{t.text}"</p>
                  <div className="text-left">
                    <p className="font-semibold text-orange-500">{t.name}</p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
