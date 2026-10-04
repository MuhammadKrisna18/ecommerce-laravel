import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag, Clock } from 'lucide-react';
import { useAuth } from '@/Hooks/useAuth';
import { useTranslation } from '@/Hooks/useTranslation';
import { useState } from 'react';
import { ProductCard } from '@/Features/Product/ProductCard';
import { ProductDetailModal } from '@/Features/User/Dashboard/ProductDetailModal';

export function UserDashboardContent({ products = [] }) {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [selectedProduct, setSelectedProduct] = useState(null);

    const displayName = user?.nickname || user?.name || 'Pengguna';

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-primary to-brand-dark p-8 shadow-[0_10px_30px_rgba(0,147,203,0.2)] text-white">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/20 rounded-full blur-[90px] pointer-events-none" />
                    <div className="absolute -bottom-10 right-32 w-60 h-60 bg-white/10 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10 space-y-3 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold backdrop-blur-sm">
                            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
                            <span>{t('Area Pengguna K-Tienda en Línea')}</span>
                        </div>
                        {user ? (
                            <>
                                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                                    {t('Halo')}, <span>{displayName}</span> 👋
                                </h1>
                                <p className="text-sm text-sky-100 leading-relaxed">
                                    {t('Akun Anda telah aktif sebagai')}{' '}
                                    <strong className="text-white underline decoration-brand-accent underline-offset-4 font-bold">
                                        {t('User')}
                                    </strong>
                                    .{' '}
                                    {t(
                                        'Halaman ini disiapkan untuk fitur belanja, transaksi, dan aktivitas Anda selanjutnya.'
                                    )}
                                </p>
                            </>
                        ) : (
                            <>
                                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                                    {t('Halo')}, <span>{t('Pengunjung')}</span> 👋
                                </h1>
                                <p className="text-sm text-sky-100 leading-relaxed">
                                    {t('Anda sedang menjelajah sebagai Anonymous.')}{' '}
                                    {t(
                                        'Silakan login untuk dapat melakukan transaksi dan fitur lainnya.'
                                    )}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>

            {user && (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            {user?.avatar_url ? (
                                <img
                                    src={user.avatar_url}
                                    alt={user.name}
                                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-accent text-white font-extrabold text-2xl flex items-center justify-center shadow-sm">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">{user?.name}</h3>
                                <p className="text-xs text-brand-primary font-medium">
                                    {user?.nickname ? `@${user.nickname}` : user?.email}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                    {user?.address ? user.address : t('Alamat belum diatur')}
                                </p>
                            </div>
                        </div>

                        <a
                            href={route('user.profile.edit')}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
                        >
                            <span>{t('Ubah Profil')}</span>
                        </a>
                    </div>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800">{t('Rekomendasi Produk')}</h3>
                </div>

                {products.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-12 text-center">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-accent/20 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-4 shadow-sm">
                            <ShoppingBag className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                            {t('Belum ada produk')}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                            {t('Belum ada produk yang ditambahkan oleh penjual saat ini.')}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={() => setSelectedProduct(product)}
                            />
                        ))}
                    </div>
                )}
            </motion.div>

            <ProductDetailModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
}
