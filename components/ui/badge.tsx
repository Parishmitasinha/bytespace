"use client";

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#1b1b1b] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#1b1b1b] text-[#ffffff] shadow hover:bg-[#1b1b1b]/80",
        secondary:
          "border-transparent bg-[#f4f4f5] text-[#18181b] hover:bg-[#f4f4f5]/80",
        destructive:
          "border-transparent bg-[#ef4444] text-[#ffffff] shadow hover:bg-[#ef4444]/80",
        outline: "text-[#18181b] border-[#e4e4e7]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  className?: string
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
export default Badge
