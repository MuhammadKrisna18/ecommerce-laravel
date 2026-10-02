import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Switch({
    checked = false,
    onChange,
    disabled = false,
    id,
    name,
    'aria-label': ariaLabel,
    className,
    size = 'md',
    ...props
}) {
    const handleToggle = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };

    const isSmall = size === 'sm';

    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={ariaLabel}
            id={id}
            name={name}
            disabled={disabled}
            onClick={handleToggle}
            className={cn(
                'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
                isSmall ? 'h-5 w-9' : 'h-6 w-11',
                checked ? 'bg-brand-primary' : 'bg-slate-200',
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
            {...props}
        >
            <motion.span
                layout
                transition={{
                    type: 'spring',
                    stiffness: 700,
                    damping: 35,
                }}
                className={cn(
                    'pointer-events-none inline-block rounded-full bg-white shadow-md transform ring-0 transition duration-200 ease-in-out',
                    isSmall
                        ? cn('h-3.5 w-3.5 mt-[3px]', checked ? 'ml-[19px]' : 'ml-[3px]')
                        : cn('h-4 w-4 mt-[4px]', checked ? 'ml-[23px]' : 'ml-[4px]')
                )}
            />
        </button>
    );
}
