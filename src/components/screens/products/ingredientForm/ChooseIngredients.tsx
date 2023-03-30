import React, { FormEvent, useState } from "react";
import useFetchData from "hooks/useFetchData";
import { Collections } from "types/pocketbase-types";
import Modal from "@/components/UI/Modal/Modal";
import ComboBox from "@/components/UI/Selects/ComboBox";
import TextField from "@/components/UI/Inputs/TextField";
import Button from "@/components/UI/Buttons/Button";
import { FaRegTrashAlt } from "react-icons/fa";
import { pb } from "lib/database/pocketbase";
import { ChangeEvent } from "react";

interface ProductData {
  name: string;
  type: string;
  category: {
    id: string;
    name: string;
  };
  branch: {
    id: string;
    name: string;
  };
  baseIngredient: number[];
  productVariant: string;
}

interface IModal {
  setProductData: (prev: ProductData) => void;
  isOpen: boolean;
  toggle: () => void;
}

interface Stock {
  id: string;
  name: string;
}

interface BaseIngredient {
  stock: Stock;
  quantity: number;
}

const ChooseIngredients = ({ isOpen, toggle, setProductData }: IModal) => {
  const [baseIngredients, setBaseIngredients] = useState<BaseIngredient[]>([
    {
      stock: {
        id: "",
        name: "",
      },
      quantity: 0,
    },
  ]);

  const { data: Stocks, isLoading: StocksIsLoading } = useFetchData({
    collectionName: Collections.Stocks,
  });

  if (StocksIsLoading) {
    return <h1>Loading...</h1>;
  }

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    let data = [...baseIngredients];
    data[index].quantity = parseInt(event.target.value);
    setBaseIngredients(data);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const data = {
    //   stock: stockID,
    //   quantity: quantityArray,
    // };
    // console.log(data);

    const record = await Promise.all(
      baseIngredients.map(async (ingredient) => {
        return await pb.collection("ingredients").create(
          {
            stock: ingredient.stock.id,
            quantity: ingredient.quantity,
          },
          { $autoCancel: false }
        );
      })
    );

    const ingredientID = await record.map((ingredient) => ingredient.id);
    console.log(ingredientID);
    setProductData((prev) => ({ ...prev, baseIngredient: ingredientID }));
    toggle();
  };

  const addField = () => {
    let newfield = {
      stock: {
        id: "",
        name: "",
      },
      quantity: 0,
    };

    setBaseIngredients([...baseIngredients, newfield]);
  };

  const removeFields = (index: number) => {
    let data = [...baseIngredients];
    data.splice(index, 1);
    setBaseIngredients(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      title={"Choose Base-Ingredients"}
      closeButton
    >
      <form onSubmit={handleSubmit}>
        {baseIngredients.map((ingredient, index) => {
          return (
            <div className="flex gap-2 py-2" key={index}>
              <ComboBox
                data={Stocks}
                objKey="name"
                label="Stock"
                size="sm"
                fullWidth
                value={baseIngredients[index].stock}
                onChange={(value) => {
                  let data = [...baseIngredients];
                  data[index].stock = { id: value.id, name: value.name };
                  setBaseIngredients(data);
                }}
              />
              <div className="flex gap-2">
                <TextField
                  value={baseIngredients.quantity}
                  label="Quantity"
                  size="sm"
                  fullWidth
                  onChange={(e) => handleChange(index, e)}
                />
                <Button
                  onClick={() => removeFields(index)}
                  color="red"
                  size="sm"
                  className="mt-2"
                >
                  <FaRegTrashAlt />
                </Button>
              </div>
            </div>
          );
        })}
        <div className="flex flex-col">
          <Button onClick={addField} color="green" size="sm" className="mt-2">
            Add More
          </Button>
          <Button type="submit" size="sm" className="mt-10">
            Done
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChooseIngredients;
