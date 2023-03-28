import useCreateData from "hooks/useCreateData";
import useUpdateData from "hooks/useUpdateData";
import React, { useState } from "react";
import { Collections } from "types/pocketbase-types";
import EmployeeForm from "./EmployeeForm";

interface IEmployeeFormProps {
  isOpen: boolean;
  toggle: () => void;
  initialValues: {
    id: string;
    name: string;
    gender: string;
    birthday: string;
    contact: string;
    address: string;
  };
}

const EditEmployee = ({
  isOpen,
  toggle,
  initialValues,
}: IEmployeeFormProps) => {
  const defaultValue = {
    name: initialValues.name,
    gender: initialValues.gender,
    birthday: initialValues.birthday,
    contact: initialValues.contact,
    address: initialValues.address,
  };

  const [formData, setFormData] = useState(defaultValue);

  const handleFormSubmit = useUpdateData({
    Collections: Collections.Employee,
    id: initialValues.id,
    data: formData,
    toggle,
    setFormData,
    defaultValue: defaultValue,
  });

  return (
    <EmployeeForm
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

export default EditEmployee;
