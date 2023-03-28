import Button from "@/components/UI/Buttons/Button";
import TextField from "@/components/UI/Inputs/TextField";
import Modal from "@/components/UI/Modal/Modal";
import React from "react";
import { RiLoader5Line } from "react-icons/ri";

interface IBranchFormProps {
  isOpen: boolean;
  toggle: () => void;
  mode?: "add" | "edit";
  onSubmit: (val: any) => void;
  isLoading: boolean;
  formData: { name: string };
  setFormData: any;
}

const BranchForm = ({
  isOpen,
  toggle,
  mode = "add",
  onSubmit,
  isLoading,
  formData,
  setFormData,
}: IBranchFormProps) => {
  const handleFormChange = (val: any) => {
    setFormData({ name: val });
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
          label="Branch Name"
          required
          value={formData.name}
          onChange={(e) => handleFormChange(e.target.value)}
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

export default BranchForm;

const FormMode = {
  add: {
    title: "Add Branch",
    button: "Create New Branch",
  },
  edit: {
    title: "Update Branch Record",
    button: "Update Branch Record",
  },
};
