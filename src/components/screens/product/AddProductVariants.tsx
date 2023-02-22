import SelectTextField from "@/components/UI/SelectTextField";
import TextField from "@/components/UI/TextField";
import Button from "@/components/UI/Button/Button";
import { FormEvent, useState } from "react";
import Modal from "@/components/UI/Modal/Modal";
import AddBaseIngredient from "./AddBaseIngredient";

const AddProductVariants = ({
  showIngredientModal,
  toggleIngredientModal,
  productVariantData,
  setProductVariantData,
  productData,
  setProductData,
  toggleProductVarModal,
}: any) => {
  const handleChange = (key: string, value: string | number) => {
    setProductVariantData((prev: {}) => ({ ...prev, [key]: value }));
  };

  const handleSubmitProductVariant = (e: FormEvent) => {
    e.preventDefault();
    console.log(productVariantData);
    setProductVariantData((prev) => ({ ...prev, ingredients }));
    // setProductData({ ...productData, productVariantData });
    toggleProductVarModal();
  };

  const [ingredients, setIngredients] = useState([
    { ingredientName: "", quantity: "", stock: "" },
  ]);

  return (
    <div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmitProductVariant}
      >
        <div className="grid grid-cols-2 gap-4">
          <TextField
            value={productVariantData.variantName}
            label="Name"
            required={true}
            onChange={(e) => handleChange("variantName", e.target.value)}
          />
          <TextField
            value={productVariantData.size}
            label="Size"
            required={true}
            onChange={(e) => handleChange("size", e.target.value)}
          />
          <TextField
            value={productVariantData.type}
            label="Type"
            required={true}
            onChange={(e) => handleChange("type", e.target.value)}
          />
          <TextField
            value={productVariantData.price}
            label="Price"
            required={true}
            onChange={(e) => handleChange("price", e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center w-full">
          <p>Base Ingredient:</p>
          {ingredients && (
            <ul className="border rounded-sm max-w-[10rem] overflow-hidden">
              {ingredients.map((ingredient) => {
                return (
                  <li>
                    {ingredient.ingredientName}-{ingredient.quantity}
                  </li>
                );
              })}
            </ul>
          )}
          <div>
            <Button
              fullWidth={false}
              className="mt-2"
              onClick={toggleIngredientModal}
            >
              Add
            </Button>
          </div>
        </div>
        <SelectTextField
          onChange={(e) => handleChange("sinker", e.target.value)}
          onSelect={(e) => handleChange("sinker", e)}
          value={productVariantData.sinker}
          label="Sinkers"
          data={["straw", "cup", "milk powder"]}
          required={true}
          fullWidth={true}
        />
        <div className="flex justify-end gap-4 mt-10">
          <Button color="blue" type="submit">
            Save
          </Button>
        </div>
      </form>
      {showIngredientModal && (
        <Modal
          isOpen={showIngredientModal}
          toggle={toggleIngredientModal}
          title={<span>Add Base-Ingredients</span>}
          closeButton={true}
        >
          <AddBaseIngredient
            toggleIngredientModal={toggleIngredientModal}
            baseIngredientData={ingredients}
            setBaseIngredientData={setIngredients}
            productData={productData}
            setProductData={setProductData}
          />
        </Modal>
      )}
    </div>
  );
};

export default AddProductVariants;
