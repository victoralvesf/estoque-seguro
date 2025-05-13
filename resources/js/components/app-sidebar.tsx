import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { ListIcon, UsersIcon } from 'lucide-react';
import AppLogo from './app-logo';
import { usePermissions } from '@/hooks/use-permissions';

const mainNavItems: NavItem[] = [
    {
        id: 'products',
        title: 'Produtos',
        href: '/products',
        icon: ListIcon,
    },
    {
        id: 'users',
        title: 'Usuários',
        href: '/users',
        icon: UsersIcon,
    }
];

export function AppSidebar() {
    const canViewUsers = usePermissions({
        model: 'user',
        action: 'viewAny'
    })

    const navItems = mainNavItems.filter((item) => {
        if (item.id === 'users') return canViewUsers

        return true
    })

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
