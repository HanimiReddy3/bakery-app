"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[750px] overflow-hidden">

      {/* Background Image */}
      <img
        src="/hero-bg.jpg"
        alt="Baklava"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Soft Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[750px] px-6">
        
        <div className="text-center max-w-2xl">

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white">
            Freshly baked <br />
            <span className="text-orange-500">every morning</span>
          </h1>

          <p className="text-lg text-gray-200 max-w-[400px]">
            Artisanal treats made with organic flour and local ingredients.
            Order online & collect in store today.
          </p>

          {/* Action Box */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 
            bg-white/95 backdrop-blur-md p-2 rounded-lg shadow-2xl mx-auto">

            <Select>
              <SelectTrigger className="w-[200px] border-0 shadow-none focus:ring-0">
                <SelectValue placeholder="London" />
              </SelectTrigger>
              <SelectContent className="border-0 shadow-none focus:ring-0">
                <SelectItem value="london">London</SelectItem>
                <SelectItem value="manchester">Manchester</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-orange-500 hover:bg-orange-600 px-6 h-11 rounded-md">
              Order Now →
            </Button>

          </div>

        </div>
      </div>
    </section>
  )
}
