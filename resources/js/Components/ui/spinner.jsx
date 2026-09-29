import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const spinnerVariants = cva(
    "animate-spin rounded-full border-2 border-current border-t-transparent",
    {
        variants: {
            size: {
                xs: "w-3 h-3",
                sm: "w-4 h-4",
                md: "w-6 h-6",
                lg: "w-8 h-8",
                xl: "w-12 h-12",
            },
            color: {
                default: "text-zinc-400",
                primary: "text-rose-400",
                white:   "text-white",
            },
        },
        defaultVariants: {
            size: "md",
            color: "primary",
        },
    }
);

/**
 * Spinner / loading indicator.
 *
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md']
 * @param {'default'|'primary'|'white'} [props.color='primary']
 * @param {string} [props.className]
 * @param {string} [props.label='Memuat...'] - sr-only text for accessibility.
 */
function Spinner({ size, color, className, label = "Memuat...", ...props }) {
    return (
        <span role="status" aria-label={label} className={cn("inline-flex", className)} {...props}>
            <span className={cn(spinnerVariants({ size, color }))} />
            <span className="sr-only">{label}</span>
        </span>
    );
}

/**
 * Full-area centered loading overlay. Drop inside any relative container.
 *
 * @param {string} [props.text] - Optional text shown below the spinner.
 */
function SpinnerOverlay({ text, className, ...props }) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-3 py-16 text-zinc-500",
                className
            )}
            {...props}
        >
            <Spinner size="lg" />
            {text && <p className="text-sm">{text}</p>}
        </div>
    );
}

export { Spinner, SpinnerOverlay, spinnerVariants };
