import Button from "@/components/UI/Buttons/Button";
import DisplayContainer from "@/components/UI/DisplayContainer";
import Pagination from "@/components/UI/Pagination";
import Table, { TableColumn, TableRow } from "@/components/UI/Table/Table";
import useTableHook from "hooks/useTableHook";
import useToggle from "hooks/useToggle";
import React, { useState } from "react";
import { IExpandedProductResponse, IProductProps } from "types/global-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "lib/database/pocketbase";
import {
  Collections,
  ProductsRecord,
  ProductVariantsRecord,
  ProductVariantsResponse,
} from "types/pocketbase-types";
import { toastError, toastSuccess } from "helper/showToast";
import DeleteModal from "../../UI/Modal/DeleteModal";
import { getUniqueValues } from "helper/getUniqueValues";

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

  const queryClient = useQueryClient();

  const [showEditForm, toggleEditForm] = useToggle();
  const [getData, setGetData] = useState<IExpandedProductResponse>();
  const [showDeleteStock, toggleDeleteStock] = useToggle();

  const handleGetData = (val: IExpandedProductResponse) => {
    setGetData(val);
    toggleEditForm();
  };

  const handleDeleteProduct = (val: IExpandedProductResponse) => {
    setGetData(val);
    toggleDeleteStock();
  };

  const handleSubmitDeleteProduct = useMutation(
    async () => {
      try {
        await pb.collection("products").delete(getData?.id as string);
      } catch (error) {}
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [Collections.Products],
        });
        toggleDeleteStock();
        toastSuccess("Product has been deleted!");
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
                <TableColumn>{val.expand.category.name}</TableColumn>
                <TableColumn>{val.parent_name}</TableColumn>
                <TableColumn>
                  <FlavorComponent
                    product_variants={val.expand.product_variants}
                  />
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
                      onClick={() => handleDeleteProduct(val)}
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
      {showDeleteStock && (
        <DeleteModal
          isOpen={showDeleteStock}
          toggle={toggleDeleteStock}
          deleteRecord={getData?.parent_name as string}
          onClick={handleSubmitDeleteProduct.mutate}
          isLoading={handleSubmitDeleteProduct.isLoading}
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
