import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastError, toastSuccess } from "helper/showToast";
import { pb } from "lib/database/pocketbase";
import React, { useState } from "react";
import { Collections } from "types/pocketbase-types";
import useToggle from "./useToggle";

const useDeleteRecord = (collection: Collections) => {
  const queryClient = useQueryClient();

  const [getData, setGetData] = useState<any | undefined>();
  const [showDelete, toggleDelete] = useToggle();

  const handleGetDeleteData = (val: any) => {
    setGetData(val);
    toggleDelete();
  };

  const handleSubmitDeleteData = useMutation(
    async () => {
      try {
        await pb.collection(collection).delete(getData?.id as string);
      } catch (error) {}
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [collection],
        });
        toggleDelete();
        toastSuccess("Record has been deleted!");
      },
      onError: () => {
        toastError(
          "Something went wrong while processing your request. Please try again!"
        );
      },
    }
  );

  return {
    showDelete,
    toggleDelete,
    handleGetDeleteData,
    handleSubmitDeleteData,
    getData,
    setGetData,
  } as const;
};

export default useDeleteRecord;
