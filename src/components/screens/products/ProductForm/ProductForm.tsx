import Button from "@/components/UI/Buttons/Button";
import Label from "@/components/UI/Inputs/Label";
import SelectTextField from "@/components/UI/Inputs/SelectTextField";
import TextField from "@/components/UI/Inputs/TextField";
import Modal from "@/components/UI/Modal/Modal";
import TextRadioInput from "@/components/UI/Radio/TextRadioInput";
import SelectField from "@/components/UI/Selects/SelectField";
import React, { FormEvent, useState } from "react";
import useFetchData from "hooks/useFetchData";
import { BranchesResponse, ProductsResponse } from "types/pocketbase-types";
import { Collections } from "types/pocketbase-types";
import ComboBox from "@/components/UI/Selects/ComboBox";
import { HiPlus } from "react-icons/hi";
import useToggle from "hooks/useToggle";
import ChooseIngredients from "../ingredientForm/ChooseIngredients";
import ProductsVariantModal from "../productVariants/ProductsVariantModal";

interface IFormProps {
  isOpen: boolean;
  toggle: () => void;
  mode?: "add" | "edit";
  onSubmit: (val: any) => void;
  isLoading: boolean;
  formData: any;
  setFormData: any;
  currentBranch: BranchesResponse;
}

const ProductForm = ({
  isOpen,
  toggle,
  mode = "add",
  onSubmit = () => {},
  formData,
  setFormData,
  currentBranch,
}: IFormProps) => {
  const [showChooseForm, toggleChooseForm] = useToggle();

  const [showProductVar, toggleProductVar] = useToggle();

  const handleChange = (key: any, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const { data: CategoryData, isLoading: CategoryIsLoading } = useFetchData({
    collectionName: Collections.Categories,
    filter: `branch="${currentBranch.id}"`,
  });

  const { data: Branches, isLoading: BranchesIsLoading } = useFetchData({
    collectionName: Collections.Branches,
  });

  const { data: productsData } = useFetchData({
    collectionName: Collections.Products,
    expand: "category",
  });

  const [selectedRows, setSelectedRows] = useState([]);

  const getParentName = productsData
    ?.filter(
      (val: any) => val.expand.category?.name === formData.category?.name
    )
    .map((val: any) => val.parent_name)
    .sort();

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      title={FormMode[mode].title}
      closeButton
    >
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <ComboBox
          data={CategoryData as any}
          objKey={"name"}
          label="Category"
          size="sm"
          fullWidth
          value={formData.category}
          onChange={(e) => handleChange("category", e)}
          required
        />
        <SelectTextField
          value={formData.parent_name}
          label="Product Name"
          size="sm"
          fullWidth
          data={getParentName}
          onChange={(e) => handleChange("parent_name", e.target.value)}
          onSelect={(e) => handleChange("parent_name", e)}
          required
        />
        <div className="flex items-center justify-between">
          <TextRadioInput
            value={formData.product_type}
            label="Type"
            options={["drink", "food"]}
            size="sm"
            onChange={(e: any) => handleChange("product_type", e.target.value)}
          />
          <ComboBox
            data={Branches as any}
            objKey="name"
            label="Branch"
            size="sm"
            fullWidth
            value={formData.branch}
            onChange={(e) => handleChange("branch", e)}
            required
          />
        </div>
        <div className="flex flex-col p-3 text-sm border border-gray-300 rounded-md">
          <Label>Product Variants</Label>
          <div className="py-4 my-2 border-t border-b border-gray-300">
            <h6 className="font-semibold text-center text-gray-400">
              {formData?.product_variants.length ? (
                <span className="text-primary-500">
                  {formData?.product_variants.length} products has been selected
                </span>
              ) : (
                "No products selected"
              )}
            </h6>
          </div>
          <Button
            color="blue"
            icon={<HiPlus />}
            size="sm"
            fullWidth
            onClick={toggleProductVar}
          >
            Add Product Variant
          </Button>
        </div>
        {/* <Button
          color="blue"
          icon={<HiPlus />}
          size="sm"
          className="mt-2"
          fullWidth
          onClick={() => {}}
        >
          Choose Product Variants
        </Button> */}
        <Button type="submit" size="sm" className="mt-6" fullWidth>
          {FormMode[mode].button}
        </Button>
      </form>
      {showChooseForm && (
        <ChooseIngredients
          setProductData={setFormData}
          isOpen={showChooseForm}
          toggle={toggleChooseForm}
        />
      )}
      {showProductVar && (
        <ProductsVariantModal
          isOpen={showProductVar}
          toggle={toggleProductVar}
          setProductData={setFormData}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
        />
      )}
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
