import { PermissionActions, AppPermissions, SharedData } from "@/types";
import { usePage } from "@inertiajs/react";

interface UsePermissionsProps {
    model: keyof AppPermissions
    action: PermissionActions
}

export function usePermissions({ model, action }: UsePermissionsProps) {
    const { auth } = usePage<SharedData>().props

    return auth.permissions[model][action] ?? false
}
