import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function PromoSection() {
  return (
    <section className="bg-orange-500 py-10 text-white">
      <div className="container mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="font-bold text-lg">
              Order before 4PM & Collect Same Day
            </h3>
            <p className="text-sm opacity-90">
              Available at all London locations.
            </p>
          </div>

          <Button variant="secondary">
            Choose Pickup Time
          </Button>
        </div>

        <Separator className="mt-8 bg-white/20" />
      </div>
    </section>
  )
}
