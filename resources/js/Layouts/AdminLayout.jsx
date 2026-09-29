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
            href: route('admin.dashboard'),
            icon: LayoutDashboard,
            active: route().current('admin.dashboard'),
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
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6dd7fd]/15 border border-[#0093cb]/30 text-xs text-[#0093cb]">
                            <UserCheck className="w-3.5 h-3.5 text-[#0093cb]" />
                            <span>
                                Role:{' '}
                                <strong className="text-slate-800 uppercase tracking-wider font-bold">
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
