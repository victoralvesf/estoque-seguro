import { CategoryFilter } from "./category";
import { FilterContainer } from "./styles";
import { router, usePage } from "@inertiajs/react";
import { ProductFilters as ProductFiltersType, SharedData } from "@/types";
import { useCallback, useEffect, useState } from "react";

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

    return (
        <FilterContainer className="col-span-2">
            <CategoryFilter
                currentValue={localFilters.category_id ?? ''}
                categories={categories}
                onSetCategory={(category) => {
                    updateFilters('category_id', category)
                }}
            />
        </FilterContainer>
    )
}
