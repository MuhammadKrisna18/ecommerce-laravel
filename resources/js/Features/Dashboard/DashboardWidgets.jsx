import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { motion } from 'framer-motion';
import { 
    Users, 
    ShieldCheck, 
    Sparkles, 
    Server, 
    Database, 
    UserCheck, 
    Mail, 
    Calendar,
    AtSign
} from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';
import { useAuth } from '@/Hooks/useAuth';

export function DashboardWidgets({ users = [], stats = {} }) {
    const { t } = useTranslation();
    const { user } = useAuth();

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

    const statCards = [
        {
            title: t('Total Pengguna User'),
            value: stats.total_users ?? users.length ?? 0,
            icon: Users,
            description: t('Akun terdaftar dengan role User')
        },
        {
            title: t('Total Admin'),
            value: stats.total_admins ?? 1,
            icon: ShieldCheck,
            description: t('Pengelola sistem')
        },
        {
            title: t('Total Keseluruhan Akun'),
            value: stats.total_accounts ?? ((stats.total_users ?? 0) + (stats.total_admins ?? 1)),
            icon: UserCheck,
            description: t('Basis data pengguna terintegrasi')
        },
    ];

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            {/* Welcome Hero Banner */}
            <motion.div variants={itemVariants}>
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#160d0f] via-[#100a0b] to-[#0a0708] border border-red-900/30 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
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
                                Panel kontrol terhubung langsung secara real-time dengan backend database. Pantau daftar akun pengguna yang telah terdaftar di sistem.
                            </p>
                        </div>

                        <div className="flex flex-wrap lg:flex-col items-start gap-2.5 bg-black/40 border border-red-950/50 p-4 rounded-2xl backdrop-blur-sm shrink-0">
                            <div className="flex items-center gap-2 text-xs text-zinc-300">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                <span>Role: <strong className="uppercase">{auth.user.role}</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-300">
                                <Server className="w-4 h-4 text-rose-400" />
                                <span>Data: <strong>Real-time Database</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-300">
                                <Database className="w-4 h-4 text-amber-400" />
                                <span>Repository: <strong>UserService Active</strong></span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stat Cards Grid (Real Data) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {statCards.map((stat, i) => (
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
                                <div className="text-xs text-zinc-500">
                                    {stat.description}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* User List Table */}
            <motion.div variants={itemVariants}>
                <Card className="bg-[#0e0a0b]/80 border-red-950/40 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    <CardHeader className="border-b border-red-950/30 pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                                <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                                    <Users className="w-4 h-4 text-rose-400" />
                                    {t('Daftar User')}
                                </CardTitle>
                                <CardDescription className="text-xs text-zinc-400">
                                    Data pengguna terdaftar dalam sistem (Role: User)
                                </CardDescription>
                            </div>
                            <span className="self-start sm:self-auto px-3 py-1 text-xs font-medium rounded-full bg-red-950/60 text-rose-300 border border-red-800/40">
                                Total: {users.length} User
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {users.length === 0 ? (
                            <div className="py-12 px-4 text-center">
                                <div className="w-12 h-12 mx-auto rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-3">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h3 className="text-sm font-medium text-zinc-200">Belum Ada Akun User Terdaftar</h3>
                                <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                                    Pengguna yang mendaftar melalui halaman registrasi akun User akan muncul secara otomatis pada tabel ini.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-zinc-900 bg-zinc-950/50 text-[11px] uppercase tracking-wider text-zinc-400">
                                            <th className="py-3 px-6 font-semibold">No</th>
                                            <th className="py-3 px-6 font-semibold">{t('Nama Lengkap')}</th>
                                            <th className="py-3 px-6 font-semibold">{t('Email')}</th>
                                            <th className="py-3 px-6 font-semibold">{t('Role')}</th>
                                            <th className="py-3 px-6 font-semibold">{t('Terdaftar Pada')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-900/60">
                                        {users.map((user, index) => (
                                            <tr 
                                                key={user.id}
                                                className="hover:bg-red-950/10 transition-colors group"
                                            >
                                                <td className="py-4 px-6 text-zinc-500 text-xs">
                                                    {index + 1}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-red-950/60 border border-red-900/50 flex items-center justify-center text-rose-300 font-semibold text-xs shrink-0">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-white group-hover:text-rose-300 transition-colors">
                                                                {user.name}
                                                            </p>
                                                            {user.nickname && (
                                                                <p className="text-xs text-zinc-500 flex items-center gap-1">
                                                                    <AtSign className="w-3 h-3 text-zinc-600" />
                                                                    {user.nickname}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="text-zinc-300 flex items-center gap-1.5 text-xs sm:text-sm">
                                                        <Mail className="w-3.5 h-3.5 text-zinc-500" />
                                                        {user.email}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-red-950/60 text-rose-300 border border-red-800/40 capitalize">
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-xs text-zinc-400">
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                                                        {user.created_at}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
