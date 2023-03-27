import useFetchData from "hooks/useFetchData";
import React, { useEffect } from "react";
import { BranchesResponse, Collections } from "types/pocketbase-types";
import SelectField from "./Selects/SelectField";

interface ISelectBranchProps {
  setSelectBranch: (branch: BranchesResponse) => void;
  selectBranch: BranchesResponse;
}

const SelectBranch = ({
  selectBranch,
  setSelectBranch,
}: ISelectBranchProps) => {
  const { data: BranchData, isLoading: BranchLoading } =
    useFetchData<BranchesResponse>({
      collectionName: Collections.Branches,
    });

  useEffect(() => {
    setSelectBranch(BranchData?.[0] as BranchesResponse);
  }, [BranchData]);

  return (
    <div className="flex items-center gap-3 w-full max-w-xs">
      <label className="font-medium">Branch</label>
      <SelectField
        size="sm"
        data={BranchData}
        objKey="name"
        value={selectBranch}
        onChange={(e) => setSelectBranch(e)}
        fullWidth
      />
    </div>
  );
};

export default SelectBranch;
