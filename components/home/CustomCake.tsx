import Image from "next/image";
import Link from "next/link";

export function CustomCake() {
  return (
    <section className="container mx-auto px-4">
      <div className="relative overflow-hidden rounded-3xl border border-[#e1d7c6] bg-neutral-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1600&q=80"
            alt="Baker designing a custom cake"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20 text-center text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
            Design Your Own Cake
          </h2>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-white/85 max-w-2xl mx-auto">
            Pick your flavors, colors, and toppings. Our master bakers will bring your vision to
            life for your most special occasions.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-pink-500/30  transition bg-[#4f6b4f] hover:bg-[#3f5a3f]"
            >
              Start Customizing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
