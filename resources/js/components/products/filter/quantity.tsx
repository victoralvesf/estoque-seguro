import { Slider } from "@/components/ui/slider";
import { FilterCard, FilterCardTitle, PriceLabel } from "./styles";
import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { SharedData } from "@/types";

interface QuantityFilterProps {
    handleSetQuantityFilter: (min: number, max: number) => void
}

export function QuantityFilter({ handleSetQuantityFilter }: QuantityFilterProps) {
    const { quantityRange, filters } = usePage<SharedData>().props
    const quantities = [quantityRange.min, quantityRange.max]
    const [localQuantity, setLocalQuantity] = useState(quantities)

    const minQuantity = localQuantity[0]
    const maxQuantity = localQuantity[1]

    useEffect(() => {
        if (!filters.min_quantity && !filters.max_quantity) {
            setLocalQuantity(quantities)
        }
    }, [filters])

    return (
        <FilterCard>
            <FilterCardTitle>Quantidade em Estoque</FilterCardTitle>
            <Slider
                value={localQuantity}
                min={quantityRange.min}
                max={quantityRange.max}
                onValueChange={setLocalQuantity}
                onValueCommit={([min, max]) => handleSetQuantityFilter(min, max)}
                className="mt-1"
            />
            <div className="flex items-center justify-between">
                <PriceLabel>{minQuantity}</PriceLabel>
                <PriceLabel>{maxQuantity}</PriceLabel>
            </div>
        </FilterCard>
    )
}
