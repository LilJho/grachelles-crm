import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastError, toastSuccess } from "helper/showToast";
import { pb } from "lib/database/pocketbase";
import React, { FormEvent } from "react";
import { Collections } from "types/pocketbase-types";

interface IUserCreate {
  Collections: Collections;
  data: any;
  toggle: () => void;
  setFormData: (data: any) => void;
  defaultValue?: any;
}

const useCreateData = ({
  Collections,
  data,
  toggle,
  setFormData,
  defaultValue = "",
}: IUserCreate) => {
  const queryClient = useQueryClient();

  const handleFormSubmit = useMutation(
    async (e: FormEvent) => {
      e.preventDefault();
      await pb.collection(Collections).create(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [Collections],
        });
        toggle();
        toastSuccess("Record has been added!");
        setFormData(defaultValue);
      },
      onError: () => {
        toastError(
          "Something went wrong while processing your request. Please try again!"
        );
      },
    }
  );

  return handleFormSubmit;
};

export default useCreateData;
