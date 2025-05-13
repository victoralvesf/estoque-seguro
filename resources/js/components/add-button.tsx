import { ComponentPropsWithoutRef } from "react";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type AddButtonProps = ComponentPropsWithoutRef<typeof Button> & {
    routeName: string
    rounded?: boolean
}

export function AddButton({ routeName, className, rounded = false, ...props }: AddButtonProps) {
    const roundedVariant = 'hidden lg:flex size-14 rounded-full fixed right-8 bottom-6'

    return (
        <Link href={route(routeName)}>
            <Button
                className={cn(
                    'cursor-pointer',
                    className,
                    rounded && roundedVariant,
                )}
                {...props}
            />
        </Link>
    )
}
