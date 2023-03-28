import Button from "@/components/UI/Buttons/Button";
import Label from "@/components/UI/Inputs/Label";
import SelectTextField from "@/components/UI/Inputs/SelectTextField";
import TextField from "@/components/UI/Inputs/TextField";
import Modal from "@/components/UI/Modal/Modal";
import TextRadioInput from "@/components/UI/Radio/TextRadioInput";
import SelectField from "@/components/UI/Selects/SelectField";
import React, { useState } from "react";
import useFetchData from "hooks/useFetchData";
import { ProductsResponse } from "types/pocketbase-types";
import { Collections } from "types/pocketbase-types";
import ComboBox from "@/components/UI/Selects/ComboBox";
import { HiPlus } from "react-icons/hi";
import useToggle from "hooks/useToggle";
import ChooseIngredients from "../../ingredients/ingredientForm/ChooseIngredients";
import { pb } from "lib/database/pocketbase";

const ProductForm = ({ isOpen, toggle, mode = "add", onSubmit = () => {} }) => {
  const [productData, setProductData] = useState({
    name: "",
    type: "",
    category: {
      id: "",
      name: "",
    },
    branch: {
      id: "",
      name: "",
    },
    baseIngredient: [],
  });

  const [showChooseForm, toggleChooseForm] = useToggle();

  const handleChange = (key, value) => {
    setProductData((prev) => ({ ...prev, [key]: value }));
  };

  const handleChangeNested = (key, value) => {
    setProductData({
      ...productData,
      [key]: {
        id: value.id,
        name: value.name,
      },
    });
  };

  const { data: CategoryData, isLoading: CategoryIsLoading } = useFetchData({
    collectionName: Collections.Categories,
  });
  const { data: Branches, isLoading: BranchesIsLoading } = useFetchData({
    collectionName: Collections.Branches,
  });

  if (CategoryIsLoading && BranchesIsLoading) {
    <h1>Loading...</h1>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      parent_name: productData.name,
      category: productData.category.id,
      branch: productData.branch.id,
      product_type: productData.type,
      base_ingredients: productData.baseIngredient,
    };

    const record = await pb.collection("products").create(data);
    toggle();
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      title={FormMode[mode].title}
      closeButton
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <ComboBox
          data={CategoryData}
          objKey={"name"}
          label="Category"
          size="sm"
          fullWidth
          value={productData.category}
          onChange={(value) => handleChangeNested("category", value)}
        />
        <TextField
          value={productData.name}
          label="Product Name"
          size="sm"
          fullWidth
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <div className="flex items-center justify-between">
          <TextRadioInput
            value={productData.type}
            label="Type"
            options={["drink", "food"]}
            size="sm"
            onChange={(e) => handleChange("type", e.target.value)}
          />
          <ComboBox
            data={Branches}
            objKey="name"
            label="Branch"
            size="sm"
            fullWidth
            value={productData.branch}
            onChange={(value) => handleChangeNested("branch", value)}
          />
        </div>
        <Button
          color="blue"
          icon={<HiPlus />}
          size="sm"
          className="mt-2"
          fullWidth
          onClick={toggleChooseForm}
        >
          Choose Base Ingredients
        </Button>
        <Button type="submit" size="sm" className="mt-2" fullWidth>
          Done
        </Button>
      </form>
      {showChooseForm && (
        <ChooseIngredients
          setProductData={setProductData}
          isOpen={showChooseForm}
          toggle={toggleChooseForm}
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
