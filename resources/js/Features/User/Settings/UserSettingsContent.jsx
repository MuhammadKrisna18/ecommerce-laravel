import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedTab } from '@/Components/ui/AnimatedTab';
import {
    ShieldCheck,
    KeyRound,
    SlidersHorizontal,
    Bell,
    Shield,
    Lock,
    AtSign,
    Mail,
    CheckCircle,
    UserCheck,
    Store,
} from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';
import { SecurityCard } from '@/Features/User/Settings/SecurityCard';
import { PreferencesCard } from '@/Features/User/Settings/PreferencesCard';
import { SellerUpgradeCard } from '@/Features/User/Settings/SellerUpgradeCard';
import { NotificationCard } from '@/Features/User/Settings/NotificationCard';
import { PrivacyAndDangerCard } from '@/Features/User/Settings/PrivacyAndDangerCard';

export function UserSettingsContent({ user, authProvider, locale }) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('security');

    const tabs = [
        {
            id: 'security',
            name: t('Keamanan & Sandi'),
            icon: KeyRound,
            badge: null,
        },
        {
            id: 'seller',
            name: t('Buka Toko'),
            icon: Store,
            badge: user?.role === 'seller' ? t('Aktif') : t('Gratis'),
        },
        {
            id: 'preferences',
            name: t('Preferensi & Tampilan'),
            icon: SlidersHorizontal,
            badge: null,
        },
        {
            id: 'notifications',
            name: t('Notifikasi'),
            icon: Bell,
            badge: null,
        },
        {
            id: 'privacy',
            name: t('Privasi & Akun'),
            icon: Shield,
            badge: null,
        },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Top Banner: User Security & Status Overview */}
            <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute left-1/3 -top-10 w-48 h-48 bg-brand-accent/15 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    {/* User Profile Snippet */}
                    <div className="flex items-center gap-4">
                        {user?.avatar_url ? (
                            <img
                                src={user.avatar_url}
                                alt={user.name}
                                className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-md shrink-0"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white text-2xl font-bold shadow-md shrink-0">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-xl font-bold text-white tracking-tight">
                                    {user?.name}
                                </h3>
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-primary/20 text-brand-accent border border-brand-accent/30">
                                    <UserCheck className="w-3 h-3" />
                                    {user?.role === 'admin' ? t('Admin') : user?.role === 'seller' ? t('Seller') : t('User')}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-xs text-slate-300 flex-wrap">
                                {user?.nickname && (
                                    <span className="flex items-center gap-1 text-brand-accent font-medium">
                                        <AtSign className="w-3 h-3" />
                                        {user.nickname}
                                    </span>
                                )}
                                <span className="flex items-center gap-1 text-slate-400">
                                    <Mail className="w-3 h-3" />
                                    {user?.email}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Security Health Score Card */}
                    <div className="w-full md:w-auto p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2 min-w-[240px]">
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                {t('Kesehatan Keamanan')}
                            </span>
                            <span className="text-xs font-bold text-emerald-400">
                                90% {t('Terlindungi')}
                            </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full w-[90%]" />
                        </div>
                        <p className="text-[11px] text-slate-400">
                            {t('Sandi terenkripsi & email login utama aktif')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                                isActive
                                    ? 'text-brand-primary shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                            }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeSettingTab"
                                    className="absolute inset-0 bg-white rounded-xl shadow-xs border border-slate-200/60"
                                    transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-primary' : 'text-slate-400'}`} />
                                <span>{tab.name}</span>
                                {tab.badge && (
                                    <span
                                        className={`ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider ${
                                            tab.id === 'seller'
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-brand-primary/10 text-brand-primary'
                                        }`}
                                    >
                                        {tab.badge}
                                    </span>
                                )}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Tab Contents with Framer Motion AnimatePresence */}
            <AnimatePresence mode="wait">
                <AnimatedTab tabKey={activeTab}>
                    {activeTab === 'security' && <SecurityCard user={user} />}
                    {activeTab === 'seller' && <SellerUpgradeCard user={user} />}
                    {activeTab === 'preferences' && <PreferencesCard locale={locale} />}
                    {activeTab === 'notifications' && <NotificationCard />}
                    {activeTab === 'privacy' && (
                        <PrivacyAndDangerCard user={user} authProvider={authProvider} />
                    )}
                </AnimatedTab>
            </AnimatePresence>
        </div>
    );
}
