import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { motion } from 'framer-motion';
import { 
    Users, 
    ShoppingBag, 
    DollarSign, 
    TrendingUp, 
    ShieldCheck, 
    Activity, 
    Clock, 
    Sparkles, 
    Layers,
    ArrowUpRight,
    Server,
    Database
} from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';
import { usePage } from '@inertiajs/react';

export function DashboardWidgets() {
    const { t } = useTranslation();
    const { auth } = usePage().props;

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
    };

    const stats = [
        {
            title: t('Total Pengguna'),
            value: '1.240',
            trend: '+12.5%',
            isPositive: true,
            icon: Users,
            description: t('Pengguna aktif bulan ini')
        },
        {
            title: t('Total Pesanan'),
            value: '3.820',
            trend: '+8.2%',
            isPositive: true,
            icon: ShoppingBag,
            description: t('Transaksi sukses')
        },
        {
            title: t('Total Pendapatan'),
            value: 'Rp 148.500.000',
            trend: '+15.4%',
            isPositive: true,
            icon: DollarSign,
            description: t('Akumulasi pendapatan kotor')
        },
        {
            title: t('Tingkat Konversi'),
            value: '4.8%',
            trend: '+0.6%',
            isPositive: true,
            icon: TrendingUp,
            description: t('Rasio checkout berhasil')
        },
    ];

    const quickActivities = [
        { id: 1, title: 'Sistem Autentikasi Berhasil Diperbarui', type: 'Security', time: 'Baru saja', status: 'Sukses' },
        { id: 2, title: 'Cache Pengaturan Aplikasi Direset', type: 'System', time: '10 menit lalu', status: 'Optimal' },
        { id: 3, title: 'Pemeriksaan Integritas Database & Sesi', type: 'Database', time: '1 jam lalu', status: 'Normal' },
        { id: 4, title: 'Admin login terverifikasi via Session Guard', type: 'Auth', time: 'Hari ini', status: 'Aman' },
    ];

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            {/* Welcome Premium Hero Banner */}
            <motion.div variants={itemVariants}>
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#160d0f] via-[#100a0b] to-[#0a0708] border border-red-900/30 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                    {/* Glowing Orbs in Banner */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-red-700/15 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-10 right-32 w-60 h-60 bg-rose-900/20 rounded-full blur-[90px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-2 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-rose-300 text-xs font-medium">
                                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                                <span>Tokped E-Commerce Enterprise Suite</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                                Selamat Datang Kembali, <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-white">{auth.user.name}</span>
                            </h1>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                Panel kontrol ini dikonfigurasi dengan arsitektur Repository-Service-Action dan sistem proteksi sesi ketat. Pantau performa bisnis dan operasional toko secara real-time.
                            </p>
                        </div>

                        {/* Quick Server Health Badge */}
                        <div className="flex flex-wrap lg:flex-col items-start gap-2.5 bg-black/40 border border-red-950/50 p-4 rounded-2xl backdrop-blur-sm shrink-0">
                            <div className="flex items-center gap-2 text-xs text-zinc-300">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                <span>Security: <strong>RBAC + Session Expired</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-300">
                                <Server className="w-4 h-4 text-rose-400" />
                                <span>Stack: <strong>Laravel 12 + Inertia React</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-300">
                                <Database className="w-4 h-4 text-amber-400" />
                                <span>Cache: <strong>Redis / Database Ready</strong></span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, i) => (
                    <motion.div 
                        key={i} 
                        variants={itemVariants} 
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    >
                        <Card className="bg-[#0e0a0b]/80 border-red-950/40 backdrop-blur-sm hover:border-red-800/50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    {stat.title}
                                </CardTitle>
                                <div className="w-8 h-8 rounded-lg bg-red-950/50 border border-red-900/40 flex items-center justify-center text-rose-400">
                                    <stat.icon className="w-4 h-4" />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-1">
                                <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                                <div className="flex items-center gap-1.5 text-xs">
                                    <span className="text-emerald-400 font-semibold flex items-center">
                                        {stat.trend}
                                        <ArrowUpRight className="w-3 h-3" />
                                    </span>
                                    <span className="text-zinc-500">{stat.description}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Section: Activity & Architectural Architecture Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activities */}
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <Card className="bg-[#0e0a0b]/80 border-red-950/40 backdrop-blur-sm h-full">
                        <CardHeader className="border-b border-red-950/30 pb-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-rose-400" />
                                        Log Aktivitas & Audit Keamanan
                                    </CardTitle>
                                    <CardDescription className="text-xs text-zinc-400">
                                        Pencatatan event operasional dan pengawasan status sistem
                                    </CardDescription>
                                </div>
                                <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                                    Live Monitor
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-3">
                            {quickActivities.map((act) => (
                                <div 
                                    key={act.id} 
                                    className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-900 hover:border-red-950/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
                                        <div>
                                            <p className="text-sm font-medium text-zinc-200">{act.title}</p>
                                            <div className="flex items-center gap-2 mt-0.5 text-xs text-zinc-500">
                                                <span className="text-rose-400/90">{act.type}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {act.time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                                        {act.status}
                                    </span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Architecture Highlights Card */}
                <motion.div variants={itemVariants}>
                    <Card className="bg-[#0e0a0b]/80 border-red-950/40 backdrop-blur-sm h-full flex flex-col justify-between">
                        <CardHeader className="border-b border-red-950/30 pb-4">
                            <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                                <Layers className="w-4 h-4 text-rose-400" />
                                Pondasi Arsitektur
                            </CardTitle>
                            <CardDescription className="text-xs text-zinc-400">
                                Standar enterprise yang diterapkan pada aplikasi ini
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-3.5">
                            <div className="p-3 rounded-xl bg-red-950/20 border border-red-900/30 space-y-1">
                                <h4 className="text-xs font-semibold text-rose-300">Action Layer & DTOs</h4>
                                <p className="text-xs text-zinc-400">
                                    Pemisahan logika bisnis dalam Single Responsibility Action untuk skalabilitas tinggi.
                                </p>
                            </div>
                            <div className="p-3 rounded-xl bg-red-950/20 border border-red-900/30 space-y-1">
                                <h4 className="text-xs font-semibold text-rose-300">Repository & Cache Service</h4>
                                <p className="text-xs text-zinc-400">
                                    Abstraksi database dengan optimasi caching transparan untuk query berulang.
                                </p>
                            </div>
                            <div className="p-3 rounded-xl bg-red-950/20 border border-red-900/30 space-y-1">
                                <h4 className="text-xs font-semibold text-rose-300">Session Guard & Anti-Back Trap</h4>
                                <p className="text-xs text-zinc-400">
                                    Pembersihan riwayat browser dan invalidasi sesi langsung saat logout.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}
