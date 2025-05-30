import { FormEventHandler } from "react";
import { Head, useForm } from "@inertiajs/react";
import { FormTitle } from "@/components/form-title";
import { UserForm } from "@/components/users/form";
import AppLayout from "@/layouts/app-layout";
import { ContentLayout } from "@/layouts/content-layout";
import { UserForm as UserFormType } from "@/types/responses/users";

export default function CreateUser() {
    const title = 'Criar Usuário'
    const form = useForm<Required<UserFormType>>({
        name: '',
        email: '',
        role: 'user',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        form.post(route('users'), {
            onFinish: () => form.reset('password', 'password_confirmation')
        })
    }

    return (
        <AppLayout>
            <Head title={title} />
            <ContentLayout>
                <FormTitle>{title}</FormTitle>

                <UserForm
                    submit={submit}
                    form={form}
                    buttonText="Cadastrar"
                />
            </ContentLayout>
        </AppLayout>
    )
}
