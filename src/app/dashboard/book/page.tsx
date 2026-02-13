import { getSeats } from "@/app/admin/actions"
import { SeatView } from "@/components/dashboard/seat-view"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function BookSeatPage() {
  // Check subscription status here in future
  const seats = await getSeats()

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard"><ArrowLeft className="w-4 h-4" /></Link>
        </Button>
        <h1 className="text-2xl font-bold">Book a Seat</h1>
      </div>

      <SeatView seats={seats} />
    </div>
  )
}
