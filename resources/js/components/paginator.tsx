import { Link } from "@inertiajs/react";
import { Button } from "./ui/button";
import { Icon } from "./icon";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginatedResponse } from "@/types/responses/paginated";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type PaginatorProps = ComponentPropsWithoutRef<'div'> & {
    pagination: PaginatedResponse<any>
}

export function Paginator({ pagination, className }: PaginatorProps) {
    return (
        <div className={cn("ml-auto flex gap-2 items-center", className)}>
            <Button size="icon" variant="secondary" disabled={!pagination.prev_page_url}>
                <Link href={pagination.prev_page_url!} className="size-full flex items-center justify-center">
                    <Icon iconNode={ChevronLeft} />
                </Link>
            </Button>

            <Button variant="ghost" size="icon" className="pointer-events-none">
                {pagination.current_page}
            </Button>

            <Button size="icon" variant="secondary" disabled={pagination.next_page_url === null}>
                <Link href={pagination.next_page_url!} className="size-full flex items-center justify-center">
                    <Icon iconNode={ChevronRight} />
                </Link>
            </Button>
        </div>
    )
}
