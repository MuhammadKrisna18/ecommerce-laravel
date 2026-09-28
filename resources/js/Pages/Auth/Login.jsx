import { Head } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import { LoginForm } from '@/Features/Auth/LoginForm';

export default function Login({ status, canResetPassword }) {
    return (
        <AuthLayout>
            <Head title="Admin Login" />
            <LoginForm status={status} canResetPassword={canResetPassword} />
        </AuthLayout>
    );
}
