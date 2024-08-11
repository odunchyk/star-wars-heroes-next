/* eslint-disable react/prop-types */
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

function Pagination({ totalItems, itemsPerPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return;
  }

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pageNums = [...Array(totalPages).keys()];

  return (
    <div className="flex justify-center items-center gap-[8px]">
      <Link href={createPageURL(currentPage - 1)}>
        <button
          className={`rounded-[4px] px-[12px] py-[6px] cursor-pointer transition-colors duration-300 ${
            currentPage <= 1
              ? "cursor-not-allowed bg-[#e0e0e0] text-[#333] border-[#d0d0d0]"
              : "bg-[#333] text-[#fff] border-[#333] hover:bg-white hover:text-[#333] hover:border-[#bbb]"
          }`}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
      </Link>
      {pageNums.map((page) => (
        <Link key={page + 1} href={createPageURL(page + 1)}>
          <button
            className={`rounded-[4px] px-[12px] py-[6px] cursor-pointer transition-colors duration-300 ${
              currentPage === page + 1
                ? "bg-[#007bff] border-[#0056b3] text-white"
                : "bg-[#333] text-white hover:bg-white hover:text-[#333] hover:border-[#bbb]"
            }`}
          >
            {page + 1}
          </button>
        </Link>
      ))}
      <Link href={createPageURL(currentPage + 1)}>
        <button
          className={`rounded-[4px] px-[12px] py-[6px] cursor-pointer transition-colors duration-300 ${
            currentPage >= totalPages
              ? "cursor-not-allowed bg-[#e0e0e0] text-[#333] border-[#d0d0d0]"
              : "bg-[#333] text-[#fff] border-[#333] hover:bg-white hover:text-[#333] hover:border-[#bbb]"
          }`}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </Link>
    </div>
  );
}

export default Pagination;
