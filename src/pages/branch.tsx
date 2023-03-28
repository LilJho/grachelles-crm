import MainLayout from "@/components/layout/MainLayout";

import React, { useCallback, useEffect } from "react";
import useBranchStore from "lib/store/useBranchStore";
import PageTitle from "@/components/UI/PageTitle";
import Button from "@/components/UI/Buttons/Button";
import { HiPlus } from "react-icons/hi";
import StoreBranchTable from "@/components/screens/branch/StoreBranchTable";
import useFetchData from "hooks/useFetchData";
import { BranchesResponse, Collections } from "types/pocketbase-types";

const BranchPage = () => {
  const { data: BranchesData, isLoading: BranchesLoading } =
    useFetchData<BranchesResponse>({
      collectionName: Collections.Branches,
    });

  return (
    <MainLayout>
      <PageTitle title="Store Branches">
        <div className="flex items-center justify-end gap-6 flex-1">
          <Button size="sm" color="blue" icon={<HiPlus />}>
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
    </MainLayout>
  );
};

export default BranchPage;
