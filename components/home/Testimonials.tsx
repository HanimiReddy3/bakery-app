import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Emily H.",
    role: "Customer",
    text: "The sourdough is absolutely life-changing. You can taste the love in every bite.",
    rating: 5
  },
  {
    name: "Michael J.",
    role: "Customer",
    text: "Best croissants outside of Paris. Flaky, buttery and fresh every morning.",
    rating: 5
  },
  {
    name: "Sarah C.",
    role: "Customer",
    text: "Delivery service is impeccable. My tarts arrived perfectly fresh.",
    rating: 5
  },
  {
    name: "David W.",
    role: "Customer",
    text: "Love that they use organic ingredients throughout. Highly recommended!",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="container mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">
        What Our Customers Are Saying
      </h2>

      <p className="text-neutral-500 mb-12">
        Real stories from our beloved pastry lovers
      </p>

      <div className="grid md:grid-cols-4 gap-8">
        {testimonials.map((t, index) => (
          <Card key={index} className="rounded-2xl shadow-sm border-0">
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-1 justify-start">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                ))}
              </div>
              <p className="text-neutral-600 italic text-left text-sm">"{t.text}"</p>
              <div className="text-left">
                <p className="font-semibold text-orange-500">
                  {t.name}
                </p>
                <p className="text-xs text-neutral-500">{t.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
