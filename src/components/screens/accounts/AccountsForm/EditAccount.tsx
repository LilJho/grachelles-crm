import useCreateData from "hooks/useCreateData";
import useUpdateData from "hooks/useUpdateData";
import React, { useState } from "react";
import { Collections } from "types/pocketbase-types";
import AccountForm from "./AccountForm";

interface IBrachFormProps {
  isOpen: boolean;
  toggle: () => void;
  initialValues: any;
}

const EditAccount = ({ isOpen, toggle, initialValues }: IBrachFormProps) => {
  console.log(initialValues);
  const defaultValue = {
    name: initialValues.name,
    username: initialValues.username,
    email: initialValues.email,
    password: "",
    passwordConfirm: "",
    roles: initialValues.roles,
    branch: initialValues.branch,
    employee_data: initialValues.employee_data,
  };
  const [formData, setFormData] = useState(defaultValue);

  const handleFormSubmit = useUpdateData({
    Collections: Collections.Users,
    id: initialValues.id,
    data: formData,
    toggle,
    setFormData,
    defaultValue: defaultValue,
  });

  return (
    <AccountForm
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

export default EditAccount;
