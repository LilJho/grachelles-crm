import Button from "@/components/UI/Buttons/Button";
import Label from "@/components/UI/Inputs/Label";
import TextField from "@/components/UI/Inputs/TextField";
import Modal from "@/components/UI/Modal/Modal";
import ComboBox from "@/components/UI/Selects/ComboBox";
import useFetchData from "hooks/useFetchData";
import useToggle from "hooks/useToggle";
import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { RiLoader5Line } from "react-icons/ri";
import { Collections } from "types/pocketbase-types";
import AddOnsModal from "./AddOnsModal";

interface IBranchFormProps {
  isOpen: boolean;
  toggle: () => void;
  mode?: "add" | "edit";
  onSubmit: (val: any) => void;
  isLoading: boolean;
  formData: any;
  setFormData: any;
}

const CategoryForm = ({
  isOpen,
  toggle,
  mode = "add",
  onSubmit,
  isLoading,
  formData,
  setFormData,
}: IBranchFormProps) => {
  const handleFormChange = (key: any, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const [showAddOns, toggleAddOns] = useToggle();

  const { data: Branches, isLoading: BranchesIsLoading } = useFetchData({
    collectionName: Collections.Branches,
  });

  const [selectedRows, setSelectedRows] = useState([]);

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
          label="Category Name"
          value={formData.name}
          onChange={(e) => handleFormChange("name", e.target.value)}
        />
        <ComboBox
          data={Branches as any}
          objKey="name"
          label="Branch"
          size="sm"
          fullWidth
          value={formData.branch}
          onChange={(e: any) => handleFormChange("branch", e)}
        />
        <div className="flex flex-col p-3 border border-gray-300 rounded-md text-sm">
          <Label>Add Ons</Label>
          <div className="py-4 my-2 border-t border-b border-gray-300">
            <h6 className="text-gray-400 font-semibold text-center">
              {formData?.add_ons.length ? (
                <span className="text-primary-500">
                  {formData?.add_ons.length} add ons has been selected
                </span>
              ) : (
                "No add ons selected"
              )}
            </h6>
          </div>
          <Button
            color="blue"
            icon={<HiPlus />}
            size="sm"
            fullWidth
            onClick={toggleAddOns}
          >
            Add Product Variant
          </Button>
        </div>
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
      {showAddOns && (
        <AddOnsModal
          isOpen={showAddOns}
          toggle={toggleAddOns}
          setData={setFormData}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
        />
      )}
    </Modal>
  );
};

export default CategoryForm;

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
