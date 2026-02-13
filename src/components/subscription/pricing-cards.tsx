"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: "monthly" | "quarterly" | "yearly"
  description: string
  features: string[]
}

const plans: SubscriptionPlan[] = [
  {
    id: "monthly",
    name: "Monthly Pass",
    price: 800,
    interval: "monthly",
    description: "Flexible access for short-term study goals.",
    features: [
      "Access to standard seats",
      "High-speed WiFi",
      "Locker access (add-on)",
      "Cancel anytime"
    ]
  },
  {
    id: "quarterly",
    name: "Quarterly Saver",
    price: 2200,
    interval: "quarterly",
    description: "Commit to a term and save ~8%.",
    features: [
      "All Monthly perks",
      "Priority seat selection",
      "Free locker access",
      "1 Guest pass / month"
    ]
  },
  {
    id: "yearly",
    name: "Annual Elite",
    price: 8000,
    interval: "yearly",
    description: "Best value for dedicated aspirants.",
    features: [
      "All Quarterly perks",
      "Dedicated fixed seat",
      "24/7 Access",
      "2 Guest passes / month"
    ]
  }
]

interface PricingCardsProps {
  currentPlan?: string
  onSubscribe: (plan: SubscriptionPlan) => void
  isProcessing?: boolean
}

export function PricingCards({ currentPlan, onSubscribe, isProcessing }: PricingCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card key={plan.id} className={`flex flex-col ${currentPlan === plan.id ? 'border-primary shadow-lg' : ''}`}>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="mb-4">
              <span className="text-3xl font-bold">₹{plan.price}</span>
              <span className="text-muted-foreground">/{plan.interval}</span>
            </div>
            <ul className="space-y-2 text-sm">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => onSubscribe(plan)}
              disabled={isProcessing || currentPlan === plan.id}
              variant={currentPlan === plan.id ? "outline" : "default"}
            >
              {currentPlan === plan.id ? "Current Plan" : isProcessing ? "Processing..." : "Subscribe"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
