import React from "react";
import ProductForm from "./ProductForm";

const AddProductForm = ({ isOpen, toggle }) => {
  return <ProductForm isOpen={isOpen} toggle={toggle} />;
};

export default AddProductForm;
