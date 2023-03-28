import Button from "@/components/UI/Buttons/Button";
import PasswordField from "@/components/UI/Inputs/PasswordField";
import TextField from "@/components/UI/Inputs/TextField";
import Modal from "@/components/UI/Modal/Modal";
import SelectField from "@/components/UI/Selects/SelectField";
import React from "react";
import { RiLoader5Line } from "react-icons/ri";
import { UsersRecord } from "types/pocketbase-types";

interface IAccountFormProps {
  isOpen: boolean;
  toggle: () => void;
  mode?: "add" | "edit";
  onSubmit: (val: any) => void;
  isLoading: boolean;
  formData: ExtendedUsersRecord;
  setFormData: any;
}

interface ExtendedUsersRecord extends UsersRecord {
  username: string;
  email: string;
  emailVisibility: boolean;
  password: string;
  passwordConfirm: string;
}

const AccountForm = ({
  isOpen,
  toggle,
  mode = "add",
  onSubmit,
  isLoading,
  formData,
  setFormData,
}: IAccountFormProps) => {
  const handleFormChange = (key: string, val: any) => {
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
          label="Username"
          required
          value={formData.username}
          onChange={(e) => handleFormChange("username", e.target.value)}
        />
        <TextField
          size="sm"
          label="Email"
          required
          value={formData.email}
          onChange={(e) => handleFormChange("email", e.target.value)}
        />
        <PasswordField
          size="sm"
          label="Password"
          required
          value={formData.password}
          onChange={(e) => handleFormChange("password", e.target.value)}
        />
        <PasswordField
          size="sm"
          label="Confirm Password"
          required
          value={formData.passwordConfirm}
          onChange={(e) => handleFormChange("passwordConfirm", e.target.value)}
        />
        <SelectField size="sm" label="Branch" />
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

export default AccountForm;

const FormMode = {
  add: {
    title: "Add New Account",
    button: "Create New Account",
  },
  edit: {
    title: "Update Account Details",
    button: "Update Account",
  },
};
