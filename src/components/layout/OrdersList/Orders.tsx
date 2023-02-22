import QuantityButton from "@/components/UI/Button/QuantityButton";
import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { OrderItemsRecord } from "types/pocketbase-types";

interface IOrders {
  values: OrderItemsRecord;
  order: OrderItemsRecord[];
  setOrder: (index: any) => void;
}

const Orders = ({ values, order, setOrder }: IOrders) => {
  const {
    orderID,
    parent_name,
    type,
    name,
    size,
    added_addons = [],
    total_price = 0,
    quantity,
  } = values;

  const [price, setPrice] = useState(total_price);

  const handleAddQuantity = () => {
    setOrder(
      order.map((val) => {
        if (val.orderID === orderID) {
          const updatedQuantity = val.quantity + 1;

          return {
            ...val,
            quantity: updatedQuantity,
            total_price: val.total_price && val.total_price + price,
          };
        } else {
          return val;
        }
      })
    );
  };

  const handleSubractQuantity = () => {
    setOrder(
      order.map((val) => {
        if (val.orderID === orderID) {
          const updatedQuantity = val.quantity - 1;
          return {
            ...val,
            quantity: updatedQuantity,
            total_price: val.total_price && val.total_price - price,
          };
        } else {
          return val;
        }
      })
    );
  };

  const handleRemoveOrder = () => {
    const remainingOrders = order?.filter((val) => val.orderID !== orderID);
    setOrder(remainingOrders);
  };

  return (
    <div className="flex gap-2 border p-2 rounded-md">
      <div className="flex flex-1 gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <h2 className="text-sm font-medium ">{`${parent_name} x${quantity}`}</h2>
            <div className="flex gap-1">
              {name && (
                <span className="text-xs text-gray-800 capitalize">
                  {`${name}`}
                </span>
              )}
              {type && (
                <span className="text-xs text-gray-500 capitalize">{` - ${type}`}</span>
              )}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <span className="capitalize text-gray-800">{size}</span>
              {added_addons?.length >= 1 && <span>with Add ons</span>}
            </div>
          </div>
          <h4 className="text-sm font-medium">{`₱ ${total_price?.toFixed(
            2
          )}`}</h4>
        </div>
        <div className="flex flex-col justify-between">
          <button
            className="self-end transition-transform active:scale-95"
            onClick={handleRemoveOrder}
          >
            <HiOutlineTrash className="w-4 h-4 text-red-500" />
          </button>
          <div className="flex gap-2 items-center">
            <QuantityButton
              disabled={quantity <= 1}
              onClick={handleSubractQuantity}
            >
              <RiSubtractFill className="h-3 w-3" />
            </QuantityButton>
            <h4 className="text-sm">{quantity}</h4>
            <QuantityButton onClick={handleAddQuantity}>
              <RiAddFill className="h-3 w-3" />
            </QuantityButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
