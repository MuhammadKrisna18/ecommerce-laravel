import { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, 
    Users, 
    ShoppingCart, 
    Settings, 
    LogOut, 
    Menu, 
    X 
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { useTranslation } from '@/Hooks/useTranslation';

export default function AdminLayout({ header, children }) {
    const { t } = useTranslation();
    const { auth } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navItems = [
        { name: t('Dashboard'), href: route('dashboard'), icon: LayoutDashboard, active: route().current('dashboard') },
        { name: t('Pengaturan'), href: route('admin.settings.index'), icon: Settings, active: route().current('admin.settings.*') },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-hidden">
            {/* Sidebar (Desktop) */}
            <motion.aside 
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
                className="hidden md:flex flex-col w-64 bg-white border-r shadow-sm z-10"
            >
                <div className="h-16 flex items-center justify-center border-b">
                    <span className="text-xl font-bold text-primary">{t('Admin Panel')}</span>
                </div>
                
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    {navItems.map((item, index) => (
                        <motion.div 
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.1 }}
                        >
                            <Link
                                href={item.href}
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    item.active 
                                        ? 'bg-primary text-primary-foreground shadow-md' 
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                            >
                                <item.icon className={`w-5 h-5 mr-3 ${item.active ? 'animate-pulse' : ''}`} />
                                {item.name}
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                <div className="p-4 border-t">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {auth.user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-medium truncate">{auth.user.name}</span>
                            <span className="text-xs text-muted-foreground truncate">{auth.user.email}</span>
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
                        className="w-full mt-4 flex items-center justify-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        {t('Logout')}
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
                        className="fixed inset-0 z-20 bg-black/50 md:hidden"
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
                        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                        className="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg md:hidden flex flex-col"
                    >
                        <div className="h-16 flex items-center justify-between px-4 border-b">
                            <span className="text-xl font-bold text-primary">{t('Admin Panel')}</span>
                            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                        
                        <nav className="flex-1 px-3 py-4 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        item.active 
                                            ? 'bg-primary text-primary-foreground' 
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="p-4 border-t">
                            <button
                                type="button"
                                onClick={() => {
                                    router.post(route('logout'), {}, {
                                        onFinish: () => {
                                            window.location.replace(route('login'));
                                        },
                                    });
                                }}
                                className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
                            >
                                <LogOut className="w-5 h-5 mr-3" />
                                {t('Logout')}
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <motion.header 
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 sm:px-6 lg:px-8 z-0"
                >
                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleSidebar}>
                            <Menu className="w-5 h-5" />
                        </Button>
                        {header}
                    </div>
                </motion.header>

                {/* Page Content */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8"
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}
