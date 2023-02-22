import Image from "next/image";
import React, { useState } from "react";
import Grachelles from "public/images/grachelles.png";
import { OrdersRecord, OrderItemsRecord } from "types/pocketbase-types";
import dayjs from "dayjs";
import Button from "@/components/UI/Button/Button";
import useToggle from "hooks/useToggle";
import DefaultModal from "@/components/UI/Modal/DefaultModal";
import VoidOrder from "./VoidOrder";

interface IOrdersCardProps {
  values: OrdersRecord;
  index: number;
  dataLength: number;
}

const OrderCard = ({ values, index, dataLength }: IOrdersCardProps) => {
  const {
    created,
    payment_method,
    service_method,
    total_amount = 0,
    delivery_fee = 0,
    sub_total = 0,
    expand: { order_items } = { order_items: [] },
  } = values;

  const [showVoid, toggleVoid] = useToggle();
  const [orderName, setOrderName] = useState("");

  const handleVoidOrder = (val: string) => {
    setOrderName(val);
    toggleVoid();
  };

  const [orderNumber, setOrderNumber] = useState(dataLength - index);

  return (
    <>
      <div className="w-full md:max-w-[328px] max-h-[400px] md:h-[355px] border rounded-md p-4 cursor-pointer flex flex-col">
        <div className="shrink-0 grow-0 text-sm flex justify-between items-center">
          <div>
            <h4 className="font-bold">Order #{orderNumber}</h4>
            <p className="text-xs text-gray-400">
              {dayjs(created).format("YYYY-MM-DD hh:mm A")}
            </p>
          </div>

          <Button
            size="xs"
            color="red"
            onClick={() => handleVoidOrder(`Order #${orderNumber}`)}
          >
            Void Order
          </Button>
        </div>
        <div className="flex flex-col gap-2 my-4 flex-1 overflow-y-auto">
          {order_items?.map((val) => {
            return (
              <div
                className="flex items-center gap-3 border border-gray-200 bg-gray-50 p-2 rounded-md"
                key={val.id}
              >
                <div className="text-xs">
                  <h3 className="text-sm font-bold">{`${val.parent_name} x${val.quantity}`}</h3>
                  <div className="flex gap-2">
                    <Options label="Flavor" value={val.name || "N/A"} />
                    <Options label="Sinkers" value={val.sinkers || "N/A"} />
                  </div>
                  <div className="flex gap-2">
                    <Options label="Size" value={val.size || "N/A"} />
                    <Options label="Type" value={val.type || "N/A"} />
                  </div>
                  <Options
                    label="Add ons"
                    value={
                      <div>
                        {val.added_addons
                          ?.map((val: any) => `${val?.name} x${val.quantity}`)
                          .join(", ") || "N/A"}
                      </div>
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="h-[1px] bg-gray-200 my-3 mt-auto"></div>
        <div className="flex flex-col gap-2 shrink-0 grow-0">
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-5">
              <Options
                className="text-xs"
                label="Payment"
                value={payment_method}
              />
              <Options
                className="text-xs"
                label="Service Type"
                value={service_method}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Options
                className="text-xs"
                label="Delivery Fee"
                value={`₱ ${delivery_fee.toFixed(2)}`}
              />
              <Options
                className="text-xs"
                label="Sub Total"
                value={`₱ ${sub_total.toFixed(2)}`}
              />
            </div>
          </div>
          <div className="flex justify-between text-sm font-bold">
            <h3>Total Amount</h3>
            <h3>₱ {total_amount.toFixed(2)}</h3>
          </div>
        </div>
      </div>
      {showVoid && (
        <VoidOrder
          isOpen={showVoid}
          toggle={toggleVoid}
          orderDetail={orderName}
          allIngredientsID={values?.all_ingredients_id as string[]}
          orderID={values.id as string}
          total_amount={total_amount}
        />
      )}
    </>
  );
};

export default OrderCard;

const Options = ({ label = "", value, className = "" }: any) => (
  <div className={`flex gap-1 ${className}`}>
    {label && <span className="text-gray-600 whitespace-nowrap">{label}:</span>}
    <span className="font-semibold capitalize">{value}</span>
  </div>
);
