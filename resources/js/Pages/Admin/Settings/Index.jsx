import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { SettingsForm } from '@/Features/Admin/Settings/SettingsForm';
import { useTranslation } from '@/Hooks/useTranslation';
import { Sliders } from 'lucide-react';

export default function SettingsIndex({ settings }) {
    const { t } = useTranslation();

    return (
        <AdminLayout
            header={
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
                        <Sliders className="w-5 h-5 text-brand-primary" />
                        {t('Pengaturan Toko')}
                    </h2>
                    <span className="text-xs text-slate-500 font-normal">
                        {t('Konfigurasi identitas toko, kontak layanan, dan lokalisasi')}
                    </span>
                </div>
            }
        >
            <Head title={t('Pengaturan Toko')} />

            <div className="max-w-4xl mx-auto space-y-6">
                <SettingsForm settings={settings} />
            </div>
        </AdminLayout>
    );
}
