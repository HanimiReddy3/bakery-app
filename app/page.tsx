import { Hero } from "../components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Story } from "@/components/home/Story";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main className="space-y-24 pb-24">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Story />
      <Testimonials />
    </main>
  );
}
