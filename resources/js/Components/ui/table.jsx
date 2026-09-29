import { cn } from "@/lib/utils";

/**
 * Responsive data table with dark-theme styling.
 *
 * Anatomy:
 *   <Table>
 *     <TableHeader>
 *       <TableRow>
 *         <TableHead>Name</TableHead>
 *       </TableRow>
 *     </TableHeader>
 *     <TableBody>
 *       <TableRow>
 *         <TableCell>Value</TableCell>
 *       </TableRow>
 *     </TableBody>
 *   </Table>
 */

function Table({ className, ...props }) {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-zinc-800/60">
            <table
                data-slot="table"
                className={cn("w-full caption-bottom text-sm", className)}
                {...props}
            />
        </div>
    );
}

function TableHeader({ className, ...props }) {
    return (
        <thead
            data-slot="table-header"
            className={cn("bg-zinc-900/70 border-b border-zinc-800/60", className)}
            {...props}
        />
    );
}

function TableBody({ className, ...props }) {
    return (
        <tbody
            data-slot="table-body"
            className={cn(
                "divide-y divide-zinc-800/40 bg-zinc-950/40",
                className
            )}
            {...props}
        />
    );
}

function TableFooter({ className, ...props }) {
    return (
        <tfoot
            data-slot="table-footer"
            className={cn(
                "border-t border-zinc-800/60 bg-zinc-900/50 text-zinc-400",
                className
            )}
            {...props}
        />
    );
}

function TableRow({ className, ...props }) {
    return (
        <tr
            data-slot="table-row"
            className={cn(
                "transition-colors hover:bg-zinc-900/60 data-[selected=true]:bg-red-950/20",
                className
            )}
            {...props}
        />
    );
}

function TableHead({ className, ...props }) {
    return (
        <th
            data-slot="table-head"
            className={cn(
                "h-10 px-4 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500 whitespace-nowrap",
                className
            )}
            {...props}
        />
    );
}

function TableCell({ className, ...props }) {
    return (
        <td
            data-slot="table-cell"
            className={cn("px-4 py-3 text-zinc-300 align-middle", className)}
            {...props}
        />
    );
}

function TableCaption({ className, ...props }) {
    return (
        <caption
            data-slot="table-caption"
            className={cn("mt-3 text-sm text-zinc-500", className)}
            {...props}
        />
    );
}

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
};
