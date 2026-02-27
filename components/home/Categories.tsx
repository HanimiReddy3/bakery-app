import Image from "next/image";

const categories = [
  {
    title: "Daily Bread",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec"
  },
  {
    title: "Artisan Pastries",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff"
  },
  {
    title: "Cakes & Occasions",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
  },
  {
    title: "Fresh Coffee",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
  }
];

export function Categories() {
  return (
    <section className="container mx-auto px-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">Explore Our Categories</h2>
          <p className="text-neutral-500 text-sm">
            Baked fresh every morning just for you
          </p>
        </div>
        <span className="text-orange-500 text-sm font-medium cursor-pointer">
          View All →
        </span>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer"
          >
            <Image
              src={cat.image}
              alt={cat.title}
              fill
              className="object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute bottom-4 left-4 text-white font-semibold text-lg">
              {cat.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
