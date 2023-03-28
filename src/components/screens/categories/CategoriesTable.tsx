import Button from "@/components/UI/Buttons/Button";
import DisplayContainer from "@/components/UI/DisplayContainer";
import DeleteModal from "@/components/UI/Modal/DeleteModal";
import Pagination from "@/components/UI/Pagination";
import Table, { TableColumn, TableRow } from "@/components/UI/Table/Table";
import useDeleteRecord from "hooks/useDeleteRecord";
import useTableHook from "hooks/useTableHook";
import React from "react";
import { Collections, CategoriesResponse } from "types/pocketbase-types";
import useToggle from "hooks/useToggle";
import EditBranchForm from "./CategoriesForm/EditBranchForm";

interface IStoreBranchProps {
  data: CategoriesResponse[];
  isLoading: boolean;
}

const CategoriesTable = ({ data, isLoading }: IStoreBranchProps) => {
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

  const [showEditForm, toggleEditForm] = useToggle();

  return (
    <>
      <DisplayContainer
        showCount={showCount}
        setShowCount={setShowCount}
        query={query}
        setQuery={setQuery}
        label="Category List"
      >
        <Table
          header={["Category", "Add Ons", "Branch", "Action"]}
          data={currentItems}
          query={query}
          isLoading={isLoading}
        >
          {currentItems?.map((val: any) => {
            return (
              <TableRow key={val.id}>
                <TableColumn>{val.name}</TableColumn>
                <TableColumn>
                  {val.expand.add_ons
                    ?.map((val: { name: string }) => val.name)
                    .join(", ")}
                </TableColumn>
                <TableColumn>{val.expand.branch.name}</TableColumn>
                <TableColumn>
                  <div className="flex items-center gap-4">
                    {/* <Button size="xs" onClick={() => handleGetData(val)}>
                      Edit
                    </Button> */}
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
        <EditBranchForm
          isOpen={showEditForm}
          toggle={toggleEditForm}
          initialValues={getData as any}
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

export default CategoriesTable;
