import Link from "next/link";
import { Heart, Truck, Award } from "lucide-react";

export default function OurStory() {
  return (
    <div className="min-h-screen bg-[#f7f1e6]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#f7f1e6] to-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Our Story</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Crafting delicious memories, one pastry at a time
          </p>
        </div>
      </section>

      {/* Story Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl space-y-8">
        
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Started</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Pera was founded in 2015 with a simple dream: to bring the finest artisanal baked goods 
            to our community. What started as a small neighborhood bakery has blossomed into a beloved destination 
            for quality pastries, breads, and cakes.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our founder, Maria Santos, grew up in her grandmother's kitchen in Madrid, watching her create 
            magic with flour, butter, and passion. Today, we carry forward that legacy of excellence.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Award className="w-12 h-12 text-[#4f6b4f] mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Quality First</h3>
              <p className="text-gray-600">
                We use only the finest ingredients, sourced from trusted suppliers who share our commitment to excellence.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Heart className="w-12 h-12 text-[#4f6b4f] mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Made with Love</h3>
              <p className="text-gray-600">
                Every pastry is crafted by hand with care and attention to detail, infused with passion and tradition.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Truck className="w-12 h-12 text-[#4f6b4f] mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Fresh Delivery</h3>
              <p className="text-gray-600">
                We deliver fresh-baked items straight to your doorstep, ensuring maximum freshness and flavor.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="text-[#4f6b4f] font-bold">✓</span>
              <span className="text-gray-700">Traditional recipes passed down through generations</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#4f6b4f] font-bold">✓</span>
              <span className="text-gray-700">No artificial preservatives or ingredients</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#4f6b4f] font-bold">✓</span>
              <span className="text-gray-700">Baked fresh daily in small batches</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#4f6b4f] font-bold">✓</span>
              <span className="text-gray-700">Sustainable and eco-friendly practices</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#4f6b4f] font-bold">✓</span>
              <span className="text-gray-700">Community-focused and locally sourced</span>
            </li>
          </ul>
        </section>

        <section className="bg-[#efe7d7] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-gray-700 mb-6">
            Experience the difference quality makes. Order today and taste the passion in every bite.
          </p>
          <Link href="/products" className="inline-block bg-[#4f6b4f] hover:bg-[#3f5a3f] text-white font-semibold py-3 px-8 rounded-lg transition">
            Shop Now
          </Link>
        </section>
      </div>
    </div>
  );
}
