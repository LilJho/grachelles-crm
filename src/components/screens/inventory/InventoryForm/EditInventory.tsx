import React, { FormEvent, useState } from "react";
import InventoryForm from "./InventoryForm";
import { pb } from "lib/database/pocketbase";
import { toastError, toastSuccess } from "helper/showToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Collections } from "types/pocketbase-types";

interface IAddInventoryFormProps {
  isOpen: boolean;
  toggle: () => void;
  initialValue: {
    name: string;
    quantity: number;
    measurement: string;
    type: string;
    id: string;
    branch: {
      id: string;
    };
  };
}

const EditInventory = ({
  isOpen,
  toggle,
  initialValue,
}: IAddInventoryFormProps) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: initialValue.name,
    quantity: initialValue.quantity,
    measurement: initialValue.measurement,
    type: initialValue.type,
    branch: initialValue.branch,
  });

  const handleFormSubmit = useMutation(
    async (e: FormEvent) => {
      e.preventDefault();
      await pb.collection("stocks").update(initialValue.id, formData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [Collections.Stocks],
        });
        toggle();
        toastSuccess("Stock has been updated!");
        setFormData({
          name: initialValue.name,
          quantity: initialValue.quantity,
          measurement: initialValue.measurement,
          type: initialValue.type,
          branch: initialValue.branch,
        });
      },
      onError: () => {
        toastError(
          "Something went wrong while processing your request. Please try again!"
        );
      },
    }
  );

  return (
    <InventoryForm
      isOpen={isOpen}
      toggle={toggle}
      setFormData={setFormData}
      formData={formData as any}
      onSubmit={handleFormSubmit.mutate}
      isLoading={handleFormSubmit.isLoading}
      mode="edit"
    />
  );
};

export default EditInventory;
