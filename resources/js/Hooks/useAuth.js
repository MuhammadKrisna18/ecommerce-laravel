import { usePage } from '@inertiajs/react';

export function useAuth() {
    const { auth } = usePage().props;

    return {
        user: auth?.user ?? null,
        isAdmin: auth?.user?.role === 'admin',
        isUser: auth?.user?.role === 'user',
    };
}
