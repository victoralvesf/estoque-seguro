import { router, usePage } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductFilters as ProductFiltersType, SharedData } from "@/types";
import { CategoryFilter } from "./category";
import { PriceFilter } from "./price";
import { SearchFilter } from "./search";
import { FilterContainer } from "./styles";
import { QuantityFilter } from "./quantity";

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

    const setQuantityFilters = useCallback((min: number, max: number) => {
        setLocalFilters((prev) => ({
            ...prev,
            'min_quantity': min.toString(),
            'max_quantity': max.toString(),
        }))
    }, [setLocalFilters])

    const areFiltersEmpty = Object.keys(localFilters).length === 0

    return (
        <FilterContainer className="col-span-2">
            <SearchFilter
                defaultValue={localFilters.name}
                handleSearchFilter={(value) => updateFilters('name', value)}
            />

            <CategoryFilter
                currentValue={localFilters.category_id ?? ''}
                categories={categories}
                onSetCategory={(category) => {
                    updateFilters('category_id', category)
                }}
            />

            <PriceFilter handleSetPriceFilter={setPriceFilters} />

            <QuantityFilter handleSetQuantityFilter={setQuantityFilters} />

            <Button
                variant="secondary"
                onClick={() => setLocalFilters({})}
                disabled={areFiltersEmpty}
            >
                Limpar Filtros
            </Button>
        </FilterContainer>
    )
}
