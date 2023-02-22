import ConfirmModal from "@/components/UI/Modal/ConfirmModal";
import Modal from "@/components/UI/Modal/Modal";
import React, { FormEvent } from "react";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import ChefImg from "public/images/Chef-cuate.svg";
import { RiLoader5Line } from "react-icons/ri";
import { UseMutateFunction } from "@tanstack/react-query";

interface IUpdateStatusProps {
  isOpen: boolean;
  toggle: () => void;
  orderDetail: string;
  onSubmit: UseMutateFunction<void, unknown, FormEvent<Element>, unknown>;
  isLoading: boolean;
}

const UpdateStatus = ({
  isOpen,
  toggle,
  orderDetail,
  onSubmit = () => {},
  isLoading = false,
}: IUpdateStatusProps) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} maxWidth="max-w-sm">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <Image src={ChefImg} alt="Void Order" className="w-2/5 mx-auto" />
        <h2 className="mt-6 text-xl font-semibold text-center">
          Update Order Status
        </h2>
        <p className="text-center">
          Please confirm that you want to update the status of this order to
          <span className="text-primary-500 font-medium">
            {" "}
            &apos;Served&apos;{" "}
          </span>
          . The order number is{" "}
          <span className="text-primary-500 font-medium">#{orderDetail}</span>.
        </p>
        <div className="flex items-center justify-between mt-6">
          <Button size="sm" color="gray" variant="light" onClick={toggle}>
            Cancel
          </Button>
          <Button size="sm" type="submit">
            {isLoading ? (
              <div className="w-[52px] flex justify-center">
                <RiLoader5Line className="animate-spin w-5 h-5" />
              </div>
            ) : (
              "Confirm"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateStatus;
