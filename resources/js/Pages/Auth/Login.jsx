import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { AnimatePresence } from 'framer-motion';
import AuthLayout from '@/Layouts/AuthLayout';
import { LoginForm } from '@/Features/Auth/LoginForm';
import { RegisterForm } from '@/Features/Auth/RegisterForm';

export default function Login({ status, canResetPassword }) {
    const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

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
            <Head title={authMode === 'login' ? 'Admin Login' : 'Daftar Akun User'} />
            <AnimatePresence mode="wait">
                {authMode === 'login' ? (
                    <LoginForm
                        key="login-form"
                        status={status}
                        canResetPassword={canResetPassword}
                        onSwitchToRegister={() => setAuthMode('register')}
                    />
                ) : (
                    <RegisterForm
                        key="register-form"
                        onSwitchToLogin={() => setAuthMode('login')}
                    />
                )}
            </AnimatePresence>
        </AuthLayout>
    );
}

