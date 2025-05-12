import { ProductTableActions } from "@/components/products/actions-button"
import { Badge } from "@/components/ui/badge"
import { ProductResponse } from "@/types/responses/products"
import { ColumnDef } from "@tanstack/react-table"

export const productColumns: ColumnDef<ProductResponse>[] = [
    {
        accessorKey: 'name',
        enableResizing: true,
        header: 'Nome',
    },
    {
        accessorKey: 'category',
        enableResizing: true,
        header: 'Categoria',
        cell: ({ row }) => (
            <Badge variant="secondary">
                {row.original.category.name}
            </Badge>
        ),
    },
    {
        accessorKey: 'price',
        header: 'Preço',
        cell: ({ row }) => {
            const price = parseFloat(row.original.price)
            const formatted = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: row.original.currency_code
            }).format(price)

            return formatted
        }
    },
    {
        accessorKey: 'quantity',
        header: 'Quantidade em Estoque',
    },
    {
        accessorKey: 'sku',
        header: 'SKU',
    },
    {
        id: 'actions',
        header: '',
        cell: ({ row }) => <ProductTableActions />,
    }
]
