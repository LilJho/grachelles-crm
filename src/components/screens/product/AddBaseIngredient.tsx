import Button from "@/components/UI/Button/Button";
import SelectTextField from "@/components/UI/SelectTextField";
import TextField from "@/components/UI/TextField";
import { FormEvent, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const AddBaseIngredient = ({
  baseIngredientData,
  setBaseIngredientData,
  productData,
  setProductData,
  toggleIngredientModal,
}: any) => {
  const handleChange = (index: any, key: string, value: string | number) => {
    let data = [...baseIngredientData];
    data[index][key] = value;
    setBaseIngredientData(data);
  };

  const handleSubmitIngredient = (e: FormEvent) => {
    e.preventDefault();
    console.log(baseIngredientData);
    // setProductData({ ...productData, baseIngredientData });
    toggleIngredientModal();
  };

  const addFields = () => {
    let newField = { ingredientName: "", quantity: "", stock: "" };
    setBaseIngredientData([...baseIngredientData, newField]);
  };

  const removeField = (index) => {
    let data = [...baseIngredientData];
    data.splice(index, 1);
    setBaseIngredientData(data);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmitIngredient}>
      {baseIngredientData.map((input, index) => {
        return (
          <div className="flex gap-4" key={index}>
            <SelectTextField
              onChange={(e) =>
                handleChange(index, "ingredientName", e.target.value)
              }
              onSelect={(e) => handleChange(index, "ingredientName", e)}
              value={input.ingredientName}
              label="Name of Ingredient"
              data={["straw", "cup", "milk powder"]}
              required={true}
              fullWidth={true}
            />
            <TextField
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
              value={input.quantity}
              label="Quantity"
              required={true}
            ></TextField>
            <SelectTextField
              onChange={(e) => handleChange(index, "stock", e.target.value)}
              onSelect={(e) => handleChange(index, "stock", e)}
              value={input.stock}
              label="Stock"
              required={true}
              data={["straw", "cup", "milk powder"]}
            />
            <div className="flex items-end">
              <Button
                icon={<AiOutlineDelete />}
                size="sm"
                color="red"
                onClick={() => removeField(index)}
              >
                {""}
              </Button>
            </div>
          </div>
        );
      })}
      <Button color="green" fullWidth={true} onClick={addFields}>
        Add more
      </Button>
      <div className="flex justify-end gap-4 mt-10">
        <Button color="blue" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default AddBaseIngredient;
