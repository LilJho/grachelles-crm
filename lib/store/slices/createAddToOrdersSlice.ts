import { OrderItemsRecord } from "types/pocketbase-types";

const createAddToOrdersSlice = (set: any) => ({
  order: [] as OrderItemsRecord[],
  setOrder: (order: OrderItemsRecord[]) => set({ order }),
});

export default createAddToOrdersSlice;
