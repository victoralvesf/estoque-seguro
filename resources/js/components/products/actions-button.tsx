import { MoreHorizontal, PencilIcon, Trash2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { router, usePage } from "@inertiajs/react"
import { SharedData } from "@/types"
import { ProductResponse } from "@/types/responses/products"
import { DeleteProductConfirm } from "./delete-confirm"

interface ProductTableActionsProps {
    product: ProductResponse
}

export function ProductTableActions({ product }: ProductTableActionsProps) {
    const { auth } = usePage<SharedData>().props

    const userIsCommom = auth.user.role === 'user'
    if (userIsCommom) return null

    const userIsAdmin = auth.user.role === 'admin'
    const userIsOperator = auth.user.role === 'operator'

    function handleEdit() {
        const url = route('products.edit', { product: product.id })
        router.visit(url)
    }

    function handleDelete() {
        const url = route('products.destroy', { product: product.id })
        router.delete(url)
    }

    return (
        <div className="flex justify-end">
            <AlertDialog>
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
                        {(userIsAdmin || userIsOperator) && (
                            <DropdownMenuItem onClick={handleEdit}>
                                <PencilIcon className="size-4 mr-2" />
                                Editar
                            </DropdownMenuItem>
                        )}
                        {userIsAdmin && (
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem>
                                    <Trash2Icon className="size-4 mr-2 fill-red-400 text-red-700" />
                                    <span className="text-red-700">Excluir</span>
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

                <DeleteProductConfirm handleConfirm={handleDelete} />
            </AlertDialog>
        </div>
    )
}
