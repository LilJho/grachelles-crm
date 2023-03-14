import MainLayout from "@/components/layout/MainLayout";
import React, { useState } from "react";
import useFetchData from "hooks/useFetchData";
import { Collections } from "types/pocketbase-types";
import Table, {
  TableColumn,
  TableHead,
  TableRow,
} from "@/components/UI/Table/Table";
import UnstyledButton from "@/components/UI/Buttons/UnstyledButton";
import Modal from "@/components/UI/Modal/Modal";
import useToggle from "hooks/useToggle";
import AddProductCard from "@/components/screens/product/AddProductCard";

interface BranchCategory {
  branch: {};
  category: {};
}

interface Product {
  id: number;
  parent_name: string;
  category: {};
  product_type: string;
  branch: {};
  expand: BranchCategory[];
}

const ProductsPage = () => {
  const { data, isLoading } = useFetchData<Product>({
    collectionName: Collections.Products,
    expand: "category, branch",
  });

  const [showProductModal, toggleProductModal] = useToggle();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <h1 className="text-6xl">PAKYO</h1>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="w-full p-4 bg-white border border-gray-500 rounded-xl">
        <div className="flex justify-between">
          <p>Products</p>
          <UnstyledButton
            className="p-4 bg-blue-300"
            onClick={toggleProductModal}
          >
            Add Product
          </UnstyledButton>
        </div>
        <Table
          header={
            <>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Product Type</TableHead>
              <TableHead>Branch</TableHead>
            </>
          }
        >
          {data?.map((product) => (
            <TableRow key={product.id}>
              <TableColumn>{product.parent_name}</TableColumn>
              <TableColumn>{product.expand.category.name}</TableColumn>
              <TableColumn>{product.product_type}</TableColumn>
              <TableColumn>{product.expand.branch.name}</TableColumn>
            </TableRow>
          ))}
        </Table>
      </div>
      {showProductModal && (
        <Modal
          isOpen={showProductModal}
          toggle={toggleProductModal}
          title={"Add New Product"}
        >
          <AddProductCard toggleProductModal={toggleProductModal} />
        </Modal>
      )}
    </MainLayout>
  );
};

export default ProductsPage;
