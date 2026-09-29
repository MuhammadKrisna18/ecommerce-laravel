import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Modal / Dialog component.
 *
 * Usage:
 *   <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Hapus Data">
 *     <p>Apakah kamu yakin?</p>
 *
 *     <Modal.Footer>
 *       <Button variant="ghost" onClick={() => setIsOpen(false)}>Batal</Button>
 *       <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
 *     </Modal.Footer>
 *   </Modal>
 *
 * @param {boolean}          props.open          - Controlled open state.
 * @param {Function}         props.onClose       - Called on overlay click or × button.
 * @param {string}           [props.title]       - Header title text.
 * @param {string}           [props.description] - Muted subtitle under title.
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md']
 * @param {boolean}          [props.closable=true] - Show × button.
 * @param {string}           [props.className]   - Extra classes on the panel.
 * @param {React.ReactNode}  props.children
 */
function Modal({
    open,
    onClose,
    title,
    description,
    size = "md",
    closable = true,
    className,
    children,
}) {
    const overlayRef = useRef(null);

    // Close on Escape key
    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (e.key === "Escape" && closable) onClose?.();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open, closable, onClose]);

    // Lock body scroll
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const sizeClass = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-2xl",
    }[size] ?? "max-w-md";

    return (
        <AnimatePresence>
            {open && (
                /* Overlay */
                <motion.div
                    ref={overlayRef}
                    key="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    onClick={(e) => {
                        if (e.target === overlayRef.current && closable) onClose?.();
                    }}
                >
                    {/* Panel */}
                    <motion.div
                        key="modal-panel"
                        initial={{ opacity: 0, scale: 0.96, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 12 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={title ? "modal-title" : undefined}
                        className={cn(
                            "relative w-full rounded-2xl bg-[#0e0a0b] border border-red-950/40",
                            "shadow-[0_0_60px_-15px_rgba(153,27,27,0.35)]",
                            sizeClass,
                            className
                        )}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top glow accent */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-red-700/50 to-transparent" />

                        {/* Header */}
                        {(title || closable) && (
                            <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-zinc-800/50">
                                <div>
                                    {title && (
                                        <h3
                                            id="modal-title"
                                            className="text-base font-semibold text-white leading-snug"
                                        >
                                            {title}
                                        </h3>
                                    )}
                                    {description && (
                                        <p className="mt-0.5 text-sm text-zinc-400">
                                            {description}
                                        </p>
                                    )}
                                </div>
                                {closable && (
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="shrink-0 rounded-lg p-1.5 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                                        aria-label="Tutup"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Body */}
                        <div className="px-6 py-5 text-sm text-zinc-300">{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/**
 * Modal.Footer — sticky bottom action bar inside a modal.
 */
Modal.Footer = function ModalFooter({ className, children, ...props }) {
    return (
        <div
            className={cn(
                "flex items-center justify-end gap-2 border-t border-zinc-800/50 px-6 py-4 -mx-6 -mb-5 mt-4 rounded-b-2xl bg-zinc-900/30",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export { Modal };
