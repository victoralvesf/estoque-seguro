import { FormEventHandler } from "react";
import { Head, useForm } from "@inertiajs/react";
import { FormTitle } from "@/components/form-title";
import { UserForm } from "@/components/users/form";
import AppLayout from "@/layouts/app-layout";
import { ContentLayout } from "@/layouts/content-layout";
import { UserForm as UserFormType, UserResponse } from "@/types/responses/users";

interface EditUserProps {
    user: UserResponse
}

export default function EditUser({ user }: EditUserProps) {
    const title = 'Editar Usuário'
    const form = useForm<Required<UserFormType>>({
        name: user.name,
        email: user.email,
        role: user.role,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        const url = route('users.update', { user: user.id })

        form.put(url, {
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
                    buttonText="Salvar"
                    edit
                />
            </ContentLayout>
        </AppLayout>
    )
}
