import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white mt-24">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

        <div>
          <h3 className="text-lg font-bold mb-4">🍞 Bakery Delights</h3>
          <p className="text-sm text-neutral-400">
            Artisan bakery bringing the finest breads and pastries to your table in every moment.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><Link href="/" className="hover:text-orange-500 transition">Home</Link></li>
            <li><Link href="/products" className="hover:text-orange-500 transition">Shop</Link></li>
            <li><Link href="/" className="hover:text-orange-500 transition">Our Menu</Link></li>
            <li><Link href="/" className="hover:text-orange-500 transition">Baking Workshops</Link></li>
            <li><Link href="/" className="hover:text-orange-500 transition">Store Locator</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Customer Care</h4>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><Link href="/" className="hover:text-orange-500 transition">Shipping Policy</Link></li>
            <li><Link href="/" className="hover:text-orange-500 transition">Returns & Refunds</Link></li>
            <li><Link href="/" className="hover:text-orange-500 transition">Privacy Policy</Link></li>
            <li><Link href="/" className="hover:text-orange-500 transition">Terms of Service</Link></li>
            <li><Link href="/" className="hover:text-orange-500 transition">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Bakery News</h4>
          <p className="text-sm text-neutral-400 mb-4">
            Subscribe to get special offers and seasonal updates.
          </p>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition">
            Subscribe
          </button>
        </div>

      </div>

      <div className="border-t border-neutral-800 py-4 text-center text-sm text-neutral-500">
        © 2025 BAKERY DELIGHTS INC. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
