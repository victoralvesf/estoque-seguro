import { ProductResponse } from "@/types/responses/products"
import { Badge } from "../ui/badge"
import { formatPrice } from "@/utils/price"
import { ProductTableActions } from "./actions-button"

interface ProductsMobileListProps {
    products: ProductResponse[]
}

export function ProductsMobileList({ products }: ProductsMobileListProps) {
    return (
        <div className="flex flex-col gap-2">
            {products.map((product) => (
                <div key={product.id} className="flex flex-col gap-1 border border-border rounded-md px-4 py-3">
                    <div className="flex items-start justify-between text-base">
                        <h4 className="font-semibold">{product.name}</h4>
                        <span className="text-muted-foreground">
                            {formatPrice(parseFloat(product.price))}
                        </span>
                    </div>

                    <div className="text-sm text-muted-foreground space-y-1">
                        <div>
                            {'Quantidade em estoque: '}
                            <span className="text-foreground">{product.quantity}</span>
                        </div>

                        <div>
                            {'SKU: '}
                            <span className="text-foreground">{product.sku}</span>
                        </div>
                    </div>

                    <div className="flex items-end justify-between">
                        <Badge variant="secondary">{product.category.name}</Badge>

                        <ProductTableActions product={product} />
                    </div>
                </div>
            ))}
        </div>
    )
}
