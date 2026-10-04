import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

import { UserManagementList } from '@/Features/Admin/Settings/UserManagementList';
import { useTranslation } from '@/Hooks/useTranslation';
import { Sliders } from 'lucide-react';

export default function SettingsIndex({ users }) {
    const { t } = useTranslation();

    return (
        <AdminLayout
            header={
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
                        <Sliders className="w-5 h-5 text-brand-primary" />
                        {t('Pengaturan & Manajemen')}
                    </h2>
                    <span className="text-xs text-slate-500 font-normal">
                        {t(
                            'Konfigurasi toko, identitas layanan, serta kontrol manajemen akun pengguna'
                        )}
                    </span>
                </div>
            }
        >
            <Head title={t('Pengaturan & Manajemen Akun')} />

            <div className="max-w-5xl mx-auto space-y-8">
                <UserManagementList users={users} />
            </div>
        </AdminLayout>
    );
}
