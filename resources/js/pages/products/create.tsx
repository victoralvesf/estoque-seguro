import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { Product } from "@/types/responses/products";
import { Head, Link, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler } from "react";

const OPTIONS: Option[] = [
  { label: 'Dummy', value: 'dummy' },
];

const CURRENCIES = {
    BRL: 'R$',
    EUR: '€',
    USD: '$',
}

export default function Products() {
    const { data, setData, post, processing, errors, setDefaults } = useForm<Required<Product>>({
        name: '',
        description: '',
        category: '',
        quantity: 1,
        price: '',
        currency_code: 'BRL',
        sku: ''
    });

    const currencyCode = CURRENCIES[data.currency_code as keyof typeof CURRENCIES]

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('products'), {
            onFinish: () => setDefaults(),
        });
    };

    return (
        <AppLayout>
            <Head title="Cadastrar Produto" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 mt-6">
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-4 grid-cols-2">
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

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="price">Preço</Label>
                                        <div className="relative">
                                            <Input
                                                id="price"
                                                type="text"
                                                required
                                                tabIndex={1}
                                                value={data.price}
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
                                            max={999}
                                            value={data.quantity}
                                            onChange={(e) => setData('quantity', parseInt(e.target.value))}
                                        />
                                        <InputError message={errors.quantity} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
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
                                        className="w-full h-full min-h-full max-h-full resize-none"
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Adicione mais detalhes do produto..."
                                    />
                                </div>
                                <InputError message={errors.description} />
                            </div>
                        </div>

                        <div className="w-full flex items-start justify-end mt-4 gap-2">
                            <Button type="button" variant="secondary" className="p-0">
                                <Link href={route('products')} className="size-full px-4 py-2">Voltar</Link>
                            </Button>

                            <Button type="submit" tabIndex={4} disabled={processing} className="cursor-pointer">
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Cadastrar
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    )
}
