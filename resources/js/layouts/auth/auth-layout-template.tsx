import AppLogoIcon from '@/components/app-logo-icon';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
}

export default function AuthLayoutTemplate({ children }: PropsWithChildren<AuthLayoutProps>) {
    const page = usePage<SharedData>();
    const { name } = page.props;

    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-4 font-medium">
                            <div className="mb-1 flex size-10 items-center justify-center rounded-md">
                                <AppLogoIcon />
                            </div>
                            <span className='font-semibold'>{name}</span>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
