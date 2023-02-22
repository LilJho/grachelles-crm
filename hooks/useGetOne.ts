import { useQuery } from "@tanstack/react-query";
import { pb } from "lib/database/pocketbase";

interface IGetDataProps {
  collectionName: string;
  id: string;
  expand?: string;
  filter?: string;
  queryKey?: string;
}

const useGetOne = <T>({
  collectionName,
  id,
  expand,
  filter,
  queryKey = collectionName,
}: IGetDataProps) => {
  const fetchData = async () => {
    return await pb.collection(collectionName).getOne<T>(id /* batch size */, {
      sort: "-created",
      expand,
      filter,
    });
  };
  return useQuery({
    queryKey: [queryKey],
    queryFn: fetchData,
  });
};

export default useGetOne;
