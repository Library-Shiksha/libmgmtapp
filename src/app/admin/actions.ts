"use server"

import { createClient } from "@/lib/supabase/server"
import { Seat } from "@/types"

export async function getSeats(): Promise<Seat[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('seats')
    .select('*')
    .order('seat_number', { ascending: true })

  if (error) {
    console.error('Error fetching seats:', error)
    return []
  }

  return data as Seat[]
}

export async function addSeat(seatNumber: string, x: number, y: number) {
  const supabase = await createClient()

  // Check if admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  // Ideally check role here too, but for now we rely on RLS and simple auth check

  const { data, error } = await supabase
    .from('seats')
    .insert([
      {
        seat_number: seatNumber,
        layout_position: { x, y },
        is_occupied: false
      }
    ])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function bulkCreateSeats(rows: number, cols: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  // Fetch existing seats to preserve IDs and bookings
  const { data: existingSeats } = await supabase.from('seats').select('id, layout_position')

  // Create a map for quick lookup: "x,y" -> id
  const seatMap = new Map<string, string>()
  if (existingSeats) {
    existingSeats.forEach((s: any) => {
      // Ensure layout_position is object
      if (s.layout_position) {
        seatMap.set(`${s.layout_position.x},${s.layout_position.y}`, s.id)
      }
    })
  }

  const seatsToUpsert = []

  // Generate seats Row-wise (1-60)
  // Row 0: 1, 2, 3, 4
  // Row 1: 5, 6, 7, 8 ...
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const seatNumber = (r * cols) + c + 1
      const key = `${c},${r}`
      const existingId = seatMap.get(key)

      const seatData: any = {
        seat_number: seatNumber.toString(),
        layout_position: { x: c, y: r },
      }

      if (existingId) {
        seatData.id = existingId
      } else {
        seatData.is_occupied = false // Default for new
      }

      seatsToUpsert.push(seatData)
    }
  }

  // We need to be careful. If we send {id: 1, seat_number: "1"}, and the row has is_occupied=true,
  // upsert might set is_occupied to null/default if not provided?
  // No, Postgres UPDATE only updates columns present in the SET clause (which comes from payload).
  // So partial payload for existing rows is safe? 
  // But we are mixing new (needs is_occupied) and old (shouldn't touch).
  // Safest is to fetch full objects? Or just defaults.
  // Let's just set `is_occupied: false` for all? No, that clears status.
  // Let's Fetch *everything* from existing?

  // Correct approach:
  // Since we want to renumber, and potentially add missing.
  // Batch A: Updates (Existing IDs). We only send {id, seat_number}.
  // Batch B: Inserts (New). We send {seat_number, layout_position, is_occupied: false}.

  const updates = []
  const inserts = []

  for (const item of seatsToUpsert) {
    if (item.id) {
      updates.push({ id: item.id, seat_number: item.seat_number })
    } else {
      inserts.push(item)
    }
  }

  if (updates.length > 0) {
    const { error: updateError } = await supabase.from('seats').upsert(updates)
    if (updateError) throw new Error(updateError.message)
  }

  if (inserts.length > 0) {
    const { error: insertError } = await supabase.from('seats').insert(inserts)
    if (insertError) throw new Error(insertError.message)
  }

  return { success: true }
}

export async function deleteSeat(seatId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('seats').delete().match({ id: seatId })
  if (error) throw new Error(error.message)
}
