import { cn } from "@/lib/utils";

/**
 * Skeleton — animated loading placeholder.
 *
 * Usage:
 *   <Skeleton className="h-4 w-48 rounded" />
 *   <Skeleton.Card />   // Pre-built card placeholder
 *   <Skeleton.Row  />   // Pre-built table-row placeholder
 *   <Skeleton.Text lines={3} />  // Multiple text lines
 */
function Skeleton({ className, ...props }) {
    return (
        <div
            data-slot="skeleton"
            className={cn(
                "animate-pulse rounded-md bg-zinc-800/60",
                className
            )}
            {...props}
        />
    );
}

/** Multiple lines of skeleton text */
Skeleton.Text = function SkeletonText({ lines = 2, className, ...props }) {
    return (
        <div className={cn("space-y-2", className)} {...props}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={cn("h-3", i === lines - 1 && lines > 1 ? "w-3/4" : "w-full")}
                />
            ))}
        </div>
    );
};

/** Card-shaped skeleton placeholder */
Skeleton.Card = function SkeletonCard({ className, ...props }) {
    return (
        <div
            className={cn(
                "rounded-xl border border-zinc-800/50 bg-zinc-900/40 p-5 space-y-4",
                className
            )}
            {...props}
        >
            {/* Icon + title row */}
            <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-3.5 w-1/2" />
                    <Skeleton className="h-3 w-1/3" />
                </div>
            </div>
            {/* Content lines */}
            <Skeleton.Text lines={3} />
        </div>
    );
};

/** Table-row skeleton placeholder */
Skeleton.Row = function SkeletonRow({ cols = 4, className, ...props }) {
    return (
        <tr className={cn("border-b border-zinc-800/40", className)} {...props}>
            {Array.from({ length: cols }).map((_, i) => (
                <td key={i} className="px-4 py-3">
                    <Skeleton className="h-3.5 w-full max-w-[120px]" />
                </td>
            ))}
        </tr>
    );
};

export { Skeleton };
