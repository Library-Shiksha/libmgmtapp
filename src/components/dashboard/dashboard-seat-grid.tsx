"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DashboardSeatGridProps {
  seats: any[]
}

// Removed constant CELL_SIZE - using fluid layout instead
const ROWS = 16 // Extended for Entry Gate row
const COLS = 4

const SimpleChairIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M 5 5 L 17 5 Q 20 5 20 8 L 20 16 Q 20 19 17 19 L 5 19" />
    <rect x="4" y="8" width="12" height="8" rx="1" />
  </svg>
)

export function DashboardSeatGrid({ seats }: DashboardSeatGridProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-full overflow-hidden">

      {/* Legend - Matches SeatView */}
      <div className="flex gap-4 text-xs text-muted-foreground flex-wrap justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border bg-red-500 rounded-sm border-red-600"></div>
          <span>Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border bg-green-500 rounded-sm border-green-600"></div>
          <span>Subscribed (Vacant)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border border-muted-foreground/30 bg-background rounded-sm"></div>
          <span>Available</span>
        </div>
      </div>

      <div className="w-full overflow-hidden border rounded-lg p-4 bg-muted/20">
        <div
          className="relative mx-auto w-full max-w-[400px]" // Limit max width but allow shrink
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(2, 1fr) 20px repeat(2, 1fr)`, // Fluid columns
            gap: '8px',
            width: '100%', // Ensure it takes full width of container
            maxWidth: '100%', // Prevent overflow
          }}
        >
          {Array.from({ length: ROWS }).map((_, row) => (
            <React.Fragment key={row}>
              {[0, 1].map(col => {
                // Entry Gate Row (Row 0) - Empty for left side
                if (row === 0) return <div key={`${row}-${col}`} />

                // Shift seat data look up by 1 due to extra top row
                const seat = seats.find(s => s.layout_position.x === col && s.layout_position.y === row - 1)
                return (
                  <SeatItem key={`${row}-${col}`} seat={seat} rotate={col === 1} />
                )
              })}
              <div className="w-full" /> {/* Spacer */}
              {[2, 3].map(col => {
                // Entry Gate Logic: First Row, Last Col
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

                // Shift seat data look up by 1
                const seat = seats.find(s => s.layout_position.x === col && s.layout_position.y === row - 1)
                return (
                  <SeatItem key={`${row}-${col}`} seat={seat} rotate={col === 3} />
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

function SeatItem({ seat, rotate }: { seat: any, rotate?: boolean }) {
  // Use aspect-square to maintain shape in fluid grid
  if (!seat) return <div className="border border-dashed border-muted-foreground/10 rounded-sm aspect-square w-full" />

  const activeBooking = seat.bookings && seat.bookings.length > 0 ? seat.bookings[0] : null

  // Logic: 
  // Red = Occupied
  // Green = Booking exists BUT !Occupied
  // Default otherwise
  let statusColor = "text-muted-foreground bg-background border-muted-foreground/20"
  if (seat.is_occupied) {
    statusColor = "text-white bg-red-500 border-red-600"
  } else if (activeBooking) {
    statusColor = "text-white bg-green-500 border-green-600"
  }

  return (
    <div
      className="flex flex-col items-center gap-1"
      title={`Seat ${seat.seat_number}`}
    >
      <div
        className={cn(
          "relative flex items-center justify-center rounded-sm border transition-colors aspect-square w-full", // Fluid sizing
          statusColor
        )}
      >
        <SimpleChairIcon
          className={cn(
            "w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16",
            rotate && "rotate-180",
            "opacity-80"
          )}
        />
      </div>
      <span className="text-[10px] sm:text-xs font-bold text-muted-foreground whitespace-nowrap">
        {seat.seat_number}
      </span>
    </div>
  )
}
