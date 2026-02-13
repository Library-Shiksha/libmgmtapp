import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DashboardSeatGrid } from "@/components/dashboard/dashboard-seat-grid"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  // Fetch all seats with their active bookings
  const { data: seatsData } = await supabase
    .from('seats')
    .select('*, bookings(*)')

  const processedSeats = seatsData?.map(seat => ({
    ...seat,
    bookings: seat.bookings.filter((b: any) => b.status === 'active')
  })) || []

  // Fetch user's personal booking
  const userBooking = processedSeats
    .flatMap(s => s.bookings)
    .find((b: any) => b.user_id === user.id)

  const activeSeat = userBooking ? processedSeats.find(s => s.id === userBooking.seat_id) : null

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-8">
        {/* My Status Section - Top Priority */}
        <div className="w-full">
          <Card className="bg-primary/5 border-primary/20 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="font-semibold">My Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeSeat ? (
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-primary">Seat {activeSeat.seat_number}</p>
                    <p className="text-sm text-muted-foreground mt-1">Active since {new Date(userBooking.start_time).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-800 border border-green-200">
                      ● Occupied
                    </span>
                    <form action={async () => {
                      "use server"
                      const { cancelBooking } = await import("./actions")
                      await cancelBooking()
                    }}>
                      <Button variant="destructive" size="sm">
                        Release Seat
                      </Button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <p className="text-muted-foreground">You don't have an active seat booking.</p>
                  <Button asChild>
                    <Link href="/dashboard/book">Book a Seat Now</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Seat Map Section - Removed Card wrapper to match Book Page design */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Live Seat Map</h2>
          <DashboardSeatGrid seats={processedSeats} />
        </div>
      </div>
    </div>
  )
}
