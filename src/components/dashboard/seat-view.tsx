"use client"

import * as React from "react"
import { Seat } from "@/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { bookSeat } from "@/app/dashboard/actions"
import { bulkCreateSeats } from "@/app/admin/actions"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface SeatViewProps {
  seats: Seat[]
}

const ROWS = 16 // Extended for Entry Gate (0-15)
const COLS = 4

interface SeatIconProps {
  seat: Seat | undefined;
  isSelected: boolean;
  onClick: () => void;
  rotate?: boolean;
}

// Simplified version based on the "C-shape" description
const SimpleChairIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Back and Arms */}
    <path d="M 5 5 L 17 5 Q 20 5 20 8 L 20 16 Q 20 19 17 19 L 5 19" />
    {/* Seat Cushion */}
    <rect x="4" y="8" width="12" height="8" rx="1" />
  </svg>
)

const SeatIcon = ({ seat, isSelected, onClick, rotate }: SeatIconProps) => {
  return (
    <div
      className="flex flex-col items-center gap-1"
    >
      <div
        onClick={onClick}
        className={cn(
          "relative flex flex-col items-center justify-center cursor-pointer transition-all duration-200 select-none aspect-square w-full rounded-sm border",
          !seat && "border-dashed border-muted-foreground/10 bg-muted/5 opacity-50",
          seat && !seat.is_occupied && !isSelected && "hover:bg-primary/5 border-muted-foreground/20 bg-background",
          seat && seat.is_occupied && "opacity-50 cursor-not-allowed bg-muted border-muted-foreground/10",
          isSelected && "border-primary bg-primary/10 text-primary"
        )}
      >
        {seat ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <SimpleChairIcon
              className={cn(
                "w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 transition-transform duration-300",
                rotate && "rotate-180",
                !seat.is_occupied && !isSelected && "text-muted-foreground opacity-80",
                isSelected && "text-primary fill-primary/10",
                seat.is_occupied && "text-muted-foreground/40 fill-muted-foreground/10"
              )}
            />
          </div>
        ) : null}
      </div>
      {seat && (
        <span className={cn(
          "text-[10px] sm:text-xs font-bold text-muted-foreground whitespace-nowrap",
          isSelected && "text-primary"
        )}>
          {seat.seat_number}
        </span>
      )}
    </div>
  );
};

export function SeatView({ seats }: SeatViewProps) {
  const [selectedSeat, setSelectedSeat] = React.useState<Seat | null>(null)
  const [isBooking, setIsBooking] = React.useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = React.useState(false)
  const [isInitializing, setIsInitializing] = React.useState(false)
  const router = useRouter()

  const handleInitialize = async () => {
    setIsInitializing(true)
    try {
      await bulkCreateSeats(15, COLS) // Use 15 rows for data (1-60), 16 rows for visual (Entry gate)
      router.refresh()
      toast.success("Seat layout initialized!")
    } catch (error) {
      toast.error("Failed to initialize seats")
      console.error(error)
    } finally {
      setIsInitializing(false)
    }
  }

  if (seats.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-muted/10 flex flex-col items-center gap-4">
        <div>
          <p className="text-muted-foreground">No seats configuration found.</p>
          <p className="text-xs text-muted-foreground mt-1">Database is empty.</p>
        </div>
        <Button onClick={handleInitialize} disabled={isInitializing} variant="outline">
          {isInitializing ? "Initializing..." : "Initialize 15x4 Layout"}
        </Button>
      </div>
    )
  }

  const handleSeatClick = (seat: Seat) => {
    if (seat.is_occupied) {
      toast.info(`Seat ${seat.seat_number} is occupied.`)
      return
    }
    setSelectedSeat(seat)
  }

  const handleBook = async () => {
    if (!selectedSeat) return
    setIsBooking(true)
    try {
      await bookSeat(selectedSeat.id)
      setIsPaymentOpen(false) // Close modal
      toast.success(`Success! Booked seat ${selectedSeat.seat_number}`)
      router.refresh()
      router.push('/dashboard')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to book seat")
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-full overflow-hidden">

      {/* Legend */}
      <div className="flex gap-4 text-xs text-muted-foreground flex-wrap justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border bg-background rounded-sm"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border bg-primary rounded-sm"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border bg-muted rounded-sm opacity-50"></div>
          <span>Occupied</span>
        </div>
      </div>

      <div className="w-full overflow-hidden border rounded-lg p-4 bg-muted/20">
        <div
          className="relative mx-auto w-full max-w-[400px]"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(2, 1fr) 20px repeat(2, 1fr)`,
            gap: '8px',
            width: '100%',
            maxWidth: '100%'
          }}
        >
          {Array.from({ length: ROWS }).map((_, row) => (
            <React.Fragment key={row}>
              {/* Left Side (Col 0, 1) */}
              {[0, 1].map(col => {
                if (row === 0) return <div key={`${row}-${col}`} /> // Empty top row left side

                const seat = seats.find(s => s.layout_position.x === col && s.layout_position.y === row - 1)
                return (
                  <SeatIcon
                    key={`${row}-${col}`}
                    seat={seat}
                    isSelected={selectedSeat?.id === seat?.id}
                    onClick={() => seat && handleSeatClick(seat)}
                    rotate={col === 1}
                  />
                )
              })}

              <div className="w-full" /> {/* Spacer */}

              {/* Right Side (Col 2, 3) */}
              {[2, 3].map(col => {
                // Entry Gate Logic - Top Row
                if (row === 0) {
                  if (col === 3) {
                    return (
                      <div key={`${row}-${col}`} className="relative flex flex-col items-center justify-center p-1">
                        <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap mb-0.5">Entry</span>
                        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full text-primary">
                          <path d="M38 40V0" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
                          <path d="M2 40 C 2 20 18 2 38 2" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                          <path d="M38 40 L 2 40" stroke="currentColor" strokeWidth="3" />
                        </svg>
                      </div>
                    )
                  }
                  return <div key={`${row}-${col}`} />
                }

                const seat = seats.find(s => s.layout_position.x === col && s.layout_position.y === row - 1)
                return (
                  <SeatIcon
                    key={`${row}-${col}`}
                    seat={seat}
                    isSelected={selectedSeat?.id === seat?.id}
                    onClick={() => seat && handleSeatClick(seat)}
                    rotate={col === 3}
                  />
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 border rounded-lg bg-card w-full max-w-md">
        <div className="flex-1">
          {selectedSeat ? (
            <div>
              <p className="text-sm text-muted-foreground">Selected Seat</p>
              <p className="text-2xl font-bold">{selectedSeat.seat_number}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">Select a seat to book</p>
          )}
        </div>
        <Button
          size="lg"
          disabled={!selectedSeat || isBooking}
          onClick={() => selectedSeat && setIsPaymentOpen(true)}
        >
          {isBooking ? "Booking..." : "Confirm Booking"}
        </Button>
      </div>

      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogDescription>
              Pay to confirm your booking for Seat {selectedSeat?.seat_number}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex justify-between items-center bg-muted/20 p-4 rounded-lg border">
              <span className="font-medium">Booking Fee</span>
              <span className="text-xl font-bold">₹500.00</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentOpen(false)} disabled={isBooking}>
              Cancel
            </Button>
            <Button onClick={handleBook} disabled={isBooking}>
              {isBooking ? "Processing..." : "Pay & Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

