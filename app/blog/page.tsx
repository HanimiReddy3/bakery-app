import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Pera Journal | Artisan Baking, Recipes & Bakery Stories",
  description:
    "Explore Pera Journal for artisan baking tips, chef-tested recipes, seasonal pastry guides, and behind-the-scenes stories from our Hyderabad bakery.",
  keywords: [
    "Pera bakery blog",
    "artisan baking tips",
    "Hyderabad bakery",
    "pastry recipes",
    "sourdough guide",
    "croissant tips",
    "seasonal pastries"
  ],
  alternates: {
    canonical: "/blog"
  },
  openGraph: {
    title: "Pera Journal | Artisan Baking, Recipes & Bakery Stories",
    description:
      "Chef-tested recipes, bakery stories, and seasonal pastry inspiration from Pera in Hyderabad.",
    url: "/blog",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Pera Journal | Artisan Baking, Recipes & Bakery Stories",
    description:
      "Chef-tested recipes, bakery stories, and seasonal pastry inspiration from Pera in Hyderabad."
  }
};

const posts = [
  {
    title: "Behind the Scenes: Our Sourdough Starter",
    excerpt:
      "How our living culture shapes aroma, tang, and an impossibly light crumb in every loaf.",
    href: "/blog",
    category: "Baking Craft",
    readTime: "6 min read",
    date: "March 2026",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Seasonal Pastries: Spring Citrus Collection",
    excerpt:
      "Bright, market-fresh flavors with orange blossom, lime zest, and delicate creams.",
    href: "/blog",
    category: "Seasonal Menu",
    readTime: "5 min read",
    date: "March 2026",
    image:
      "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Baking Tips: Perfecting a Flaky Croissant",
    excerpt:
      "From butter temperature to lamination folds—get crisp layers every time.",
    href: "/blog",
    category: "Pro Tips",
    readTime: "7 min read",
    date: "February 2026",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Pairing Guide: Coffee & Pastries",
    excerpt:
      "Discover how roast profiles complement brioche, tarts, and viennoiserie.",
    href: "/blog",
    category: "Pairing",
    readTime: "4 min read",
    date: "February 2026",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Cakes for Every Celebration",
    excerpt:
      "A chef’s guide to choosing flavors, fillings, and finishes for your big day.",
    href: "/blog",
    category: "Celebrations",
    readTime: "6 min read",
    date: "January 2026",
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Inside Our Ingredient Philosophy",
    excerpt:
      "Why we choose slow-fermented doughs, local dairy, and real vanilla beans.",
    href: "/blog",
    category: "Ingredients",
    readTime: "5 min read",
    date: "January 2026",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80"
  }
];

