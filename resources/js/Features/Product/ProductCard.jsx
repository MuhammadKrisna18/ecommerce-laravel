import { ShoppingBag } from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';
import { formatCurrency } from '@/lib/format';

export function ProductCard({ product, onClick }) {
    const { t } = useTranslation();

    return (
        <div
            onClick={onClick}
            className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md hover:border-brand-primary/30 transition-all duration-300 cursor-pointer"
        >
            <div className="relative aspect-square bg-slate-100 overflow-hidden">
                <img
                    src={
                        product.image ||
                        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80'
                    }
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.stock < 5 && (
                    <div className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {t('Sisa')} {product.stock}
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col flex-grow space-y-2">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    {product.category || t('Umum')}
                </div>
                <h4 className="text-sm font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-brand-primary transition-colors">
                    {product.name}
                </h4>
                <div className="text-xs text-slate-500 flex items-center gap-1 mt-auto">
                    <ShoppingBag className="w-3 h-3" />
                    <span>{product.store?.name || t('Toko')}</span>
                </div>
                <div className="text-lg font-extrabold text-brand-primary mt-1">
                    {formatCurrency(product.price)}
                </div>
            </div>
        </div>
    );
}
