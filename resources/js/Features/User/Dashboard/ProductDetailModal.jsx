import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Fragment } from 'react';
import { ShoppingBag, X, Package, Tag, Info, ShoppingCart } from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';
import { useAuth } from '@/Hooks/useAuth';
import { router } from '@inertiajs/react';

export function ProductDetailModal({ product, isOpen, onClose }) {
    const { t } = useTranslation();
    const { user } = useAuth();

    // We use optional chaining below so it can animate out gracefully when product becomes null
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0 data-[enter]:opacity-100 data-[leave]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <DialogPanel
                        transition
                        className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-xl transition-all duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:scale-100 data-[enter]:opacity-100 data-[leave]:scale-95 data-[leave]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        <div className="relative">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col md:flex-row h-full">
                                {/* Image Section */}
                                <div className="w-full md:w-1/2 bg-slate-100 aspect-square md:aspect-auto">
                                    <img
                                        src={product?.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'}
                                        alt={product?.name || ''}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-brand-primary uppercase tracking-wider mb-2">
                                            <Tag className="w-3.5 h-3.5" />
                                            {product?.category || t('Umum')}
                                        </div>
                                        
                                        <DialogTitle as="h3" className="text-xl sm:text-2xl font-extrabold text-slate-800 leading-tight mb-2">
                                            {product?.name}
                                        </DialogTitle>

                                        <div className="text-2xl font-black text-brand-primary mb-4">
                                            Rp {new Intl.NumberFormat('id-ID').format(product?.price || 0)}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3 mb-6 border-y border-slate-100 py-3">
                                            <div className="flex items-center gap-1.5 text-sm text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg">
                                                <ShoppingBag className="w-4 h-4 text-slate-400" />
                                                <span className="font-medium">{product?.store?.name || t('Toko')}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-sm text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg">
                                                <Package className="w-4 h-4 text-slate-400" />
                                                <span>{t('Stok')}: <strong className="text-slate-800">{product?.stock || 0}</strong></span>
                                            </div>
                                            {(product?.sold > 0) && (
                                                <div className="flex items-center gap-1.5 text-sm text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg">
                                                    <ShoppingCart className="w-4 h-4 text-slate-400" />
                                                    <span>{t('Terjual')}: <strong className="text-slate-800">{product?.sold}</strong></span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2 mb-6">
                                            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                                                <Info className="w-4 h-4 text-brand-primary" />
                                                {t('Deskripsi Produk')}
                                            </h4>
                                            <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                                {product?.description || t('Tidak ada deskripsi produk yang tersedia.')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Area */}
                                    <div className="pt-4 mt-auto">
                                        {user ? (
                                            <button 
                                                className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-dark text-white font-bold py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={!product || product.stock <= 0}
                                            >
                                                <ShoppingCart className="w-5 h-5" />
                                                {(product?.stock > 0) ? t('Tambahkan ke Keranjang') : t('Stok Habis')}
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => router.get(route('login'))}
                                                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow-md"
                                            >
                                                {t('Login untuk Membeli')}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}
