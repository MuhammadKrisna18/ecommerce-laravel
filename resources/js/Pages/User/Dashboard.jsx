import { Head } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { UserDashboardContent } from '@/Features/User/Dashboard/UserDashboardContent';
import { useTranslation } from '@/Hooks/useTranslation';

export default function UserDashboard({ products = [] }) {
    const { t } = useTranslation();

    return (
        <UserLayout
            header={
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold tracking-tight text-slate-800">
                        {t('Dashboard Pengguna')}
                    </h2>
                    <span className="text-xs text-slate-500 font-normal">
                        {t('Selamat datang di area dashboard akun Anda')}
                    </span>
                </div>
            }
        >
            <Head title={t('Dashboard Pengguna')} />
            <UserDashboardContent products={products} />
        </UserLayout>
    );
}
