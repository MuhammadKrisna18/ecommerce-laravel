import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { DashboardWidgets } from '@/Features/Dashboard/DashboardWidgets';

import { useTranslation } from '@/Hooks/useTranslation';

export default function Dashboard() {
    const { t } = useTranslation();

    return (
        <AdminLayout
            header={
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        {t('Dashboard Admin')}
                    </h2>
                    <span className="text-xs text-zinc-400">Ringkasan performa dan pemantauan sistem toko</span>
                </div>
            }
        >
            <Head title={t('Dashboard Admin')} />
            <DashboardWidgets />
        </AdminLayout>
    );
}
