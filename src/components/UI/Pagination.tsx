import React from "react";
import ReactPaginate from "react-paginate";

interface IPaginationProps {
  pageCount: number;
  currentCount: number;
  handlePageClick: ({ selected }: { selected: number }) => void;
  pageNumber: number;
  total: number;
  forcePage: number;
  className?: string;
}

const Pagination = ({
  pageCount,
  currentCount,
  handlePageClick,
  pageNumber,
  total,
  forcePage,
  className = "",
}: IPaginationProps) => {
  return (
    <div
      className={`w-full flex items-center justify-center md:justify-between overflow-x-auto overflow-y-hidden ${className}`}
    >
      <span className="font-medium hidden md:block text-sm text-gray-400">{`Showing ${
        pageNumber + 1
      } to ${currentCount} of ${total} entries`}</span>
      <ReactPaginate
        previousLabel={<span className="font-medium p-1.5">Prev</span>}
        nextLabel={<span className="font-medium p-1.5">Next</span>}
        pageCount={pageCount}
        forcePage={forcePage as number}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center items-center gap-2 text-sm"}
        previousLinkClassName="w-8 h-8"
        nextLinkClassName="w-8 h-8"
        disabledClassName="opacity-50 cursor-not-allowed"
        pageClassName="py-1.5 px-2.5 rounded"
        activeClassName="bg-primary-600 text-white"
      />
    </div>
  );
};

export default Pagination;
