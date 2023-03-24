import Button from "../../UI/Buttons/Button";
import TextField from "../../UI/Inputs/TextField";
import { FormEventHandler, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import useFetchData from "hooks/useFetchData";
import { Collections } from "types/pocketbase-types";

interface IngredientsState {
  [key: string]: string | number;
  name: string;
  quantity: number;
}

const AddBaseIngredient = () => {
  const [ingredients, setIngredients] = useState<IngredientsState[]>([
    {
      name: "",
      quantity: 0,
    },
  ]);

  const handleChangeStock = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let data = [...ingredients];
    data[index][e.target.name] = e.target.value;
    setIngredients(data);
  };

  const addFields = () => {
    let newfield: IngredientsState = { name: "", quantity: 0 };
    setIngredients([...ingredients, newfield]);
  };

  const submit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log(ingredients);
  };

  const removeFields = (index: number) => {
    let data = [...ingredients];
    data.splice(index, 1);
    setIngredients(data);
  };

  return (
    <form className="flex flex-col w-full gap-4" onSubmit={submit}>
      {ingredients.map((input, index: number) => {
        return (
          <div className="flex justify-between w-full gap-2" key={index}>
            <TextField
              name="name"
              placeholder="Enter ingredients name..."
              value={input.name}
              onChange={(e) => handleChangeStock(index, e)}
              fullWidth={true}
            />

            <TextField
              name="quantity"
              placeholder="Enter quantity"
              onChange={(e) => handleChangeStock(index, e)}
              value={input.quantity}
              fullWidth={true}
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
        <Button color="blue" type="submit" onClick={() => submit}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default AddBaseIngredient;
