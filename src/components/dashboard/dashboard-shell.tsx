"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Armchair, CreditCard, History, Menu, X } from "lucide-react"
import { useState } from "react"

interface DashboardShellProps {
  children: React.ReactNode
  user: any // Typed as any for now, should ideally be User type
}

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Book a Seat",
    href: "/dashboard/book",
    icon: Armchair,
  },
  {
    title: "My Subscription",
    href: "/dashboard/subscription",
    icon: CreditCard,
  },
  {
    title: "Payment History",
    href: "/dashboard/history",
    icon: History,
  },
]

export function DashboardShell({ children, user }: DashboardShellProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background overflow-x-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 bottom-0 z-40 w-64 border-r bg-card transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:block",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-between md:justify-start">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <span className="">LibMgmt</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === item.href
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t p-4">
          {/* User Info specific to Sidebar if needed, or keeping it in main header */}
          <div className="flex items-center gap-3 px-2">
            <div className="text-sm">
              <p className="font-medium">{user.user_metadata.full_name}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[180px]">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
          <div className="w-full flex-1">
            <h1 className="font-semibold text-lg">Library Dashboard</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
