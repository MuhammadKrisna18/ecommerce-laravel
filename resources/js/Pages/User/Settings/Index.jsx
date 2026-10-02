import { Head } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { UserSettingsContent } from '@/Features/User/Settings/UserSettingsContent';
import { useTranslation } from '@/Hooks/useTranslation';
import { Settings } from 'lucide-react';

export default function UserSettingsIndex({ user, authProvider, locale }) {
    const { t } = useTranslation();

    return (
        <UserLayout
            header={
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-brand-primary" />
                        {t('Pengaturan Akun')}
                    </h2>
                    <span className="text-xs text-slate-500 font-normal">
                        {t('Kelola preferensi akun, keamanan kata sandi, notifikasi, dan privasi Anda')}
                    </span>
                </div>
            }
        >
            <Head title={t('Pengaturan Akun')} />
            <UserSettingsContent user={user} authProvider={authProvider} locale={locale} />
        </UserLayout>
    );
}
