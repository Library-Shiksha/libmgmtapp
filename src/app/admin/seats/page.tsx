import { getSeats } from "@/app/admin/actions"
import { SeatGrid } from "@/components/admin/seat-grid"

export default async function AdminSeatsPage() {
  const seats = await getSeats()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Seat Management</h1>
      </div>
      <div className="max-w-4xl mx-auto">
        <p className="text-muted-foreground mb-4">
          Click on any cell to add a seat. Click on an existing seat to delete it.
        </p>
        <SeatGrid initialSeats={seats} />
      </div>
    </div>
  )
}
