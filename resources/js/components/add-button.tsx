import { ComponentPropsWithoutRef } from "react";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type AddButtonProps = ComponentPropsWithoutRef<typeof Button> & {
    routeName: string
}

export function AddButton({ routeName, className, ...props }: AddButtonProps) {
    return (
        <Link href={route(routeName)}>
            <Button
                className={cn('cursor-pointer', className)}
                {...props}
            />
        </Link>
    )
}
