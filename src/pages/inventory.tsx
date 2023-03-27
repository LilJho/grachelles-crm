import MainLayout from "@/components/layout/MainLayout";
import InventoryTable from "@/components/screens/inventory/InventoryTable";
import Button from "@/components/UI/Buttons/Button";
import PageTitle from "@/components/UI/PageTitle";
import SelectField from "@/components/UI/Selects/SelectField";
import useFetchData from "hooks/useFetchData";
import React, { useState } from "react";
import { IExpandedStocksResponse } from "types/global-types";
import {
  BranchesResponse,
  Collections,
  StocksRecord,
} from "types/pocketbase-types";
import { HiPlus } from "react-icons/hi";
import useToggle from "hooks/useToggle";
import AddInventory from "@/components/screens/inventory/InventoryForm/AddInventory";

const InventoryPage = () => {
  const { data: BranchData, isLoading: BranchLoading } =
    useFetchData<BranchesResponse>({
      collectionName: Collections.Branches,
    });
  const [selectBranch, setSelectBranch] = useState(BranchData?.[0]);

  const {
    data: StocksData,
    isLoading: StocksLoading,
    refetch,
  } = useFetchData<StocksRecord>({
    collectionName: Collections.Stocks,
    expand: "branch",
  });

  const handleSelectBranch = (
    e: React.SetStateAction<BranchesResponse | undefined>
  ) => {
    setSelectBranch(e);
    refetch();
  };

  const [showAddForm, toggleAddForm] = useToggle();

  return (
    <MainLayout>
      <PageTitle title="Inventory Record">
        <div className="flex items-center max-w-sm gap-6 flex-1">
          <SelectField
            size="sm"
            fullWidth
            data={BranchData}
            objKey="name"
            value={selectBranch}
            onChange={(e) => handleSelectBranch(e)}
          />
          <Button
            size="sm"
            color="green"
            icon={<HiPlus />}
            onClick={toggleAddForm}
          >
            Add New Stock
          </Button>
        </div>
      </PageTitle>
      <div className="mt-10">
        <InventoryTable
          data={StocksData as IExpandedStocksResponse[]}
          isLoading={StocksLoading}
        />
      </div>
      {showAddForm && (
        <AddInventory toggle={toggleAddForm} isOpen={showAddForm} />
      )}
    </MainLayout>
  );
};

export default InventoryPage;
