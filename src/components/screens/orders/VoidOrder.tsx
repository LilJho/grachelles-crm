import Modal from "@/components/UI/Modal/Modal";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import VoidOrderImg from "public/images/Order food-bro.svg";
import Button from "@/components/UI/Button/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { increaseStock } from "helper/increaseStock";
import { pb } from "lib/database/pocketbase";
import showToast from "helper/showToast";
import { RiLoader5Line } from "react-icons/ri";
import TextField from "@/components/UI/TextField";
import useLocalStorage from "hooks/useLocalStorage";

interface IVoidOrderProps {
  isOpen: boolean;
  toggle: () => void;
  orderDetail: string;
  allIngredientsID: string[];
  orderID: string;
  total_amount: number;
}

const VoidOrder = ({
  isOpen,
  toggle,
  orderDetail,
  orderID,
  total_amount,
  allIngredientsID,
}: IVoidOrderProps) => {
  const queryClient = useQueryClient();

  const [voidKey, setVoidKey] = useState("");
  const [ordersAmount, setOrdersAmount] = useLocalStorage("orders", 0);

  const handleVoidOrder = useMutation(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        if (voidKey === "grachelles_00") {
          // await increaseStock(allIngredientsID);
          await pb.collection("orders").delete(orderID);
          setOrdersAmount(ordersAmount - total_amount);
          showToast("Order voided successfully!");
          toggle();
        }
      } catch (error) {
        console.error(error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      },
    }
  );

  return (
    <Modal isOpen={isOpen} toggle={toggle} maxWidth="max-w-sm">
      <form className="flex flex-col" onSubmit={handleVoidOrder.mutate}>
        <Image src={VoidOrderImg} alt="Void Order" className="w-2/5 mx-auto" />
        <h2 className="mt-6 text-xl font-semibold text-center">Void Order</h2>
        <p className="text-center">
          Are you sure you want to void{" "}
          <span className="text-primary-600 font-semibold">{orderDetail}</span>?
          This action cannot be undone. Click{" "}
          <span className="font-medium text-red-500">&apos;Confirm&apos;</span>{" "}
          to proceed or <span className="font-medium ">&apos;Cancel&apos;</span>{" "}
          to go back.
        </p>
        <div className="mt-4 mb-2">
          <TextField
            size="sm"
            placeholder="Enter key to for void order"
            type="password"
            value={voidKey || ""}
            onChange={(e) => setVoidKey(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between mt-6">
          <Button size="sm" color="gray" variant="light" onClick={toggle}>
            Cancel
          </Button>
          <Button
            size="sm"
            color="red"
            type={handleVoidOrder.isLoading ? "button" : "submit"}
            disabled={voidKey !== "grachelles_00"}
          >
            {handleVoidOrder.isLoading ? (
              <div className="w-[58px] flex justify-center">
                <RiLoader5Line className="animate-spin w-5 h-5" />
              </div>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default VoidOrder;
