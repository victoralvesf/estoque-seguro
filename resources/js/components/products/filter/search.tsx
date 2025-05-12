import { FormEvent, useEffect, useRef } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterCard, FilterCardTitle } from "./styles";

interface SearchFilterProps {
    defaultValue?: string
    handleSearchFilter: (value: string) => void
}

export function SearchFilter({ defaultValue, handleSearchFilter }: SearchFilterProps) {
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (!defaultValue && inputRef.current) {
            inputRef.current.value = ''
        }
    }, [defaultValue])

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (inputRef.current) {
            handleSearchFilter(inputRef.current.value)
        }
    }

    return (
        <FilterCard>
            <form className="flex items-center" onSubmit={handleSubmit}>
                <Input
                    ref={inputRef}
                    defaultValue={defaultValue ?? ''}
                    className="rounded-r-none"
                    placeholder="Buscar produtos..."
                />
                <Button type="submit" variant="secondary" size="icon" className="rounded-l-none">
                    <SearchIcon className="size-4" />
                </Button>
            </form>
        </FilterCard>
    )
}
