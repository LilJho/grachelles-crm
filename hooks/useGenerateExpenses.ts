import React from "react";
import { ExpensesResponse } from "types/pocketbase-types";

interface SelectedValues {
  employee_name: string;
  product_name: string;
  quantity: number;
  price: number;
  total_price: number;
}

const useGenerateExpenses = (originalArray: ExpensesResponse[]) => {
  const selectedArray: SelectedValues[] = originalArray.map((obj: any) => {
    return {
      employee_name: obj.expand.user?.name,
      product_name: obj.name,
      quantity: obj.quantity,
      price: obj.price,
      total_price: obj.total_price,
    };
  });

  const headers = [
    { label: "Employee Name", key: "employee_name" },
    { label: "Product Name", key: "product_name" },
    { label: "Quantity", key: "quantity" },
    { label: "Price", key: "price" },
    { label: "Total Price", key: "total_price" },
  ];
  return { headers, data: selectedArray };
};

export default useGenerateExpenses;
