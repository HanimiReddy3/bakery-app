"use client";

import Link from "next/link";
import { Instagram, Play } from "lucide-react";
import { useState } from "react";

const reels = [
  {
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=800&auto=format&fit=crop",
    alt: "Croissants finishing in the oven",
    href: "https://www.instagram.com/reel/C8s5L5Jq7jT/"
  },
  {
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?q=80&w=800&auto=format&fit=crop",
    alt: "Baker kneading dough",
    href: "https://www.instagram.com/reel/C8rYxg1q8sP/"
  },
  {
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    poster: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    alt: "Rustic sourdough loaves",
    href: "https://www.instagram.com/reel/C8pK3yTq4mQ/"
  },
  {
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    poster: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop",
    alt: "Cupcakes with fruit toppings",
    href: "https://www.instagram.com/reel/C8oVtU6q7aA/"
  },
  {
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=800&auto=format&fit=crop",
    alt: "Pastry chef plating dessert",
    href: "https://www.instagram.com/reel/C8n2tK1q9sB/"
  },
  {
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop",
    alt: "Bread baking in the oven",
    href: "https://www.instagram.com/reel/C8mQ2sLq3hR/"
  },
  {
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    poster: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=800&auto=format&fit=crop",
    alt: "Chocolate pastries with drizzle",
    href: "https://www.instagram.com/reel/C8lT7pQq6xK/"
  },
  {
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    alt: "Fresh coffee pour",
    href: "https://www.instagram.com/reel/C8kH1yRq5cD/"
  },
  {
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    alt: "Slicing fresh bread",
    href: "https://www.instagram.com/reel/C8j9pW0q8eF/"
  },
  {
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    poster: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop",
    alt: "Cookies baking",
    href: "https://www.instagram.com/reel/C8i4xD2q1mN/"
  },
  {
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    poster: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?q=80&w=800&auto=format&fit=crop",
    alt: "Flour pouring on dough",
    href: "https://www.instagram.com/reel/C8h0tV3q7zP/"
  },
  {
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop",
    alt: "Macarons on tray",
    href: "https://www.instagram.com/reel/C8g6wT4q9sS/"
  }
];

const INITIAL_COUNT = 8;
const LOAD_COUNT = 4;

export function InstagramGallery() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const visibleReels = reels.slice(0, visibleCount);
  const canLoadMore = visibleCount < reels.length;

  return (
    <section className="bg-[#f7f1e6] py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6b7d5a]">
              Bakery Reels
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[#2f3f2f]">
              Fresh from our ovens, straight to your feed
            </h2>
            <p className="mt-3 text-[#58684f] max-w-xl">
              Peek behind the scenes, watch our bakers at work, and discover new drops
              before anyone else.
            </p>
          </div>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#4f6b4f] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#3f5a3f]"
          >
            <Instagram className="h-4 w-4" />
            Follow on Instagram
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleReels.map((reel, index) => (
            <Link
              key={`${reel.alt}-${index}`}
              href={reel.href}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm"
              aria-label={`Open Instagram reel: ${reel.alt}`}
            >
              <video
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                src={reel.video}
                poster={reel.poster}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                aria-label={reel.alt}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#2f3f2f] shadow-lg transition group-hover:scale-105">
                  <Play className="h-4 w-4 fill-[#2f3f2f]" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {canLoadMore && (
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => Math.min(prev + LOAD_COUNT, reels.length))}
              className="rounded-full border border-[#cfc6b5] bg-white px-6 py-2 text-sm font-semibold text-[#2f3f2f] transition hover:border-[#9eab8e] hover:text-[#4f6b4f]"
            >
              Load more
            </button>
          )}
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#cfc6b5] bg-transparent px-6 py-2 text-sm font-semibold text-[#2f3f2f] transition hover:border-[#9eab8e] hover:text-[#4f6b4f]"
          >
            <Instagram className="h-4 w-4" />
            View more on Instagram
          </Link>
        </div>
      </div>
    </section>
  );
}
