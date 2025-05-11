import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef } from "react"

type ContentLayoutProps = ComponentPropsWithoutRef<'div'>

export function ContentLayout({ className, ...props }: ContentLayoutProps) {
    return (
        <div
            className={cn("flex h-full flex-1 flex-col gap-4 rounded-xl p-4", className)}
            {...props}
        />
    )
}
