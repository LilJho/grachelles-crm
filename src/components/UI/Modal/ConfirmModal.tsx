import React, { FC } from "react";
import { RiLoader5Line } from "react-icons/ri";
import Button from "../Button/Button";
import Modal from "./Modal";

interface IConfirmModalProps {
  toggle: () => void;
  isOpen: boolean;
  title?: string;
  description?: any;
  buttonText?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

const ConfirmModal: FC<IConfirmModalProps> = ({
  toggle = () => {},
  isOpen,
  title = "",
  description = "",
  buttonText = "",
  onClick,
  isLoading,
}) => {
  return (
    <Modal
      title={title}
      toggle={toggle}
      isOpen={isOpen}
      className="max-w-screen-xs"
    >
      <p className="">{description}</p>
      <div className="flex justify-between gap-4 mt-8">
        <Button
          size="sm"
          variant="subtle"
          color="red"
          className="px-0.5"
          onClick={toggle}
        >
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
