import Button from "@/components/UI/Buttons/Button";
import DateField from "@/components/UI/Inputs/DateField";
import DateFilterField from "@/components/UI/Inputs/DateFilterField";
import NumberField from "@/components/UI/Inputs/NumberField";
import TextField from "@/components/UI/Inputs/TextField";
import Modal from "@/components/UI/Modal/Modal";
import TextRadioInput from "@/components/UI/Radio/TextRadioInput";
import dayjs from "dayjs";
import React, { FormEvent } from "react";
import { RiLoader5Line } from "react-icons/ri";

interface IEmployeeFormProps {
  isOpen: boolean;
  toggle: () => void;
  mode?: "add" | "edit";
  onSubmit: (val: any) => void;
  isLoading: boolean;
  formData: {
    name: string;
    gender: string;
    birthday: string;
    contact: string;
    address: string;
  };
  setFormData: any;
}

const EmployeeForm = ({
  isOpen,
  toggle,
  mode = "add",
  onSubmit,
  isLoading,
  formData,
  setFormData,
}: IEmployeeFormProps) => {
  const handleFormChange = (
    key: string,
    val: string | number | FormEvent | any
  ) => {
    setFormData((prev: any) => ({ ...prev, [key]: val }));
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      title={FormMode[mode].title}
      closeButton
    >
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <TextField
          size="sm"
          label="Employee Name"
          required
          value={formData.name}
          onChange={(e) => handleFormChange("name", e.target.value)}
        />
        <TextRadioInput
          label="Gender"
          options={["Male", "Female"]}
          value={formData.gender}
          onChange={(e: { target: { value: string | number } }) =>
            handleFormChange("gender", e.target.value)
          }
          size="sm"
        />
        <DateField
          label="BirthDay"
          value={dayjs(formData.birthday, "YYYY-MM-DD").format("YYYY-MM-DD")}
          onChange={(e) => handleFormChange("birthday", e.target.value)}
          size="sm"
        />
        <NumberField
          label="PhoneNumber"
          format="0000-0000-000"
          value={formData.contact}
          onChange={(e) => handleFormChange("contact", e)}
          size="sm"
          leftIcon="+63"
        />
        <TextField
          label="Address"
          value={formData.address}
          onChange={(e) => handleFormChange("address", e.target.value)}
          size="sm"
        />
        <div className="flex justify-between mt-4">
          <Button
            size="sm"
            color="gray"
            variant="light"
            onClick={isLoading ? () => {} : toggle}
          >
            Cancel
          </Button>
          <Button size="sm" type={isLoading ? "button" : "submit"}>
            {isLoading ? (
              <div className="w-12 flex justify-center">
                <RiLoader5Line className="animate-spin w-6 h-6" />
              </div>
            ) : (
              <>{FormMode[mode].button}</>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EmployeeForm;

const FormMode = {
  add: {
    title: "Add New Employee",
    button: "Add New Employee",
  },
  edit: {
    title: "Update Employee Record",
    button: "Update Employee Record",
  },
};
