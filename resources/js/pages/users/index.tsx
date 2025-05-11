import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { ContentLayout } from "@/layouts/content-layout";
import { UsersResponse } from "@/types/responses/users";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface UsersProps {
    users: UsersResponse
}

export default function Users({ users }: UsersProps) {
    return (
        <AppLayout>
            <Head title="Produtos" />
            <ContentLayout>
                <div className="flex items-center justify-end">
                    <div className="flex gap-2 items-center">
                        <Button size="icon" variant="secondary" disabled={!users.prev_page_url}>
                            <Link href={users.prev_page_url!} className="size-full flex items-center justify-center">
                                <Icon iconNode={ChevronLeft} />
                            </Link>
                        </Button>

                        <Button variant="ghost" size="icon" className="pointer-events-none">
                            {users.current_page}
                        </Button>

                        <Button size="icon" variant="secondary" disabled={users.next_page_url === null}>
                            <Link href={users.next_page_url!} className="size-full flex items-center justify-center">
                                <Icon iconNode={ChevronRight} />
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {users.data.map((user) => (
                        <div key={user.id} className="p-4 border border-border rounded-md">
                            <h3>{user.name}</h3>
                            <p>{user.email}</p>
                            <p>{user.role}</p>
                        </div>
                    ))}
                </div>
            </ContentLayout>
        </AppLayout>
    )
}
