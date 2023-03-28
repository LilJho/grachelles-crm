import Button from "@/components/UI/Buttons/Button";
import DisplayContainer from "@/components/UI/DisplayContainer";
import DeleteModal from "@/components/UI/Modal/DeleteModal";
import Pagination from "@/components/UI/Pagination";
import Table, { TableColumn, TableRow } from "@/components/UI/Table/Table";
import useDeleteRecord from "hooks/useDeleteRecord";
import useTableHook from "hooks/useTableHook";
import React from "react";
import { ICashierSalesProps } from "types/global-types";
import { CashierSalesRecord, Collections } from "types/pocketbase-types";

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

  const {
    showDelete,
    toggleDelete,
    handleGetDeleteData,
    getData,
    handleSubmitDeleteData,
  } = useDeleteRecord(Collections.CashierSales);

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
          {currentItems?.map((val: any) => {
            return (
              <TableRow key={val.id}>
                <TableColumn className="capitalize">
                  {val.expand.user.expand.employee_data?.name}
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
                      onClick={() => handleGetDeleteData(val)}
                    >
                      Delete Record
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
      {showDelete && (
        <DeleteModal
          isOpen={showDelete}
          toggle={toggleDelete}
          deleteRecord={
            getData.expand.user.expand.employee_data?.name as string
          }
          onClick={handleSubmitDeleteData.mutate}
          isLoading={handleSubmitDeleteData.isLoading}
        />
      )}
    </>
  );
};

export default CashierLogTable;
