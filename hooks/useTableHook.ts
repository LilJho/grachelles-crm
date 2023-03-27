import { searchFilter } from "helper/searchFilter";
import useDebounce from "hooks/useDebounce";
import usePaginate from "hooks/usePaginate";
import React, { useState } from "react";

const useTableHook = <T>(data: T[]) => {
  const [showCount, setShowCount] = useState(20);
  const [query, setQuery] = useState("");
  const debouncedValue = useDebounce<string>(query, 500);

  const [currentItems, pageCount, handlePageClick, pageNumber, dataLength] =
    usePaginate({
      data: searchFilter(data, debouncedValue),
      count: showCount,
    });

  return {
    currentItems,
    pageCount,
    handlePageClick,
    pageNumber,
    dataLength,
    setShowCount,
    setQuery,
    showCount,
    query,
  } as const;
};

export default useTableHook;
