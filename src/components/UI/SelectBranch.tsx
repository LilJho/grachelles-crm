import useFetchData from "hooks/useFetchData";
import React, { useEffect } from "react";
import { BranchesResponse, Collections } from "types/pocketbase-types";
import SelectField from "./Selects/SelectField";

interface ISelectBranchProps {
  onChange: (branch: BranchesResponse) => void;
  selectBranch: BranchesResponse;
  data: BranchesResponse[];
}

const SelectBranch = ({ selectBranch, onChange, data }: ISelectBranchProps) => {
  return (
    <div className="flex items-center gap-3 w-full max-w-xs">
      <label className="font-medium">Branch</label>
      <SelectField
        size="sm"
        data={data}
        objKey="name"
        value={selectBranch}
        onChange={onChange}
        fullWidth
      />
    </div>
  );
};

export default SelectBranch;
