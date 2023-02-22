import React from "react";
import { AddOnsRecord } from "types/pocketbase-types";

interface IProductAmountProps {
  findSelectedProduct:
    | {
        name: string;
        size: string;
        type: string;
        price: number;
      }
    | undefined;
  addedAddOns:
    | {
        quantity: number;
        name: string;
        branch: string;
        ingredients?: string[] | undefined;
        price?: number | undefined;
      }[]
    | undefined;
  quantity: number;
}

const useProductAmountCalculation = ({
  findSelectedProduct,
  quantity,
  addedAddOns = [],
}: IProductAmountProps) => {
  const price: Number =
    findSelectedProduct !== undefined
      ? findSelectedProduct?.price * quantity
      : 0;

  const getAddOnsTotalPrice = () => {
    if (addedAddOns) {
      return addedAddOns
        ?.map((item: any) => item.price * item.quantity)
        .reduce((curr, val) => curr + val, 0);
    }
    return 0;
  };

  //Get total price of products with addons
  const totalAmount = (Number(price) + Number(getAddOnsTotalPrice())).toFixed(
    2
  );

  return totalAmount;
};

export default useProductAmountCalculation;
