import { useQuery } from "@tanstack/react-query";
import { pb } from "lib/database/pocketbase";

const useFetchOne = <T>(
  collectionName: string,
  condition: string,
  expand?: string
) => {
  const fetchData = async () => {
    return await pb.collection(collectionName).getFirstListItem(condition, {
      expand,
    });
  };
  return useQuery({
    queryKey: [collectionName, condition, expand],
    queryFn: fetchData,
  });
};

export default useFetchOne;
