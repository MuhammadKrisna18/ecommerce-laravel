import { Package } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { CleanModal } from '@/Components/ui/CleanModal';
import { useTranslation } from '@/Hooks/useTranslation';
import { useEffect } from 'react';

export function CreateProductModal({ isOpen, onClose, defaultCategory }) {
    const { t } = useTranslation();

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        category: defaultCategory || 'Elektronik & Gadget',
        price: '',
        stock: '',
        description: '',
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
            clearErrors();
        }
    }, [isOpen]);

    const handleCreateProduct = (e) => {
        e.preventDefault();
        post(route('seller.products.store'), {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <CleanModal
            open={isOpen}
            onClose={onClose}
            title={t('Tambah Produk Baru')}
            description={t('Masukkan informasi produk yang akan dijual di etalase toko')}
            icon={Package}
            size="lg"
        >
            <form onSubmit={handleCreateProduct} className="p-6 space-y-4">
                <div className="space-y-1.5">
                    <Label htmlFor="prod_name" className="text-xs font-semibold text-slate-700">
                        {t('Nama Produk')} <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                        id="prod_name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder={t('Contoh: Earphone Bluetooth TWS Pro Original')}
                        className={`h-11 rounded-xl bg-white border ${errors.name ? 'border-rose-400' : 'border-slate-200'}`}
                    />
                    {errors.name && (
                        <p className="text-xs text-rose-500 font-medium">{errors.name}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="prod_cat" className="text-xs font-semibold text-slate-700">
                            {t('Kategori')}
                        </Label>
                        <Input
                            id="prod_cat"
                            type="text"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="h-11 rounded-xl bg-white border-slate-200"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label
                            htmlFor="prod_price"
                            className="text-xs font-semibold text-slate-700"
                        >
                            {t('Harga Satuan (Rp)')} <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            id="prod_price"
                            type="number"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            placeholder="150000"
                            className={`h-11 rounded-xl bg-white border ${errors.price ? 'border-rose-400' : 'border-slate-200'}`}
                        />
                        {errors.price && (
                            <p className="text-xs text-rose-500 font-medium">{errors.price}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="prod_stock" className="text-xs font-semibold text-slate-700">
                        {t('Jumlah Stok')} <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                        id="prod_stock"
                        type="number"
                        value={data.stock}
                        onChange={(e) => setData('stock', e.target.value)}
                        placeholder="50"
                        className={`h-11 rounded-xl bg-white border ${errors.stock ? 'border-rose-400' : 'border-slate-200'}`}
                    />
                    {errors.stock && (
                        <p className="text-xs text-rose-500 font-medium">{errors.stock}</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="prod_desc" className="text-xs font-semibold text-slate-700">
                        {t('Deskripsi Produk')}
                    </Label>
                    <textarea
                        id="prod_desc"
                        rows={3}
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder={t(
                            'Jelaskan keunggulan, spesifikasi, dan kelengkapan produk...'
                        )}
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm"
                    />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                    <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl">
                        {t('Batal')}
                    </Button>
                    <Button
                        type="submit"
                        disabled={processing}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm px-6 text-xs font-semibold"
                    >
                        {processing ? t('Menyimpan...') : t('Simpan Produk')}
                    </Button>
                </div>
            </form>
        </CleanModal>
    );
}
