import { usePage } from '@inertiajs/react';
import AppLogoIcon from './app-logo-icon';
import { SharedData } from '@/types';

export default function AppLogo() {
    const { name } = usePage<SharedData>().props

    return (
        <>
            <div className="bg-emerald-950 border border-emerald-900 flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="truncate font-semibold">{name}</span>
            </div>
        </>
    );
}
