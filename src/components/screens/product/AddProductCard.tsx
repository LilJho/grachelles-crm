import Button from "@/components/UI/Button/Button";
import UnstyledButton from "@/components/UI/Button/UnstyledButton";
import Modal from "@/components/UI/Modal/Modal";
import SelectTextField from "@/components/UI/SelectTextField";
import useToggle from "hooks/useToggle";
import AddBaseIngredient from "./AddBaseIngredient";
import AddProductVariants from "./AddProductVariants";
import { FormEvent, useEffect, useState } from "react";

const AddProductCard = () => {
  const [showIngredientModal, toggleIngredientModal] = useToggle();
  const [showProductVarModal, toggleProductVarModal] = useToggle();

  const [productData, setProductData] = useState({
    productName: "",
    category: "",
    productType: "",
    branch: "",
  });

  const [baseIngredientData, setBaseIngredientData] = useState([
    {
      ingredientName: "",
      quantity: "",
      stock: "",
    },
  ]);

  const [productVariantData, setProductVariantData] = useState({
    variantName: "",
    size: "",
    type: "",
    price: "",
    ingredients: [],
    sinker: "",
  });

  const handleChange = (key: string, value: string | number) => {
    setProductData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmitProduct = (e: FormEvent) => {
    e.preventDefault();
    console.log(baseIngredientData);
    setProductData((prev) => ({
      ...prev,
      baseIngredientData,
      productVariantData,
    }));
    console.log(productData);
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmitProduct}>
        <SelectTextField
          onChange={(e) => handleChange("productName", e.target.value)}
          onSelect={(e) => handleChange("productName", e)}
          value={productData.productName}
          label="Product Name"
          data={["pansit", "milktea", "cantnon"]}
          required={true}
          fullWidth={true}
        />
        <div className="flex justify-between">
          <SelectTextField
            onChange={(e) => handleChange("category", e.target.value)}
            onSelect={(e) => handleChange("category", e)}
            value={productData.category}
            label="Category"
            data={["Coffee", "Milktea"]}
            required={true}
            fullWidth={false}
          />
          <SelectTextField
            onChange={(e) => handleChange("productType", e.target.value)}
            onSelect={(e) => handleChange("productType", e)}
            value={productData.productType}
            label="Product Type"
            data={["Food", "Drink", "Appetizer"]}
            required={true}
            fullWidth={false}
          />
        </div>

        <SelectTextField
          onChange={(e) => handleChange("branch", e.target.value)}
          onSelect={(e) => handleChange("branch", e)}
          value={productData.branch}
          label="Branch"
          data={["Malvar", "Tiniguiban"]}
          required={true}
          fullWidth={true}
        />

        <div className="grid grid-cols-2">
          <div className="flex flex-col items-center w-full">
            <p>Base Ingredient:</p>
            {baseIngredientData && (
              <ul className="border rounded-sm max-w-[10rem] overflow-hidden">
                {baseIngredientData.map((ingredient) => {
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
          <div className="flex flex-col items-center w-full">
            <p>Product Variants</p>
            <div>
              <Button className="mt-2" onClick={toggleProductVarModal}>
                Add
              </Button>
            </div>
          </div>
        </div>

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
            baseIngredientData={baseIngredientData}
            setBaseIngredientData={setBaseIngredientData}
            productData={productData}
            setProductData={setProductData}
          />
        </Modal>
      )}
      {showProductVarModal && (
        <Modal
          isOpen={showProductVarModal}
          toggle={toggleProductVarModal}
          title={<span>Add Product Variants</span>}
          closeButton={true}
        >
          <AddProductVariants
            showIngredientModal={showIngredientModal}
            toggleIngredientModal={toggleIngredientModal}
            productVariantData={productVariantData}
            setProductVariantData={setProductVariantData}
            productData={productData}
            setProductData={setProductData}
            toggleProductVarModal={toggleProductVarModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default AddProductCard;
