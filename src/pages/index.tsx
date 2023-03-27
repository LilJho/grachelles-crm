import MainLayout from "@/components/layout/MainLayout";
import Summaries from "@/components/screens/dashboard/Summaries";
import PageTitle from "@/components/UI/PageTitle";
import useFetchData from "hooks/useFetchData";
import useOrderSummary from "hooks/useOrderSummary";
import { Collections, OrdersResponse } from "types/pocketbase-types";
import dayjs from "dayjs";
import RecentTransactions from "@/components/screens/dashboard/RecentTransactions";

const CURRENT_DATETIME = dayjs().format("YYYY-MM-DD");
export default function Home() {
  const { data: OrdersData, isLoading: OrdersLoading } =
    useFetchData<OrdersResponse>({
      collectionName: Collections.Orders,
      filter: `transactionTime>="${CURRENT_DATETIME} 00:00:00"`,
      expand: "order_items",
    });

  const summary = useOrderSummary(OrdersData as OrdersResponse[]);
  return (
    <MainLayout>
      <PageTitle title="Dashboard"></PageTitle>
      <div className="my-6 flex flex-col gap-10">
        <Summaries data={summary} />
        <RecentTransactions
          data={OrdersData as OrdersResponse[]}
          isLoading={OrdersLoading}
        />
      </div>
    </MainLayout>
  );
}