const topics = [
  {
    title: "Sourdough & Bread",
    description: "Starter care, fermentation, and loaf shaping tips.",
    href: "/products"
  },
  {
    title: "Pastry & Viennoiserie",
    description: "Croissant technique, puff pastry, and glazes.",
    href: "/products"
  },
  {
    title: "Seasonal Menus",
    description: "What’s baking this month at Pera.",
    href: "/collections"
  },
  {
    title: "Bakery Stories",
    description: "Meet our chefs and learn our craft.",
    href: "/story"
  }
];

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Pera Journal",
    url: "/blog",
    description:
      "Chef-tested recipes, bakery stories, and seasonal pastry inspiration from Pera in Hyderabad.",
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: "Pera",
      url: "/"
    },
    blogPost: posts.slice(0, 3).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: post.href,
      datePublished: "2026-03-01",
      author: {
        "@type": "Organization",
        name: "Pera Bakery"
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#f7f1e6]">
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-gradient-to-br from-[#f7f1e6] via-white to-[#f2eadc] py-16 px-4">
        <div className="container mx-auto">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <p className="uppercase tracking-[0.35em] text-xs text-[#4f6b4f] font-semibold">
                Pera Journal
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-4">
                Artisan baking stories, recipes, and pastry guides.
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mt-5">
                Learn the craft behind our sourdough, discover seasonal pastries, and get
                chef-tested techniques from Hyderabad’s favorite bakery.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  href="/products"
                  className="bg-[#4f6b4f] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#3f5a3f] transition"
                >
                  Shop baked favorites
                </Link>
                <Link
                  href="/collections"
                  className="border border-[#4f6b4f] text-[#4f6b4f] px-6 py-3 rounded-full font-semibold hover:bg-[#4f6b4f]/10 transition"
                >
                  Explore seasonal menus
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-10 max-w-lg">
                {[
                  { label: "Weekly bakes", value: "30+" },
                  { label: "Local suppliers", value: "12" },
                  { label: "Chef insights", value: "50+" }
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-white/80 border border-[#e1d7c6] p-4 text-center"
                  >
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-white border border-[#e1d7c6] p-8 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-[#4f6b4f] font-semibold">
                Featured article
              </p>
              <h2 className="text-2xl font-semibold text-gray-900 mt-4">
                The Pera croissant standard
              </h2>
              <p className="text-gray-600 mt-4">
                Master butter blocks, dough temperature, and proofing for a crisp, airy
                croissant—the bakery way.
              </p>
              <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
                <span>7 min read</span>
                <span>Updated March 2026</span>
              </div>
              <Link
                href="/blog"
                className="mt-6 inline-flex items-center text-[#4f6b4f] font-semibold hover:text-[#3f5a3f]"
              >
                Read the feature →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">Latest from the kitchen</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Fresh insights, seasonal menus, and baking techniques curated by Pera’s pastry team.
            </p>
          </div>
          <Link
            href="/collections"
            className="text-[#4f6b4f] font-semibold hover:text-[#3f5a3f]"
          >
            View seasonal collections →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="rounded-2xl bg-white p-6 shadow-sm border border-[#e1d7c6] flex flex-col"
            >
              <div className="rounded-xl overflow-hidden border border-[#e1d7c6]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-gray-500 mt-4">
                <span className="text-[#4f6b4f] font-semibold">{post.category}</span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mt-4">
                {post.title}
              </h3>
              <p className="text-gray-600 mt-3 flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
                <span>{post.readTime}</span>
                <Link
                  href={post.href}
                  className="text-[#4f6b4f] font-semibold hover:text-[#3f5a3f]"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-14">
        <div className="rounded-3xl border border-[#e1d7c6] bg-white/80 p-8 md:p-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">Popular topics</h2>
            <p className="text-gray-600 mt-3">
              Navigate by the flavors you love—from sourdough staples to seasonal pastry drops.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 mt-6">
              {topics.map((topic) => (
                <Link
                  key={topic.title}
                  href={topic.href}
                  className="rounded-2xl border border-[#e1d7c6] bg-white p-5 hover:shadow-sm transition"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{topic.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{topic.description}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-[#f7f1e6] p-6 border border-[#e1d7c6]">
            <h3 className="text-xl font-semibold text-gray-900">Why read Pera Journal?</h3>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li>• Chef-tested techniques you can use at home.</li>
              <li>• Seasonal flavor guides for Hyderabad’s markets.</li>
              <li>• Ingredient transparency and sourcing stories.</li>
              <li>• Pairing tips for coffee, tea, and desserts.</li>
            </ul>
            <Link
              href="/story"
              className="mt-6 inline-flex items-center text-[#4f6b4f] font-semibold hover:text-[#3f5a3f]"
            >
              Meet the team →
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-14">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl bg-white border border-[#e1d7c6] p-8">
            <h2 className="text-2xl font-semibold text-gray-900">Bake along with us</h2>
            <p className="text-gray-600 mt-3">
              Sign up for weekly recipes, seasonal updates, and exclusive bakery tips.
            </p>
            <form className="mt-6 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-[#e1d7c6] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f6b4f]/40"
              />
              <button
                type="button"
                className="rounded-full bg-[#4f6b4f] text-white px-6 py-3 font-semibold hover:bg-[#3f5a3f] transition"
              >
                Join the list
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-3">
              By subscribing, you agree to receive email updates from Pera.
            </p>
          </div>
          <div className="rounded-3xl border border-[#e1d7c6] bg-white/90 p-8">
            <h2 className="text-2xl font-semibold text-gray-900">FAQs</h2>
            <div className="mt-6 space-y-4 text-gray-600">
              <details className="rounded-2xl border border-[#e1d7c6] bg-white p-4 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                  <span>How often do you publish new posts?</span>
                  <span
                    aria-hidden="true"
                    className="text-gray-400 font-light transition-transform duration-200 group-open:rotate-180"
                  >
                    ˅
                  </span>
                </summary>
                <p className="mt-2">
                  We publish new stories and recipes every week, with extra seasonal guides during
                  festival months.
                </p>
              </details>
              <details className="rounded-2xl border border-[#e1d7c6] bg-white p-4 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                  <span>Can I request a topic or recipe?</span>
                  <span
                    aria-hidden="true"
                    className="text-gray-400 font-light transition-transform duration-200 group-open:rotate-180"
                  >
                    ˅
                  </span>
                </summary>
                <p className="mt-2">
                  Absolutely. Share your idea through our contact page and our chefs will consider
                  it for an upcoming feature.
                </p>
              </details>
              <details className="rounded-2xl border border-[#e1d7c6] bg-white p-4 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                  <span>Do you offer baking classes?</span>
                  <span
                    aria-hidden="true"
                    className="text-gray-400 font-light transition-transform duration-200 group-open:rotate-180"
                  >
                    ˅
                  </span>
                </summary>
                <p className="mt-2">
                  We host seasonal workshops and tasting sessions. Follow our updates to reserve
                  a spot.
                </p>
              </details>
            </div>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center text-[#4f6b4f] font-semibold hover:text-[#3f5a3f]"
            >
              Ask a question →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
