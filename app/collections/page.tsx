"use client";

import Image from "next/image";

const giftingImages = [
  "https://images.unsplash.com/photo-1486427944299-d1955d23e34d",
  "https://images.unsplash.com/photo-1509440159596-0249088772ff",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e"
];

const corporateImages = [
  "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e"
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[#f7f1e6]">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#4f6b4f]">Custom Orders</h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Bespoke gifting boxes and corporate spreads crafted with our signature bakes.
          </p>
        </div>

        {/* Gifting */}
        <section id="gifting" className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-[#4f6b4f]">Gifting</h2>
          <p className="mt-2 text-md text-gray-500">
            Experience the magic of unwrapping happiness with Pera’s handcrafted gift boxes.
          </p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {giftingImages.map((src) => (
              <div key={src} className="relative aspect-square rounded-lg overflow-hidden shadow-sm border border-[#e1d7c6]">
                <Image src={src} alt="Gift box" fill className="object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* Corporate Orders */}
        <section id="corporate-orders" className="mt-14 text-center">
          <h2 className="text-xl font-semibold text-[#4f6b4f]">Corporate Orders</h2>
          <p className="mt-2 text-md text-gray-500">
            Treat your team with curated boxes of our irresistible snacks and treats.
          </p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {corporateImages.map((src) => (
              <div key={src} className="relative aspect-square rounded-lg overflow-hidden shadow-sm border border-[#e1d7c6]">
                <Image src={src} alt="Corporate order" fill className="object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* Inquiry Form */}
        <section className="mt-16">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-[#4f6b4f]">Custom Orders</h3>
            <p className="mt-2 text-md text-gray-500">
              Reach out with your inquiry for gifting or corporate orders by filling out the form.
            </p>
          </div>

          <div className="mt-6 max-w-lg mx-auto bg-white border border-[#e1d7c6] rounded-xl shadow-sm p-6">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name (*)"
                className="w-full rounded-md border border-[#e1d7c6] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f6b4f]/30"
              />
              <input
                type="email"
                placeholder="Email address (*)"
                className="w-full rounded-md border border-[#e1d7c6] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f6b4f]/30"
              />
              <input
                type="tel"
                placeholder="Phone number (*)"
                className="w-full rounded-md border border-[#e1d7c6] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f6b4f]/30"
              />
              <select
                defaultValue=""
                className="w-full rounded-md border border-[#e1d7c6] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f6b4f]/30"
              >
                <option value="" disabled>
                  Enquiry for (*)
                </option>
                <option>Gifting</option>
                <option>Corporate Orders</option>
                <option>Other Occasions</option>
              </select>
              <textarea
                placeholder="Share note on your requirement"
                rows={4}
                className="sm:col-span-2 w-full rounded-md border border-[#e1d7c6] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f6b4f]/30"
              />
              <button
                type="submit"
                className="sm:col-span-2 mt-2 inline-flex items-center justify-center rounded-md bg-[#4f6b4f] px-5 py-2 text-sm font-medium text-white hover:bg-[#3f5a3f]"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
