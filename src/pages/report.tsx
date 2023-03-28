import MainLayout from "@/components/layout/MainLayout";
import CashierLogTable from "@/components/screens/report/CashierLogTable";
import SalesTable from "@/components/screens/report/SalesTable";
import Button from "@/components/UI/Buttons/Button";
import PageTitle from "@/components/UI/PageTitle";
import SelectBranch from "@/components/UI/SelectBranch";
import useFetchData from "hooks/useFetchData";
import React, { useState } from "react";
import { RiFileExcel2Line } from "react-icons/ri";
import {
  IExpandedCashierSalesResponse,
  IExpandedOrderResponse,
} from "types/global-types";
import {
  BranchesResponse,
  CashierSalesResponse,
  Collections,
  OrdersResponse,
} from "types/pocketbase-types";

const ReportPage = () => {
  const [selectBranch, setSelectBranch] = useState<BranchesResponse>();

  const { data: OrdersData, isLoading: OrdersLoading } =
    useFetchData<OrdersResponse>({
      collectionName: Collections.Orders,
      expand: "order_items",
    });

  const { data: CashierSalesData, isLoading: CashierSalesLoading } =
    useFetchData<CashierSalesResponse>({
      collectionName: Collections.CashierSales,
      expand: "user.employee_data",
    });

  return (
    <MainLayout>
      <PageTitle title="Store Records">
        <div className="flex items-center max-w-sm gap-6 flex-1">
          <SelectBranch
            selectBranch={selectBranch as BranchesResponse}
            setSelectBranch={setSelectBranch}
          />
          <Button size="sm" color="green" icon={<RiFileExcel2Line />}>
            Export Records
          </Button>
        </div>
      </PageTitle>
      <div className="flex flex-col gap-10">
        <SalesTable
          data={OrdersData as IExpandedOrderResponse[]}
          isLoading={OrdersLoading}
        />
        <CashierLogTable
          data={CashierSalesData as IExpandedCashierSalesResponse[]}
          isLoading={CashierSalesLoading}
        />
      </div>
    </MainLayout>
  );
};

export default ReportPage;
