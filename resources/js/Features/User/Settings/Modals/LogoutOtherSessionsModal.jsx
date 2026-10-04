import { LogOut } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { CleanModal } from '@/Components/ui/CleanModal';
import { useTranslation } from '@/Hooks/useTranslation';

export function LogoutOtherSessionsModal({ isOpen, onClose, onConfirm }) {
    const { t } = useTranslation();

    return (
        <CleanModal
            open={isOpen}
            onClose={onClose}
            title={t('Keluar dari Semua Perangkat Lain')}
            description={t('Keluar dari Perangkat Lain')}
            icon={LogOut}
            size="sm"
        >
            <div className="p-6 space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                    {t(
                        'Tindakan ini akan mengakhiri semua sesi login aktif di komputer, ponsel, atau browser lain kecuali perangkat ini.'
                    )}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                    {t('Apakah Anda yakin ingin melanjutkan?')}
                </p>

                <div className="flex items-center justify-end gap-3 pt-2">
                    <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl">
                        {t('Batal')}
                    </Button>
                    <Button
                        type="button"
                        onClick={onConfirm}
                        className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs"
                    >
                        {t('Ya, Keluarkan Perangkat Lain')}
                    </Button>
                </div>
            </div>
        </CleanModal>
    );
}
