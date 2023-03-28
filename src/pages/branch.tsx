import MainLayout from "@/components/layout/MainLayout";

import React, { useCallback, useEffect } from "react";
import useBranchStore from "lib/store/useBranchStore";
import PageTitle from "@/components/UI/PageTitle";
import Button from "@/components/UI/Buttons/Button";
import { HiPlus } from "react-icons/hi";
import StoreBranchTable from "@/components/screens/branch/StoreBranchTable";
import useFetchData from "hooks/useFetchData";
import { BranchesResponse, Collections } from "types/pocketbase-types";
import useToggle from "./../../hooks/useToggle";
import BranchForm from "@/components/screens/branch/BranchForm/BranchForm";
import AddBranchForm from "@/components/screens/branch/BranchForm/AddBranchForm";

const BranchPage = () => {
  const { getBranches, branches } = useBranchStore();
  const fetchData = useCallback(async () => {
    await getBranches();
  }, [getBranches]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { data: BranchesData, isLoading: BranchesLoading } =
    useFetchData<BranchesResponse>({
      collectionName: Collections.Branches,
    });

  const [showAddBranch, toggleAddBranch] = useToggle();

  return (
    <MainLayout>
      <PageTitle title="Store Branches">
        <div className="flex items-center justify-end gap-6 flex-1">
          <Button
            size="sm"
            color="blue"
            icon={<HiPlus />}
            onClick={toggleAddBranch}
          >
            Add New Branch
          </Button>
        </div>
      </PageTitle>
      <div>
        <StoreBranchTable
          data={BranchesData as BranchesResponse[]}
          isLoading={BranchesLoading}
        />
      </div>
      {showAddBranch && (
        <AddBranchForm isOpen={showAddBranch} toggle={toggleAddBranch} />
      )}
    </MainLayout>
  );
};

export default BranchPage;
