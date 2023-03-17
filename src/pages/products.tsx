import MainLayout from "@/components/layout/MainLayout";
import React, { useState } from "react";

import Modal from "@/components/UI/Modal/Modal";
import useToggle from "hooks/useToggle";
import AddProductCard from "@/components/screens/product/AddProductCard";
import DataList from "@/components/screens/product/DataList";

const ProductsPage = () => {
  const [showProductModal, toggleProductModal] = useToggle();

  return (
    <MainLayout>
      <DataList toggleProductModal={toggleProductModal} />
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
