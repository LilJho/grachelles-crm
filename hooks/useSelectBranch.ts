import { useEffect, useState } from "react";
import { BranchesResponse, Collections } from "types/pocketbase-types";
import useFetchData from "./useFetchData";

const useSelectBranch = () => {
  const { data: BranchesData, isLoading: BranchesLoading } =
    useFetchData<BranchesResponse>({
      collectionName: Collections.Branches,
    });

  const [selectBranch, setSelectBranch] = useState<BranchesResponse>(
    BranchesData?.[0] as BranchesResponse
  );

  useEffect(() => {
    setSelectBranch(BranchesData?.[0] as BranchesResponse);
  }, [BranchesData]);

  const filterData = (data: any, filterFn: any) => {
    return data?.filter(filterFn);
  };

  return {
    filterData,
    selectBranch,
    setSelectBranch,
    BranchesData,
  };
};

export default useSelectBranch;
