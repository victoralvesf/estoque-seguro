import { AddButton } from "@/components/add-button";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { usePermissions } from "@/hooks/use-permissions";
import AppLayout from "@/layouts/app-layout";
import { ProductsResponse } from "@/types/responses/products";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductsProps {
    products: ProductsResponse
}

export default function Products({ products }: ProductsProps) {
    const canCreateProducts = usePermissions({
        model: 'product',
        action: 'create',
    })

    return (
        <AppLayout>
            <Head title="Produtos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid grid-cols-2">
                    <div className="mr-auto">
                        {canCreateProducts && (
                            <AddButton routeName="products.create">
                                Adicionar Produto
                            </AddButton>
                        )}
                    </div>

                    <div className="ml-auto flex gap-2 items-center">
                        <Button size="icon" variant="secondary" disabled={!products.prev_page_url}>
                            <Link href={products.prev_page_url!} className="size-full flex items-center justify-center">
                                <Icon iconNode={ChevronLeft} />
                            </Link>
                        </Button>

                        <Button variant="ghost" size="icon" className="pointer-events-none">
                            {products.current_page}
                        </Button>

                        <Button size="icon" variant="secondary" disabled={products.next_page_url === null}>
                            <Link href={products.next_page_url!} className="size-full flex items-center justify-center">
                                <Icon iconNode={ChevronRight} />
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {products.data.map((product) => (
                        <div key={product.id} className="p-4 border border-border rounded-md">
                            <h3>{product.name}</h3>
                            <p>{product.category}</p>
                            <p>{product.price}</p>
                            <p>{product.quantity}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    )
}
