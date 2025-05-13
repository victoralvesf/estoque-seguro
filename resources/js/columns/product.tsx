import { ColumnDef } from "@tanstack/react-table"
import { ProductTableActions } from "@/components/products/actions-button"
import { Badge } from "@/components/ui/badge"
import { ProductResponse } from "@/types/responses/products"
import { formatPrice } from "@/utils/price"

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
            const formatted = formatPrice(price)

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
        cell: ({ row }) => <ProductTableActions product={row.original} />,
    }
]
