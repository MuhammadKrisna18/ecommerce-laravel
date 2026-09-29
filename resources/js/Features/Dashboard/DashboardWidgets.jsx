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
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-primary to-brand-dark p-8 shadow-[0_10px_30px_rgba(0,147,203,0.2)] text-white">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/20 rounded-full blur-[90px] pointer-events-none" />
                    <div className="absolute -bottom-10 right-32 w-60 h-60 bg-white/10 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-2 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold backdrop-blur-sm">
                                <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
                                <span>Tokped E-Commerce Enterprise Suite</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                                Selamat Datang Kembali, <span>{user?.name}</span>
                            </h1>
                            <p className="text-sm text-sky-100 leading-relaxed">
                                Panel kontrol terhubung langsung secara real-time dengan backend database. Pantau daftar akun pengguna yang telah terdaftar di sistem.
                            </p>
                        </div>

                        <div className="flex flex-wrap lg:flex-col items-start gap-2.5 bg-white/10 border border-white/20 p-4 rounded-2xl backdrop-blur-md shrink-0">
                            <div className="flex items-center gap-2 text-xs text-white">
                                <ShieldCheck className="w-4 h-4 text-brand-accent" />
                                <span>Role: <strong className="uppercase">{user?.role}</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-white">
                                <Server className="w-4 h-4 text-brand-accent" />
                                <span>Data: <strong>Real-time Database</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-white">
                                <Database className="w-4 h-4 text-brand-accent" />
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
                        whileHover={{ y: -2, transition: { duration: 0.15 } }}
                    >
                        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-brand-primary/30 transition-all">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    {stat.title}
                                </span>
                                <div className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                                    <stat.icon className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="text-2xl font-extrabold text-slate-800 tracking-tight">{stat.value}</div>
                                <div className="text-xs text-slate-400 mt-0.5">
                                    {stat.description}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* User List Table */}
            <motion.div variants={itemVariants}>
                <div className="bg-white rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                            <div className="text-base font-bold text-slate-900 flex items-center gap-2">
                                <Users className="w-4 h-4 text-brand-primary" />
                                <span>{t('Daftar User')}</span>
                            </div>
                            <p className="text-xs text-slate-500">
                                Data pengguna terdaftar dalam sistem (Role: User)
                            </p>
                        </div>
                        <span className="self-start sm:self-auto px-3 py-1 text-xs font-semibold rounded-full bg-brand-primary/10 text-brand-primary">
                            Total: {users.length} User
                        </span>
                    </div>

                    <div>
                        {users.length === 0 ? (
                            <div className="py-12 px-4 text-center">
                                <div className="w-12 h-12 mx-auto rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-400 mb-3">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h3 className="text-sm font-semibold text-slate-700">Belum Ada Akun User Terdaftar</h3>
                                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                                    Pengguna yang mendaftar melalui halaman registrasi akun User akan muncul secara otomatis pada tabel ini.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                                            <th className="py-3 px-6">No</th>
                                            <th className="py-3 px-6">{t('Nama Lengkap')}</th>
                                            <th className="py-3 px-6">{t('Email')}</th>
                                            <th className="py-3 px-6">{t('Role')}</th>
                                            <th className="py-3 px-6">{t('Terdaftar Pada')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {users.map((user, index) => (
                                            <tr 
                                                key={user.id}
                                                className="hover:bg-slate-50/70 transition-colors group"
                                            >
                                                <td className="py-4 px-6 text-slate-400 text-xs">
                                                    {index + 1}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-slate-800 group-hover:text-brand-primary transition-colors">
                                                                {user.name}
                                                            </p>
                                                            {user.nickname && (
                                                                <p className="text-xs text-slate-400 flex items-center gap-1">
                                                                    <AtSign className="w-3 h-3 text-slate-300" />
                                                                    {user.nickname}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="text-slate-600 flex items-center gap-1.5 text-xs sm:text-sm">
                                                        <Mail className="w-3.5 h-3.5 text-slate-300" />
                                                        {user.email}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-primary/10 text-brand-primary capitalize">
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-xs text-slate-500">
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar className="w-3.5 h-3.5 text-slate-300" />
                                                        {user.created_at}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
