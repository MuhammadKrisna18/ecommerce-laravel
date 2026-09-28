import { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, 
    LogOut, 
    Menu, 
    X, 
    ShoppingBag, 
    User as UserIcon,
    ChevronRight,
    AtSign
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { useTranslation } from '@/Hooks/useTranslation';

export default function UserLayout({ header, children }) {
    const { t } = useTranslation();
    const { auth } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navItems = [
        { 
            name: t('Dashboard'), 
            href: route('user.dashboard'), 
            icon: LayoutDashboard, 
            active: route().current('user.dashboard'),
        },
    ];

    return (
        <div className="min-h-screen bg-[#090809] text-zinc-100 flex overflow-hidden selection:bg-rose-900 selection:text-white">
            {/* Sidebar Desktop */}
            <motion.aside 
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:flex flex-col w-72 bg-[#0e0a0b] border-r border-red-950/40 shadow-[4px_0_24px_rgba(0,0,0,0.5)] z-20"
            >
                {/* Brand Header */}
                <div className="h-20 flex items-center gap-3 px-6 border-b border-red-950/40 relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-800 to-black border border-red-500/30 flex items-center justify-center text-white shadow-[0_0_15px_rgba(225,29,72,0.3)]">
                        <ShoppingBag className="w-5 h-5 text-rose-100" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                            Tokped Commerce
                        </span>
                        <span className="text-[11px] font-medium text-rose-400/80 flex items-center gap-1">
                            <UserIcon className="w-3 h-3 text-red-500" /> Area Pengguna
                        </span>
                    </div>
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />
                </div>
                
                {/* Navigation Items */}
                <div className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    Menu Utama
                </div>
                <nav className="flex-1 overflow-y-auto px-4 space-y-1.5">
                    {navItems.map((item, index) => (
                        <motion.div 
                            key={item.name}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 + index * 0.05 }}
                        >
                            <Link
                                href={item.href}
                                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                    item.active 
                                        ? 'bg-gradient-to-r from-red-900/60 via-rose-950/50 to-zinc-900/40 text-white border border-red-700/40 shadow-[0_0_15px_rgba(153,27,27,0.25)]' 
                                        : 'text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200 border border-transparent'
                                }`}
                            >
                                <div className="flex items-center">
                                    <item.icon className={`w-4 h-4 mr-3 transition-colors ${item.active ? 'text-rose-400' : 'text-zinc-500'}`} />
                                    <span>{item.name}</span>
                                </div>
                                {item.active && <ChevronRight className="w-4 h-4 text-rose-400" />}
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                {/* User Profile & Logout Bottom */}
                <div className="p-4 border-t border-red-950/40 bg-zinc-950/40">
                    <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-950 to-zinc-900 border border-red-800/40 flex items-center justify-center text-rose-300 font-bold text-sm shadow-inner">
                            {auth.user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className="text-sm font-medium text-zinc-200 truncate flex items-center gap-1.5">
                                {auth.user.name}
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                            </span>
                            {auth.user.nickname && (
                                <span className="text-xs text-rose-400/90 flex items-center gap-0.5 truncate">
                                    <AtSign className="w-3 h-3" />
                                    {auth.user.nickname}
                                </span>
                            )}
                            <span className="text-[11px] text-zinc-500 truncate">{auth.user.email}</span>
                        </div>
                    </div>
                    
                    <button
                        type="button"
                        onClick={() => {
                            router.post(route('logout'), {}, {
                                onFinish: () => {
                                    window.location.replace(route('login'));
                                },
                            });
                        }}
                        className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400/90 rounded-xl bg-red-950/20 border border-red-900/30 hover:bg-red-900/40 hover:text-white transition-all shadow-sm"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        {t('Logout Sesi')}
                    </button>
                </div>
            </motion.aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
                        onClick={toggleSidebar}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.aside 
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                        className="fixed inset-y-0 left-0 z-50 w-72 bg-[#0e0a0b] border-r border-red-950/40 shadow-2xl md:hidden flex flex-col"
                    >
                        <div className="h-20 flex items-center justify-between px-6 border-b border-red-950/40">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-900 flex items-center justify-center text-white">
                                    <ShoppingBag className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-white tracking-tight">Tokped User</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                        
                        <nav className="flex-1 px-4 py-4 space-y-1.5">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                        item.active 
                                            ? 'bg-red-900/60 text-white border border-red-700/40' 
                                            : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                                    }`}
                                >
                                    <item.icon className="w-4 h-4 mr-3" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="p-4 border-t border-red-950/40">
                            <button
                                type="button"
                                onClick={() => {
                                    router.post(route('logout'), {}, {
                                        onFinish: () => {
                                            window.location.replace(route('login'));
                                        },
                                    });
                                }}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-rose-300 rounded-xl bg-red-950/30 border border-red-900/40 hover:bg-red-900/40"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                {t('Logout Sesi')}
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#070607] relative overflow-y-auto">
                <div className="absolute top-0 right-1/4 w-96 h-64 bg-red-950/20 blur-[130px] pointer-events-none" />

                {/* Header */}
                <motion.header 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="h-20 bg-[#0c0809]/90 backdrop-blur-md border-b border-red-950/30 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-10"
                >
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="md:hidden text-zinc-300 hover:bg-zinc-800" onClick={toggleSidebar}>
                            <Menu className="w-5 h-5" />
                        </Button>
                        <div>
                            {header}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-900/30 text-xs text-rose-300">
                            <UserIcon className="w-3.5 h-3.5 text-rose-400" />
                            <span>Role: <strong className="text-white uppercase tracking-wider">{auth.user.role || 'User'}</strong></span>
                        </div>
                    </div>
                </motion.header>

                {/* Page Content */}
                <div className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full relative z-0">
                    {children}
                </div>
            </main>
        </div>
    );
}
