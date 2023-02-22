import Button from "@/components/UI/Button/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import showToast from "helper/showToast";
import useToggle from "hooks/useToggle";
import { pb } from "lib/database/pocketbase";
import React, { FormEvent, useState } from "react";
import { OrdersRecord } from "types/pocketbase-types";
import UpdateStatus from "./UpdateStatus";

interface IOrdersCardProps {
  values: OrdersRecord;
  index: number;
}

const PendingOrders = ({ values, index }: IOrdersCardProps) => {
  const queryClient = useQueryClient();

  const [orderNumber, setOrderNumber] = useState(index);

  const { created, id, expand: { order_items } = { order_items: [] } } = values;
  const [show, toggle] = useToggle();

  const handleSubmit = useMutation(
    async (e: FormEvent) => {
      e.preventDefault();
      await pb.collection("orders").update(id as string, {
        ...values,
        is_serve: true,
      });

      showToast("Order status has been updated!");
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      },
    }
  );

  return (
    <>
      <div className="w-full md:max-w-[328px] md:h-[355px] border rounded-md p-4 cursor-pointer flex flex-col">
        <div className="shrink-0 grow-0 text-sm flex justify-between items-center">
          <div>
            <h4 className="font-bold">Order #{orderNumber + 1}</h4>
            <p className="text-xs text-gray-400">
              {dayjs(created).format("MM/DD/YYYY - h:mm A")}
            </p>
          </div>
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
        <Button size="sm" onClick={toggle}>
          Serve
        </Button>
      </div>
      {show && (
        <UpdateStatus
          isOpen={show}
          toggle={toggle}
          orderDetail={`${index + 1}`}
          onSubmit={handleSubmit.mutate}
          isLoading={handleSubmit.isLoading}
        />
      )}
    </>
  );
};

export default PendingOrders;

const Options = ({ label = "", value, className = "" }: any) => (
  <div className={`flex gap-1 ${className}`}>
    {label && <span className="text-gray-600 whitespace-nowrap">{label}:</span>}
    <span className="font-semibold capitalize">{value}</span>
  </div>
);
