import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { LayoutDashboard, Settings, Shield, Store, UserCheck } from 'lucide-react';
import { AppShell } from '@/Components/layout/AppShell';
import { AppSidebar } from '@/Components/layout/AppSidebar';
import { AppTopbar } from '@/Components/layout/AppTopbar';
import { useTranslation } from '@/Hooks/useTranslation';

export default function AdminLayout({ header, children }) {
    const { t } = useTranslation();
    const { auth } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        {
            name: t('Dashboard'),
            href: route('dashboard'),
            icon: LayoutDashboard,
            active: route().current('dashboard'),
        },
        {
            name: t('Pengaturan Toko'),
            href: route('admin.settings.index'),
            icon: Settings,
            active: route().current('admin.settings.*'),
        },
    ];

    return (
        <AppShell
            sidebar={
                <AppSidebar
                    user={auth.user}
                    navItems={navItems}
                    brandIcon={Store}
                    brandLabel={t('Panel Manajemen')}
                    mobileTitle="Tokped Admin"
                    isMobileOpen={isSidebarOpen}
                    onMobileClose={() => setIsSidebarOpen(false)}
                />
            }
            topbar={
                <AppTopbar
                    header={header}
                    onMenuToggle={() => setIsSidebarOpen((v) => !v)}
                    right={
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-900/30 text-xs text-rose-300">
                            <UserCheck className="w-3.5 h-3.5 text-rose-400" />
                            <span>
                                Role:{' '}
                                <strong className="text-white uppercase tracking-wider">
                                    {auth.user.role || 'Admin'}
                                </strong>
                            </span>
                        </div>
                    }
                />
            }
        >
            {children}
        </AppShell>
    );
}
