import { pb } from "lib/database/pocketbase";
import { Collections } from "types/pocketbase-types";
import { create } from "zustand";

interface UseFetchDataProps<T> {
  collectionName: Collections;
  expand?: string;
  sort?: string;
  cache?: {
    staleTime?: number;
    cacheTime?: number;
  };
}

const fetchData = async <T>({
  collectionName,
  sort = "-created",
  expand = "",
}: UseFetchDataProps<T>) => {
  try {
    return await pb
      .collection(collectionName)
      .getFullList<T>(200 /* batch size */, {
        sort,
        expand,
      });
  } catch (error) {
    console.error(error);
    return [];
  }
};

const useDataStore = create((set) => ({
  fetchData,
}));

export default useDataStore;
