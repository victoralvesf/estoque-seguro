import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef } from "react"

type FormTitleProps = ComponentPropsWithoutRef<'h2'> & {
    wrapperClassName?: string
}

export function FormTitle({ wrapperClassName, className, ...props }: FormTitleProps) {
    return (
        <div className={cn("my-4", wrapperClassName)}>
            <h2 className={cn("font-medium text-xl", className)} {...props} />
        </div>
    )
}
