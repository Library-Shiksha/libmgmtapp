"use client"

import * as React from "react"
import { Seat } from "@/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
// import { addSeat, deleteSeat } from "@/app/admin/actions" // Assuming these exist from previous file content
import { addSeat, deleteSeat, bulkCreateSeats } from "@/app/admin/actions"
import { useRouter } from "next/navigation"

interface SeatGridProps {
  initialSeats: Seat[]
}

const ROWS = 16
const COLS = 4

// Copied from SeatView for consistency
const SimpleChairIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M 5 5 L 17 5 Q 20 5 20 8 L 20 16 Q 20 19 17 19 L 5 19" />
    <rect x="4" y="8" width="12" height="8" rx="1" />
  </svg>
)

interface AdminSeatIconProps {
  seat: Seat | undefined
  onClick: () => void
  rotate?: boolean
}

const AdminSeatIcon = ({ seat, onClick, rotate }: AdminSeatIconProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        onClick={onClick}
        className={cn(
          "relative flex flex-col items-center justify-center cursor-pointer transition-all duration-200 select-none aspect-square w-full rounded-sm border",
          // Empty state (Ghost seat)
          !seat && "border-dashed border-muted-foreground/20 bg-muted/5 opacity-50 hover:bg-primary/5 hover:border-primary/30",
          // Existing seat state
          seat && "bg-background border-muted-foreground/20 hover:border-primary/50",
          // Occupied state
          seat && seat.is_occupied && "bg-muted text-muted-foreground"
        )}
        title={seat ? `Seat ${seat.seat_number} (Click to delete)` : "Click to add seat"}
      >
        {seat ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <SimpleChairIcon
              className={cn(
                "w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 transition-transform duration-300",
                rotate && "rotate-180",
                seat.is_occupied ? "text-red-500/50" : "text-muted-foreground",
              )}
            />
          </div>
        ) : (
          <span className="text-[10px] text-muted-foreground/30 font-medium">+</span>
        )}
      </div>
      {seat && (
        <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap">
          {seat.seat_number}
        </span>
      )}
    </div>
  )
}

export function SeatGrid({ initialSeats }: SeatGridProps) {
  const [seats, setSeats] = React.useState<Seat[]>(initialSeats)

  React.useEffect(() => {
    setSeats(initialSeats)
  }, [initialSeats])

  const [selectedCell, setSelectedCell] = React.useState<{ x: number; y: number } | null>(null)
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [newSeatNumber, setNewSeatNumber] = React.useState("")
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [isGenerating, setIsGenerating] = React.useState(false) // Added state for generation
  const router = useRouter()

  const handleBulkGenerate = async () => {
    if (!confirm("This will generate all missing seats for the 15x4 grid. Continue?")) return
    setIsGenerating(true)
    try {
      await bulkCreateSeats(15, COLS) // Use 15 rows for data (1-60), 16 rows for visual (Entry gate)
      router.refresh()
      toast.success("Seats generated successfully")
      // We'd ideally need to fetch the new seats here or rely on router.refresh() if this is a server component parent that re-renders.
      // For now, router.refresh() triggers re-fetch in parent page.
    } catch (error) {
      toast.error("Failed to generate seats")
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCellClick = (x: number, y: number) => {
    const existingSeat = seats.find(s => s.layout_position.x === x && s.layout_position.y === y)
    if (existingSeat) {
      if (confirm(`Delete seat ${existingSeat.seat_number}?`)) {
        handleDeleteSeat(existingSeat.id)
      }
    } else {
      setSelectedCell({ x, y })
      setNewSeatNumber(`S-${x + 1}-${y + 1}`) // Default suggestion (1-based)
      setIsAddOpen(true)
    }
  }

  const handleAddSeat = async () => {
    if (!selectedCell || !newSeatNumber) return

    try {
      const newSeat: any = await addSeat(newSeatNumber, selectedCell.x, selectedCell.y)
      setSeats([...seats, newSeat])
      setIsAddOpen(false)
      router.refresh()
      toast.success("Seat added")
    } catch (error) {
      toast.error("Failed to add seat")
      console.error(error)
    }
  }

  const handleDeleteSeat = async (id: string) => {
    setIsDeleting(true)
    try {
      await deleteSeat(id)
      setSeats(seats.filter(s => s.id !== id))
      router.refresh()
      toast.success("Seat deleted")
    } catch (error) {
      toast.error("Failed to delete seat")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-4 w-full flex flex-col items-center">
      <div className="flex justify-between w-full max-w-4xl px-4">
        <h2 className="text-xl font-bold">Manage Seat Layout</h2>
        <Button onClick={handleBulkGenerate} disabled={isGenerating} variant="outline" size="sm">
          {isGenerating ? "Generating..." : "Auto-Fill Layout (15x4)"}
        </Button>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs text-muted-foreground flex-wrap justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border border-muted-foreground/20 rounded-sm"></div>
          <span>Active Seat</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border border-dashed border-muted-foreground/30 bg-muted/5 rounded-sm"></div>
          <span>Empty Slot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border bg-red-100 rounded-sm"></div>
          <span>Occupied</span>
        </div>
      </div>

      <div
        className="relative mx-auto w-full max-w-[400px] border border-stone-200 rounded-sm p-2"
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
            {[0, 1].map(col => {
              if (row === 0) return <div key={`${row}-${col}`} /> // Entry row empty left

              const seat = seats.find(s => s.layout_position.x === col && s.layout_position.y === row - 1)
              return (
                <AdminSeatIcon
                  key={`${row}-${col}`}
                  seat={seat}
                  onClick={() => handleCellClick(col, row - 1)} // Adjust click coord
                  rotate={col === 1}
                />
              )
            })}

            <div className="w-full" />

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
                <AdminSeatIcon
                  key={`${row}-${col}`}
                  seat={seat}
                  onClick={() => handleCellClick(col, row - 1)} // Adjust click coord
                  rotate={col === 3}
                />
              )
            })}
          </React.Fragment>
        ))}
      </div>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Seat</DialogTitle>
            <DialogDescription>
              Adding seat at position ({selectedCell?.x}, {selectedCell?.y})
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="seat-number" className="text-right">
                Number
              </Label>
              <Input
                id="seat-number"
                value={newSeatNumber}
                onChange={(e) => setNewSeatNumber(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddSeat}>Save Seat</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

  )
}
