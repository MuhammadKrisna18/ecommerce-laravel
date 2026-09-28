import { usePage } from '@inertiajs/react';

export function useTranslation() {
    const { translations, locale } = usePage().props;

    const t = (key, replacements = {}) => {
        let translation = translations?.[key] || key;

        Object.keys(replacements).forEach((replace) => {
            translation = translation.replace(`:${replace}`, replacements[replace]);
        });

        return translation;
    };

    return { t, locale };
}
