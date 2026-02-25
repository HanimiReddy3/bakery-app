import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const products = [
  {
    name: "Victoria Sponge",
    price: "£25",
    image: "/cake1.jpg",
  },
  {
    name: "Chocolate Fudge",
    price: "£28",
    image: "/cake2.jpg",
  },
  {
    name: "Lemon Drizzle",
    price: "£22",
    image: "/cake3.jpg",
  },
]

export default function FeaturedSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto">

        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Button variant="link">View All →</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.name} className="overflow-hidden">

              <div className="relative">
                <img
                  src={product.image}
                  className="h-56 w-full object-cover"
                  alt={product.name}
                />
                <Badge className="absolute top-3 right-3 bg-orange-500">
                  {product.price}
                </Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="font-semibold">{product.name}</h3>

                <Button className="mt-4 w-full" variant="outline">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
