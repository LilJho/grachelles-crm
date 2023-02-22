import { useEffect, useState } from "react";

interface IProps<T> {
  data: T[] | any;
  count?: number;
}

const usePaginate = <T extends {}>({ data = [], count = 10 }: IProps<T>) => {
  const dataLength = data?.length;
  const [pageNumber, setPageNumber] = useState(0);
  const itemPerPage = count;
  const pageVisited = pageNumber * itemPerPage;
  const displayItems = data?.slice(pageVisited, pageVisited + itemPerPage);
  const [pageCount, setPageCount] = useState(0);
  const handlePageClick = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };
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
