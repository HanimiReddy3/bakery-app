import CollectionsSection from "@/components/home/categories";
import FeaturedSection from "@/components/home/featured-products";
import HeroSection from "@/components/home/hero";
import PromoSection from "@/components/home/order-banner";
import TestimonialsSection from "@/components/home/reviews";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CollectionsSection />
      <FeaturedSection />
      <PromoSection />
      <TestimonialsSection />
      </>
  );
}
