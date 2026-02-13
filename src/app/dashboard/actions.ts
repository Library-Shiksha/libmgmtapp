"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function bookSeat(seatId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  // Check if user already has an active booking
  const { data: existingBooking } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  if (existingBooking) {
    throw new Error("You already have an active seat booking.")
  }

  // Check if seat is already occupied
  const { data: seat } = await supabase
    .from('seats')
    .select('is_occupied')
    .eq('id', seatId)
    .single()

  if (seat?.is_occupied) {
    throw new Error("This seat is already occupied.")
  }

  // Perform booking transaction
  // 1. Create Booking
  // 2. Mark Seat as Occupied

  const { error: bookingError } = await supabase
    .from('bookings')
    .insert([
      {
        user_id: user.id,
        seat_id: seatId,
        start_time: new Date().toISOString(),
        status: 'active'
      }
    ])

  if (bookingError) throw new Error(bookingError.message)

  const { error: seatError } = await supabase
    .from('seats')
    .update({ is_occupied: true })
    .eq('id', seatId)

  if (seatError) throw new Error(seatError.message)

  revalidatePath('/dashboard')
  revalidatePath('/admin/seats')
  revalidatePath('/admin') // Main admin page
  return { success: true }
}

export async function cancelBooking() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  // Find active booking
  const { data: booking } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  if (!booking) throw new Error("No active booking found.")

  // Update booking status
  await supabase.from('bookings').update({ status: 'completed', end_time: new Date().toISOString() }).eq('id', booking.id)

  // Free up the seat
  await supabase.from('seats').update({ is_occupied: false }).eq('id', booking.seat_id)

  revalidatePath('/dashboard')
  revalidatePath('/admin/seats')
  return { success: true }
}
