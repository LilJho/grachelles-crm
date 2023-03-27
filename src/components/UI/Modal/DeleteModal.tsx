import React, { FC } from "react";
import { RiLoader5Line, RiAlertFill } from "react-icons/ri";
import Button from "../Buttons/Button";
import Modal from "./Modal";

type IDeleteModalProps = {
  isOpen?: boolean;
  toggle?: () => void;
  title?: string;
  buttonText?: string;
  onClick?: () => void;
  isLoading?: boolean;
  deleteRecord: string;
};

const DeleteModal: FC<IDeleteModalProps> = ({
  isOpen = false,
  toggle = () => {},
  title,
  buttonText = "Yes, Delete",
  onClick = () => {},
  isLoading = false,
  deleteRecord = "",
}) => {
  return (
    <Modal title={title} toggle={toggle} isOpen={isOpen} className="max-w-sm">
      <div className="flex justify-center mb-4">
        <RiAlertFill className="w-10 h-10 text-red-500" />
      </div>
      <h1 className="text-center text-2xl font-bold">Delete Record</h1>
      <p className="mt-4 text-center text-sm px-4 text-gray-600">
        You&apos;re going to delete the record of &quot;{deleteRecord}&quot;.
        Are you sure?
      </p>
      <div className="flex justify-center gap-4 mt-8">
        <Button size="sm" variant="light" color="gray" onClick={toggle}>
          No, Keep it.
        </Button>
        <Button size="sm" color="red" onClick={onClick}>
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

export default DeleteModal;
