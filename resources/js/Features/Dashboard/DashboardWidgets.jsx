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
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0093cb] via-[#0081b3] to-[#006fa0] p-8 shadow-[0_10px_30px_rgba(0,147,203,0.2)] text-white">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#6dd7fd]/20 rounded-full blur-[90px] pointer-events-none" />
                    <div className="absolute -bottom-10 right-32 w-60 h-60 bg-white/10 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-2 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold backdrop-blur-sm">
                                <Sparkles className="w-3.5 h-3.5 text-[#6dd7fd]" />
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
                                <ShieldCheck className="w-4 h-4 text-[#6dd7fd]" />
                                <span>Role: <strong className="uppercase">{user?.role}</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-white">
                                <Server className="w-4 h-4 text-[#6dd7fd]" />
                                <span>Data: <strong>Real-time Database</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-white">
                                <Database className="w-4 h-4 text-[#6dd7fd]" />
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
                        <Card className="bg-white border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#0093cb]/40 hover:shadow-[0_8px_25px_rgba(0,147,203,0.08)] transition-all">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                    {stat.title}
                                </CardTitle>
                                <div className="w-9 h-9 rounded-xl bg-[#6dd7fd]/20 border border-[#0093cb]/20 flex items-center justify-center text-[#0093cb]">
                                    <stat.icon className="w-4 h-4" />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-1">
                                <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{stat.value}</div>
                                <div className="text-xs text-slate-500">
                                    {stat.description}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* User List Table */}
            <motion.div variants={itemVariants}>
                <Card className="bg-white border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                    <CardHeader className="border-b border-slate-100 pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-[#0093cb]" />
                                    {t('Daftar User')}
                                </CardTitle>
                                <CardDescription className="text-xs text-slate-500">
                                    Data pengguna terdaftar dalam sistem (Role: User)
                                </CardDescription>
                            </div>
                            <span className="self-start sm:self-auto px-3 py-1 text-xs font-semibold rounded-full bg-[#6dd7fd]/20 text-[#0093cb] border border-[#0093cb]/20">
                                Total: {users.length} User
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {users.length === 0 ? (
                            <div className="py-12 px-4 text-center">
                                <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mb-3">
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
                                        <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
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
                                                className="hover:bg-slate-50/80 transition-colors group"
                                            >
                                                <td className="py-4 px-6 text-slate-400 text-xs">
                                                    {index + 1}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-[#6dd7fd]/25 border border-[#0093cb]/20 flex items-center justify-center text-[#0093cb] font-bold text-xs shrink-0">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-slate-800 group-hover:text-[#0093cb] transition-colors">
                                                                {user.name}
                                                            </p>
                                                            {user.nickname && (
                                                                <p className="text-xs text-slate-400 flex items-center gap-1">
                                                                    <AtSign className="w-3 h-3 text-slate-400" />
                                                                    {user.nickname}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="text-slate-600 flex items-center gap-1.5 text-xs sm:text-sm">
                                                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                                                        {user.email}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#6dd7fd]/20 text-[#0093cb] border border-[#0093cb]/20 capitalize">
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-xs text-slate-500">
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
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
