import { useState } from 'react';
import { router } from '@inertiajs/react';
import { useTranslation } from '@/Hooks/useTranslation';

export function useSellerUpgrade(user) {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        store_name: user?.store?.name || '',
        categories: user?.store?.categories || ['electronics'],
        description: user?.store?.description || '',
        owner_name: user?.name || '',
        phone: user?.store?.phone || '',
        city: user?.store?.city || '',
        store_address: user?.store?.address || user?.address || '',
        agree_terms: false,
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

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
        const trimmedStoreName = formData.store_name.trim();

        if (!trimmedStoreName) {
            errors.store_name = t('Nama toko wajib diisi');
        } else if (trimmedStoreName.length < 4) {
            errors.store_name = t('Nama toko minimal 4 karakter');
        } else if (!/^[\p{L}\s]+$/u.test(trimmedStoreName)) {
            errors.store_name = t('Nama toko hanya boleh berisi huruf');
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
        router.post(route('user.settings.seller.upgrade'), formData, {
            preserveScroll: true,
            onSuccess: () => {
                setIsSubmitting(false);
                setShowConfirmModal(false);
            },
            onError: (serverErrors) => {
                setIsSubmitting(false);
                setShowConfirmModal(false);
                setFormErrors(serverErrors);
            },
        });
    };

    return {
        formData,
        formErrors,
        isSubmitting,
        showConfirmModal,
        setShowConfirmModal,
        storeSlug,
        handleInputChange,
        handleCategoryToggle,
        handleOpenConfirmation,
        handleConfirmSubmit,
    };
}
