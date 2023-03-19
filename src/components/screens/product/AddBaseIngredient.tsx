import Button from "../../UI/Buttons/Button";
import SelectField from "@/components/UI/SelectField";
import TextField from "../../UI/Inputs/TextField";
import { FormEvent, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import useFetchData from "hooks/useFetchData";
import { Collections } from "types/pocketbase-types";
import ComboBox from "@/components/UI/ComboBox";

const AddBaseIngredient = ({
  baseIngredientData,
  setBaseIngredientData,
  productData,
  setProductData,
  toggleIngredientModal,
}: any) => {
  const handleChange = (index: number, key: string, value: string | number) => {
    let data = [...baseIngredientData];
    data[index][key] = value;
    setBaseIngredientData(data);
  };

  const handleSubmitIngredient = (e: FormEvent) => {
    e.preventDefault();
    console.log(baseIngredientData);
    setProductData({ ...productData, baseIngredientData });
    toggleIngredientModal();
  };

  const addFields = () => {
    let newField = { ingredientName: "", quantity: "", stock: "" };
    setBaseIngredientData([...baseIngredientData, newField]);
  };

  const removeField = (index: number) => {
    let data = [...baseIngredientData];
    data.splice(index, 1);
    setBaseIngredientData(data);
  };

  const { data: stocks, isLoading: stocksIsLoading } = useFetchData({
    collectionName: Collections.Stocks,
  });
  const [stock, setStock] = useState({});

  if (stocksIsLoading) {
    return <h1>Stock is Loading</h1>;
  }

  function handleChangeStock(selectedItem: any) {
    setStock({ id: selectedItem.id, name: selectedItem.name });
    console.log(stock);
  }

  return (
    <form
      className="flex flex-col w-full gap-4"
      onSubmit={handleSubmitIngredient}
    >
      {baseIngredientData.map((input, index: number) => {
        return (
          <div className="flex justify-between w-full gap-2" key={index}>
            <ComboBox
              data={stocks}
              fullWidth={true}
              objKey={"name"}
              label={"Select Ingredient"}
              value={stock}
              onChange={handleChangeStock}
            />

            <TextField
              placeholder="Enter quantity"
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
              value={input.quantity}
              label="Quantity"
              required={true}
              className="max-w-[20rem]"
            ></TextField>
            <div className="flex items-end gap-2 ">
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
      <Button color="green" onClick={addFields}>
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
