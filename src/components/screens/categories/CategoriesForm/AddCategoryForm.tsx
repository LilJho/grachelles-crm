import useCreateData from "hooks/useCreateData";
import React, { useState } from "react";
import { BranchesResponse, Collections } from "types/pocketbase-types";
import CategoryForm from "./CategoryForm";
import BranchForm from "./CategoryForm";

interface IBrachFormProps {
  isOpen: boolean;
  toggle: () => void;
  currentBranch: BranchesResponse;
}

const AddCategoryForm = ({
  isOpen,
  toggle,
  currentBranch,
}: IBrachFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    branch: currentBranch,
    add_ons: [],
  });

  const handleFormSubmit = useCreateData({
    Collections: Collections.Categories,
    data: { ...formData, branch: (formData as any).branch.id },
    toggle,
    setFormData,
    defaultValue: {
      name: "",
      branch: {
        id: "",
      },
      add_ons: [""],
    },
  });

  return (
    <CategoryForm
      isOpen={isOpen}
      toggle={toggle}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleFormSubmit.mutate}
      isLoading={handleFormSubmit.isLoading}
    />
  );
};

export default AddCategoryForm;
