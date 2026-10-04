import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CleanModal({
    open,
    onClose,
    title,
    description,
    icon: Icon,
    size = 'lg',
    closable = true,
    className,
    children,
}) {
    const overlayRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (e.key === 'Escape' && closable) onClose?.();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [open, closable, onClose]);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const sizeClass =
        {
            sm: 'max-w-sm',
            md: 'max-w-md',
            lg: 'max-w-xl',
            xl: 'max-w-2xl',
            '2xl': 'max-w-3xl',
        }[size] ?? 'max-w-xl';

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    ref={overlayRef}
                    key="clean-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto"
                    onClick={(e) => {
                        if (e.target === overlayRef.current && closable) onClose?.();
                    }}
                >
                    <motion.div
                        key="clean-modal-panel"
                        initial={{ opacity: 0, scale: 0.94, y: 18 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 18 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={title ? 'clean-modal-title' : undefined}
                        className={cn(
                            'relative w-full rounded-3xl bg-white border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden my-8',
                            sizeClass,
                            className
                        )}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {(title || closable) && (
                            <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-slate-100 bg-slate-50/70">
                                <div className="flex items-center gap-3">
                                    {Icon && (
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-sm shrink-0">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                    )}
                                    <div>
                                        {title && (
                                            <h3
                                                id="clean-modal-title"
                                                className="text-lg font-bold text-slate-900 tracking-tight leading-snug"
                                            >
                                                {title}
                                            </h3>
                                        )}
                                        {description && (
                                            <p className="mt-0.5 text-xs text-slate-500">
                                                {description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {closable && (
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="shrink-0 rounded-xl p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                                        aria-label="Tutup"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        )}

                        <div>{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
