import MainLayout from "@/components/layout/MainLayout";
import Summaries from "@/components/screens/dashboard/Summaries";
import PageTitle from "@/components/UI/PageTitle";
import useFetchData from "hooks/useFetchData";
import useOrderSummary from "hooks/useOrderSummary";
import {
  BranchesResponse,
  Collections,
  ExpensesResponse,
  OrdersResponse,
} from "types/pocketbase-types";
import dayjs from "dayjs";
import RecentTransactions from "@/components/screens/dashboard/RecentTransactions";
import { useEffect, useState } from "react";
import SelectBranch from "@/components/UI/SelectBranch";

const CURRENT_DATETIME = dayjs().format("YYYY-MM-DD");

export default function Home() {
  const [selectBranch, setSelectBranch] = useState<BranchesResponse>();

  const {
    data: OrdersData,
    isLoading: OrdersLoading,
    refetch: RefetchOrders,
  } = useFetchData<OrdersResponse>({
    collectionName: Collections.Orders,
    filter: `transactionTime>="${CURRENT_DATETIME} 00:00:00"&&branch="${selectBranch?.id}"`,
    expand: "order_items",
  });

  const {
    data: ExpensesData,
    isLoading: ExpensesLoading,
    refetch: RefetchExpenses,
  } = useFetchData<ExpensesResponse>({
    collectionName: Collections.Expenses,
    filter: `transactionTime>="${CURRENT_DATETIME} 00:00:00"&&branch="${selectBranch?.id}"`,
  });

  const summary = useOrderSummary(
    OrdersData as OrdersResponse[],
    ExpensesData as ExpensesResponse[]
  );

  return (
    <MainLayout>
      <PageTitle title="Dashboard">
        <SelectBranch
          selectBranch={selectBranch as BranchesResponse}
          setSelectBranch={setSelectBranch}
        />
      </PageTitle>
      <div className="flex flex-col gap-10">
        <Summaries data={summary} />
        <RecentTransactions
          data={OrdersData as OrdersResponse[]}
          isLoading={OrdersLoading}
        />
      </div>
    </MainLayout>
  );
}
