import Button from "@/components/UI/Buttons/Button";
import DisplayContainer from "@/components/UI/DisplayContainer";
import Pagination from "@/components/UI/Pagination";
import Table, { TableColumn, TableRow } from "@/components/UI/Table/Table";
import useTableHook from "hooks/useTableHook";
import React from "react";
import { ExpensesResponse } from "types/pocketbase-types";

interface IExpensesTableProp {
  data: ExpensesResponse[];
  isLoading: boolean;
}

const ExpensesTable = ({ data, isLoading }: IExpensesTableProp) => {
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
        label="Expenses List"
      >
        <Table
          header={[
            "Product Name",
            "Quantity",
            "Price",
            "Total Price",
            "Actions",
          ]}
          data={currentItems}
          query={query}
          isLoading={isLoading}
        >
          {currentItems?.map((val) => {
            return (
              <TableRow key={val.id}>
                <TableColumn>{val.name}</TableColumn>
                <TableColumn>{val.quantity}</TableColumn>
                <TableColumn>₱ {val.price.toFixed(2)}</TableColumn>
                <TableColumn>₱ {val.total_price.toFixed(2)}</TableColumn>
                <TableColumn>
                  <div className="flex items-center gap-4">
                    <Button
                      size="xs"
                      color="red"
                      //   onClick={() => handleGetDeleteData(val)}
                    >
                      Delete
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
      {/* {showEditForm && (
        <EditInventory
          isOpen={showEditForm}
          toggle={toggleEditForm}
          initialValue={getData as any}
        />
      )}
      {showDelete && (
        <DeleteModal
          isOpen={showDelete}
          toggle={toggleDelete}
          deleteRecord={getData?.name as string}
          onClick={handleSubmitDeleteData.mutate}
          isLoading={handleSubmitDeleteData.isLoading}
        />
      )} */}
    </>
  );
};

export default ExpensesTable;
