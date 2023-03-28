import DisplayContainer from "@/components/UI/DisplayContainer";
import Pagination from "@/components/UI/Pagination";
import Table, { TableColumn, TableRow } from "@/components/UI/Table/Table";
import useTableHook from "hooks/useTableHook";
import React from "react";
import { IExpandedRecent, IRecentTransaction } from "types/global-types";
import { OrderItemsResponse, OrdersResponse } from "types/pocketbase-types";

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

  const getOnlyName = (order_items: OrderItemsResponse[]) => {
    const parentNameCounts = order_items
      .flatMap((x) => x.parent_name)
      .reduce((acc: any, name) => {
        if (!acc[name]) {
          acc[name] = 1;
        } else {
          acc[name]++;
        }
        return acc;
      }, {});
    const entries = Object.entries(parentNameCounts);
    return entries;
  };

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
          "Product",
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
        {currentItems?.map((val: IExpandedRecent) => {
          return (
            <TableRow key={val.id}>
              <TableColumn className="capitalize">
                {getOnlyName(val.expand.order_items)
                  .map(([key, value]) => {
                    return `${key} x${value}`;
                  })
                  .join(", ")}
              </TableColumn>
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
                ₱ {val.delivery_fee?.toFixed(2)}
              </TableColumn>
              <TableColumn className="capitalize">
                ₱ {val.sub_total?.toFixed(2)}
              </TableColumn>
              <TableColumn className="capitalize">
                ₱ {val.total_amount?.toFixed(2)}
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
