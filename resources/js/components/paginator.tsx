import { router } from "@inertiajs/react";
import { Button } from "./ui/button";
import { Icon } from "./icon";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginatedResponse } from "@/types/responses/paginated";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type PaginatorProps = ComponentPropsWithoutRef<'div'> & {
    pagination: PaginatedResponse<unknown>
}

export function Paginator({ pagination, className }: PaginatorProps) {
    function handlePrevPage() {
        if (!pagination.prev_page_url) return

        router.get(pagination.prev_page_url)
    }

    function handleNextPage() {
        if (!pagination.next_page_url) return

        router.get(pagination.next_page_url)
    }

    return (
        <div className={cn("ml-auto flex gap-2 items-center", className)}>
            <Button
                size="icon"
                variant="secondary"
                disabled={!pagination.prev_page_url}
                onClick={handlePrevPage}
            >
                <Icon iconNode={ChevronLeft} />
            </Button>

            <Button variant="ghost" size="icon" className="pointer-events-none">
                {pagination.current_page}
            </Button>

            <Button
                size="icon"
                variant="secondary"
                disabled={pagination.next_page_url === null}
                onClick={handleNextPage}
            >
                <Icon iconNode={ChevronRight} />
            </Button>
        </div>
    )
}
