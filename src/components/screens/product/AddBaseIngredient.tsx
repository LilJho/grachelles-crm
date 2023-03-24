import Button from "../../UI/Buttons/Button";
import SelectField from "@/components/UI/SelectField";
import TextField from "../../UI/Inputs/TextField";
import { FormEvent, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import useFetchData from "hooks/useFetchData";
import { Collections } from "types/pocketbase-types";
import ComboBox from "@/components/UI/ComboBox";

const initialIngredientsState = [
  {
    name: "",
    quantity: "",
  },
];

const useStocks = () => {
  const { data, isLoading } = useFetchData({
    collectionName: Collections.Stocks,
  });
  return { stocks: data, isLoading };
};

const AddBaseIngredient = () => {
  const { stocks, isLoading } = useStocks();

  const [ingredients, setIngredients] = useState(initialIngredientsState);

  const handleChangeStock = (index, e) => {
    let data = [...ingredients];
    data[index][e.target.name] = e.target.value;
    setIngredients(data);
  };

  const addFields = () => {
    let newfield = { name: "", age: "" };
    setIngredients([...ingredients, newfield]);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(ingredients);
  };

  const removeFields = (index) => {
    let data = [...ingredients];
    data.splice(index, 1);
    setIngredients(data);
  };

  return (
    <form className="flex flex-col w-full gap-4" onSubmit={submit}>
      {ingredients.map((input, index: number) => {
        return (
          <div className="flex justify-between w-full gap-2" key={index}>
            <input
              name="name"
              placeholder="Enter ingredients name..."
              value={input.name}
              onChange={(e) => handleChangeStock(index, e)}
            />

            <input
              name="quantity"
              placeholder="Enter quantity"
              onChange={(e) => handleChangeStock(index, e)}
              value={input.quantity}
              required={true}
              className="max-w-[20rem]"
            />
            <div className="flex items-end gap-2 ">
              <Button
                onClick={() => removeFields(index)}
                icon={<AiOutlineDelete />}
                size="sm"
                color="red"
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
        <Button color="blue" type="submit" onClick={submit}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default AddBaseIngredient;
