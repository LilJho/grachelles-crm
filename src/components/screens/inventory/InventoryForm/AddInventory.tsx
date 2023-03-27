import React, { FormEvent, useState } from "react";
import InventoryForm from "./InventoryForm";
import { useForm } from "react-hook-form";
import { pb } from "lib/database/pocketbase";
import { toastError, toastSuccess } from "helper/showToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Collections } from "types/pocketbase-types";

interface IAddInventoryFormProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddInventory = ({ isOpen, toggle }: IAddInventoryFormProps) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    measurement: "",
    type: "",
    branch: {
      id: "",
      name: "",
    },
  });

  const handleFormSubmit = useMutation(
    async (e: FormEvent) => {
      e.preventDefault();
      await pb
        .collection("stocks")
        .create({ ...formData, branch: formData.branch.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [Collections.Stocks],
        });
        toggle();
        toastSuccess("Stock has been added!");
        setFormData({
          name: "",
          quantity: 0,
          measurement: "",
          type: "",
          branch: {
            id: "",
            name: "",
          },
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
      formData={formData}
      onSubmit={handleFormSubmit.mutate}
      isLoading={handleFormSubmit.isLoading}
    />
  );
};

export default AddInventory;
