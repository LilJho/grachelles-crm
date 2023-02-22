import React, { FC } from "react";
import ReactPaginate from "react-paginate";

interface IPaginationProps {
  pageCount: number;
  currentCount: number;
  handlePageClick: (data: { selected: number }) => void;
  pageNumber: number;
  total: number;
  forcePage?: number;
  className?: string;
  showEntries?: boolean;
}

const Pagination: FC<IPaginationProps> = ({
  pageCount,
  currentCount,
  handlePageClick,
  pageNumber,
  total,
  forcePage,
  className = "",
  showEntries = false,
}) => {
  return (
    <div
      className={`w-full flex items-center ${
        showEntries ? "justify-between" : "justify-end"
      } overflow-x-auto overflow-y-hidden ${className}`}
    >
      {showEntries && (
        <span className="font-medium text-sm text-gray-400">{`Showing ${
          pageNumber + 1
        } to ${currentCount} of ${total} entries`}</span>
      )}

      <ReactPaginate
        previousLabel={<span className="font-medium p-1.5">Prev</span>}
        nextLabel={<span className="font-medium p-1.5">Next</span>}
        pageCount={pageCount}
        forcePage={forcePage}
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
