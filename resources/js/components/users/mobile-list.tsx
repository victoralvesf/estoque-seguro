import { ProductResponse } from "@/types/responses/products"
import { Badge } from "../ui/badge"
import { formatPrice } from "@/utils/price"
import { UserTableActions } from "./actions-button"
import { UserResponse } from "@/types/responses/users"

interface UsersMobileListProps {
    users: UserResponse[]
}

export function UsersMobileList({ users }: UsersMobileListProps) {
    return (
        <div className="flex flex-col gap-2">
            {users.map((user) => (
                <div key={user.id} className="flex border border-border rounded-md px-4 py-3">
                    <div className="flex flex-col gap-1 flex-1">
                        <h4 className="font-semibold">{user.name}</h4>
                        <span className="text-sm text-muted-foreground">{user.email}</span>
                    </div>


                    <div className="flex flex-col gap-2 items-end justify-between">
                        <Badge variant="secondary">{user.role}</Badge>
                        <UserTableActions
                            // user={user}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}
