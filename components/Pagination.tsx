"use client";
import { ITEM_PER_PAGE } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const Pagination = ({ initialPage, count }: { initialPage: number; count: number }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const totalPages = Math.ceil(count / ITEM_PER_PAGE);

    const [currentPage, setCurrentPage] = useState(initialPage);

    const switchPage = (p: number) => {
        setCurrentPage(p);  
        const updatedSearchParams = new URLSearchParams(window.location.search);
        updatedSearchParams.set("page", p.toString());
        router.push(`${window.location.pathname}?${updatedSearchParams}`);
    };

    useEffect(() => {
        const pageParam = searchParams.get("page");
        if (pageParam) {
            setCurrentPage(Number(pageParam));
        }
    }, [searchParams]);

    return (
        <div className="p-4 flex items-center justify-between text-gray-500">
            <button
                disabled={currentPage <= 1}
                onClick={() => switchPage(currentPage - 1)}
                className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Prev
            </button>
            <div className="flex items-center gap-2 text-sm">
                {Array.from({ length: totalPages }, (_, index) => {
                    const pageIndex = index + 1;
                    return (
                        <button
                            className={`py-2 px-4 rounded-md ${currentPage === pageIndex ? "bg-Sky" : ""} 
                            text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed`}
                            key={index}
                            onClick={() => switchPage(pageIndex)}
                        >
                            {pageIndex}
                        </button>
                    );
                })}
            </div>
            <button
                disabled={currentPage >= totalPages}
                onClick={() => switchPage(currentPage + 1)}
                className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
