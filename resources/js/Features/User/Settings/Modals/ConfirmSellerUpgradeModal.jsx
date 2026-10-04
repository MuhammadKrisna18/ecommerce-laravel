import { Store, Check } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { CleanModal } from '@/Components/ui/CleanModal';
import { Spinner } from '@/Components/ui/spinner';
import { useTranslation } from '@/Hooks/useTranslation';

export function ConfirmSellerUpgradeModal({
    isOpen,
    onClose,
    formData,
    categoryOptions,
    isSubmitting,
    onConfirm,
}) {
    const { t } = useTranslation();

    return (
        <CleanModal
            open={isOpen}
            onClose={onClose}
            title={t('Konfirmasi Pendaftaran Toko')}
            description={t('Pastikan informasi toko Anda sudah tepat')}
            icon={Store}
            size="md"
        >
            <div className="p-6 space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                    {t(
                        'Anda akan mengajukan perubahan akun reguler menjadi akun Penjual K-Tienda en Línea dengan data berikut:'
                    )}
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
                                const label = categoryOptions.find(
                                    (c) => c.value === catVal
                                )?.label;
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
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="rounded-xl"
                    >
                        {t('Batal')}
                    </Button>
                    <Button
                        type="button"
                        onClick={onConfirm}
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
    );
}
