import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide transition-colors',
    {
        variants: {
            variant: {
                default: 'border-zinc-700/50 bg-zinc-800/60 text-zinc-300',
                primary: 'border-rose-800/50 bg-rose-950/60 text-rose-300',
                success: 'border-emerald-800/50 bg-emerald-950/60 text-emerald-300',
                warning: 'border-amber-800/50 bg-amber-950/60 text-amber-300',
                danger: 'border-red-800/50 bg-red-950/60 text-red-300',
                outline: 'border-zinc-600 bg-transparent text-zinc-400',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

function Badge({ className, variant, children, ...props }) {
    return (
        <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props}>
            {children}
        </span>
    );
}

export { Badge, badgeVariants };
