export interface Seat {
  id: string
  seat_number: string
  is_occupied: boolean
  layout_position: {
    x: number
    y: number
    rotation?: number
  }
  created_at: string
}

export interface UserProfile {
  id: string
  email: string
  full_name: string
  avatar_url: string
  role: 'admin' | 'user'
}

export interface Subscription {
  id: string
  user_id: string
  plan_type: 'monthly' | 'quarterly' | 'yearly'
  start_date: string
  end_date: string
  status: 'active' | 'expired' | 'pending'
  amount: number
  created_at: string
}

export interface Payment {
  id: string
  user_id: string
  amount: number
  status: 'success' | 'failed' | 'pending'
  transaction_id: string
  created_at: string
}
