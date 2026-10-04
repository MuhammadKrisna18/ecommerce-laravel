import { ShieldAlert, Trash2, KeyRound, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { CleanModal } from '@/Components/ui/CleanModal';
import { useTranslation } from '@/Hooks/useTranslation';

export function VerificationCodeModal({
    isOpen,
    onClose,
    isSubmitting,
    actionType,
    targetUser,
    generatedCode,
    regenerateCode,
    inputCode,
    setInputCode,
    codeError,
    setCodeError,
    onSubmit,
}) {
    const { t } = useTranslation();

    return (
        <CleanModal
            open={isOpen}
            onClose={() => !isSubmitting && onClose()}
            title={
                actionType === 'freeze'
                    ? t('Verifikasi Pembekuan Akun')
                    : t('Verifikasi Hapus Akun')
            }
            description={t('Masukkan 4 kode verifikasi acak untuk memastikan tindakan Anda')}
            icon={actionType === 'freeze' ? ShieldAlert : Trash2}
            size="sm"
        >
            <form onSubmit={onSubmit} className="p-6 space-y-5">
                {targetUser && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <div className="text-xs">
                            <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                                {t('Target Pengguna')}:
                            </span>
                            <span className="font-semibold text-slate-800">{targetUser.name}</span>
                            <span className="text-slate-500 block text-[11px]">
                                {targetUser.email}
                            </span>
                        </div>
                        <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                actionType === 'freeze'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-rose-100 text-rose-800'
                            }`}
                        >
                            {actionType === 'freeze' ? t('Bekukan') : t('Hapus Permanen')}
                        </span>
                    </div>
                )}

                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center shadow-md relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-primary/20 rounded-full blur-xl pointer-events-none" />
                    <div className="text-[11px] text-slate-300 font-medium tracking-wide uppercase flex items-center justify-center gap-1.5 mb-2">
                        <KeyRound className="w-3.5 h-3.5 text-brand-accent" />
                        {t('Ketik Ulang Kode Keamanan')}
                    </div>

                    <div className="inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md shadow-inner my-1">
                        {generatedCode.split('').map((char, index) => (
                            <span
                                key={`code-${index}`}
                                className="text-2xl font-black font-mono tracking-widest text-brand-accent drop-shadow-sm select-none"
                            >
                                {char}
                            </span>
                        ))}
                    </div>

                    <div className="mt-2.5 flex items-center justify-center">
                        <button
                            type="button"
                            onClick={regenerateCode}
                            className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                        >
                            <RefreshCw className="w-3 h-3" />
                            <span>{t('Ganti Kode Baru')}</span>
                        </button>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                        <span>{t('Masukkan 4 Karakter di Atas')}</span>
                        <span className="text-[11px] text-slate-400 font-normal">
                            {inputCode.length}/4
                        </span>
                    </label>
                    <Input
                        type="text"
                        maxLength={4}
                        autoFocus
                        value={inputCode}
                        onChange={(e) => {
                            setInputCode(e.target.value.toUpperCase());
                            setCodeError('');
                        }}
                        placeholder="Contoh: 7K2B"
                        className="h-12 text-center text-lg font-mono font-bold tracking-widest uppercase rounded-xl border-slate-300 focus:border-brand-primary focus:ring-brand-primary"
                    />
                    {codeError && (
                        <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            {codeError}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                    <Button
                        type="button"
                        variant="ghost"
                        disabled={isSubmitting}
                        onClick={onClose}
                        className="text-xs text-slate-500 hover:text-slate-800"
                    >
                        {t('Batal')}
                    </Button>
                    <Button
                        type="submit"
                        disabled={inputCode.length < 4 || isSubmitting}
                        className={`h-9 px-5 text-white text-xs font-medium rounded-xl shadow-xs transition-all ${
                            actionType === 'freeze'
                                ? 'bg-amber-600 hover:bg-amber-700'
                                : 'bg-rose-600 hover:bg-rose-700'
                        }`}
                    >
                        {isSubmitting ? (
                            <span>{t('Memproses...')}</span>
                        ) : actionType === 'freeze' ? (
                            t('Konfirmasi Bekukan')
                        ) : (
                            t('Konfirmasi Hapus Akun')
                        )}
                    </Button>
                </div>
            </form>
        </CleanModal>
    );
}
