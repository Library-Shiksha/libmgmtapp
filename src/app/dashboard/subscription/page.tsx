"use client"

import { useState } from "react"
import { PricingCards, SubscriptionPlan } from "@/components/subscription/pricing-cards"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function SubscriptionPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    setIsProcessing(true)
    try {
      const response = await fetch("/api/mock/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan_type: plan.interval,
          amount: plan.price
        }),
      })

      if (!response.ok) {
        throw new Error("Payment failed")
      }

      toast.success(`Successfully subscribed to ${plan.name} plan!`)
      router.refresh()
      router.push("/dashboard")
    } catch (error) {
      toast.error("Failed to process payment. Please try again.")
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Subscription Plans</h1>
        <p className="text-muted-foreground">
          Choose a plan that fits your study schedule.
        </p>
      </div>
      <PricingCards onSubscribe={handleSubscribe} isProcessing={isProcessing} />
    </div>
  )
}
