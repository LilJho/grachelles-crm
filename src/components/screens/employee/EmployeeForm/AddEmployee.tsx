import useCreateData from "hooks/useCreateData";
import React, { useState } from "react";
import { Collections } from "types/pocketbase-types";
import EmployeeForm from "./EmployeeForm";

interface IEmployeeFormProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddEmployee = ({ isOpen, toggle }: IEmployeeFormProps) => {
  const defaultValue = {
    name: "",
    gender: "Male",
    birthday: "",
    contact: "",
    address: "",
  };

  const [formData, setFormData] = useState(defaultValue);
  console.log({ formData });

  const handleFormSubmit = useCreateData({
    Collections: Collections.Employee,
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
    />
  );
};

export default AddEmployee;
