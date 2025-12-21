"use client"

import { memo } from "react"
import { SidebarHeader } from "@/components/ui/sidebar"
import { useAuthStore } from "@/stores/auth-store"
import { cn } from "@/lib/utils"

export const SidebarHeaderContent = memo(function SidebarHeaderContent() {
  const user = useAuthStore((s) => s.user)

  const initials =
    user?.name?.[0]?.toUpperCase() ??
    user?.email?.[0]?.toUpperCase() ??
    "A"

  return (
    <SidebarHeader className="h-14 border-b px-3">
      <div className="flex h-full items-center gap-3">
        {/* Logo / Avatar */}
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
            "bg-primary text-primary-foreground"
          )}
          aria-hidden
        >
          <span className="text-sm font-semibold">
            {initials}
          </span>
        </div>

        {/* Title */}
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-sm font-semibold">
            {user?.name || "Acme Inc"}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {user?.email || "Dashboard"}
          </span>
        </div>
      </div>
    </SidebarHeader>
  )
})
