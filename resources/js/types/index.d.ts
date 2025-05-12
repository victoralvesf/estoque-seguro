import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export type PermissionActions = 'viewAny' | 'view' | 'create' | 'update' | 'delete' | 'restore' | 'forceDelete'

export interface AppPermissions {
    user: Record<PermissionActions, boolean>
    product: Record<PermissionActions, boolean>
}

export interface Auth {
    user: User;
    permissions: AppPermissions
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    id: string
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedCategory {
    id: number
    name: string
    slug: string
}

export interface ProductFilters {
  name?: string
  category_id?: string
  min_price?: string
  max_price?: string
  min_quantity?: string
  max_quantity?: string
  order_by?: string
  sort?: string
  per_page?: string
}

export interface SharedData {
    name: string;
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    categories: SharedCategory[]
    filters: ProductFilters
    [key: string]: unknown;
}

export type Role = 'admin' | 'operator' | 'user';

export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
