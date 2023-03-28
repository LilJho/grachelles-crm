import MainLayout from "@/components/layout/MainLayout";
import ExpensesTable from "@/components/screens/expenses/ExpensesTable";
import GenerateReportCSV from "@/components/screens/expenses/GenerateReportCSV";
import Button from "@/components/UI/Buttons/Button";
import PageTitle from "@/components/UI/PageTitle";
import SelectBranch from "@/components/UI/SelectBranch";
import useFetchData from "hooks/useFetchData";
import useSelectBranch from "hooks/useSelectBranch";
import useToggle from "hooks/useToggle";
import React, { useState } from "react";
import { RiFileExcel2Line } from "react-icons/ri";
import { IExpandedExpenses } from "types/global-types";
import {
  BranchesResponse,
  Collections,
  ExpensesResponse,
} from "types/pocketbase-types";

const ExpensesPage = () => {
  const { data: expensesData, isLoading: ExpensesLoading } =
    useFetchData<ExpensesResponse>({
      collectionName: Collections.Expenses,
      expand: "user",
    });

  const { filterData, selectBranch, setSelectBranch, BranchesData } =
    useSelectBranch();

  const filteredStockData = filterData(
    expensesData,
    (item: { branch: string }) => item.branch === selectBranch?.id
  );

  const [showGenerateReport, toggleGenerateReport] = useToggle();

  return (
    <MainLayout>
      <PageTitle title="Expenses Record">
        <div className="flex items-center justify-end gap-6 flex-1">
          <SelectBranch
            data={BranchesData as BranchesResponse[]}
            selectBranch={selectBranch as BranchesResponse}
            onChange={(e) => setSelectBranch(e)}
          />
          <Button
            size="sm"
            color="green"
            icon={<RiFileExcel2Line />}
            onClick={toggleGenerateReport}
          >
            Export Record
          </Button>
        </div>
      </PageTitle>
      <div>
        <ExpensesTable
          data={filteredStockData as IExpandedExpenses[]}
          isLoading={ExpensesLoading}
        />
      </div>
      {showGenerateReport && (
        <GenerateReportCSV
          isOpen={showGenerateReport}
          toggle={toggleGenerateReport}
          expensesData={expensesData}
        />
      )}
    </MainLayout>
  );
};

export default ExpensesPage;
