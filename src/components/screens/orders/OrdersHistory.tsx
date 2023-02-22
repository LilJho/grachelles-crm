import React from "react";
import { OrdersRecord, OrderItemsRecord } from "types/pocketbase-types";
import OrderCard from "./OrderCard";
import OrderCardLoading from "./OrderCardLoading";
import Image from "next/image";
import NoOrder from "public/images/Catering service-bro.svg";
interface IOrdersHistoryProps {
  data: OrdersRecord[];
  isLoading: boolean;
}

const OrdersHistory = ({ data, isLoading }: IOrdersHistoryProps) => {
  return (
    <div className="my-4 flex gap-4 flex-row flex-wrap">
      {isLoading ? (
        <OrderCardLoading />
      ) : data?.length >= 1 ? (
        data?.map((val: OrdersRecord, index: number) => {
          return (
            <OrderCard
              key={val.id}
              values={val}
              index={index}
              dataLength={data.length}
            />
          );
        })
      ) : (
        <NoOrdersState />
      )}
    </div>
  );
};

export default OrdersHistory;

const NoOrdersState = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-8 opacity-60 mx-auto">
      <Image
        src={NoOrder}
        className="w-5/6 md:w-full max-w-[400px] h-auto"
        alt="Farmers Market Illustration"
      />
      <h3 className="text-lg font-medium text-gray-400">No orders found!</h3>
    </div>
  );
};
