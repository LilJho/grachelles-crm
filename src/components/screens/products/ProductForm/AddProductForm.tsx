import useCreateData from "hooks/useCreateData";
import React, { useState } from "react";
import { Collections } from "types/pocketbase-types";
import ProductForm from "./ProductForm";

interface IFormProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddProductForm = ({ isOpen, toggle }: IFormProps) => {
  const defaultValue = {
    parent_name: "",
    product_type: "drink",
    category: {
      id: "",
      name: "",
    },
    branch: {
      id: "",
      name: "",
    },
    base_ingredient: [],
    product_variants: [],
  };

  const [formData, setFormData] = useState(defaultValue);
  console.log({
    ...formData,
    branch: formData.branch.id,
    category: formData.category.id,
  });

  const handleFormSubmit = useCreateData({
    Collections: Collections.Products,
    data: {
      ...formData,
      branch: formData.branch.id,
      category: formData.category.id,
    },
    toggle,
    setFormData,
    defaultValue,
  });

  return (
    <ProductForm
      isOpen={isOpen}
      toggle={toggle}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleFormSubmit.mutate}
      isLoading={handleFormSubmit.isLoading}
    />
  );
};

export default AddProductForm;
