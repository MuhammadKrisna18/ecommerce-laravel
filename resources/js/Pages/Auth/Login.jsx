import { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import { LoginForm } from '@/Features/Auth/LoginForm';

export default function Login({ status, canResetPassword }) {
    useEffect(() => {
        // Prevent Chrome / browser from preserving forward/back cache (bfcache)
        window.history.pushState(null, '', window.location.href);
        const handlePopState = () => {
            window.history.pushState(null, '', window.location.href);
        };
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return (
        <AuthLayout>
            <Head title="Admin Login" />
            <LoginForm status={status} canResetPassword={canResetPassword} />
        </AuthLayout>
    );
}
