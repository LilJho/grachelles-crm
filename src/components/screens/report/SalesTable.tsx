import Button from "@/components/UI/Buttons/Button";
import DisplayContainer from "@/components/UI/DisplayContainer";
import DeleteModal from "@/components/UI/Modal/DeleteModal";
import Pagination from "@/components/UI/Pagination";
import Table, { TableColumn, TableRow } from "@/components/UI/Table/Table";
import useDeleteRecord from "hooks/useDeleteRecord";
import useTableHook from "hooks/useTableHook";
import React from "react";
import { HiMinus } from "react-icons/hi";
import { IOrderProps } from "types/global-types";
import { Collections } from "types/pocketbase-types";

const SalesTable = ({ data, isLoading }: IOrderProps) => {
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
  } = useDeleteRecord(Collections.Orders);

  return (
    <>
      <DisplayContainer
        showCount={showCount}
        setShowCount={setShowCount}
        query={query}
        setQuery={setQuery}
        label="Orders List"
      >
        <Table
          header={[
            "Product Name",
            "Payment Method",
            "Service Method",
            "Delivery Fee",
            "Sub Total",
            "Total",
            "Action",
          ]}
          data={currentItems}
          query={query}
          isLoading={isLoading}
        >
          {currentItems?.map((val) => {
            const orderItems = val.expand.order_items;
            return (
              <TableRow key={val.id}>
                <TableColumn className="max-w-max">
                  <div className="flex items-center flex-wrap gap-1 max-w-max text-sm relative group">
                    {orderItems?.slice(0, 2).map((val) => (
                      <div
                        className="px-2 py-1.5 bg-gray-300 rounded-md max-w-max "
                        key={val.id}
                      >
                        {`${val.parent_name} ${val.name}`}
                      </div>
                    ))}
                    {orderItems.length > 2 && (
                      <span className="text-gray-400 font-semibold text-sm ml-1.5">
                        + {orderItems.length - 2} more
                      </span>
                    )}
                    {orderItems.length > 2 && (
                      <span className="flex flex-col gap-2 transition-transform absolute top-10 scale-0 rounded bg-gray-800 opacity-95 p-3 text-xs font-normal text-white group-hover:scale-100 z-50 max-w-2xl">
                        {orderItems.map((val) => (
                          <span
                            key={val.id}
                            className="flex items-center gap-1"
                          >
                            <HiMinus /> {`${val.parent_name} ${val.name}`}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </TableColumn>
                <TableColumn className="capitalize">
                  {val.payment_method}
                </TableColumn>
                <TableColumn className="capitalize">
                  {val.service_method}
                </TableColumn>
                <TableColumn className="capitalize">
                  ₱ {val.delivery_fee?.toFixed(2)}
                </TableColumn>
                <TableColumn className="capitalize">
                  ₱ {val.sub_total?.toFixed(2)}
                </TableColumn>
                <TableColumn className="capitalize">
                  ₱ {val.total_amount?.toFixed(2)}
                </TableColumn>
                <TableColumn>
                  <div className="flex items-center gap-4">
                    <Button
                      size="xs"
                      color="red"
                      onClick={() => handleGetDeleteData(val)}
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
      {showDelete && (
        <DeleteModal
          isOpen={showDelete}
          toggle={toggleDelete}
          deleteRecord={getData?.id as string}
          onClick={handleSubmitDeleteData.mutate}
          isLoading={handleSubmitDeleteData.isLoading}
        />
      )}
    </>
  );
};

export default SalesTable;
