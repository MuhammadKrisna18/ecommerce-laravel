import { usePage } from '@inertiajs/react';

/**
 * useFlash — reads Inertia flash messages from shared page props.
 *
 * Usage:
 *   const { success, error, warning, info } = useFlash();
 *
 * @returns {{ success: string|null, error: string|null, warning: string|null, info: string|null }}
 */
export function useFlash() {
    const { flash = {} } = usePage().props;

    return {
        success: flash.success ?? null,
        error:   flash.error   ?? null,
        warning: flash.warning ?? null,
        info:    flash.info    ?? null,
    };
}
