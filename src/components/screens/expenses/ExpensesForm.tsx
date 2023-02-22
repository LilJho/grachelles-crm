import React, { FormEvent, useState } from "react";
import Button from "@/components/UI/Button/Button";
import SelectTextField from "@/components/UI/SelectTextField";
import TextField from "@/components/UI/TextField";
import showToast from "helper/showToast";
import { pb } from "lib/database/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { RiLoader5Line } from "react-icons/ri";
import useAuthStore from "lib/store/useAuthStore";
import useLocalStorage from "hooks/useLocalStorage";

interface IExpenseProps {
  data: string[] | undefined;
}

const ExpensesForm = ({ data = [] }: IExpenseProps) => {
  const { currentBranch: user } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    branch: user?.id,
    quantity: "",
    price: "",
    total_price: 0,
  });

  const handleChange = (key: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const total_amount: Number =
    Number(formData.price) * Number(formData.quantity) || 0;

  const [expensesAmount, setExpensesAmount] = useLocalStorage("expenses", 0);

  const handleSubmitExpenses = useMutation(async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      branch: user?.id,
      quantity: formData.quantity,
      price: formData.price,
      total_price: total_amount,
    };
    try {
      await pb.collection("expenses").create(data);
      setExpensesAmount(expensesAmount + total_amount);
      setFormData({
        name: "",
        quantity: "",
        branch: user?.id,
        price: "",
        total_price: 0,
      });
      showToast("Expenses submitted successfully!");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form
      className="p-6 max-w-xl w-full border rounded-md my-4 flex flex-col gap-4"
      onSubmit={handleSubmitExpenses.mutate}
    >
      <SelectTextField
        label="Product/Item name"
        fullWidth
        size="sm"
        data={data}
        onChange={(e) => handleChange("name", e.target.value)}
        value={formData.name}
        onSelect={(e) => handleChange("name", e)}
      />
      <TextField
        label="Quantity"
        type="number"
        size="sm"
        onChange={(e) => handleChange("quantity", Number(e.target.value))}
        value={formData.quantity || ""}
      />
      <TextField
        label="Unit Price"
        type="number"
        leftIcon="₱"
        size="sm"
        onChange={(e) => handleChange("price", e.target.value)}
        value={formData.price || ""}
      />
      <TextField
        label="Total Price"
        type="number"
        leftIcon="₱"
        size="sm"
        value={total_amount as number}
        readOnly
      />
      <div className="mt-4 flex justify-end">
        <Button size="sm" type="submit">
          {handleSubmitExpenses.isLoading ? (
            <div className="w-12 flex justify-center">
              <RiLoader5Line className="animate-spin w-6 h-6" />
            </div>
          ) : (
            "Submit Expenses"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ExpensesForm;
