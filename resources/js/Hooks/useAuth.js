import { usePage } from '@inertiajs/react';

/**
 * useAuth — returns the authenticated user from Inertia shared props.
 *
 * Usage:
 *   const { user } = useAuth();
 *   const { user, isAdmin } = useAuth();
 *
 * @returns {{ user: object, isAdmin: boolean, isUser: boolean }}
 */
export function useAuth() {
    const { auth } = usePage().props;

    return {
        user:    auth?.user ?? null,
        isAdmin: auth?.user?.role === 'admin',
        isUser:  auth?.user?.role === 'user',
    };
}
