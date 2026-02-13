import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { plan_type, amount } = await req.json()

    // Calculate dates
    const startDate = new Date()
    let endDate = new Date(startDate)

    if (plan_type === 'monthly') endDate.setMonth(endDate.getMonth() + 1)
    if (plan_type === 'quarterly') endDate.setMonth(endDate.getMonth() + 3)
    if (plan_type === 'yearly') endDate.setFullYear(endDate.getFullYear() + 1)

    // 1. Create Subscription Record
    const { error: subError } = await supabase.from('subscriptions').insert({
      user_id: user.id,
      plan_type,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      status: 'active',
      amount,
    })

    if (subError) throw subError

    // 2. Create Payment Record
    const { error: payError } = await supabase.from('payments').insert({
      user_id: user.id,
      amount,
      status: 'success',
      transaction_id: `mock_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    })

    if (payError) throw payError

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Mock payment error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
