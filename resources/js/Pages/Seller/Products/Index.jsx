import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    Plus,
    Search,
    Trash2,
    Edit2,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Eye,
    Layers,
    Tag,
} from 'lucide-react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { CleanModal } from '@/Components/ui/CleanModal';
import { useTranslation } from '@/Hooks/useTranslation';
import { useFlash } from '@/Hooks/useFlash';

export default function SellerProductsIndex({ store, products = [] }) {
    const { t } = useTranslation();
    const { success, error } = useFlash();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState('all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [deleteCandidate, setDeleteCandidate] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        category: store?.categories?.[0] || 'Elektronik & Gadget',
        price: '',
        stock: '',
        description: '',
    });

    const handleCreateProduct = (e) => {
        e.preventDefault();
        post(route('seller.products.store'), {
            onSuccess: () => {
                setIsAddModalOpen(false);
                reset();
                clearErrors();
            }
        });
    };

    const filteredProducts = products.filter((p) => {
        const matchesSearch =
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchQuery.toLowerCase());

        if (selectedTab === 'active') return matchesSearch && p.status === 'active' && p.stock > 0;
        if (selectedTab === 'out_of_stock') return matchesSearch && p.stock === 0;
        if (selectedTab === 'inactive') return matchesSearch && p.status === 'inactive';
        return matchesSearch;
    });

    const handleToggleStatus = (id) => {
        alert(t('Fitur toggle status akan segera tersedia.'));
    };

    const handleDeleteProduct = (id) => {
        alert(t('Fitur hapus produk akan segera tersedia.'));
        setDeleteCandidate(null);
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(val);
    };

    return (
        <SellerLayout header={<h1 className="text-xl font-bold text-slate-800">{t('Katalog & Produk')}</h1>}>
            <Head title={t('Katalog & Manajemen Produk - Seller Center')} />

            <div className="max-w-6xl mx-auto space-y-6 pb-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                            {t('Katalog Produk')}
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                            {t('Kelola daftar barang jualan, ketersediaan stok, dan harga produk toko Anda')}
                        </p>
                    </div>

                    <Button
                        type="button"
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold px-4 h-10 shadow-sm flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>{t('Tambah Produk Baru')}</span>
                    </Button>
                </div>

                <div className="rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
                    <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                            {[
                                { id: 'all', label: t('Semua'), count: products.length },
                                { id: 'active', label: t('Aktif'), count: products.filter((p) => p.status === 'active' && p.stock > 0).length },
                                { id: 'out_of_stock', label: t('Stok Habis'), count: products.filter((p) => p.stock === 0).length },
                                { id: 'inactive', label: t('Nonaktif'), count: products.filter((p) => p.status === 'inactive').length },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setSelectedTab(tab.id)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                                        selectedTab === tab.id
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs'
                                            : 'text-slate-600 hover:bg-slate-100/70 border border-transparent'
                                    }`}
                                >
                                    <span>{tab.label}</span>
                                    <span className="text-[11px] opacity-75 font-mono">({tab.count})</span>
                                </button>
                            ))}
                        </div>

                        <div className="relative min-w-[260px]">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <Input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('Cari nama produk atau SKU...')}
                                className="pl-10 h-10 rounded-xl bg-slate-50/70 border-slate-200 text-xs"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-100">
                                <tr>
                                    <th className="py-3.5 px-6">{t('Produk')}</th>
                                    <th className="py-3.5 px-4">{t('Kategori')}</th>
                                    <th className="py-3.5 px-4">{t('Harga')}</th>
                                    <th className="py-3.5 px-4">{t('Stok')}</th>
                                    <th className="py-3.5 px-4">{t('Status')}</th>
                                    <th className="py-3.5 px-6 text-right">{t('Aksi')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {filteredProducts.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center space-y-2">
                                            <Package className="w-10 h-10 text-slate-300 mx-auto" />
                                            <p className="text-slate-500 font-medium text-xs">
                                                {t('Tidak ada produk yang cocok dengan pencarian')}
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80'}
                                                        alt={product.name}
                                                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                                                    />
                                                    <div className="space-y-0.5 min-w-0">
                                                        <h4 className="font-bold text-slate-900 line-clamp-1">
                                                            {product.name}
                                                        </h4>
                                                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                                                            <span>SKU: {product.sku}</span>
                                                            <span>•</span>
                                                            <span>Terjual {product.sold}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-4 px-4 text-slate-600 font-medium">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                                                    {product.category}
                                                </span>
                                            </td>

                                            <td className="py-4 px-4 font-bold text-slate-900">
                                                {formatCurrency(product.price)}
                                            </td>

                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-1.5">
                                                    <span className={`font-semibold ${product.stock === 0 ? 'text-rose-600' : product.stock < 5 ? 'text-amber-600' : 'text-slate-800'}`}>
                                                        {product.stock}
                                                    </span>
                                                    {product.stock === 0 && (
                                                        <span className="text-[10px] text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded font-bold">
                                                            {t('Habis')}
                                                        </span>
                                                    )}
                                                    {product.stock > 0 && product.stock < 5 && (
                                                        <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-bold">
                                                            {t('Menipis')}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="py-4 px-4">
                                                <button
                                                    type="button"
                                                    onClick={() => handleToggleStatus(product.id)}
                                                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                                                        product.status === 'active' && product.stock > 0
                                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                            : product.stock === 0
                                                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                                                            : 'bg-slate-100 text-slate-500 border-slate-200'
                                                    }`}
                                                >
                                                    {product.status === 'active' && product.stock > 0 && <CheckCircle2 className="w-3 h-3" />}
                                                    {product.status !== 'active' && <XCircle className="w-3 h-3" />}
                                                    <span>
                                                        {product.status === 'active' && product.stock > 0
                                                            ? t('Aktif')
                                                            : product.stock === 0
                                                            ? t('Habis')
                                                            : t('Nonaktif')}
                                                    </span>
                                                </button>
                                            </td>

                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => setDeleteCandidate(product)}
                                                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <CleanModal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
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
                        {errors.name && <p className="text-xs text-rose-500 font-medium">{errors.name}</p>}
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
                            <Label htmlFor="prod_price" className="text-xs font-semibold text-slate-700">
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
                            {errors.price && <p className="text-xs text-rose-500 font-medium">{errors.price}</p>}
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
                        {errors.stock && <p className="text-xs text-rose-500 font-medium">{errors.stock}</p>}
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
                            placeholder={t('Jelaskan keunggulan, spesifikasi, dan kelengkapan produk...')}
                            className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setIsAddModalOpen(false)}
                            className="rounded-xl"
                        >
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

            <CleanModal
                open={!!deleteCandidate}
                onClose={() => setDeleteCandidate(null)}
                title={t('Hapus Produk')}
                description={t('Konfirmasi penghapusan produk dari etalase')}
                icon={Trash2}
                size="sm"
            >
                <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-600 leading-relaxed">
                        {t('Apakah Anda yakin ingin menghapus produk')}{' '}
                        <strong>{deleteCandidate?.name}</strong>? {t('Tindakan ini tidak dapat dibatalkan.')}
                    </p>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setDeleteCandidate(null)}
                            className="rounded-xl text-xs"
                        >
                            {t('Batal')}
                        </Button>
                        <Button
                            type="button"
                            onClick={() => handleDeleteProduct(deleteCandidate.id)}
                            className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold px-4"
                        >
                            {t('Ya, Hapus')}
                        </Button>
                    </div>
                </div>
            </CleanModal>
        </SellerLayout>
    );
}
