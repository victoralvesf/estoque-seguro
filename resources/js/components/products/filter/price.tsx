import { Slider } from "@/components/ui/slider";
import { FilterCard, FilterCardTitle, PriceLabel } from "./styles";
import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { SharedData } from "@/types";

interface PriceFilterProps {
    handleSetPriceFilter: (min: number, max: number) => void
}

export function PriceFilter({ handleSetPriceFilter }: PriceFilterProps) {
    const { priceRange, filters } = usePage<SharedData>().props
    const prices = [priceRange.min, priceRange.max]
    const [localPrices, setLocalPrices] = useState(prices)

    const minPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(localPrices[0])

    const maxPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(localPrices[1])

    useEffect(() => {
        if (!filters.min_price && !filters.max_price) {
            setLocalPrices(prices)
        }
    }, [filters])

    return (
        <FilterCard>
            <FilterCardTitle>Preço</FilterCardTitle>
            <Slider
                value={localPrices}
                min={priceRange.min}
                max={priceRange.max}
                onValueChange={setLocalPrices}
                onValueCommit={([min, max]) => handleSetPriceFilter(min, max)}
                className="mt-1"
            />
            <div className="flex items-center justify-between">
                <PriceLabel>{minPrice}</PriceLabel>
                <PriceLabel>{maxPrice}</PriceLabel>
            </div>
        </FilterCard>
    )
}
