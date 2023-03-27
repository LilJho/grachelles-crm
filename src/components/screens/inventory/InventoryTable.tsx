import Button from "@/components/UI/Buttons/Button";
import DisplayContainer from "@/components/UI/DisplayContainer";
import Pagination from "@/components/UI/Pagination";
import Table, { TableColumn, TableRow } from "@/components/UI/Table/Table";
import useTableHook from "hooks/useTableHook";
import useToggle from "hooks/useToggle";
import React, { useState } from "react";
import { IExpandedStocksResponse, IInventoryProps } from "types/global-types";
import AddInventory from "./InventoryForm/AddInventory";
import EditInventory from "./InventoryForm/EditInventory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "lib/database/pocketbase";
import { Collections } from "types/pocketbase-types";
import { toastError, toastSuccess } from "helper/showToast";
import DeleteModal from "./../../UI/Modal/DeleteModal";

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

  const queryClient = useQueryClient();

  const [showEditForm, toggleEditForm] = useToggle();
  const [getData, setGetData] = useState<IExpandedStocksResponse>();
  const [showDeleteStock, toggleDeleteStock] = useToggle();

  const handleGetData = (val: IExpandedStocksResponse) => {
    setGetData(val);
    toggleEditForm();
  };

  const handleDeleteStock = (val: IExpandedStocksResponse) => {
    setGetData(val);
    toggleDeleteStock();
  };

  const handleSubmitDeleteStock = useMutation(
    async () => {
      try {
        await pb.collection("stocks").delete(getData?.id as string);
      } catch (error) {}
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [Collections.Stocks],
        });
        toggleDeleteStock();
        toastSuccess("Stock has been deleted!");
      },
      onError: () => {
        toastError(
          "Something went wrong while processing your request. Please try again!"
        );
      },
    }
  );

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
                      onClick={() => handleDeleteStock(val)}
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
      {showDeleteStock && (
        <DeleteModal
          isOpen={showDeleteStock}
          toggle={toggleDeleteStock}
          deleteRecord={getData?.name as string}
          onClick={handleSubmitDeleteStock.mutate}
          isLoading={handleSubmitDeleteStock.isLoading}
        />
      )}
    </>
  );
};

export default InventoryTable;
