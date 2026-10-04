import { Clock, ShieldAlert, AlertTriangle } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { CleanModal } from '@/Components/ui/CleanModal';
import { useTranslation } from '@/Hooks/useTranslation';

export function FreezeUserModal({
    isOpen,
    onClose,
    selectedUser,
    freezeDurationValue,
    setFreezeDurationValue,
    freezeDurationUnit,
    setFreezeDurationUnit,
    freezeReason,
    setFreezeReason,
    onSubmit,
}) {
    const { t } = useTranslation();

    const durationUnitLabels = {
        hours: t('Jam'),
        days: t('Hari'),
        weeks: t('Minggu'),
        months: t('Bulan'),
        years: t('Tahun'),
    };

    return (
        <CleanModal
            open={isOpen}
            onClose={onClose}
            title={t('Bekukan Akun Pengguna')}
            description={t('Atur batas waktu durasi pembekuan akun')}
            icon={ShieldAlert}
            size="md"
        >
            <form onSubmit={onSubmit} className="p-6 space-y-4">
                {selectedUser && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary font-bold flex items-center justify-center text-xs">
                            {selectedUser.name?.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="text-xs">
                            <div className="font-semibold text-slate-800">{selectedUser.name}</div>
                            <div className="text-slate-500">{selectedUser.email}</div>
                        </div>
                    </div>
                )}

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-primary" />
                        {t('Durasi Pembekuan')}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Input
                                type="number"
                                min="1"
                                max="365"
                                value={freezeDurationValue}
                                onChange={(e) => setFreezeDurationValue(e.target.value)}
                                className="h-10 text-xs rounded-xl bg-white border-slate-200"
                                required
                            />
                        </div>
                        <div>
                            <select
                                value={freezeDurationUnit}
                                onChange={(e) => setFreezeDurationUnit(e.target.value)}
                                className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary cursor-pointer shadow-xs"
                            >
                                <option value="hours">{t('Jam')}</option>
                                <option value="days">{t('Hari')}</option>
                                <option value="weeks">{t('Minggu')}</option>
                                <option value="months">{t('Bulan')}</option>
                                <option value="years">{t('Tahun')}</option>
                            </select>
                        </div>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                        {t('Pengguna akan dibekukan selama')}{' '}
                        <strong>
                            {freezeDurationValue} {durationUnitLabels[freezeDurationUnit]}
                        </strong>
                        . {t('Saat login, akun akan dialihkan ke halaman pemberitahuan pembekuan.')}
                    </p>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                        {t('Alasan Pembekuan (Opsional)')}
                    </label>
                    <textarea
                        rows={3}
                        placeholder={t('Contoh: Pelanggaran transaksi berulang, spamming, dll.')}
                        value={freezeReason}
                        onChange={(e) => setFreezeReason(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary resize-none"
                    />
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 flex items-start gap-2.5 text-[11px] text-amber-800">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                        {t(
                            'Langkah berikutnya akan memunculkan pop-up kode 4-digit untuk konfirmasi keamanan.'
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onClose}
                        className="text-xs text-slate-500 hover:text-slate-800"
                    >
                        {t('Batal')}
                    </Button>
                    <Button
                        type="submit"
                        className="h-9 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded-xl shadow-xs"
                    >
                        {t('Lanjut ke Verifikasi Kode')}
                    </Button>
                </div>
            </form>
        </CleanModal>
    );
}
