import DisplayContainer from "@/components/UI/DisplayContainer";
import Pagination from "@/components/UI/Pagination";
import Table, { TableColumn, TableRow } from "@/components/UI/Table/Table";
import useTableHook from "hooks/useTableHook";
import React from "react";
import { OrdersResponse } from "types/pocketbase-types";

interface IRecentTransaction {
  data: OrdersResponse[];
  isLoading: boolean;
}

const RecentTransactions = ({ data, isLoading }: IRecentTransaction) => {
  const {
    currentItems,
    pageCount,
    handlePageClick,
    pageNumber,
    dataLength,
    setShowCount,
    setQuery,
    showCount,
    query,
  } = useTableHook(data);

  return (
    <DisplayContainer
      showCount={showCount}
      setShowCount={setShowCount}
      query={query}
      setQuery={setQuery}
      label="Todays Transactions"
    >
      <Table
        header={[
          "Payment Method",
          "Service Method",
          "Total Drinks",
          "Total Foods",
          "Discount",
          "Delivery Fee",
          "Sub Total",
          "Total Amount",
          "Transaction Time",
        ]}
        data={currentItems}
        query={query}
        isLoading={isLoading}
      >
        {currentItems?.map((val: OrdersResponse) => {
          return (
            <TableRow key={val.id}>
              <TableColumn className="capitalize">
                {val.payment_method}
              </TableColumn>
              <TableColumn className="capitalize">
                {val.service_method}
              </TableColumn>
              <TableColumn className="capitalize">
                {val.total_drinks_count}
              </TableColumn>
              <TableColumn className="capitalize">
                {val.total_food_count}
              </TableColumn>
              <TableColumn className="capitalize">{val.discount}</TableColumn>
              <TableColumn className="capitalize">
                {val.delivery_fee}
              </TableColumn>
              <TableColumn className="capitalize">{val.sub_total}</TableColumn>
              <TableColumn className="capitalize">
                {val.total_amount}
              </TableColumn>
              <TableColumn className="capitalize">
                {val.transactionTime}
              </TableColumn>
            </TableRow>
          );
        })}
      </Table>
      <Pagination
        pageCount={pageCount}
        currentCount={showCount}
        pageNumber={pageNumber}
        handlePageClick={handlePageClick}
        total={dataLength}
        forcePage={pageNumber}
      />
    </DisplayContainer>
  );
};

export default RecentTransactions;
