import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuPortal,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Role } from "@/types";
import { getRoleLabel } from "@/utils/role";
import { useLayoutEffect, useRef, useState } from "react";

type Option<T> = {
    label: T
    value: T
}

interface SimpleDropdownMenuProps<T> {
    label?: T
    value: T
    options: Option<T>[]
    onSelected: (value: T) => void
}

export function SimpleDropdownMenu<T extends string>({
    label,
    value,
    options,
    onSelected
}: SimpleDropdownMenuProps<T>) {
    const triggerRef = useRef<HTMLButtonElement>(null)
    const [triggerWidth, setTriggerWidth] = useState<number>()

    useLayoutEffect(() => {
        if (!triggerRef.current) return

        const element = triggerRef.current
        const controller = new AbortController()

        const resizeObserver = new ResizeObserver(() => {
            setTriggerWidth(element.offsetWidth)
        })

        resizeObserver.observe(element, { box: 'border-box' })

        setTriggerWidth(element.offsetWidth)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    function genTriggerLabel() {
        if (label) return label

        return getRoleLabel(value as Role)
    }

    const triggerLabel = genTriggerLabel()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    ref={triggerRef}
                    tabIndex={1}
                    variant="outline"
                    className="flex px-3 py-1 items-center justify-start cursor-pointer"
                >
                    {triggerLabel}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ width: triggerWidth }}>
                {options.map((option) => (
                    <DropdownMenuCheckboxItem
                        key={option.value}
                        checked={option.value === value}
                        onSelect={() => onSelected(option.value)}
                    >
                        {option.label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
