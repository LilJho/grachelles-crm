import Button from "@/components/UI/Buttons/Button";
import DisplayContainer from "@/components/UI/DisplayContainer";
import DeleteModal from "@/components/UI/Modal/DeleteModal";
import Pagination from "@/components/UI/Pagination";
import Table, { TableColumn, TableRow } from "@/components/UI/Table/Table";
import useDeleteRecord from "hooks/useDeleteRecord";
import useTableHook from "hooks/useTableHook";
import React from "react";
import { BranchesResponse, Collections } from "types/pocketbase-types";

interface IStoreBranchProps {
  data: BranchesResponse[];
  isLoading: boolean;
}

const StoreBranchTable = ({ data, isLoading }: IStoreBranchProps) => {
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
    setGetData,
    handleSubmitDeleteData,
  } = useDeleteRecord(Collections.Branches);

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
          header={["Branch Name", "Actions"]}
          data={currentItems}
          query={query}
          isLoading={isLoading}
        >
          {currentItems?.map((val) => {
            return (
              <TableRow key={val.id}>
                <TableColumn>{val.name}</TableColumn>
                <TableColumn>
                  <div className="flex items-center gap-4">
                    <Button
                      size="xs"
                      //   onClick={() => handleGetDeleteData(val)}
                    >
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
      {/* {showEditForm && (
        <EditInventory
          isOpen={showEditForm}
          toggle={toggleEditForm}
          initialValue={getData as any}
        />
      )}*/}
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

export default StoreBranchTable;
