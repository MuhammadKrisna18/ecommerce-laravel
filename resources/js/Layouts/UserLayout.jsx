import { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { LayoutDashboard, ShoppingBag, User as UserIcon, Settings, Store } from 'lucide-react';
import { AppShell } from '@/Components/layout/AppShell';
import { AppSidebar } from '@/Components/layout/AppSidebar';
import { AppTopbar } from '@/Components/layout/AppTopbar';
import { useTranslation } from '@/Hooks/useTranslation';

export default function UserLayout({ header, children }) {
    const { t } = useTranslation();
    const { auth } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isSeller = auth?.user?.role === 'seller';

    const navItems = [
        {
            name: t('Dashboard'),
            href: route('user.dashboard'),
            icon: LayoutDashboard,
            active: route().current('user.dashboard'),
        },
        {
            name: t('Profil Saya'),
            href: route('user.profile.edit'),
            icon: UserIcon,
            active: route().current('user.profile.*'),
        },
        {
            name: t('Pengaturan'),
            href: route('user.settings.index'),
            icon: Settings,
            active: route().current('user.settings.*'),
        },
        ...(isSeller
            ? [
                  {
                      name: t('Toko Saya'),
                      href: route('seller.dashboard'),
                      icon: Store,
                      active: route().current('seller.*'),
                  },
              ]
            : []),
    ];

    return (
        <AppShell
            sidebar={
                <AppSidebar
                    user={auth.user}
                    navItems={navItems}
                    brandIcon={ShoppingBag}
                    brandLabel={t('Area Pengguna')}
                    mobileTitle="K-Tienda User"
                    isMobileOpen={isSidebarOpen}
                    onMobileClose={() => setIsSidebarOpen(false)}
                />
            }
            topbar={
                <AppTopbar
                    header={header}
                    onMenuToggle={() => setIsSidebarOpen((v) => !v)}
                    right={
                        <div className="flex items-center gap-2">
                            {isSeller && (
                                <Link
                                    href={route('seller.dashboard')}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100/80 border border-emerald-200 text-xs font-semibold transition-all shadow-xs"
                                >
                                    <Store className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>{t('Toko Saya')}</span>
                                </Link>
                            )}
                            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/20 border border-brand-primary/30 text-xs text-brand-primary">
                                <UserIcon className="w-3.5 h-3.5 text-brand-primary" />
                                <span>
                                    {t('Role')}:{' '}
                                    <strong className="text-slate-800 font-semibold capitalize">
                                        {auth.user.role === 'admin' ? t('Admin') : auth.user.role === 'seller' ? t('Seller') : t('User')}
                                    </strong>
                                </span>
                            </div>
                        </div>
                    }
                />
            }
        >
            {children}
        </AppShell>
    );
}
