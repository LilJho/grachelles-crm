import Button from "@/components/UI/Buttons/Button";
import DisplayContainer from "@/components/UI/DisplayContainer";
import Pagination from "@/components/UI/Pagination";
import Table, { TableColumn, TableRow } from "@/components/UI/Table/Table";
import useTableHook from "hooks/useTableHook";
import useToggle from "hooks/useToggle";
import React, { useState } from "react";
import { IExpandedProductResponse, IProductProps } from "types/global-types";
import { Collections } from "types/pocketbase-types";
import DeleteModal from "../../UI/Modal/DeleteModal";
import { getUniqueValues } from "helper/getUniqueValues";
import useDeleteRecord from "hooks/useDeleteRecord";

const ProductsTable = ({ data, isLoading }: IProductProps) => {
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
  } = useDeleteRecord(Collections.Products);

  return (
    <>
      <DisplayContainer
        showCount={showCount}
        setShowCount={setShowCount}
        query={query}
        setQuery={setQuery}
        label="Products List"
      >
        <Table
          header={["Category", "Product Name", "Flavors", "Branch", "Actions"]}
          data={currentItems}
          query={query}
          isLoading={isLoading}
        >
          {currentItems?.map((val: IExpandedProductResponse) => {
            return (
              <TableRow key={val.id}>
                <TableColumn>{val.expand.category?.name}</TableColumn>
                <TableColumn>{val.parent_name}</TableColumn>
                <TableColumn>
                  <FlavorComponent
                    product_variants={val.expand.product_variants}
                  />
                </TableColumn>
                <TableColumn>{val.expand.branch?.name}</TableColumn>
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
      {/* {showEditForm && (
        <EditInventory
          isOpen={showEditForm}
          toggle={toggleEditForm}
          initialValue={getData as any}
        />
      )} */}
      {showDelete && (
        <DeleteModal
          isOpen={showDelete}
          toggle={toggleDelete}
          deleteRecord={getData?.parent_name as string}
          onClick={handleSubmitDeleteData.mutate}
          isLoading={handleSubmitDeleteData.isLoading}
        />
      )}
    </>
  );
};

export default ProductsTable;

const FlavorComponent = (product_variants: any = []) => {
  const uniqueFlavor = getUniqueValues(
    product_variants.product_variants,
    "name"
  );
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2">
        {uniqueFlavor
          .filter((val) => val !== "")
          .slice(0, 3)
          .map((val) => {
            return (
              <span
                key={val}
                className="text-xs p-1 bg-primary-100 text-primary-800 rounded-sm"
              >
                {val}
              </span>
            );
          })}
      </div>
      {uniqueFlavor.length > 3 && (
        <span className="text-gray-400 font-medium">
          + {uniqueFlavor.length - 3} more
        </span>
      )}
    </div>
  );
};
