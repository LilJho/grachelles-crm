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
import SelectBranch from "@/components/UI/SelectBranch";
import useSelectBranch from "hooks/useSelectBranch";

const InventoryPage = () => {
  const { data: StocksData, isLoading: StocksLoading } =
    useFetchData<StocksRecord>({
      collectionName: Collections.Stocks,
      expand: "branch",
    });

  const [showAddForm, toggleAddForm] = useToggle();

  const { filterData, selectBranch, setSelectBranch, BranchesData } =
    useSelectBranch();

  const filteredStockData = filterData(
    StocksData,
    (item: { branch: string }) => item.branch === selectBranch?.id
  );

  return (
    <MainLayout>
      <PageTitle title="Inventory Record">
        <div className="flex items-center max-w-sm gap-6 flex-1">
          <SelectBranch
            data={BranchesData as BranchesResponse[]}
            selectBranch={selectBranch as BranchesResponse}
            onChange={(e) => setSelectBranch(e)}
          />
          <Button
            size="sm"
            color="blue"
            icon={<HiPlus />}
            onClick={toggleAddForm}
          >
            Add New Stock
          </Button>
        </div>
      </PageTitle>
      <div>
        <InventoryTable
          data={filteredStockData as IExpandedStocksResponse[]}
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
