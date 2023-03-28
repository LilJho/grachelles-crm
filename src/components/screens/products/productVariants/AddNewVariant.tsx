import Button from "@/components/UI/Buttons/Button";
import NumberField from "@/components/UI/Inputs/NumberField";
import TextField from "@/components/UI/Inputs/TextField";
import Modal from "@/components/UI/Modal/Modal";
import ComboBox from "@/components/UI/Selects/ComboBox";
import useCreateData from "hooks/useCreateData";
import React, { useState } from "react";
import { RiLoader5Line } from "react-icons/ri";
import { Collections } from "types/pocketbase-types";
import SelectField from "./../../../UI/Selects/SelectField";
interface IFormProps {
  isOpen: boolean;
  toggle: () => void;
}
const AddNewVariant = ({ isOpen, toggle }: IFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    size: "medium",
    type: "",
    price: "",
    sinkers: "",
    parent_name: "",
    category: "",
  });

  const handleChange = (key: any, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };
  console.log({ formData });

  const handleFormSubmit = useCreateData({
    Collections: Collections.ProductVariants,
    data: formData,
    toggle,
    setFormData,
    defaultValue: {
      name: "",
      branch: {
        id: "",
      },
      add_ons: [""],
    },
  });

  return (
    <Modal isOpen={isOpen} toggle={toggle} title="Add New Variant" closeButton>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit.mutate}>
        <TextField
          size="sm"
          label="Product Name"
          required
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <div className="flex items-center gap-4">
          <SelectField
            size="sm"
            label="Size"
            data={["small", "medium", "large", "regular"]}
            required
            value={formData.size}
            onChange={(e) => handleChange("size", e)}
          />
          <SelectField
            data={[
              "hot",
              "cold",
              "sandwich",
              "w/fries",
              "stick",
              "buns",
              "regular",
              "w/cheese",
              "red wine",
              "w/fries",
              "with cheese",
            ]}
            label="Type"
            size="sm"
            fullWidth
            value={formData.type as any}
            onChange={(e) => handleChange("type", e)}
            required
          />
        </div>
        <NumberField
          size="sm"
          required
          label="Price"
          value={formData.price}
          onChange={(e) => handleChange("price", Number(e))}
        />
        <SelectField
          size="sm"
          label="Sinkers"
          data={["pearl", "nata"]}
          value={formData.sinkers}
          onChange={(e) => handleChange("sinkers", e)}
        />
        <TextField
          size="sm"
          label="Category"
          required
          placeholder="eg. Milk Tea"
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
        />
        <TextField
          size="sm"
          label="Menu Name"
          placeholder="eg. Classic Series"
          required
          value={formData.parent_name}
          onChange={(e) => handleChange("parent_name", e.target.value)}
        />
        <div className="flex justify-between mt-4">
          <Button
            size="sm"
            color="gray"
            variant="light"
            onClick={handleFormSubmit.isLoading ? () => {} : toggle}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            type={handleFormSubmit.isLoading ? "button" : "submit"}
          >
            {handleFormSubmit.isLoading ? (
              <div className="w-12 flex justify-center">
                <RiLoader5Line className="animate-spin w-6 h-6" />
              </div>
            ) : (
              "Create New Variant"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNewVariant;
