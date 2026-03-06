import Image from "next/image";

export function Story() {
  return (
    <section className="container mx-auto px-6">
      <div className="bg-[#f2eadb] rounded-3xl p-6 sm:p-10 md:p-16 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div className="relative h-[300px] sm:h-[400px] mb-6 md:mb-0">
          <Image
            src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf"
            alt="Baker"
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        <div className="flex flex-col gap-4 sm:gap-6">
          <span className="text-[#4f6b4f] text-sm font-semibold uppercase">
            Our Craft & Story
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold">
            Tradition in Every Bite
          </h2>

          <p className="text-neutral-600 leading-relaxed">
            At Pera, we believe that the best bread takes time.
            We use century-old sourdough starters, organic stone-ground flour,
            and the purest ingredients.
          </p>

          <div className="flex gap-6 sm:gap-10 text-[#4f6b4f] font-semibold mt-4">
            <div>
              <p className="text-2xl">100%</p>
              <p className="text-sm text-neutral-600">Organic</p>
            </div>
            <div>
              <p className="text-2xl">48h</p>
              <p className="text-sm text-neutral-600">Fermentation</p>
            </div>
            <div>
              <p className="text-2xl">Hand</p>
              <p className="text-sm text-neutral-600">Crafted</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
