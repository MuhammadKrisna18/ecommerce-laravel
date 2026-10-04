import { Trash2 } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { CleanModal } from '@/Components/ui/CleanModal';
import { useTranslation } from '@/Hooks/useTranslation';

export function DeleteProductModal({ product, onClose, onDelete }) {
    const { t } = useTranslation();

    return (
        <CleanModal
            open={!!product}
            onClose={onClose}
            title={t('Hapus Produk')}
            description={t('Konfirmasi penghapusan produk dari etalase')}
            icon={Trash2}
            size="sm"
        >
            <div className="p-6 space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                    {t('Apakah Anda yakin ingin menghapus produk')} <strong>{product?.name}</strong>
                    ? {t('Tindakan ini tidak dapat dibatalkan.')}
                </p>

                <div className="flex items-center justify-end gap-3 pt-2">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onClose}
                        className="rounded-xl text-xs"
                    >
                        {t('Batal')}
                    </Button>
                    <Button
                        type="button"
                        onClick={() => onDelete(product?.id)}
                        className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold px-4"
                    >
                        {t('Ya, Hapus')}
                    </Button>
                </div>
            </div>
        </CleanModal>
    );
}
