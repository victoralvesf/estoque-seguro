import { productColumns } from "@/columns/product";
import { AddButton } from "@/components/add-button";
import { Paginator } from "@/components/paginator";
import { ProductFilters } from "@/components/products/filter";
import { MobileFilter } from "@/components/products/filter/mobile-filter";
import { FilterWrapper } from "@/components/products/filter/styles";
import { ProductsMobileList } from "@/components/products/mobile-list";
import { DataTable } from "@/components/ui/data-table";
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
            <ContentLayout className="pb-20 lg:pb-24">
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
                                <PlusIcon className="size-4" />
                            </AddButton>
                        )}
                    </div>
                </div>

                <div className="hidden lg:grid fixed bottom-0 inset-x-0 h-20 w-full border-t border-border bg-background z-50">
                    <div className="mx-auto w-full max-w-7xl h-full flex items-center gap-4 justify-end px-4">
                        <Paginator pagination={products} />

                        {canCreateProducts && (
                            <AddButton routeName="products.create">
                                <PlusIcon className="size-6" />
                                Adicionar Produto
                            </AddButton>
                        )}
                    </div>
                </div>
            </ContentLayout>
        </AppLayout>
    )
}
