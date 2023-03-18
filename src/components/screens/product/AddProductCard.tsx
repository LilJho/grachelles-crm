import Button from "@/components/UI/Buttons/Button";
import useToggle from "hooks/useToggle";
import Modal from "@/components/UI/Modal/Modal";
import TextField from "@/components/UI/Inputs/TextField";
import AddBaseIngredient from "./AddBaseIngredient";
import AddProductVariants from "./AddProductVariants";
import { FormEvent, useState } from "react";
import SelectField from "@/components/UI/SelectField";
import { pb } from "lib/database/pocketbase";

const AddProductCard = ({ toggleProductModal }: any) => {
  const [showIngredientModal, toggleIngredientModal] = useToggle();
  const [showProductVarModal, toggleProductVarModal] = useToggle();

  const [productData, setProductData] = useState({
    id: "",
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
    id: "",
    variantName: "",
    size: "",
    type: "",
    price: "",
    sinker: "",
  });

  const handleChange = (key: string, value: string | number) => {
    setProductData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmitProduct = async (e: FormEvent) => {
    e.preventDefault();
    console.log(productData);
    toggleProductModal();

    const data = {
      parent_name: productData.productName,
      category: productData.category,
      branch: productData.branch,
      product_type: productData.productType,
      base_ingredients: [baseIngredientData],
      product_variants: [productVariantData],
    };

    try {
      const record = await pb.collection("products").create(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmitProduct}>
        <TextField
          placeholder="Enter product name..."
          onChange={(e) => handleChange("productName", e.target.value)}
          value={productData.productName}
          label="Product Name"
          required={true}
          fullWidth={true}
        />
        <div className="flex justify-between gap-2">
          <SelectField
            onChange={(value) => handleChange("category", value)}
            value={productData.category}
            label="Category"
            data={["Coffee", "Milktea"]}
            required={true}
            fullWidth={true}
          />
          <SelectField
            onChange={(value) => handleChange("productType", value)}
            value={productData.productType}
            label="Product Type"
            data={["Food", "Drink", "Appetizer"]}
            required={true}
            fullWidth={true}
          />
          <SelectField
            onChange={(value) => handleChange("branch", value)}
            value={productData.branch}
            label="Branch"
            data={["Malvar", "Tiniguiban"]}
            required={true}
            fullWidth={true}
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col w-full">
            <p>Base Ingredient:</p>
            {baseIngredientData[0].ingredientName && (
              <ul className="border rounded-sm min-w-[10rem] overflow-hidden">
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
                color="green"
                fullWidth={false}
                className="mt-2"
                onClick={toggleIngredientModal}
              >
                Add
              </Button>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <p>Product Variants</p>
            <div>
              <Button
                color="green"
                className="mt-2"
                onClick={toggleProductVarModal}
              >
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
