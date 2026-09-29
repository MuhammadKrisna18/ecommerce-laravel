import { router } from '@inertiajs/react';

/**
 * useLogout — shared logout handler.
 *
 * Usage:
 *   const logout = useLogout();
 *   <button onClick={logout}>Keluar</button>
 *
 * @returns {Function} logout handler
 */
export function useLogout() {
    return () => {
        router.post(route('logout'), {}, {
            onFinish: () => window.location.replace(route('login')),
        });
    };
}
