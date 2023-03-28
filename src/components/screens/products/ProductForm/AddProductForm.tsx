import React from "react";
import ProductForm from "./ProductForm";

interface IModal {
  isOpen: boolean;
  toggle: () => {};
}

const AddProductForm = ({ isOpen, toggle }: IModal) => {
  return <ProductForm isOpen={isOpen} toggle={toggle} />;
};

export default AddProductForm;
