import Button from "@/components/UI/Buttons/Button";
import DisplayContainer from "@/components/UI/DisplayContainer";
import Pagination from "@/components/UI/Pagination";
import Table, { TableColumn, TableRow } from "@/components/UI/Table/Table";
import useTableHook from "hooks/useTableHook";
import useToggle from "hooks/useToggle";
import React, { useState } from "react";
import { IExpandedStocksResponse, IInventoryProps } from "types/global-types";
import EditInventory from "./InventoryForm/EditInventory";
import { Collections } from "types/pocketbase-types";
import DeleteModal from "./../../UI/Modal/DeleteModal";
import useDeleteRecord from "hooks/useDeleteRecord";

const InventoryTable = ({ data, isLoading }: IInventoryProps) => {
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

  const [showEditForm, toggleEditForm] = useToggle();

  const {
    showDelete,
    toggleDelete,
    handleGetDeleteData,
    getData,
    setGetData,
    handleSubmitDeleteData,
  } = useDeleteRecord(Collections.Stocks);

  const handleGetData = (val: IExpandedStocksResponse) => {
    setGetData(val);
    toggleEditForm();
  };

  return (
    <>
      <DisplayContainer
        showCount={showCount}
        setShowCount={setShowCount}
        query={query}
        setQuery={setQuery}
        label="Inventory List"
      >
        <Table
          header={[
            "Name",
            "Quantity",
            "Measurement",
            "Type",
            "Branch",
            "Actions",
          ]}
          data={currentItems}
          query={query}
          isLoading={isLoading}
        >
          {currentItems?.map((val: IExpandedStocksResponse) => {
            return (
              <TableRow key={val.id}>
                <TableColumn>{val.name}</TableColumn>
                <TableColumn>{val.quantity}</TableColumn>
                <TableColumn>{val.measurement}</TableColumn>
                <TableColumn>{val.type}</TableColumn>
                <TableColumn>{val.expand.branch.name}</TableColumn>
                <TableColumn>
                  <div className="flex items-center gap-4">
                    <Button size="xs" onClick={() => handleGetData(val)}>
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      color="red"
                      onClick={() => handleGetDeleteData(val)}
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
      {showEditForm && (
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
      )}
    </>
  );
};

export default InventoryTable;
