import { cn } from "@/lib/utils";
import { PackageSearch } from "lucide-react";

/**
 * EmptyState — shown when a list / table has no items.
 *
 * @param {React.ReactNode} [props.icon]          - Override default icon.
 * @param {string}          [props.title]         - Bold heading.
 * @param {string}          [props.description]   - Muted helper text.
 * @param {React.ReactNode} [props.action]        - CTA button / link node.
 * @param {string}          [props.className]
 */
function EmptyState({
    icon,
    title = "Tidak ada data",
    description,
    action,
    className,
    ...props
}) {
    return (
        <div
            data-slot="empty-state"
            className={cn(
                "flex flex-col items-center justify-center gap-4 py-16 px-4 text-center",
                className
            )}
            {...props}
        >
            {/* Icon bubble */}
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800/60 flex items-center justify-center text-zinc-600 shadow-inner">
                {icon ?? <PackageSearch className="w-7 h-7" />}
            </div>

            {/* Text */}
            <div className="space-y-1">
                <p className="text-base font-semibold text-zinc-300">{title}</p>
                {description && (
                    <p className="text-sm text-zinc-500 max-w-xs mx-auto leading-relaxed">
                        {description}
                    </p>
                )}
            </div>

            {/* Action slot */}
            {action && <div>{action}</div>}
        </div>
    );
}

export { EmptyState };
