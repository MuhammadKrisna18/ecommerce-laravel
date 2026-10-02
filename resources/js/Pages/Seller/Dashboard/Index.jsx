import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Store,
    Package,
    ShoppingBag,
    TrendingUp,
    Users,
    Plus,
    ArrowUpRight,
    Sparkles,
    CheckCircle2,
    Settings,
    Clock,
} from 'lucide-react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Button } from '@/Components/ui/button';
import { useTranslation } from '@/Hooks/useTranslation';

export default function SellerDashboard({ store }) {
    const { t } = useTranslation();

    const stats = [
        {
            label: t('Total Produk Aktif'),
            value: '12',
            subtext: t('+2 ditambahkan minggu ini'),
            icon: Package,
            color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
        },
        {
            label: t('Pesanan Baru'),
            value: '4',
            subtext: t('Perlu segera diproses'),
            icon: ShoppingBag,
            color: 'text-blue-600 bg-blue-50 border-blue-200',
        },
        {
            label: t('Estimasi Pendapatan'),
            value: 'Rp 3.850.000',
            subtext: t('+18% dari bulan lalu'),
            icon: TrendingUp,
            color: 'text-amber-600 bg-amber-50 border-amber-200',
        },
        {
            label: t('Pengunjung Toko'),
            value: '248',
            subtext: t('Dalam 7 hari terakhir'),
            icon: Users,
            color: 'text-purple-600 bg-purple-50 border-purple-200',
        },
    ];

    const quickOrders = [
        {
            id: 'ORD-9821',
            buyer: 'Andi Pratama',
            product: 'Earphone Bluetooth TWS Pro',
            qty: 1,
            total: 'Rp 189.000',
            status: t('Perlu Dikirim'),
            time: '10 menit lalu',
        },
        {
            id: 'ORD-9820',
            buyer: 'Siti Rahma',
            product: 'Kaos Polos Cotton Combed 30s',
            qty: 3,
            total: 'Rp 135.000',
            status: t('Perlu Dikirim'),
            time: '1 jam lalu',
        },
        {
            id: 'ORD-9818',
            buyer: 'Bambang Tri',
            product: 'Mouse Gaming RGB Silent Click',
            qty: 1,
            total: 'Rp 210.000',
            status: t('Sedang Dikirim'),
            time: '3 jam lalu',
        },
    ];

    return (
        <SellerLayout header={<h1 className="text-xl font-bold text-slate-800">{t('Dashboard Toko')}</h1>}>
            <Head title={t('Dashboard Toko - Seller Center')} />

            <div className="max-w-6xl mx-auto space-y-8 pb-10">
                <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
                    <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute left-1/2 -top-10 w-48 h-48 bg-teal-400/15 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shrink-0">
                                <Store className="w-8 h-8" />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h2 className="text-2xl font-black text-white tracking-tight">
                                        {store?.name || t('Toko Saya')}
                                    </h2>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        {t('Toko Aktif & Buka')}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-300">
                                    {store?.city ? `${t('Kota Operasional')}: ${store.city}` : t('Selamat datang di Seller Center Tokped')}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                            <Link href={route('seller.products.index')}>
                                <Button className="h-10 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-2">
                                    <Plus className="w-4 h-4" />
                                    <span>{t('Tambah Produk Baru')}</span>
                                </Button>
                            </Link>

                            <Link href={route('seller.settings.index')}>
                                <Button
                                    variant="outline"
                                    className="h-10 px-4 bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-xl text-xs font-semibold backdrop-blur-sm"
                                >
                                    <Settings className="w-4 h-4 mr-1.5" />
                                    <span>{t('Pengaturan Toko')}</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-500">{item.label}</span>
                                    <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${item.color}`}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{item.value}</h3>
                                    <p className="text-[11px] text-slate-400 mt-0.5">{item.subtext}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 rounded-3xl bg-white border border-slate-200/80 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div>
                                <h3 className="text-base font-bold text-slate-800">{t('Pesanan Terbaru')}</h3>
                                <p className="text-xs text-slate-400 mt-0.5">{t('Daftar transaksi yang perlu dikonfirmasi dan dikirim')}</p>
                            </div>
                            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                                4 {t('Pesanan Menunggu')}
                            </span>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {quickOrders.map((ord) => (
                                <div key={ord.id} className="py-3.5 flex items-center justify-between gap-4">
                                    <div className="space-y-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-mono font-bold text-slate-700">{ord.id}</span>
                                            <span className="text-xs text-slate-400">•</span>
                                            <span className="text-xs font-semibold text-slate-800 truncate">{ord.buyer}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 truncate">{ord.product} (x{ord.qty})</p>
                                    </div>
                                    <div className="text-right shrink-0 space-y-1">
                                        <div className="text-xs font-bold text-slate-900">{ord.total}</div>
                                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                            {ord.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4 flex flex-col justify-between">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
                                <Sparkles className="w-4 h-4 text-emerald-600" />
                                <span>{t('Tips Penjualan Tokped')}</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                {t('Upload foto produk dengan pencahayaan terang dan beri deskripsi lengkap untuk meningkatkan konversi penjualan toko Anda hingga 35%.')}
                            </p>
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                                    <Clock className="w-4 h-4 text-emerald-600" />
                                    <span>{t('Kecepatan Pengiriman')}</span>
                                </div>
                                <p className="text-[11px] text-slate-500">
                                    {t('Kirim pesanan dalam kurun waktu 24 jam untuk mempertahankan badge toko terpercaya.')}
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                            <Link href={route('seller.products.index')} className="w-full">
                                <Button variant="outline" className="w-full rounded-xl text-xs font-semibold border-slate-200 hover:bg-slate-50 justify-between">
                                    <span>{t('Kelola Katalog Produk')}</span>
                                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
}
