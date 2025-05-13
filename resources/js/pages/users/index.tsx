import { userColumns } from "@/columns/user";
import { AddButton } from "@/components/add-button";
import { Paginator } from "@/components/paginator";
import { DataTable } from "@/components/ui/data-table";
import { UsersMobileList } from "@/components/users/mobile-list";
import { usePermissions } from "@/hooks/use-permissions";
import AppLayout from "@/layouts/app-layout";
import { ContentLayout } from "@/layouts/content-layout";
import { cn } from "@/lib/utils";
import { UsersResponse } from "@/types/responses/users";
import { Head } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";

interface UsersProps {
    users: UsersResponse
}

export default function Users({ users }: UsersProps) {
    const canCreateUser = usePermissions({
        model: 'user',
        action: 'create',
    })

    return (
        <AppLayout>
            <Head title="Usuários" />
            <ContentLayout className="pb-20 lg:pb-24">
                <div className="hidden lg:flex flex-col gap-2">
                    <DataTable
                        columns={userColumns}
                        data={users.data}
                    />
                </div>

                <div className="grid lg:hidden">
                    <UsersMobileList users={users.data} />
                </div>

                <div className="h-16 lg:hidden bg-background border-t border-border fixed bottom-0 inset-x-0 px-4">
                    <div className="flex items-center justify-end relative w-full h-full">
                        <Paginator
                            className={cn(
                                canCreateUser && 'absolute left-1/2 -translate-x-1/2',
                                !canCreateUser && "relative ml-auto",
                            )}
                            pagination={users}
                        />

                        {canCreateUser && (
                            <AddButton routeName="users.create">
                                Criar Usuário
                            </AddButton>
                        )}
                    </div>
                </div>

                <div className="hidden lg:grid fixed bottom-0 inset-x-0 h-20 w-full border-t border-border bg-background z-50">
                    <div className="mx-auto w-full max-w-7xl h-full flex items-center gap-4 justify-end px-4">
                        <Paginator pagination={users} />

                        {canCreateUser && (
                            <AddButton routeName="users.create">
                                <PlusIcon className="size-6" />
                                Criar Usuário
                            </AddButton>
                        )}
                    </div>
                </div>
            </ContentLayout>
        </AppLayout>
    )
}
