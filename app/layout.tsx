import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://pera-bakery.com"),
  title: {
    default: "Pera Bakery | Artisan Breads, Pastries & Cakes in Hyderabad",
    template: "%s | Pera Bakery"
  },
  description:
    "Pera Bakery brings artisan breads, pastries, custom cakes, and seasonal menus to Hyderabad. Discover handcrafted bakes, chef-tested recipes, and bakery stories.",
  keywords: [
    "Hyderabad bakery",
    "artisan bread",
    "pastries",
    "custom cakes",
    "sourdough",
    "bakery near me",
    "Pera Bakery"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Pera Bakery | Artisan Breads, Pastries & Cakes in Hyderabad",
    description:
      "Artisan breads, pastries, custom cakes, and seasonal menus crafted fresh in Hyderabad.",
    url: "/",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Pera Bakery | Artisan Breads, Pastries & Cakes in Hyderabad",
    description:
      "Artisan breads, pastries, custom cakes, and seasonal menus crafted fresh in Hyderabad."
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
