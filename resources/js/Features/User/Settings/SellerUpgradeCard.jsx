import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Store,
    ShoppingBag,
    CheckCircle2,
    Truck,
    Users,
    MapPin,
    UserCheck,
    ArrowRight,
    Sparkles,
    Check,
    AlertCircle,
    Info,
} from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { CleanModal } from '@/Components/ui/CleanModal';
import { Spinner } from '@/Components/ui/spinner';
import { useTranslation } from '@/Hooks/useTranslation';

export function SellerUpgradeCard({ user }) {
    const { t } = useTranslation();

    // Check if user is already a seller
    const isAlreadySeller = user?.role === 'seller';

    // Form fields state (NIK and bank account removed)
    const [formData, setFormData] = useState({
        store_name: '',
        categories: ['electronics'],
        description: '',
        owner_name: user?.name || '',
        phone: '',
        city: '',
        store_address: user?.address || '',
        agree_terms: false,
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [submittedApplication, setSubmittedApplication] = useState(null);

    const categoryOptions = [
        { value: 'electronics', label: t('Elektronik & Gadget') },
        { value: 'fashion', label: t('Fashion & Pakaian') },
        { value: 'food_beverage', label: t('Makanan & Minuman') },
        { value: 'health_beauty', label: t('Kesehatan & Kecantikan') },
        { value: 'home_living', label: t('Perlengkapan Rumah Tangga') },
        { value: 'hobbies_toys', label: t('Hobi, Mainan & Koleksi') },
        { value: 'automotive', label: t('Otomotif & Aksesoris') },
    ];

    // Helper to generate store URL slug preview
    const storeSlug = formData.store_name
        ? formData.store_name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '')
        : 'nama-toko-anda';

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (formErrors[field]) {
            setFormErrors((prev) => ({ ...prev, [field]: null }));
        }
    };

    const handleCategoryToggle = (value) => {
        setFormData((prev) => {
            const exists = prev.categories.includes(value);
            let nextCategories;
            if (exists) {
                nextCategories = prev.categories.filter((cat) => cat !== value);
            } else {
                nextCategories = [...prev.categories, value];
            }
            return { ...prev, categories: nextCategories };
        });

        if (formErrors.categories) {
            setFormErrors((prev) => ({ ...prev, categories: null }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.store_name.trim()) {
            errors.store_name = t('Nama toko wajib diisi');
        } else if (formData.store_name.trim().length < 3) {
            errors.store_name = t('Nama toko minimal 3 karakter');
        }

        if (!formData.categories || formData.categories.length === 0) {
            errors.categories = t('Pilih minimal satu kategori produk');
        }

        if (!formData.owner_name.trim()) {
            errors.owner_name = t('Nama pemilik toko wajib diisi');
        }

        if (!formData.phone.trim()) {
            errors.phone = t('Nomor telepon / WhatsApp wajib diisi');
        } else if (formData.phone.trim().length < 9) {
            errors.phone = t('Nomor telepon tidak valid');
        }

        if (!formData.city.trim()) {
            errors.city = t('Kota atau kabupaten toko wajib diisi');
        }

        if (!formData.store_address.trim()) {
            errors.store_address = t('Alamat lengkap penjemputan wajib diisi');
        }

        if (!formData.agree_terms) {
            errors.agree_terms = t('Anda wajib menyetujui Syarat & Ketentuan Penjual');
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleOpenConfirmation = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setShowConfirmModal(true);
        }
    };

    const handleConfirmSubmit = () => {
        setIsSubmitting(true);
        // Simulate frontend submission workflow
        setTimeout(() => {
            setIsSubmitting(false);
            setShowConfirmModal(false);
            setSubmittedApplication({
                ...formData,
                submitted_at: new Date().toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                }),
                status: 'pending_verification',
            });
        }, 1000);
    };

    return (
        <div className="space-y-6">
            {/* Header Hero Banner */}
            <div className="rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-60 h-60 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute left-1/3 -top-12 w-48 h-48 bg-teal-300/15 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-3 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold backdrop-blur-sm">
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            <span>{t('Program Mitra Penjual Tokped')}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                            {t('Buka Toko Gratis & Mulai Berjualan')}
                        </h2>
                        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                            {t('Ubah akun belanja Anda menjadi akun penjual untuk menjangkau jutaan pembeli aktif di Tokped dengan fasilitas pengiriman lengkap dan sistem penjualan yang mudah.')}
                        </p>
                    </div>

                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0 shadow-lg hidden sm:flex">
                        <Store className="w-8 h-8 text-emerald-300" />
                    </div>
                </div>

                {/* Seller Advantages Pills */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-white/15 text-xs text-emerald-50">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/30 flex items-center justify-center text-emerald-200 shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span>{t('Bebas Biaya Pendaftaran')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/30 flex items-center justify-center text-emerald-200 shrink-0">
                            <Truck className="w-3.5 h-3.5" />
                        </div>
                        <span>{t('Dukungan Logistik Otomatis')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/30 flex items-center justify-center text-emerald-200 shrink-0">
                            <Users className="w-3.5 h-3.5" />
                        </div>
                        <span>{t('Jangkauan Pasar Luas')}</span>
                    </div>
                </div>
            </div>

            {/* If application submitted or already seller */}
            {isAlreadySeller ? (
                <div className="rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] p-6 sm:p-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center shadow-sm">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="max-w-md mx-auto space-y-1">
                        <h3 className="text-lg font-bold text-slate-800">
                            {t('Akun Seller Anda Telah Aktif!')}
                        </h3>
                        <p className="text-xs text-slate-500">
                            {t('Anda telah terdaftar sebagai mitra penjual Tokped. Kelola produk, pesanan pembeli, dan pengaturan toko Anda melalui Seller Portal.')}
                        </p>
                    </div>
                    <div className="pt-2">
                        <Button
                            type="button"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold px-6 shadow-sm"
                        >
                            <Store className="w-4 h-4 mr-2" />
                            {t('Buka Tokped Seller Center')}
                        </Button>
                    </div>
                </div>
            ) : submittedApplication ? (
                /* Success Pending Verification State */
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-3xl bg-white border border-emerald-200 shadow-[0_10px_30px_rgba(16,185,129,0.06)] p-6 sm:p-8 space-y-6"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-lg font-bold text-slate-800">
                                    {t('Pendaftaran Toko Berhasil Dikirim')}
                                </h3>
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                    {t('Status: Menunggu Verifikasi')}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                {t('Tim kurasi Tokped sedang memvalidasi data toko Anda. Proses ini memakan waktu maksimal 1x24 jam kerja.')}
                            </p>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div>
                            <span className="text-slate-400 font-medium">{t('Nama Toko')}</span>
                            <p className="font-bold text-slate-800 text-sm mt-0.5">
                                {submittedApplication.store_name}
                            </p>
                        </div>
                        <div>
                            <span className="text-slate-400 font-medium">{t('Kota Penjemputan')}</span>
                            <p className="font-semibold text-slate-800 mt-0.5">
                                {submittedApplication.city}
                            </p>
                        </div>
                        <div>
                            <span className="text-slate-400 font-medium">{t('Kategori Produk')}</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {submittedApplication.categories.map((catVal) => {
                                    const label = categoryOptions.find((c) => c.value === catVal)?.label;
                                    return (
                                        <span
                                            key={catVal}
                                            className="px-2 py-0.5 rounded-md bg-emerald-100/80 text-emerald-800 font-medium text-[11px]"
                                        >
                                            {label}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="text-xs text-slate-400">
                            {t('Diajukan pada')}: {submittedApplication.submitted_at}
                        </span>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setSubmittedApplication(null)}
                            className="text-xs text-brand-primary hover:bg-brand-primary/5 rounded-xl"
                        >
                            {t('Ubah Data Pendaftaran')}
                        </Button>
                    </div>
                </motion.div>
            ) : (
                /* Registration Form */
                <form
                    onSubmit={handleOpenConfirmation}
                    className="rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] overflow-hidden"
                >
                    <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-sm">
                                <Store className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                                    {t('Formulir Pembukaan Toko')}
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    {t('Lengkapi data diri dan profil toko Anda untuk aktivasi akun penjual')}
                                </p>
                            </div>
                        </div>
                        <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {t('Langkah 1 dari 1')}
                        </span>
                    </div>

                    <div className="p-6 sm:p-8 space-y-8">
                        {/* 1. INFORMASI TOKO */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                                <h4 className="text-sm font-bold text-slate-800">
                                    {t('1. Informasi Toko')}
                                </h4>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="store_name" className="text-xs font-semibold text-slate-700">
                                        {t('Nama Toko')} <span className="text-rose-500">*</span>
                                    </Label>
                                    <Input
                                        id="store_name"
                                        type="text"
                                        value={formData.store_name}
                                        onChange={(e) => handleInputChange('store_name', e.target.value)}
                                        placeholder={t('Contoh: Berkah Elektronik Official')}
                                        className={`h-11 rounded-xl bg-white border ${
                                            formErrors.store_name ? 'border-rose-400' : 'border-slate-200'
                                        }`}
                                    />
                                    {formErrors.store_name ? (
                                        <p className="text-xs text-rose-500 font-medium">
                                            {formErrors.store_name}
                                        </p>
                                    ) : (
                                        <p className="text-[11px] text-slate-400">
                                            {t('Tautan toko')}:{' '}
                                            <span className="font-mono text-emerald-600 font-semibold">
                                                tokped.test/store/{storeSlug}
                                            </span>
                                        </p>
                                    )}
                                </div>

                                {/* Multi-select Kategori Produk */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-xs font-semibold text-slate-700">
                                            {t('Kategori Produk (Bisa pilih lebih dari satu)')}{' '}
                                            <span className="text-rose-500">*</span>
                                        </Label>
                                        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                                            {formData.categories.length} {t('kategori dipilih')}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {categoryOptions.map((cat) => {
                                            const isSelected = formData.categories.includes(cat.value);
                                            return (
                                                <button
                                                    key={cat.value}
                                                    type="button"
                                                    onClick={() => handleCategoryToggle(cat.value)}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all select-none border cursor-pointer ${
                                                        isSelected
                                                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-500/20 shadow-xs font-semibold'
                                                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
                                                    }`}
                                                >
                                                    <span
                                                        className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] transition-colors ${
                                                            isSelected
                                                                ? 'bg-emerald-600 text-white'
                                                                : 'border border-slate-300 bg-white text-transparent'
                                                        }`}
                                                    >
                                                        <Check className="w-3 h-3 stroke-[3]" />
                                                    </span>
                                                    <span>{cat.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {formErrors.categories ? (
                                        <p className="text-xs text-rose-500 font-medium">
                                            {formErrors.categories}
                                        </p>
                                    ) : (
                                        <p className="text-[11px] text-slate-400">
                                            {t('Pilih semua kategori barang yang akan Anda jual di toko ini')}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="description" className="text-xs font-semibold text-slate-700">
                                        {t('Deskripsi / Slogan Toko')}
                                    </Label>
                                    <textarea
                                        id="description"
                                        rows={2}
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        placeholder={t('Contoh: Menyediakan berbagai gadget dan aksesoris original bergaransi resmi.')}
                                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. DATA DIRI PEMILIK TOKO (NIK DIHAPUS) */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                                <UserCheck className="w-4 h-4 text-emerald-600" />
                                <h4 className="text-sm font-bold text-slate-800">
                                    {t('2. Data Diri Pemilik Toko')}
                                </h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="owner_name" className="text-xs font-semibold text-slate-700">
                                        {t('Nama Lengkap Pemilik')} <span className="text-rose-500">*</span>
                                    </Label>
                                    <Input
                                        id="owner_name"
                                        type="text"
                                        value={formData.owner_name}
                                        onChange={(e) => handleInputChange('owner_name', e.target.value)}
                                        placeholder={t('Nama lengkap pemilik')}
                                        className={`h-11 rounded-xl bg-white border ${
                                            formErrors.owner_name ? 'border-rose-400' : 'border-slate-200'
                                        }`}
                                    />
                                    {formErrors.owner_name && (
                                        <p className="text-xs text-rose-500 font-medium">
                                            {formErrors.owner_name}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="phone" className="text-xs font-semibold text-slate-700">
                                        {t('Nomor Telepon / WhatsApp Toko')}{' '}
                                        <span className="text-rose-500">*</span>
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        placeholder="Contoh: 081234567890"
                                        className={`h-11 rounded-xl bg-white border ${
                                            formErrors.phone ? 'border-rose-400' : 'border-slate-200'
                                        }`}
                                    />
                                    {formErrors.phone && (
                                        <p className="text-xs text-rose-500 font-medium">{formErrors.phone}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 3. ALAMAT LOKASI & PENJEMPUTAN BARANG */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                                <MapPin className="w-4 h-4 text-emerald-600" />
                                <h4 className="text-sm font-bold text-slate-800">
                                    {t('3. Alamat Penjemputan Paket (Kurir Pick-up)')}
                                </h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="city" className="text-xs font-semibold text-slate-700">
                                        {t('Kota / Kabupaten')} <span className="text-rose-500">*</span>
                                    </Label>
                                    <Input
                                        id="city"
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => handleInputChange('city', e.target.value)}
                                        placeholder={t('Contoh: Jakarta Selatan')}
                                        className={`h-11 rounded-xl bg-white border ${
                                            formErrors.city ? 'border-rose-400' : 'border-slate-200'
                                        }`}
                                    />
                                    {formErrors.city && (
                                        <p className="text-xs text-rose-500 font-medium">{formErrors.city}</p>
                                    )}
                                </div>

                                <div className="md:col-span-2 space-y-1.5">
                                    <Label htmlFor="store_address" className="text-xs font-semibold text-slate-700">
                                        {t('Alamat Lengkap Toko / Gudang')}{' '}
                                        <span className="text-rose-500">*</span>
                                    </Label>
                                    <Input
                                        id="store_address"
                                        type="text"
                                        value={formData.store_address}
                                        onChange={(e) => handleInputChange('store_address', e.target.value)}
                                        placeholder={t('Nama Jalan, Gedung, No. Rumah, RT/RW, Kecamatan')}
                                        className={`h-11 rounded-xl bg-white border ${
                                            formErrors.store_address ? 'border-rose-400' : 'border-slate-200'
                                        }`}
                                    />
                                    {formErrors.store_address && (
                                        <p className="text-xs text-rose-500 font-medium">
                                            {formErrors.store_address}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Terms & Agreement Checkbox */}
                        <div className="pt-2">
                            <label className="flex items-start gap-3 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={formData.agree_terms}
                                    onChange={(e) => handleInputChange('agree_terms', e.target.checked)}
                                    className="mt-1 w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500"
                                />
                                <span className="text-xs text-slate-600 leading-relaxed">
                                    {t('Saya menyatakan bahwa data yang saya isi adalah benar dan menyetujui')}{' '}
                                    <span className="font-semibold text-emerald-600 hover:underline">
                                        {t('Syarat & Ketentuan Penjual Tokped')}
                                    </span>
                                    .{' '}
                                    {t('Saya bersedia mematuhi aturan perdagangan produk resmi dan standar layanan pelanggan platform.')}
                                </span>
                            </label>
                            {formErrors.agree_terms && (
                                <p className="text-xs text-rose-500 font-medium mt-1.5">
                                    {formErrors.agree_terms}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-end pt-4 border-t border-slate-100">
                            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                <Button
                                    type="submit"
                                    className="h-11 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.25)] transition-all flex items-center gap-2 text-xs"
                                >
                                    <Store className="w-4 h-4" />
                                    <span>{t('Ajukan Pendaftaran Seller')}</span>
                                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </form>
            )}

            {/* Modal Konfirmasi Pendaftaran Seller */}
            <CleanModal
                open={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                title={t('Konfirmasi Pendaftaran Toko')}
                description={t('Pastikan informasi toko Anda sudah tepat')}
                icon={Store}
                size="md"
            >
                <div className="p-6 space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed">
                        {t('Anda akan mengajukan perubahan akun reguler menjadi akun Penjual Tokped dengan data berikut:')}
                    </p>

                    <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-3 text-xs">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500">{t('Nama Toko')}:</span>
                            <strong className="text-slate-800 text-sm">{formData.store_name}</strong>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500">{t('Nama Pemilik')}:</span>
                            <span className="text-slate-700 font-medium">{formData.owner_name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500">{t('Telepon / WhatsApp')}:</span>
                            <span className="text-slate-700 font-medium">{formData.phone}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500">{t('Kota Penjemputan')}:</span>
                            <span className="text-slate-700 font-medium">{formData.city}</span>
                        </div>
                        <div className="space-y-1 pt-1 border-t border-emerald-200/60">
                            <span className="text-slate-500">{t('Kategori Produk Terpilih')}:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {formData.categories.map((catVal) => {
                                    const label = categoryOptions.find((c) => c.value === catVal)?.label;
                                    return (
                                        <span
                                            key={catVal}
                                            className="px-2 py-0.5 rounded-md bg-emerald-200/70 text-emerald-900 font-semibold text-[11px]"
                                        >
                                            {label}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setShowConfirmModal(false)}
                            disabled={isSubmitting}
                            className="rounded-xl"
                        >
                            {t('Batal')}
                        </Button>
                        <Button
                            type="button"
                            onClick={handleConfirmSubmit}
                            disabled={isSubmitting}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.25)] flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Spinner size="sm" color="white" />
                                    <span>{t('Memproses Pendaftaran...')}</span>
                                </>
                            ) : (
                                <>
                                    <Check className="w-4 h-4" />
                                    <span>{t('Ya, Buka Toko Sekarang')}</span>
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </CleanModal>
        </div>
    );
}
