import { Badge } from "@/components/ui/badge"
import { UserTableActions } from "@/components/users/actions-button"
import { UserResponse } from "@/types/responses/users"
import { getRoleLabel } from "@/utils/role"
import { ColumnDef } from "@tanstack/react-table"

export const userColumns: ColumnDef<UserResponse>[] = [
    {
        accessorKey: 'name',
        header: 'Nome',
    },
    {
        accessorKey: 'email',
        header: 'E-mail',
    },
    {
        accessorKey: 'role',
        header: 'Cargo',
        cell: ({ row }) => {
            const { role } = row.original
            const label = getRoleLabel(role)

            return <Badge variant="secondary">{label}</Badge>
        },
    },
    {
        id: 'actions',
        header: '',
        cell: ({ row }) => <UserTableActions user={row.original} />,
    }
]
