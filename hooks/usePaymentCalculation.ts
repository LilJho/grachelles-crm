import { getTotalPrice } from "helper/getTotalPrice";
import React from "react";
import { OrderItemsRecord } from "types/pocketbase-types";

interface IPaymentProps {
  order: OrderItemsRecord[];
  paymentDetails: {
    delivery_fee: number;
    cash_amount: number;
    discount: number;
    paymentMethod: string;
  };
}

const usePaymentCalculation = ({ order, paymentDetails }: IPaymentProps) => {
  const sub_total = getTotalPrice(order);
  const getTotalOrdersAmount =
    paymentDetails.paymentMethod.toLowerCase() !== "giveaway"
      ? sub_total +
        paymentDetails.delivery_fee -
        (paymentDetails.discount / 100) *
          (sub_total + paymentDetails.delivery_fee)
      : 0;
  const getCustomerCash = paymentDetails.cash_amount;
  const getCustomerChange = getCustomerCash
    ? getCustomerCash - getTotalOrdersAmount
    : 0;

  //Get total count of foods or drinks
  const getTotalCount = (type: string) => {
    return order.filter((val) => val.product_type === type).length;
  };

  return [
    sub_total,
    getTotalOrdersAmount,
    getCustomerCash,
    getCustomerChange,
    getTotalCount,
  ] as const;
};

export default usePaymentCalculation;
