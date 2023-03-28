import Button from "@/components/UI/Buttons/Button";
import DisplayContainer from "@/components/UI/DisplayContainer";
import DeleteModal from "@/components/UI/Modal/DeleteModal";
import Pagination from "@/components/UI/Pagination";
import Table, { TableColumn, TableRow } from "@/components/UI/Table/Table";
import useDeleteRecord from "hooks/useDeleteRecord";
import useTableHook from "hooks/useTableHook";
import React from "react";
import {
  BranchesResponse,
  Collections,
  EmployeeResponse,
  UsersResponse,
} from "types/pocketbase-types";
import useToggle from "hooks/useToggle";
import { IAccounts } from "types/global-types";
import EditAccount from "./AccountsForm/EditAccount";

const AccountsTable = ({ data = [], isLoading = false }: IAccounts) => {
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
  const handleGetData = (val: any) => {
    toggleEditForm();
    setGetData(val);
  };

  return (
    <>
      <DisplayContainer
        showCount={showCount}
        setShowCount={setShowCount}
        query={query}
        setQuery={setQuery}
        label="Users Account List"
      >
        <Table
          header={["Username", "Email", "Name", "Roles", "Branch", "Actions"]}
          data={currentItems}
          query={query}
          isLoading={isLoading}
        >
          {currentItems?.map((val) => {
            return (
              <TableRow key={val.id}>
                <TableColumn>{val.username}</TableColumn>
                <TableColumn>{val.email}</TableColumn>
                <TableColumn>{val.name}</TableColumn>
                <TableColumn>
                  <div className="flex gap-1">
                    {val.roles.map((val) => (
                      <span
                        key={val}
                        className="text-xs p-1 bg-gray-200 text-gray-800 rounded-sm capitalize"
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                </TableColumn>
                <TableColumn>
                  {val.expand.branch.map((val) => val.name).join(", ")}
                </TableColumn>
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
        <EditAccount
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

export default AccountsTable;
