import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { FilterCard, FilterCardTitle } from "./styles";
import { SharedCategory } from "@/types";

interface CategoryFilterProps {
    categories: SharedCategory[]
    currentValue: string
    onSetCategory: (value: string) => void
}

export function CategoryFilter({ categories, currentValue, onSetCategory }: CategoryFilterProps) {
    const categoryOptions: Option[] = categories.map((category) => ({
        label: category.name,
        value: category.id.toString(),
    }))

    const currentCategory = categories.filter((category) => category.id.toString() === currentValue)
    const currentOption: Option[] = currentCategory.length === 1 ? [
        { label: currentCategory[0].name, value: currentValue }
    ] : []

    function handleChange(options: Option[]) {
        if (options.length === 0) {
            onSetCategory('')
            return
        }

        onSetCategory(options[0].value ?? '')
    }

    return (
        <FilterCard>
            <FilterCardTitle>Categoria</FilterCardTitle>
            <MultipleSelector
                hideClearAllButton
                maxSelected={1}
                hidePlaceholderWhenSelected
                closeAfterFirstSelected
                value={currentOption}
                options={categoryOptions}
                className="min-h-9 bg-background"
                placeholder="Selecione uma categoria"
                onChange={handleChange}
                emptyIndicator={
                    <p className="text-left px-4">Nenhuma categoria encontrada!</p>
                }
            />
        </FilterCard>
    )
}
