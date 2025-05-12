import { Role } from "@/types";

export const ROLES = [
    { label: 'Comum', value: 'user' },
    { label: 'Operador', value: 'operator' },
    { label: 'Administrador', value: 'admin' },
]

export function getRoleLabel(role: Role) {
    return ROLES.find((item) => item.value === role)?.label as string
}
