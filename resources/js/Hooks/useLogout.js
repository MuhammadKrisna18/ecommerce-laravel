import { router } from '@inertiajs/react';

export function useLogout() {
    return () => {
        router.post(
            route('logout'),
            {},
            {
                onFinish: () => window.location.replace(route('login')),
            }
        );
    };
}
