import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { CakeSlice, Cookie, CupSoda, Coffee, Leaf } from "lucide-react"

const items = [
  { name: "Cakes", icon: CakeSlice },
  { name: "Cupcakes", icon: CupSoda },
  { name: "Cookies", icon: Cookie },
  { name: "Brownies", icon: Coffee },
  { name: "Vegan", icon: Leaf },
]

export default function CollectionsSection() {
  return (
    <section className="py-16 bg-muted/40">
      <div className="container mx-auto text-center">

        <h3 className="text-sm tracking-widest text-orange-500 mb-8">
          BROWSE COLLECTIONS
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {items.map((item) => {
            const Icon = item.icon

            return (
              <Card key={item.name} className="hover:shadow-md transition">
                <CardContent className="flex flex-col items-center py-6">
                  <AspectRatio ratio={1 / 1}>
                    <div className="flex items-center justify-center h-full">
                      <Icon className="h-8 w-8" />
                    </div>
                  </AspectRatio>
                  <p className="mt-3 text-sm font-medium">
                    {item.name}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
