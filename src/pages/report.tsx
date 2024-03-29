import MainLayout from "@/components/layout/MainLayout";
import CashierLogTable from "@/components/screens/report/CashierLogTable";
import SalesTable from "@/components/screens/report/SalesTable";
import Button from "@/components/UI/Buttons/Button";
import PageTitle from "@/components/UI/PageTitle";
import SelectBranch from "@/components/UI/SelectBranch";
import useFetchData from "hooks/useFetchData";
import React, { useEffect, useState } from "react";
import { RiFileExcel2Line } from "react-icons/ri";
import {
  IExpandedCashierSalesResponse,
  IExpandedOrderResponse,
} from "types/global-types";
import useToggle from "hooks/useToggle";
import {
  BranchesResponse,
  CashierSalesResponse,
  Collections,
  OrdersResponse,
} from "types/pocketbase-types";
import GenerateReportCSV from "@/components/screens/report/GenerateReportCSV";
import useSelectBranch from "./../../hooks/useSelectBranch";

const ReportPage = () => {
  const { data: ordersData, isLoading: ordersLoading } =
    useFetchData<OrdersResponse>({
      collectionName: Collections.Orders,
      expand: "order_items, order_items.category, branch",
    });

  const { data: cashierSalesData, isLoading: cashierSalesLoading } =
    useFetchData<CashierSalesResponse>({
      collectionName: Collections.CashierSales,
      expand: "user.employee_data",
    });

  const [showExport, toggleExport] = useToggle();

  const { filterData, selectBranch, setSelectBranch, BranchesData } =
    useSelectBranch();

  const filteredOrderData = filterData(
    ordersData,
    (item: { branch: string }) => item.branch === selectBranch?.id
  );
  const filteredCashierData = filterData(
    cashierSalesData,
    (item: { branch: string }) => item.branch === selectBranch?.id
  );

  return (
    <>
      <MainLayout>
        <PageTitle title="Store Records">
          <div className="flex items-center max-w-sm gap-6 flex-1">
            <SelectBranch
              data={BranchesData as BranchesResponse[]}
              selectBranch={selectBranch as BranchesResponse}
              onChange={(e) => setSelectBranch(e)}
            />
            <Button
              size="sm"
              color="green"
              icon={<RiFileExcel2Line />}
              onClick={toggleExport}
            >
              Export Records
            </Button>
          </div>
        </PageTitle>
        <div className="flex flex-col gap-10">
          <SalesTable
            data={filteredOrderData as IExpandedOrderResponse[]}
            isLoading={ordersLoading}
          />
          <CashierLogTable
            data={filteredCashierData as IExpandedCashierSalesResponse[]}
            isLoading={cashierSalesLoading}
          />
        </div>
      </MainLayout>
      {showExport && (
        <GenerateReportCSV
          isOpen={showExport}
          toggle={toggleExport}
          orderData={ordersData}
          cashierLog={cashierSalesData}
        />
      )}
    </>
  );
};

export default ReportPage;
