import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/40">
      <div className="container mx-auto text-center">

        <h2 className="text-2xl font-bold mb-10">
          What Our Neighbors Say
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <Card>
            <CardContent className="p-6 space-y-4 text-left">
              <p>
                "Best bakery in London! The sourdough is incredible."
              </p>

              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <span className="font-semibold">
                  Sarah Mitchell
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4 text-left">
              <p>
                "Online ordering was seamless and staff were lovely."
              </p>

              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="font-semibold">
                  James Davies
                </span>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  )
}
