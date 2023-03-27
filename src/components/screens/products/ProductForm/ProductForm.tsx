import Button from "@/components/UI/Buttons/Button";
import Label from "@/components/UI/Inputs/Label";
import SelectTextField from "@/components/UI/Inputs/SelectTextField";
import TextField from "@/components/UI/Inputs/TextField";
import Modal from "@/components/UI/Modal/Modal";
import TextRadioInput from "@/components/UI/Radio/TextRadioInput";
import SelectField from "@/components/UI/Selects/SelectField";
import React from "react";

const ProductForm = ({ isOpen, toggle, mode = "add", onSubmit = () => {} }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      title={FormMode[mode].title}
      closeButton
    >
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <SelectField label="Category" size="sm" fullWidth />
        <TextField label="Product Name" size="sm" fullWidth />
        <div className="flex items-center justify-between">
          <TextRadioInput label="Type" options={["drink", "food"]} size="sm" />
          <SelectField label="Branch" size="sm" fullWidth />
        </div>
        <div>
          <Label>Product Variants</Label>
          <div>
            <div className="p-2 border rounded-md text-md">hello</div>
            <div className="p-2 border rounded-md text-md">hey</div>
            <div className="p-2 border rounded-md text-md">heldsalo</div>
            <div className="p-2 border rounded-md text-md">dsa</div>
          </div>
          <Button size="sm" className="mt-2" fullWidth>
            Choose Product Variant
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductForm;

const FormMode = {
  add: {
    title: "Add Product",
    button: "Add New Product",
  },
  edit: {
    title: "Update Product Record",
    button: "Update Product Record",
  },
};
