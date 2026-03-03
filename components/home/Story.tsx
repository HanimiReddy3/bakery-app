import Image from "next/image";

export function Story() {
  return (
    <section className="container mx-auto px-6">
      <div className="bg-[#f2eadb] rounded-3xl p-12 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf"
            alt="Baker"
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        <div className="space-y-6">
          <span className="text-[#4f6b4f] text-sm font-semibold uppercase">
            Our Craft & Story
          </span>

          <h2 className="text-3xl font-bold">
            Tradition in Every Bite
          </h2>

          <p className="text-neutral-600 leading-relaxed">
            At Pera, we believe that the best bread takes time.
            We use century-old sourdough starters, organic stone-ground flour,
            and the purest ingredients.
          </p>

          <div className="flex gap-10 text-[#4f6b4f] font-semibold">
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
