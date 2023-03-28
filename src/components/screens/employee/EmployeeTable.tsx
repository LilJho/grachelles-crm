import Button from "@/components/UI/Buttons/Button";
import DisplayContainer from "@/components/UI/DisplayContainer";
import DeleteModal from "@/components/UI/Modal/DeleteModal";
import Pagination from "@/components/UI/Pagination";
import Table, { TableColumn, TableRow } from "@/components/UI/Table/Table";
import useDeleteProduct from "hooks/useDeleteRecord";
import useTableHook from "hooks/useTableHook";
import useToggle from "hooks/useToggle";
import React from "react";
import { Collections, EmployeeResponse } from "types/pocketbase-types";
import EditEmployee from "./EmployeeForm/EditEmployeeData";
import dayjs from "dayjs";

interface IEmployeeProps {
  data: EmployeeResponse[];
  isLoading: boolean;
}

const EmployeeTable = ({ data, isLoading }: IEmployeeProps) => {
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
  } = useDeleteProduct(Collections.Employee);

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
        label="Employee List"
      >
        <Table
          header={[
            "Employee Name",
            "Gender",
            "Birth Day",
            "Contact",
            "Address",
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
                <TableColumn>{val.gender}</TableColumn>
                <TableColumn>
                  {dayjs(val.birthday, "YYYY-MM-DD").format("MMM DD, YYYY")}
                </TableColumn>
                <TableColumn>{val.contact}</TableColumn>
                <TableColumn>{val.address}</TableColumn>
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
        <EditEmployee
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

export default EmployeeTable;
