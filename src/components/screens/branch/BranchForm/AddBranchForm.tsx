import useCreateData from "hooks/useCreateData";
import React, { useState } from "react";
import { Collections } from "types/pocketbase-types";
import BranchForm from "./BranchForm";

interface IBrachFormProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddBranchForm = ({ isOpen, toggle }: IBrachFormProps) => {
  const [formData, setFormData] = useState({ name: "" });
  console.log(formData);
  const handleFormSubmit = useCreateData({
    Collections: Collections.Branches,
    data: formData,
    toggle,
    setFormData,
    defaultValue: { name: "" },
  });

  return (
    <BranchForm
      isOpen={isOpen}
      toggle={toggle}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleFormSubmit.mutate}
      isLoading={handleFormSubmit.isLoading}
    />
  );
};

export default AddBranchForm;
