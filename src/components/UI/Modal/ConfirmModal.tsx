import React from "react";
import { RiLoader5Line } from "react-icons/ri";
import Button from "../Buttons/Button";
import Modal from "./Modal";

type Props = {
  toggle: () => void;
  isOpen: boolean;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  isLoading: boolean;
};

const ConfirmModal = ({
  toggle = () => {},
  isOpen,
  title = "",
  description = "",
  buttonText = "",
  onClick = () => {},
  isLoading,
}: Props) => {
  return (
    <Modal title={title} toggle={toggle} isOpen={isOpen} className="max-w-lg">
      <p className="mt-4">{description}</p>
      <div className="flex justify-end gap-4 mt-8">
        <Button size="sm" color="gray" onClick={toggle}>
          Cancel
        </Button>
        <Button size="sm" onClick={onClick}>
          {isLoading ? (
            <div className="w-full flex justify-center py-[2px]">
              <RiLoader5Line className="animate-spin w-6 h-6" />
            </div>
          ) : (
            <span>{buttonText}</span>
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
