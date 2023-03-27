import MainLayout from "@/components/layout/MainLayout";
import ExpensesTable from "@/components/screens/expenses/ExpensesTable";
import Button from "@/components/UI/Buttons/Button";
import PageTitle from "@/components/UI/PageTitle";
import SelectBranch from "@/components/UI/SelectBranch";
import useFetchData from "hooks/useFetchData";
import React, { useState } from "react";
import { RiFileExcel2Line } from "react-icons/ri";
import {
  BranchesResponse,
  Collections,
  ExpensesResponse,
} from "types/pocketbase-types";

const ExpensesPage = () => {
  const [selectBranch, setSelectBranch] = useState<BranchesResponse>();

  const { data: ExpensesData, isLoading: ExpensesLoading } =
    useFetchData<ExpensesResponse>({
      collectionName: Collections.Expenses,
      expand: "user",
    });

  return (
    <MainLayout>
      <PageTitle title="Expenses Record">
        <div className="flex items-center justify-end gap-6 flex-1">
          <SelectBranch
            selectBranch={selectBranch as BranchesResponse}
            setSelectBranch={setSelectBranch}
          />
          <Button size="sm" color="green" icon={<RiFileExcel2Line />}>
            Export Record
          </Button>
        </div>
      </PageTitle>
      <div>
        <ExpensesTable
          data={ExpensesData as ExpensesResponse[]}
          isLoading={ExpensesLoading}
        />
      </div>
    </MainLayout>
  );
};

export default ExpensesPage;
