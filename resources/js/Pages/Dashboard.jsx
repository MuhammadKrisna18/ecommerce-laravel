import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { DashboardWidgets } from '@/Features/Dashboard/DashboardWidgets';

import { useTranslation } from '@/Hooks/useTranslation';

export default function Dashboard() {
    const { t } = useTranslation();

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t('Dashboard Admin')}
                </h2>
            }
        >
            <Head title={t('Dashboard Admin')} />
            <DashboardWidgets />
        </AdminLayout>
    );
}
