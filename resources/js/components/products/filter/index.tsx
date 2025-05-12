import { router, usePage } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductFilters as ProductFiltersType, SharedData } from "@/types";
import { CategoryFilter } from "./category";
import { PriceFilter } from "./price";
import { FilterContainer } from "./styles";

export function ProductFilters() {
    const { categories, filters } = usePage<SharedData>().props
    const [localFilters, setLocalFilters] = useState<ProductFiltersType>(filters)

    const applyFilter = useCallback(() => {
        const url = route('products')
        const payload = localFilters as {}

        router.get(url, payload, {
            preserveState: true,
        })
    }, [localFilters])

    const updateFilters = useCallback((filter: keyof ProductFiltersType, value: string) => {
        setLocalFilters(prev => {
            if (value === '') {
                const { [filter]: _, ...rest } = prev
                return rest
            }

            return {
                ...prev,
                [filter]: value,
            }
        })
    }, [setLocalFilters])

    useEffect(() => {
        applyFilter()
    }, [localFilters])

    const setPriceFilters = useCallback((min: number, max: number) => {
        setLocalFilters((prev) => ({
            ...prev,
            'min_price': min.toString(),
            'max_price': max.toString(),
        }))
    }, [setLocalFilters])

    return (
        <FilterContainer className="col-span-2">
            <CategoryFilter
                currentValue={localFilters.category_id ?? ''}
                categories={categories}
                onSetCategory={(category) => {
                    updateFilters('category_id', category)
                }}
            />

            <PriceFilter handleSetPriceFilter={setPriceFilters} />

            <Button
                variant="secondary"
                onClick={() => setLocalFilters({})}
            >
                Limpar Filtros
            </Button>
        </FilterContainer>
    )
}
