import { productColumns } from "@/columns/product";
import { AddButton } from "@/components/add-button";
import { Paginator } from "@/components/paginator";
import { ProductFilters } from "@/components/products/filter";
import { MobileFilter } from "@/components/products/filter/mobile-filter";
import { FilterWrapper } from "@/components/products/filter/styles";
import { ProductsMobileList } from "@/components/products/mobile-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { SimpleTooltip } from "@/components/ui/simple-tooltip";
import { usePermissions } from "@/hooks/use-permissions";
import AppLayout from "@/layouts/app-layout";
import { ContentLayout } from "@/layouts/content-layout";
import { cn } from "@/lib/utils";
import { ProductsResponse } from "@/types/responses/products";
import { Head } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";

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
            <ContentLayout className="pb-20 lg:pb-4">
                <div className="hidden lg:grid">
                    <Paginator pagination={products} />
                </div>
                <FilterWrapper>
                    <ProductFilters />

                    <div className="min-w-0">
                        <DataTable
                            columns={productColumns}
                            data={products.data}
                        />
                    </div>
                </FilterWrapper>

                <div className="grid lg:hidden">
                    <ProductsMobileList products={products.data} />
                </div>

                <div className="h-16 lg:hidden bg-background border-t border-border fixed bottom-0 inset-x-0 px-4">
                    <div className="flex items-center justify-between relative w-full h-full">
                        <MobileFilter />

                        <Paginator
                            className={cn(
                                canCreateProducts && 'absolute left-1/2 -translate-x-1/2',
                                !canCreateProducts && "relative ml-auto",
                            )}
                            pagination={products}
                        />

                        {canCreateProducts && (
                            <AddButton routeName="products.create">
                                Adicionar Produto
                            </AddButton>
                        )}
                    </div>
                </div>

                {canCreateProducts && (
                    <SimpleTooltip text="Adicionar Produto">
                        <AddButton routeName="products.create" rounded>
                            <PlusIcon className="size-6" />
                        </AddButton>
                    </SimpleTooltip>
                )}
            </ContentLayout>
        </AppLayout>
    )
}
