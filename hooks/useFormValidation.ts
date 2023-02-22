import { useState } from "react";

const useFormValidation = () => {
  const [formError, setFormError] = useState({});

  const validateField = (field: string, value: any) => {
    if (!value) {
      setFormError((prevState) => ({
        ...prevState,
        [field]: "This field is required",
      }));
    } else {
      setFormError((prevState) => ({
        ...prevState,
        [field]: "",
      }));
    }
  };

  return {
    formError,
    validateField,
    setFormError,
  };
};

export default useFormValidation;
