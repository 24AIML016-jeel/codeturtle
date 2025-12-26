"use client"

import { memo } from "react"
import { SidebarHeader, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Code2 } from "lucide-react"
import { cn } from "@/lib/utils"

export const SidebarHeaderContent = memo(function SidebarHeaderContent() {
  const { state } = useSidebar()

  return (
    <SidebarHeader className="h-14 border-b px-3">
      {state === "expanded" ? (
        <div className="flex h-full items-center justify-between gap-2">
          <div className="flex h-full items-center gap-3">
            {/* <img src="logo.png" alt="Codeturtle Logo" className="h-8 w-8" /> */}
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                "bg-primary text-primary-foreground"
              )}
              aria-hidden
            >
              <Code2 className="size-4" />
            </div>

            {/* Title */}
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-sm font-semibold">
                Codeturtle
              </span>
            </div>
          </div>
          <SidebarTrigger />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <SidebarTrigger />
        </div>
      )}
    </SidebarHeader>
  )
})
