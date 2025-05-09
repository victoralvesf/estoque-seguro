import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function Products() {
    return (
        <AppLayout>
            <Head title="Cadastrar Produto" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1>Cadastrar Produto</h1>
            </div>
        </AppLayout>
    )
}
