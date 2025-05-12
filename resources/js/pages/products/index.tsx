import { productColumns } from "@/columns/product";
import { AddButton } from "@/components/add-button";
import { Icon } from "@/components/icon";
import { ProductFilters } from "@/components/products/filter";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { usePermissions } from "@/hooks/use-permissions";
import AppLayout from "@/layouts/app-layout";
import { ContentLayout } from "@/layouts/content-layout";
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
            <ContentLayout>
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
                <div className="grid grid-cols-10 gap-2">
                    <div className="col-span-2">
                        <ProductFilters />
                    </div>

                    <div className="col-span-8">
                        <DataTable
                            columns={productColumns}
                            data={products.data}
                        />
                    </div>
                </div>
            </ContentLayout>
        </AppLayout>
    )
}
