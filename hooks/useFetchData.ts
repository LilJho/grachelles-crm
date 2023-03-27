import { useQuery } from "@tanstack/react-query";
import { pb } from "lib/database/pocketbase";
import { Collections } from "types/pocketbase-types";

interface UseFetchDataProps<T> {
  collectionName: Collections;
  expand?: string;
  sort?: string;
  cache?: {
    staleTime?: number;
    cacheTime?: number;
  };
  filter?: string;
  enabled?: boolean;
}

const useFetchData = <T>({
  collectionName,
  expand,
  sort = "-created",
  cache = {
    staleTime: 0,
    cacheTime: 5,
  },
  filter = "",
}: UseFetchDataProps<T>) => {
  const fetchData = async () => {
    return await pb
      .collection(collectionName)
      .getFullList<T>(200 /* batch size */, {
        sort,
        expand,
        filter,
      });
  };

  return useQuery({
    queryKey: [collectionName],
    queryFn: fetchData,
    staleTime: (cache.staleTime as number) * (60 * 1000),
    cacheTime: (cache.staleTime as number) * (60 * 1000),
  });
};

export default useFetchData;
