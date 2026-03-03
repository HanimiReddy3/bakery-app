import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#f7f1e6] text-[#2f3f2f]">
      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1.1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/pera-logo.png"
                alt="Pera"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-contain"
              />
              <h3 className="text-xl font-semibold tracking-tight">Pera</h3>
            </div>
            <p className="text-sm leading-6 text-[#6c7a6a]">
              Artisan bakery crafting small-batch breads, pastries, and seasonal treats.
              Fresh daily, delivered with care.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-[#6c7a6a]">
              <span className="rounded-full border border-[#d7cfbf] px-3 py-1">Same-day delivery</span>
              <span className="rounded-full border border-[#d7cfbf] px-3 py-1">Small-batch baked</span>
              <span className="rounded-full border border-[#d7cfbf] px-3 py-1">Eco packaging</span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#58684f]">
              Shop
            </h4>
            <ul className="space-y-3 text-sm text-[#6c7a6a]">
              <li><Link href="/" className="transition hover:text-[#4f6b4f] hover:underline underline-offset-4">Home</Link></li>
              <li><Link href="/products" className="transition hover:text-[#4f6b4f] hover:underline underline-offset-4">Shop All</Link></li>
              <li><Link href="/collections" className="transition hover:text-[#4f6b4f] hover:underline underline-offset-4">Collections</Link></li>
              <li><Link href="/story" className="transition hover:text-[#4f6b4f] hover:underline underline-offset-4">Our Story</Link></li>
              <li><Link href="/contact" className="transition hover:text-[#4f6b4f] hover:underline underline-offset-4">Store Locator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#58684f]">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-[#6c7a6a]">
              <li><Link href="/contact" className="transition hover:text-[#4f6b4f] hover:underline underline-offset-4">Help & Contact</Link></li>
              <li><Link href="/account/orders" className="transition hover:text-[#4f6b4f] hover:underline underline-offset-4">Track Your Order</Link></li>
              <li><Link href="/contact" className="transition hover:text-[#4f6b4f] hover:underline underline-offset-4">Delivery Zones</Link></li>
              <li><Link href="/contact" className="transition hover:text-[#4f6b4f] hover:underline underline-offset-4">Allergen & Nutrition Guide</Link></li>
              <li><Link href="/contact" className="transition hover:text-[#4f6b4f] hover:underline underline-offset-4">Catering & Events</Link></li>
            </ul>
          </div>

          <div className="space-y-5">
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#58684f]">
                Bakery News
              </h4>
              <p className="text-sm text-[#6c7a6a]">
                Get early access to seasonal drops and members-only offers.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="footer-email">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-[#d7cfbf] bg-white px-4 py-2 text-sm text-[#2f3f2f] placeholder:text-[#9aa58e] focus:border-[#4f6b4f] focus:outline-none focus:ring-2 focus:ring-[#4f6b4f]/30"
              />
              <button
                type="submit"
                className="rounded-lg bg-[#4f6b4f] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#3f5a3f]"
              >
                Subscribe
              </button>
            </form>
            <div className="grid gap-3 text-sm text-[#6c7a6a]">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d7cfbf] bg-white">
                  ☎️
                </span>
                <span>+91 90000 12345</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d7cfbf] bg-white">
                  📍
                </span>
                <span>Road No. 12, Banjara Hills, Hyderabad</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d7cfbf] bg-white">
                  ⏰
                </span>
                <span>Mon–Sat 7am–7pm · Sun 8am–4pm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-[#e1d7c6] pt-6 text-sm text-[#6c7a6a] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 Pera. All rights reserved.</span>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-[#d7cfbf] px-3 py-1 text-xs text-[#5f6f5f]">Visa</span>
              <span className="rounded-full border border-[#d7cfbf] px-3 py-1 text-xs text-[#5f6f5f]">Mastercard</span>
              <span className="rounded-full border border-[#d7cfbf] px-3 py-1 text-xs text-[#5f6f5f]">AmEx</span>
              <span className="rounded-full border border-[#d7cfbf] px-3 py-1 text-xs text-[#5f6f5f]">Apple Pay</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#6c7a6a]">Follow</span>
            <div className="flex items-center gap-2">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d7cfbf] text-[#6c7a6a] transition hover:border-[#9eab8e] hover:text-[#4f6b4f] hover:bg-[#efe7d7]"
                aria-label="Pera on Instagram"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d7cfbf] text-[#6c7a6a] transition hover:border-[#9eab8e] hover:text-[#4f6b4f] hover:bg-[#efe7d7]"
                aria-label="Pera on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d7cfbf] text-[#6c7a6a] transition hover:border-[#9eab8e] hover:text-[#4f6b4f] hover:bg-[#efe7d7]"
                aria-label="Pera on X"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d7cfbf] text-[#6c7a6a] transition hover:border-[#9eab8e] hover:text-[#4f6b4f] hover:bg-[#efe7d7]"
                aria-label="Pera on YouTube"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
