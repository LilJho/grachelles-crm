import Button from "@/components/UI/Buttons/Button";
import DisplayContainer from "@/components/UI/DisplayContainer";
import Pagination from "@/components/UI/Pagination";
import Table, { TableColumn, TableRow } from "@/components/UI/Table/Table";
import useTableHook from "hooks/useTableHook";
import React from "react";
import { ICashierSalesProps } from "types/global-types";
import { CashierSalesRecord } from "types/pocketbase-types";

const CashierLogTable = ({ data, isLoading }: ICashierSalesProps) => {
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
    <>
      <DisplayContainer
        showCount={showCount}
        setShowCount={setShowCount}
        query={query}
        setQuery={setQuery}
        label="Cashier Sales Log"
      >
        <Table
          header={[
            "Employee Name",
            "Sales by Cashier",
            "Generated Sales by System",
            "Total Orders Amount",
          ]}
          data={currentItems}
          query={query}
          isLoading={isLoading}
        >
          {currentItems?.map((val) => {
            console.log(val.expand);
            return (
              <TableRow key={val.id}>
                <TableColumn className="capitalize">
                  {val.expand.user?.name}
                </TableColumn>
                <TableColumn className="capitalize">
                  {val.sales_by_cashier}
                </TableColumn>
                <TableColumn className="capitalize">
                  ₱ {val.sales_by_system?.toFixed(2)}
                </TableColumn>
                <TableColumn className="capitalize">
                  ₱ {val.total_orders_amount?.toFixed(2)}
                </TableColumn>

                <TableColumn>
                  <div className="flex items-center gap-4">
                    <Button
                      size="xs"
                      color="red"
                      //   onClick={() => handleGetDeleteData(val)}
                    >
                      Delete Order
                    </Button>
                  </div>
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
      {/* {showDelete && (
        <DeleteModal
          isOpen={showDelete}
          toggle={toggleDelete}
          deleteRecord={getData?.id as string}
          onClick={handleSubmitDeleteData.mutate}
          isLoading={handleSubmitDeleteData.isLoading}
        />
      )} */}
    </>
  );
};

export default CashierLogTable;
