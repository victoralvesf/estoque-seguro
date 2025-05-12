import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePage } from "@inertiajs/react"
import { SharedData } from "@/types"

export function ProductTableActions() {
    const { auth } = usePage<SharedData>().props

    const userIsAdmin = auth.user.role === 'admin'
    const userIsOperator = auth.user.role === 'operator'

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Ações
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userIsOperator && (
                    <DropdownMenuItem>Atualizar Estoque</DropdownMenuItem>
                )}
                {userIsAdmin && (
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                )}
                <DropdownMenuItem>Excluir</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
