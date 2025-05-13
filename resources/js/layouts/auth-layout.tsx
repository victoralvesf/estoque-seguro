import AuthLayoutTemplate from '@/layouts/auth/auth-layout-template';

export default function AuthLayout({ children, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <AuthLayoutTemplate {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}
