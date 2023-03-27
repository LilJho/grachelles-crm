import MainLayout from "@/components/layout/MainLayout";
import React, { useState } from "react";
import useFetchData from "hooks/useFetchData";
import {
  BranchesResponse,
  Collections,
  ProductsResponse,
} from "types/pocketbase-types";
import Modal from "@/components/UI/Modal/Modal";
import useToggle from "hooks/useToggle";
import AddProductCard from "@/components/screens/product/AddProductCard";
import DataList from "@/components/screens/product/DataList";
import PageTitle from "@/components/UI/PageTitle";
import SelectField from "@/components/UI/Selects/SelectField";
import ProductsTable from "@/components/screens/products/ProductsTable";
import { IExpandedProductResponse } from "types/global-types";
import Button from "@/components/UI/Buttons/Button";
import { HiPlus } from "react-icons/hi";
import AddProductForm from "@/components/screens/products/ProductForm/AddProductForm";

interface Product {
  id: number;
  parent_name: string;
  category: {};
  product_type: string;
  branch: {};
  expand: BranchCategory;
}

interface BranchCategory {
  branch: {
    name: string;
  };
  category: {
    name: string;
  };
}

const ProductsPage = () => {
  const { data: BranchData, isLoading: BranchLoading } =
    useFetchData<BranchesResponse>({
      collectionName: Collections.Branches,
    });
  const [selectBranch, setSelectBranch] = useState(BranchData?.[0]);

  const { data: ProductsData, isLoading: ProductLoading } =
    useFetchData<ProductsResponse>({
      collectionName: Collections.Products,
      expand: "category, branch, product_variants",
    });

  const [showAddForm, toggleAddForm] = useToggle();

  return (
    <MainLayout>
      <PageTitle title="Products Record">
        <div className="flex items-center max-w-sm gap-6 flex-1">
          <SelectField
            size="sm"
            fullWidth
            data={BranchData}
            objKey="name"
            value={selectBranch}
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
          data={ProductsData as IExpandedProductResponse[]}
          isLoading={ProductLoading}
        />
      </div>
      {showAddForm && (
        <AddProductForm isOpen={showAddForm} toggle={toggleAddForm} />
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
