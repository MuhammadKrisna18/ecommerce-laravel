import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

/**
 * Pagination component.
 *
 * Works out of the box with Inertia.js Link-based pagination data from Laravel.
 *
 * Simple usage (page numbers only):
 *   <Pagination
 *     currentPage={meta.current_page}
 *     lastPage={meta.last_page}
 *     onPageChange={(page) => router.get(url, { page })}
 *   />
 *
 * @param {number}   props.currentPage
 * @param {number}   props.lastPage
 * @param {Function} props.onPageChange   - Called with the new page number.
 * @param {number}   [props.siblingCount=1] - Pages shown each side of current.
 * @param {string}   [props.className]
 */
function Pagination({
    currentPage,
    lastPage,
    onPageChange,
    siblingCount = 1,
    className,
}) {
    if (lastPage <= 1) return null;

    const range = (start, end) =>
        Array.from({ length: end - start + 1 }, (_, i) => start + i);

    // Build page list with ellipsis markers
    const buildPages = () => {
        const totalNums = siblingCount * 2 + 5; // siblings + 2 edges + 2 ellipsis + current
        if (lastPage <= totalNums) return range(1, lastPage);

        const leftSibling  = Math.max(currentPage - siblingCount, 1);
        const rightSibling = Math.min(currentPage + siblingCount, lastPage);

        const showLeft  = leftSibling  > 2;
        const showRight = rightSibling < lastPage - 1;

        if (!showLeft && showRight) {
            return [...range(1, 3 + siblingCount * 2), "…", lastPage];
        }
        if (showLeft && !showRight) {
            return [1, "…", ...range(lastPage - (3 + siblingCount * 2) + 1, lastPage)];
        }
        return [1, "…", ...range(leftSibling, rightSibling), "…", lastPage];
    };

    const pages = buildPages();

    const pageBtn = (page, label, disabled) => (
        <button
            key={label ?? page}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
                "h-8 min-w-8 px-2 inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
                "disabled:pointer-events-none disabled:opacity-40",
                page === currentPage
                    ? "bg-gradient-to-br from-red-900/70 to-rose-950/50 border border-red-700/40 text-white shadow-[0_0_10px_rgba(153,27,27,0.2)]"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-transparent"
            )}
        >
            {label ?? page}
        </button>
    );

    return (
        <nav
            role="navigation"
            aria-label="Pagination"
            className={cn("flex items-center gap-1", className)}
        >
            {/* First page */}
            {pageBtn(1, <ChevronsLeft className="w-4 h-4" />, currentPage === 1)}

            {/* Previous page */}
            {pageBtn(currentPage - 1, <ChevronLeft className="w-4 h-4" />, currentPage === 1)}

            {/* Page numbers */}
            {pages.map((p, i) =>
                p === "…" ? (
                    <span key={`ellipsis-${i}`} className="px-1 text-zinc-600 text-sm select-none">
                        …
                    </span>
                ) : (
                    pageBtn(p, undefined, false)
                )
            )}

            {/* Next page */}
            {pageBtn(currentPage + 1, <ChevronRight className="w-4 h-4" />, currentPage === lastPage)}

            {/* Last page */}
            {pageBtn(lastPage, <ChevronsRight className="w-4 h-4" />, currentPage === lastPage)}
        </nav>
    );
}

export { Pagination };
