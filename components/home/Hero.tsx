import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full h-[600px]">
      <Image
        src="https://images.unsplash.com/photo-1608198093002-ad4e005484ec"
        alt="Fresh Bread"
        fill
        priority
        className="object-cover"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* content centered over image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white space-y-6 px-4 md:px-0">
          <span className="inline-block bg-orange-200 text-orange-700 px-3 py-1 rounded-full uppercase text-xs tracking-wide">
            Freshly Baked Daily
          </span>

          <h1 className="text-5xl font-bold leading-tight">
            The Heart of Sourdough <br /> in Your Neighborhood
          </h1>

          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Experience the warmth of artisanal techniques and heritage grains. Order online and collect your warm loaf straight from our oven.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-6 justify-center">
            <Link href="/products">
              <Button className="bg-orange-500 hover:bg-orange-600 rounded-full px-10 py-6 text-lg flex items-center gap-2">
                
                Order for Collection
              </Button>
            </Link>
            <Link href="/menu">
              <Button  className="bg-orange-500 hover:bg-orange-600 rounded-full px-8 py-6 text-lg">
                View Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
