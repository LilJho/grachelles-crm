import { OrderItemsRecord } from "types/pocketbase-types";

export const getTotalPrice = (order: OrderItemsRecord[]) => {
  if (order) {
    return order
      ?.map((item: any) => item.total_price)
      .reduce((curr, val) => curr + val, 0);
  }
  return 0;
};
