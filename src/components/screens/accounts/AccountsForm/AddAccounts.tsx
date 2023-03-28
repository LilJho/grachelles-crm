import useCreateData from "hooks/useCreateData";
import React, { useState } from "react";
import { Collections } from "types/pocketbase-types";
import AccountForm from "./AccountForm";

interface IBrachFormProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddAccounts = ({ isOpen, toggle }: IBrachFormProps) => {
  const defaultValue = {
    username: "",
    email: "",
    emailVisibility: true,
    password: "",
    passwordConfirm: "",
    roles: [],
    branch: [],
    employee_data: "",
  };
  const [formData, setFormData] = useState(defaultValue);

  const handleFormSubmit = useCreateData({
    Collections: Collections.Users,
    data: formData,
    toggle,
    setFormData,
    defaultValue: {},
  });

  return (
    <AccountForm
      isOpen={isOpen}
      toggle={toggle}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleFormSubmit.mutate}
      isLoading={handleFormSubmit.isLoading}
    />
  );
};

export default AddAccounts;
