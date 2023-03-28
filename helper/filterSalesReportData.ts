import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {
  BranchesResponse,
  CashierSalesResponse,
  OrdersResponse,
} from "types/pocketbase-types";
dayjs.extend(isBetween);

interface IFilterSales {
  startDate: string;
  endDate: string;
  branch: BranchesResponse;
}

export const filterSalesData = (
  filters: IFilterSales,
  orderData: OrdersResponse[]
) => {
  const { startDate, endDate, branch } = filters;

  let filteredOrders = orderData.filter((order: any) => {
    const formattedTransactionTime = order.transactionTime.split(" ")[0];
    const orderDate = dayjs(formattedTransactionTime);

    const isWithinDateRange =
      startDate && endDate
        ? orderDate.isBetween(dayjs(startDate), dayjs(endDate), null, "[]")
        : true;
    const isWithinBranch = branch ? order.branch === branch : true;
    return isWithinDateRange && isWithinBranch;
  });
  return filteredOrders;
};

export const filterCashierData = (
  filters: IFilterSales,
  salesData: CashierSalesResponse[]
) => {
  const { startDate, endDate, branch } = filters;

  let filteredOrders = salesData.filter((order: any) => {
    const formattedTransactionTime = order.datetime.split(" ")[0];
    const orderDate = dayjs(formattedTransactionTime);

    const isWithinDateRange =
      startDate && endDate
        ? orderDate.isBetween(dayjs(startDate), dayjs(endDate), null, "[]")
        : true;
    const isWithinBranch = branch ? order.branch === branch : true;
    return isWithinDateRange && isWithinBranch;
  });
  return filteredOrders;
};
