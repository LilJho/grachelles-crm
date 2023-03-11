import { useEffect, useState } from "react";

interface IProps<T> {
  data: T[];
  count?: number;
}

const usePaginate = <T>({ data, count = 10 }: IProps<T>) => {
  const dataLength = data.length;
  const [pageNumber, setPageNumber] = useState<number>(0);
  const itemPerPage = count;
  const pageVisited = pageNumber * itemPerPage;
  const displayItems = data.slice(pageVisited, pageVisited + itemPerPage);
  const [pageCount, setPageCount] = useState<number>(0);
  const handlePageClick = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    setPageNumber(0);
    setPageCount(0);
  }, [dataLength]);

  useEffect(() => {
    setPageCount(Math.ceil(dataLength / itemPerPage));
  }, [pageVisited, itemPerPage, dataLength]);

  return [
    displayItems,
    pageCount,
    handlePageClick,
    pageNumber,
    dataLength,
  ] as const;
};

export default usePaginate;
