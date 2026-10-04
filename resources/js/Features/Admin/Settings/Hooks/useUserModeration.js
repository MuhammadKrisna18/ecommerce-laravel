import { useState } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useTranslation } from '@/Hooks/useTranslation';

export function useUserModeration(setUsers) {
    const { t } = useTranslation();

    const [freezeModalOpen, setFreezeModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [freezeDurationValue, setFreezeDurationValue] = useState(1);
    const [freezeDurationUnit, setFreezeDurationUnit] = useState('days');
    const [freezeReason, setFreezeReason] = useState('');

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const [codeModalOpen, setCodeModalOpen] = useState(false);
    const [actionType, setActionType] = useState('');
    const [targetUser, setTargetUser] = useState(null);
    const [generatedCode, setGeneratedCode] = useState('');
    const [inputCode, setInputCode] = useState('');
    const [codeError, setCodeError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const openFreezeModal = (user) => {
        setSelectedUser(user);
        setFreezeDurationValue(1);
        setFreezeDurationUnit('days');
        setFreezeReason('');
        setFreezeModalOpen(true);
    };

    const handleFreezeStep1 = async (e) => {
        e.preventDefault();
        if (!selectedUser) return;

        setTargetUser(selectedUser);
        setActionType('freeze');

        try {
            const response = await axios.post(route('admin.users.generate-verification-code'));
            setGeneratedCode(response.data.code);
            setInputCode('');
            setCodeError('');
            setFreezeModalOpen(false);
            setCodeModalOpen(true);
        } catch (error) {
            console.error('Failed to generate verification code:', error);
        }
    };

    const handleDeleteStep1 = async (user) => {
        setUserToDelete(user);
        setTargetUser(user);
        setActionType('delete');

        try {
            const response = await axios.post(route('admin.users.generate-verification-code'));
            setGeneratedCode(response.data.code);
            setInputCode('');
            setCodeError('');
            setDeleteModalOpen(false);
            setCodeModalOpen(true);
        } catch (error) {
            console.error('Failed to generate verification code:', error);
        }
    };

    const handleUnfreeze = (user) => {
        router.post(
            route('admin.users.unfreeze', user.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setUsers((prev) =>
                        prev.map((u) =>
                            u.id === user.id
                                ? {
                                      ...u,
                                      is_frozen: false,
                                      frozen_duration: null,
                                      frozen_reason: null,
                                  }
                                : u
                        )
                    );
                },
                onError: () => {},
            }
        );
    };

    const handleVerifyAndExecute = (e) => {
        e.preventDefault();
        setCodeError('');

        if (inputCode.trim().toUpperCase() !== generatedCode.toUpperCase()) {
            setCodeError(t('Kode verifikasi tidak cocok. Silakan coba lagi.'));
            return;
        }

        if (!targetUser) return;
        setIsSubmitting(true);

        if (actionType === 'freeze') {
            router.post(
                route('admin.users.freeze', targetUser.id),
                {
                    duration_value: freezeDurationValue,
                    duration_unit: freezeDurationUnit,
                    reason: freezeReason,
                    confirmation_code: inputCode.trim().toUpperCase(),
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setIsSubmitting(false);
                        setCodeModalOpen(false);
                        setSelectedUser(null);
                        setTargetUser(null);
                    },
                    onError: (errors) => {
                        setIsSubmitting(false);
                        setCodeError(
                            errors?.confirmation_code || t('Gagal memproses pembekuan akun.')
                        );
                    },
                }
            );
        } else if (actionType === 'delete') {
            router.delete(route('admin.users.destroy', targetUser.id), {
                data: {
                    confirmation_code: inputCode.trim().toUpperCase(),
                },
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmitting(false);
                    setCodeModalOpen(false);
                    setUserToDelete(null);
                    setTargetUser(null);
                },
                onError: (errors) => {
                    setIsSubmitting(false);
                    setCodeError(errors?.confirmation_code || t('Gagal menghapus akun pengguna.'));
                },
            });
        }
    };

    const regenerateCode = async () => {
        try {
            const response = await axios.post(route('admin.users.generate-verification-code'));
            setGeneratedCode(response.data.code);
            setInputCode('');
            setCodeError('');
        } catch (error) {
            console.error('Failed to regenerate verification code:', error);
        }
    };

    return {
        freezeModalOpen,
        setFreezeModalOpen,
        selectedUser,
        setSelectedUser,
        freezeDurationValue,
        setFreezeDurationValue,
        freezeDurationUnit,
        setFreezeDurationUnit,
        freezeReason,
        setFreezeReason,
        deleteModalOpen,
        setDeleteModalOpen,
        userToDelete,
        setUserToDelete,
        codeModalOpen,
        setCodeModalOpen,
        actionType,
        setActionType,
        targetUser,
        setTargetUser,
        generatedCode,
        setGeneratedCode,
        inputCode,
        setInputCode,
        codeError,
        setCodeError,
        isSubmitting,
        setIsSubmitting,
        openFreezeModal,
        handleFreezeStep1,
        handleDeleteStep1,
        handleUnfreeze,
        handleVerifyAndExecute,
        regenerateCode,
    };
}
