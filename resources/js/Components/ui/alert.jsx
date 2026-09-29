import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Info,
    X,
} from "lucide-react";

const alertVariants = cva(
    "relative flex items-start gap-3 rounded-xl border px-4 py-3.5 text-sm",
    {
        variants: {
            variant: {
                info: "border-blue-800/40 bg-blue-950/30 text-blue-200",
                success:
                    "border-emerald-800/40 bg-emerald-950/30 text-emerald-200",
                warning:
                    "border-amber-800/40 bg-amber-950/30 text-amber-200",
                danger:
                    "border-red-800/40 bg-red-950/30 text-red-200",
            },
        },
        defaultVariants: {
            variant: "info",
        },
    }
);

const iconMap = {
    info:    <Info className="mt-0.5 w-4 h-4 shrink-0 text-blue-400" />,
    success: <CheckCircle2 className="mt-0.5 w-4 h-4 shrink-0 text-emerald-400" />,
    warning: <AlertTriangle className="mt-0.5 w-4 h-4 shrink-0 text-amber-400" />,
    danger:  <XCircle className="mt-0.5 w-4 h-4 shrink-0 text-red-400" />,
};

/**
 * Alert component.
 *
 * @param {object}   props
 * @param {'info'|'success'|'warning'|'danger'} [props.variant='info']
 * @param {string}   [props.title]          - Optional bold title line.
 * @param {Function} [props.onDismiss]      - If provided, renders a dismiss (×) button.
 * @param {string}   [props.className]
 * @param {React.ReactNode} props.children
 */
function Alert({ variant = "info", title, onDismiss, className, children, ...props }) {
    return (
        <div
            data-slot="alert"
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
        >
            {iconMap[variant]}

            <div className="flex-1 min-w-0">
                {title && (
                    <p className="mb-0.5 font-semibold leading-snug">{title}</p>
                )}
                <div className="leading-relaxed opacity-90">{children}</div>
            </div>

            {onDismiss && (
                <button
                    type="button"
                    onClick={onDismiss}
                    className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                    aria-label="Tutup"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}

export { Alert, alertVariants };
