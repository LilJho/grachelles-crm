import useCreateData from "hooks/useCreateData";
import { useState } from "react";
import {
  BranchesRecord,
  BranchesResponse,
  Collections,
} from "types/pocketbase-types";
import ProductForm from "./ProductForm";

interface IFormProps {
  isOpen: boolean;
  toggle: () => void;
  currentBranch: BranchesResponse;
}

const AddProductForm = ({ isOpen, toggle, currentBranch }: IFormProps) => {
  const defaultValue = {
    parent_name: "",
    product_type: "drink",
    category: {
      id: "",
      name: "",
    },
    branch: currentBranch,
    base_ingredients: [],
    product_variants: [],
  };

  const [formData, setFormData] = useState(defaultValue);
  // console.log({
  //   ...formData,
  //   branch: formData.branch.id,
  //   category: formData.category.id,
  // });
  console.log(formData);

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
      currentBranch={currentBranch}
    />
  );
};

export default AddProductForm;
