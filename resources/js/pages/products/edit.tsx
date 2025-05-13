import AppLayout from "@/layouts/app-layout";
import { ProductForm as ProductFormType, ProductResponse } from "@/types/responses/products";
import { Head, router, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { ContentLayout } from "@/layouts/content-layout";
import { FormTitle } from "@/components/form-title";
import { ProductForm } from "@/components/products/form";
import { formatPrice, unmaskPrice } from "@/utils/price";

interface EditProductProps {
    product: ProductResponse
}

export default function EditProduct({ product }: EditProductProps) {
    const title = 'Alterar Produto'

    const [processing, setProcessing] = useState(false)
    const formattedPrice = formatPrice(product.price, true)
    const form = useForm<Required<ProductFormType>>({
        ...product,
        category: product.category.name,
        price: formattedPrice,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const payload = {
            ...form.data,
            price: unmaskPrice(form.data.price),
        };

        const url = route('products.update', { product: product.id })

        router.put(url, payload, {
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
        })
    };

    return (
        <AppLayout>
            <Head title={title} />

            <ContentLayout>
                <FormTitle>{title}</FormTitle>

                <ProductForm
                    form={form}
                    processing={processing}
                    submit={submit}
                    buttonText="Salvar"
                />
            </ContentLayout>
        </AppLayout>
    )
}
