import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Store,
    MapPin,
    Truck,
    CreditCard,
    Check,
    Save,
    CheckCircle2,
    Building2,
    Clock,
} from 'lucide-react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { useTranslation } from '@/Hooks/useTranslation';

export default function SellerSettingsIndex({ store }) {
    const { t } = useTranslation();

    const [activeSection, setActiveSection] = useState('profile');
    const [savedSuccess, setSavedSuccess] = useState(false);

    const [settingsData, setSettingsData] = useState({
        name: store?.name || '',
        description: store?.description || '',
        city: store?.city || '',
        address: store?.address || '',
        phone: store?.phone || '',
        status: store?.status || 'active',
        categories: store?.categories || ['electronics'],
        bank_name: 'BCA',
        bank_account: '1234567890',
        bank_holder: store?.name || '',
        couriers: ['jne', 'jnt', 'sicepat'],
    });

    const categoryOptions = [
        { value: 'electronics', label: t('Elektronik & Gadget') },
        { value: 'fashion', label: t('Fashion & Pakaian') },
        { value: 'food_beverage', label: t('Makanan & Minuman') },
        { value: 'health_beauty', label: t('Kesehatan & Kecantikan') },
        { value: 'home_living', label: t('Perlengkapan Rumah Tangga') },
        { value: 'hobbies_toys', label: t('Hobi, Mainan & Koleksi') },
        { value: 'automotive', label: t('Otomotif & Aksesoris') },
    ];

    const courierOptions = [
        { id: 'jnt', name: 'J&T Express' },
        { id: 'sicepat', name: 'SiCepat Ekspres' },
        { id: 'anteraja', name: 'AnterAja' },
        { id: 'jne', name: 'JNE Reguler' },
        { id: 'gosend', name: 'GoSend Instant' },
    ];

    const handleCategoryToggle = (value) => {
        setSettingsData((prev) => {
            const exists = prev.categories.includes(value);
            if (exists) {
                return { ...prev, categories: prev.categories.filter((c) => c !== value) };
            }
            return { ...prev, categories: [...prev.categories, value] };
        });
    };

    const handleCourierToggle = (id) => {
        setSettingsData((prev) => {
            const exists = prev.couriers.includes(id);
            if (exists) {
                return { ...prev, couriers: prev.couriers.filter((c) => c !== id) };
            }
            return { ...prev, couriers: [...prev.couriers, id] };
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        setSavedSuccess(true);
        setTimeout(() => {
            setSavedSuccess(false);
        }, 3000);
    };

    const storeSlug = settingsData.name
        ? settingsData.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '')
        : 'nama-toko-anda';

    return (
        <SellerLayout
            header={<h1 className="text-xl font-bold text-slate-800">{t('Pengaturan Toko')}</h1>}
        >
            <Head title={t('Pengaturan Toko - Seller Center')} />

            <div className="max-w-5xl mx-auto space-y-6 pb-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                            {t('Pengaturan Toko')}
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                            {t(
                                'Kelola profil toko, alamat gudang penjemputan, kurir, dan rekening pencairan dana'
                            )}
                        </p>
                    </div>

                    <AnimatePresence>
                        {savedSuccess && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold"
                            >
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>{t('Pengaturan berhasil diperbarui!')}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex items-center gap-2 p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 overflow-x-auto no-scrollbar">
                    {[
                        { id: 'profile', label: t('Profil & Info Toko'), icon: Store },
                        { id: 'address', label: t('Alamat & Pengiriman'), icon: MapPin },
                        { id: 'payout', label: t('Rekening Pencairan'), icon: CreditCard },
                    ].map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeSection === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveSection(tab.id)}
                                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                                    isActive
                                        ? 'text-emerald-700 shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeSellerSettingTab"
                                        className="absolute inset-0 bg-white rounded-xl shadow-xs border border-slate-200/60"
                                        transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <Icon
                                        className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}
                                    />
                                    <span>{tab.label}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                <form onSubmit={handleSave}>
                    <div className="rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-6 sm:p-8 space-y-6">
                        {activeSection === 'profile' && (
                            <div className="space-y-6">
                                <div className="space-y-1.5">
                                    <Label
                                        htmlFor="st_name"
                                        className="text-xs font-semibold text-slate-700"
                                    >
                                        {t('Nama Toko')}
                                    </Label>
                                    <Input
                                        id="st_name"
                                        type="text"
                                        value={settingsData.name}
                                        onChange={(e) =>
                                            setSettingsData({
                                                ...settingsData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="h-11 rounded-xl bg-white border-slate-200 text-xs"
                                    />
                                    <p className="text-[11px] text-slate-400">
                                        {t('Tautan toko')}:{' '}
                                        <span className="font-mono text-emerald-600 font-semibold">
                                            k-tienda.test/store/{storeSlug}
                                        </span>
                                    </p>
                                </div>

                                <div className="space-y-1.5">
                                    <Label
                                        htmlFor="st_desc"
                                        className="text-xs font-semibold text-slate-700"
                                    >
                                        {t('Deskripsi / Slogan Toko')}
                                    </Label>
                                    <textarea
                                        id="st_desc"
                                        rows={3}
                                        value={settingsData.description}
                                        onChange={(e) =>
                                            setSettingsData({
                                                ...settingsData,
                                                description: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-semibold text-slate-700">
                                        {t('Kategori Produk Utama')}
                                    </Label>
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {categoryOptions.map((cat) => {
                                            const isSelected = settingsData.categories.includes(
                                                cat.value
                                            );
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
                                </div>

                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <h4 className="text-xs font-bold text-slate-800">
                                            {t('Status Operasional Toko')}
                                        </h4>
                                        <p className="text-[11px] text-slate-500">
                                            {t(
                                                'Tutup toko sementara jika sedang berlibur atau tidak melayani pesanan'
                                            )}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSettingsData({
                                                ...settingsData,
                                                status:
                                                    settingsData.status === 'active'
                                                        ? 'closed'
                                                        : 'active',
                                            })
                                        }
                                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                                            settingsData.status === 'active'
                                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                                : 'bg-slate-200 text-slate-700 border-slate-300'
                                        }`}
                                    >
                                        {settingsData.status === 'active'
                                            ? t('Toko Buka')
                                            : t('Toko Libur')}
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeSection === 'address' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label
                                            htmlFor="st_city"
                                            className="text-xs font-semibold text-slate-700"
                                        >
                                            {t('Kota / Kabupaten Asal Pengiriman')}
                                        </Label>
                                        <Input
                                            id="st_city"
                                            type="text"
                                            value={settingsData.city}
                                            onChange={(e) =>
                                                setSettingsData({
                                                    ...settingsData,
                                                    city: e.target.value,
                                                })
                                            }
                                            className="h-11 rounded-xl bg-white border-slate-200 text-xs"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label
                                            htmlFor="st_phone"
                                            className="text-xs font-semibold text-slate-700"
                                        >
                                            {t('Nomor Telepon Kontak Penjemputan')}
                                        </Label>
                                        <Input
                                            id="st_phone"
                                            type="tel"
                                            value={settingsData.phone}
                                            onChange={(e) =>
                                                setSettingsData({
                                                    ...settingsData,
                                                    phone: e.target.value,
                                                })
                                            }
                                            className="h-11 rounded-xl bg-white border-slate-200 text-xs"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label
                                        htmlFor="st_addr"
                                        className="text-xs font-semibold text-slate-700"
                                    >
                                        {t('Alamat Lengkap Toko / Gudang')}
                                    </Label>
                                    <Input
                                        id="st_addr"
                                        type="text"
                                        value={settingsData.address}
                                        onChange={(e) =>
                                            setSettingsData({
                                                ...settingsData,
                                                address: e.target.value,
                                            })
                                        }
                                        className="h-11 rounded-xl bg-white border-slate-200 text-xs"
                                    />
                                </div>

                                <div className="space-y-3 pt-2">
                                    <Label className="text-xs font-semibold text-slate-700">
                                        {t('Pilihan Layanan Ekspedisi / Kurir')}
                                    </Label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {courierOptions.map((courier) => {
                                            const isSelected = settingsData.couriers.includes(
                                                courier.id
                                            );
                                            return (
                                                <button
                                                    key={courier.id}
                                                    type="button"
                                                    onClick={() => handleCourierToggle(courier.id)}
                                                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                                                        isSelected
                                                            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-800'
                                                            : 'bg-slate-50 border-slate-200 text-slate-600'
                                                    }`}
                                                >
                                                    <span className="text-xs font-semibold">
                                                        {courier.name}
                                                    </span>
                                                    <span
                                                        className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                                                            isSelected
                                                                ? 'bg-emerald-600 text-white'
                                                                : 'border border-slate-300'
                                                        }`}
                                                    >
                                                        {isSelected && (
                                                            <Check className="w-3 h-3 stroke-[3]" />
                                                        )}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'payout' && (
                            <div className="space-y-6">
                                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
                                    <CreditCard className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-bold text-slate-800">
                                            {t('Rekening Pencairan Dana Penjualan')}
                                        </h4>
                                        <p className="text-[11px] text-slate-600 leading-relaxed">
                                            {t(
                                                'Seluruh hasil penjualan dari produk yang telah selesai dikirim akan dikreditkan ke saldo K-Tienda en Línea dan dapat ditarik ke rekening ini kapan saja.'
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                        <Label
                                            htmlFor="bk_name"
                                            className="text-xs font-semibold text-slate-700"
                                        >
                                            {t('Nama Bank')}
                                        </Label>
                                        <Input
                                            id="bk_name"
                                            type="text"
                                            value={settingsData.bank_name}
                                            onChange={(e) =>
                                                setSettingsData({
                                                    ...settingsData,
                                                    bank_name: e.target.value,
                                                })
                                            }
                                            className="h-11 rounded-xl bg-white border-slate-200 text-xs"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label
                                            htmlFor="bk_acc"
                                            className="text-xs font-semibold text-slate-700"
                                        >
                                            {t('Nomor Rekening')}
                                        </Label>
                                        <Input
                                            id="bk_acc"
                                            type="text"
                                            value={settingsData.bank_account}
                                            onChange={(e) =>
                                                setSettingsData({
                                                    ...settingsData,
                                                    bank_account: e.target.value,
                                                })
                                            }
                                            className="h-11 rounded-xl bg-white font-mono border-slate-200 text-xs"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label
                                            htmlFor="bk_hold"
                                            className="text-xs font-semibold text-slate-700"
                                        >
                                            {t('Nama Pemilik Rekening')}
                                        </Label>
                                        <Input
                                            id="bk_hold"
                                            type="text"
                                            value={settingsData.bank_holder}
                                            onChange={(e) =>
                                                setSettingsData({
                                                    ...settingsData,
                                                    bank_holder: e.target.value,
                                                })
                                            }
                                            className="h-11 rounded-xl bg-white border-slate-200 text-xs"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                            <Button
                                type="submit"
                                className="h-11 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                <span>{t('Simpan Pengaturan Toko')}</span>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </SellerLayout>
    );
}
