import type { Metadata } from "next";
import { Hero } from "../components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Story } from "@/components/home/Story";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { BookTable } from "@/components/home/BookTable";
import { CustomCake } from "@/components/home/CustomCake";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Order artisan breads, pastries, and custom cakes from Pera Bakery in Hyderabad. Explore seasonal menus, featured bakes, and handcrafted desserts.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Pera Bakery | Artisan Breads, Pastries & Cakes in Hyderabad",
    description:
      "Discover artisan bakes, seasonal pastries, and custom cakes made fresh at Pera Bakery.",
    url: "/",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Pera Bakery | Artisan Breads, Pastries & Cakes in Hyderabad",
    description:
      "Discover artisan bakes, seasonal pastries, and custom cakes made fresh at Pera Bakery."
  }
};

export default function Home() {
  return (
    <main className="space-y-24">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <CustomCake />
      <BookTable />
      <Story />
      <Testimonials />
      <InstagramGallery />
    </main>
  );
}
