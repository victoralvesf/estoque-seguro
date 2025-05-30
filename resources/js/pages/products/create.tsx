import AppLayout from "@/layouts/app-layout";
import { ProductForm as ProductFormType } from "@/types/responses/products";
import { Head, router, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { ContentLayout } from "@/layouts/content-layout";
import { FormTitle } from "@/components/form-title";
import { ProductForm } from "@/components/products/form";
import { unmaskPrice } from "@/utils/price";

export default function CreateProduct() {
    const title = 'Adicionar Produto'

    const [processing, setProcessing] = useState(false)
    const form = useForm<Required<ProductFormType>>({
        name: '',
        description: '',
        category: '',
        quantity: 1,
        price: '',
        currency_code: 'BRL',
        sku: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const payload = {
            ...form.data,
            price: unmaskPrice(form.data.price),
        };

        router.post(route('products'), payload, {
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
                    buttonText="Cadastrar"
                />
            </ContentLayout>
        </AppLayout>
    )
}
