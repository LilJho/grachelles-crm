import MainLayout from "@/components/layout/MainLayout";
import React, { useState } from "react";
import useFetchData from "hooks/useFetchData";
import { Collections } from "types/pocketbase-types";
import Modal from "@/components/UI/Modal/Modal";
import useToggle from "hooks/useToggle";
import AddProductCard from "@/components/screens/product/AddProductCard";
import DataList from "@/components/screens/product/DataList";

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
  const [showProductModal, toggleProductModal] = useToggle();

  const { data, isLoading } = useFetchData<Product>({
    collectionName: Collections.Products,
    expand: "category, branch",
  });

  return (
    <MainLayout>
      <DataList
        toggleProductModal={toggleProductModal}
        data={data}
        isLoading={isLoading}
      />
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
