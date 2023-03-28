import useCreateData from "hooks/useCreateData";
import React, { useState } from "react";
import { BranchesResponse, Collections } from "types/pocketbase-types";
import BranchForm from "./BranchForm";
import useUpdateData from "hooks/useUpdateData";

interface IBrachFormProps {
  isOpen: boolean;
  toggle: () => void;
  initialValues: BranchesResponse;
}

const EditBranchForm = ({ isOpen, toggle, initialValues }: IBrachFormProps) => {
  const [formData, setFormData] = useState({ name: initialValues.name });

  const handleFormSubmit = useUpdateData({
    Collections: Collections.Branches,
    id: initialValues.id,
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
      mode="edit"
    />
  );
};

export default EditBranchForm;
