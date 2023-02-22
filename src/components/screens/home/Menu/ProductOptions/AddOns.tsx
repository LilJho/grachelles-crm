import QuantityButton from "@/components/UI/Button/QuantityButton";
import React from "react";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { AddOnsRecord } from "types/pocketbase-types";

interface AddOnsRecordExtended extends AddOnsRecord {
  quantity: number;
}

interface IAddOnsProps {
  addOns: AddOnsRecordExtended[] | undefined;
  setAddedAddOns: (index: any) => void;
}

const AddOns = ({ addOns = [], setAddedAddOns }: IAddOnsProps) => {
  const handleAdd = (index: number) => {
    setAddedAddOns(
      addOns?.map((item, idx) => {
        if (idx === index) {
          const updatedQuantity: number = item.quantity + 1;
          return {
            ...item,
            quantity: updatedQuantity,
            total_amount: item.price && item.price * updatedQuantity,
          };
        }
        return item;
      })
    );
  };
  const handleSubtract = (index: number) => {
    setAddedAddOns(
      addOns?.map((item, idx) => {
        if (idx === index) {
          const updatedQuantity: number = item.quantity - 1;
          return {
            ...item,
            quantity: updatedQuantity,
            total_amount: item.price && item.price * updatedQuantity,
          };
        }
        return item;
      })
    );
  };

  return (
    <>
      {addOns?.length >= 1 ? (
        <div className="flex flex-col gap-1">
          <h4 className="font-medium">Add ons</h4>
          <div className="flex flex-col gap-3 text-sm">
            {addOns?.map((val, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span>{val.name}</span>
                  <span className="text-xs text-gray-400">{`₱${val.price}`}</span>{" "}
                </div>
                <div className="ml-auto flex gap-3 items-center">
                  <QuantityButton
                    onClick={() => handleSubtract(idx)}
                    disabled={val.quantity <= 0}
                  >
                    <RiSubtractFill className="h-3.5 w-3.5" />
                  </QuantityButton>
                  <span>{val.quantity}</span>
                  <QuantityButton onClick={() => handleAdd(idx)}>
                    <RiAddFill className="h-3.5 w-3.5" />
                  </QuantityButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddOns;
