import React, { useState } from "react";
import useFetchData from "hooks/useFetchData";
import { Collections } from "types/pocketbase-types";
import Modal from "@/components/UI/Modal/Modal";
import ComboBox from "@/components/UI/Selects/ComboBox";
import TextField from "@/components/UI/Inputs/TextField";
import Button from "@/components/UI/Buttons/Button";
import { FaRegTrashAlt } from "react-icons/fa";
import { pb } from "lib/database/pocketbase";
import { v4 as uuid } from "uuid";

const ChooseIngredients = ({ isOpen, toggle, setProductData }) => {
  const [baseIngredients, setBaseIngredients] = useState([
    {
      stock: {
        id: "",
        name: "",
      },
      quantity: "",
    },
  ]);

  const { data: Stocks, isLoading: StocksIsLoading } = useFetchData({
    collectionName: Collections.Stocks,
  });

  if (StocksIsLoading) {
    return <h1>Loading...</h1>;
  }

  const handleChange = (index, event) => {
    let data = [...baseIngredients];
    data[index][event.target.name] = event.target.value;
    setBaseIngredients(data);
  };

  const handleSubmit = async (e) => {
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
      quantity: "",
    };

    setBaseIngredients([...baseIngredients, newfield]);
  };

  const removeFields = (index) => {
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
                name="stock"
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
                  name="quantity"
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
