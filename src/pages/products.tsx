import MainLayout from "@/components/layout/MainLayout";
import React, { useState } from "react";
import useFetchData from "hooks/useFetchData";
import {
  BranchesResponse,
  Collections,
  ProductsResponse,
} from "types/pocketbase-types";
import useToggle from "hooks/useToggle";
import PageTitle from "@/components/UI/PageTitle";
import SelectField from "@/components/UI/Selects/SelectField";
import ProductsTable from "@/components/screens/products/ProductsTable";
import { IExpandedProductResponse } from "types/global-types";
import Button from "@/components/UI/Buttons/Button";
import { HiPlus } from "react-icons/hi";
import AddProductForm from "@/components/screens/products/ProductForm/AddProductForm";
import useSelectBranch from "hooks/useSelectBranch";
import SelectBranch from "@/components/UI/SelectBranch";

const ProductsPage = () => {
  const { data: ProductsData, isLoading: ProductLoading } =
    useFetchData<ProductsResponse>({
      collectionName: Collections.Products,
      expand: "category, branch, product_variants",
    });

  const [showAddForm, toggleAddForm] = useToggle();

  const { filterData, selectBranch, setSelectBranch, BranchesData } =
    useSelectBranch();

  const filteredStockData = filterData(
    ProductsData,
    (item: { branch: string }) => item.branch === selectBranch?.id
  );
  return (
    <MainLayout>
      <PageTitle title="Products Record">
        <div className="flex items-center flex-1 max-w-sm gap-6">
          <SelectBranch
            data={BranchesData as BranchesResponse[]}
            selectBranch={selectBranch as BranchesResponse}
            onChange={(e) => setSelectBranch(e)}
          />
          <Button
            size="sm"
            color="blue"
            icon={<HiPlus />}
            onClick={toggleAddForm}
          >
            Add New Product
          </Button>
        </div>
      </PageTitle>
      <div className="mt-10">
        <ProductsTable
          data={filteredStockData as IExpandedProductResponse[]}
          isLoading={ProductLoading}
        />
      </div>
      {showAddForm && (
        <AddProductForm
          isOpen={showAddForm}
          toggle={toggleAddForm}
          currentBranch={selectBranch as BranchesResponse}
        />
      )}
    </MainLayout>
  );
};

export default ProductsPage;

//  <MainLayout>
//    <DataList
//      toggleProductModal={toggleProductModal}
//      data={data}
//      isLoading={isLoading}
//    />
//    {showProductModal && (
//      <Modal
//        isOpen={showProductModal}
//        toggle={toggleProductModal}
//        title={"Add New Product"}
//      >
//        <AddProductCard toggleProductModal={toggleProductModal} />
//      </Modal>
//    )}
//  </MainLayout>;
