import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { Product } from "@/types/responses/products";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { formatNumeral, NumeralThousandGroupStyles } from 'cleave-zen'
import { SharedData } from "@/types";
import { ContentLayout } from "@/layouts/content-layout";

const OPTIONS: Option[] = [
  { label: 'Dummy', value: 'dummy' },
];

const CURRENCIES = {
    BRL: 'R$',
    EUR: '€',
    USD: '$',
}

export default function Products() {
    const { errors } = usePage<SharedData>().props;
    const [processing, setProcessing] = useState(false)
    const { data, setData } = useForm<Required<Product>>({
        name: '',
        description: '',
        category: '',
        quantity: 1,
        price: '',
        currency_code: 'BRL',
        sku: ''
    });

    const currencyCode = CURRENCIES[data.currency_code as keyof typeof CURRENCIES]

    const maskPrice = (value: string) => {
        return formatNumeral(value, {
            delimiter: '.',
            numeralDecimalMark: ',',
            numeralThousandsGroupStyle: NumeralThousandGroupStyles.THOUSAND,
            numeralDecimalScale: 2,
            stripLeadingZeroes: true,
            numeralPositiveOnly: true,
        })
    }

    const unmaskPrice = (value: string) => {
        if (!value) return '0.00'

        if (!value.includes(',')) value += ',0'
        if (value.split(',')[1].length === 1) value += '0'

        return value.replaceAll('.', '').replace(',', '.')
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const payload = {
            ...data,
            price: unmaskPrice(data.price),
        };

        router.post(route('products'), payload, {
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
        })
    };

    return (
        <AppLayout>
            <Head title="Cadastrar Produto" />

            <ContentLayout>
                <div className="my-4">
                    <h2 className="font-medium text-xl">Adicionar Produto</h2>
                </div>

                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-4 lg:grid-cols-2">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid lg:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="price">Preço</Label>
                                        <div className="relative">
                                            <Input
                                                id="price"
                                                type="text"
                                                required
                                                tabIndex={1}
                                                value={maskPrice(data.price)}
                                                onChange={(e) => setData('price', e.target.value)}
                                                placeholder="0.00"
                                                className="peer ps-8 pe-12"
                                            />
                                            <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
                                                {currencyCode}
                                            </span>
                                            <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50">
                                                {data.currency_code}
                                            </span>
                                        </div>
                                        <InputError message={errors.price} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="quantity">Quantidade</Label>
                                        <Input
                                            id="quantity"
                                            type="number"
                                            required
                                            tabIndex={1}
                                            min={1}
                                            max={10000}
                                            value={data.quantity}
                                            onChange={(e) => setData('quantity', parseInt(e.target.value))}
                                        />
                                        <InputError message={errors.quantity} />
                                    </div>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="category">Categoria</Label>
                                        <MultipleSelector
                                            hidePlaceholderWhenSelected
                                            hideClearAllButton
                                            creatable
                                            closeAfterFirstSelected
                                            createText="Criar nova categoria"
                                            placeholder="Selecione ou Crie uma nova"
                                            className="min-h-9 max-h-9"
                                            defaultOptions={OPTIONS}
                                            maxSelected={1}
                                            onChange={([option]) => setData('category', option?.value ?? '')}
                                            emptyIndicator={
                                                <p className="text-left px-4">Nenhuma categoria encontrada!</p>
                                            }
                                        />
                                        <InputError message={errors.category} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="sku">SKU</Label>
                                        <Input
                                            id="sku"
                                            type="text"
                                            required
                                            tabIndex={1}
                                            value={data.sku}
                                            onChange={(e) => setData('sku', e.target.value)}
                                        />
                                        <InputError message={errors.sku} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="description">Descrição</Label>
                                <div className="flex h-full">
                                    <Textarea
                                        id="description"
                                        required
                                        tabIndex={1}
                                        value={data.description}
                                        className="w-full min-h-32 max-h-44 lg:h-full lg:min-h-full lg:max-h-full resize-none"
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Adicione mais detalhes do produto..."
                                    />
                                </div>
                                <InputError message={errors.description} />
                            </div>
                        </div>

                        <div className="w-full flex flex-col lg:flex-row-reverse items-start lg:justify-start mt-4 gap-2">
                            <Button type="submit" tabIndex={1} disabled={processing} className="cursor-pointer w-full lg:w-fit">
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Cadastrar
                            </Button>

                            <Button type="button" tabIndex={1} variant="secondary" className="p-0 w-full lg:w-fit">
                                <Link href={route('products')} className="size-full px-4 py-2">Voltar</Link>
                            </Button>
                        </div>
                    </div>
                </form>
            </ContentLayout>
        </AppLayout>
    )
}
