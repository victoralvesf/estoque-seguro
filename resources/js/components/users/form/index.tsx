import { FormEvent } from "react"
import { InertiaFormProps, Link } from "@inertiajs/react"
import { SimpleDropdownMenu } from "@/components/forms/dropdown"
import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Role } from "@/types"
import { UserForm as UserFormType } from "@/types/responses/users"
import { ROLES } from "@/utils/role"
import { LoaderCircle } from "lucide-react"

interface UserFormProps {
    submit: (e: FormEvent<HTMLFormElement>) => void
    form: InertiaFormProps<Required<UserFormType>>
    buttonText: string
    edit?: boolean
}

export function UserForm({ submit, form, buttonText, edit = false }: UserFormProps) {
    const { data, setData, processing, errors } = form

    const shouldRequirePassword = edit
        ? data.password !== '' || data.password_confirmation !== ''
        : true

    return (
        <form className="flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-6">
                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="grid gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                autoComplete="name"
                                disabled={processing}
                                placeholder="Nome completo"
                                tabIndex={1}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid lg:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email">E-mail</Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="email@dominio.com"
                                        disabled={processing}
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="role">Cargo</Label>
                                <SimpleDropdownMenu
                                    value={data.role}
                                    options={ROLES}
                                    onSelected={(role) => setData('role', role as Role)}
                                />
                                <InputError message={errors.role} />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Senha</Label>
                            <div className="flex h-full">
                                <Input
                                    id="password"
                                    type="password"
                                    required={shouldRequirePassword}
                                    tabIndex={1}
                                    placeholder="Senha"
                                    autoComplete="new-password"
                                    disabled={processing}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password_confirmation">Confirme a senha</Label>
                            <div className="flex h-full">
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required={shouldRequirePassword}
                                    tabIndex={1}
                                    autoComplete="new-password"
                                    disabled={processing}
                                    placeholder="Confirme a senha"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.password_confirmation} />
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col lg:flex-row-reverse items-start lg:justify-start mt-4 gap-2">
                    <Button type="submit" tabIndex={1} disabled={processing} className="cursor-pointer w-full lg:w-fit">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {buttonText}
                    </Button>

                    <Button type="button" tabIndex={1} variant="secondary" className="p-0 w-full lg:w-fit">
                        <Link href={route('users')} className="size-full px-4 py-2">Voltar</Link>
                    </Button>
                </div>
            </div>
        </form>
    )
}
