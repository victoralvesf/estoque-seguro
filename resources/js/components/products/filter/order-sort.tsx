import { SimpleDropdownMenu } from "@/components/forms/dropdown";
import { FilterCard, FilterCardTitle } from "./styles";

const allowedOrderFields = [
    { label: 'Nome', value: 'name' },
    { label: 'Preço', value: 'price' },
    { label: 'Quantidade', value: 'quantity' },
    { label: 'Data de criação', value: 'created_at' },
    { label: 'Data de atualização', value: 'updated_at' },
]

const allowedSortFields = [
    { label: 'Crescente', value: 'asc' },
    { label: 'Decrescente', value: 'desc' },
]

interface OrderAndSortFiltersProps {
    currentOrderValue: string
    onSetOrderValue: (order: string) => void
    currentSortValue: string
    onSetSortValue: (sort: string) => void
}

export function OrderAndSortFilters({
    currentSortValue,
    onSetSortValue,
    currentOrderValue,
    onSetOrderValue
}: OrderAndSortFiltersProps) {
    const orderLabel = allowedOrderFields.find((field) => field.value === currentOrderValue)?.label
    const sortLabel = allowedSortFields.find((field) => field.value === currentSortValue)?.label

    return (
        <>
            <FilterCard>
                <FilterCardTitle>Ordenar por:</FilterCardTitle>
                <SimpleDropdownMenu
                    label={orderLabel}
                    value={currentOrderValue}
                    options={allowedOrderFields}
                    onSelected={onSetOrderValue}
                />
            </FilterCard>

            <FilterCard>
                <FilterCardTitle>Filtrar por:</FilterCardTitle>
                <SimpleDropdownMenu
                    label={sortLabel}
                    value={currentSortValue}
                    options={allowedSortFields}
                    onSelected={onSetSortValue}
                />
            </FilterCard>
        </>
    )
}
