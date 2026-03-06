import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <>
    <section className="relative w-full h-[700px] pt-20 flex items-center justify-center">
      <Image
        src="/hero-bg.jpg"
        alt="Fresh Bread"
        fill
        priority
        className="object-cover"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* content positioned like reference */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pt-6 sm:pt-10">
        <div className="w-full flex justify-center">
          <div className="max-w-2xl w-full text-white space-y-6 pt-28 pb-52 text-center mx-auto px-4 sm:px-6">
            <span className="inline-block bg-[#e5dccb] text-[#4f6b4f] px-3 py-1 rounded-full uppercase text-xs tracking-wide">
              Freshly Baked Daily
            </span>

            <h1 className="lg:text-5xl sm:text-2xl font-bold leading-tight">
              The Heart of Sourdough <br /> in Your Neighborhood
            </h1>

            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Experience the warmth of artisanal techniques and heritage grains. Order online and collect your warm loaf straight from our oven.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 justify-center items-center">
              <Link href="/products">
                <Button className="bg-[#4f6b4f] hover:bg-[#3f5a3f] rounded-full px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg flex items-center gap-2 w-full sm:w-auto">
                  Order for Collection
                </Button>
              </Link>
              <Link href="/products?menu=1">
                <Button className="bg-[#4f6b4f] hover:bg-[#3f5a3f] rounded-full px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto">
                  View Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg viewBox="0 0 1600 277" className="w-full h-24 sm:h-28" preserveAspectRatio="none">
          <path
            fill="#4f6b4f"
            d="M-25.5,126S94.62,114.528,240,207s340-54,340-54,166.442-192.959,501-18,347-41,347-41,28.57-74.371,218-94V281H-24Z"
          />
          <path
            fill="#fafafa"
            d="M-13.5,235S80.185,227.711,223,135c145.885-94.7,316.864-34.83,476.666,15.921C872.568,205.831,1040.29,117.25,1137,60c132.8-78.609,295.57-81.607,488,25V280H-18Z"
          />
        </svg>
      </div>
    </section>
    <section className="relative">
      <div className="container mx-auto px-4 sm:px-6 -mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { value: "25+", label: "Years of excellence" },
            { value: "20+", label: "Outlets" },
            { value: "100%", label: "In-house production" },
            { value: "500+", label: "Delicious creations" },
            { value: "1M+", label: "Customers served" }
          ].map((stat) => (
            <div
              key={stat.label}
              className="group bg-white rounded-2xl shadow-[0_18px_40px_rgba(0,0,0,0.08)] px-6 py-7 text-center border border-[#d7e3d7] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(79,107,79,0.25),0_10px_20px_rgba(0,0,0,0.08)] hover:border-[#4f6b4f]"
            >
              <div className="text-3xl font-semibold text-[#4f6b4f] transition-colors duration-300 group-hover:text-[#3f5a3f]">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-600 mt-2 transition-colors duration-300 group-hover:text-[#4f6b4f]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
