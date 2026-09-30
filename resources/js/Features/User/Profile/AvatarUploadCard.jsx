import { useState, useRef } from 'react';
import { router } from '@inertiajs/react';
import { Camera, Trash2, Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Spinner } from '@/Components/ui/spinner';
import { useTranslation } from '@/Hooks/useTranslation';

export function AvatarUploadCard({ user }) {
    const { t } = useTranslation();
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation max 2MB
        if (file.size > 2 * 1024 * 1024) {
            setErrorMessage('Ukuran file maksimal 2MB.');
            return;
        }

        // Validate image mime
        if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
            setErrorMessage('Format gambar harus JPG, PNG, atau WEBP.');
            return;
        }

        setErrorMessage('');
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = () => {
        if (!selectedFile) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('avatar', selectedFile);

        router.post(route('user.profile.avatar.update'), formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPreview(null);
                setSelectedFile(null);
                setIsUploading(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
            onError: (errs) => {
                setIsUploading(false);
                setErrorMessage(errs.avatar || 'Gagal mengunggah foto profil.');
            },
        });
    };

    const handleCancelPreview = () => {
        setPreview(null);
        setSelectedFile(null);
        setErrorMessage('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDeleteAvatar = () => {
        if (!confirm('Apakah Anda yakin ingin menghapus foto profil?')) return;

        setIsDeleting(true);
        router.delete(route('user.profile.avatar.destroy'), {
            preserveScroll: true,
            onFinish: () => setIsDeleting(false),
        });
    };

    const currentAvatarUrl = preview || user?.avatar_url;

    return (
        <div className="rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/60">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-sm">
                        <Camera className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                            {t('Foto Profil')}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {t('Format yang didukung: JPG, PNG, WEBP (Maks. 2MB)')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    {/* Avatar Display */}
                    <div className="relative group shrink-0">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-dashed border-brand-primary/40 bg-slate-50 p-1 flex items-center justify-center shadow-inner">
                            {currentAvatarUrl ? (
                                <img
                                    src={currentAvatarUrl}
                                    alt={user?.name || 'Avatar'}
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            ) : (
                                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white font-extrabold text-3xl shadow-sm">
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            )}
                        </div>

                        {/* Quick pick button overlay */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-1 right-1 p-2 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200 text-brand-primary shadow-md hover:bg-brand-primary hover:text-white transition-all"
                            title={t('Pilih Foto Baru')}
                        >
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Controls & Actions */}
                    <div className="flex-1 space-y-4 text-center sm:text-left">
                        <div>
                            <h4 className="text-base font-bold text-slate-800">
                                {user?.name}
                            </h4>
                            <p className="text-xs text-slate-500">
                                {user?.nickname ? `@${user.nickname}` : user?.email}
                            </p>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/jpg"
                            onChange={handleFileChange}
                            className="hidden"
                            id="avatar-input"
                        />

                        {errorMessage && (
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                            {preview ? (
                                <>
                                    <Button
                                        type="button"
                                        onClick={handleUpload}
                                        disabled={isUploading}
                                        className="h-10 px-4 bg-brand-primary hover:bg-brand-dark text-white rounded-xl shadow-sm text-xs font-semibold flex items-center gap-2"
                                    >
                                        {isUploading ? (
                                            <>
                                                <Spinner size="sm" color="white" />
                                                <span>{t('Menyimpan...')}</span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-3.5 h-3.5" />
                                                <span>{t('Unggah Foto')}</span>
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={handleCancelPreview}
                                        disabled={isUploading}
                                        className="h-10 px-4 text-slate-600 hover:bg-slate-100 rounded-xl text-xs"
                                    >
                                        {t('Batal')}
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="h-10 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-sm text-xs font-semibold flex items-center gap-2"
                                    >
                                        <Camera className="w-3.5 h-3.5" />
                                        <span>{t('Pilih Foto Baru')}</span>
                                    </Button>

                                    {user?.avatar && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={handleDeleteAvatar}
                                            disabled={isDeleting}
                                            className="h-10 px-3.5 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                                        >
                                            {isDeleting ? (
                                                <Spinner size="sm" />
                                            ) : (
                                                <>
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    <span>{t('Hapus Foto')}</span>
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
