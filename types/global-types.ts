import { OrderItemsRecord, AddOnsRecordExtend } from "types/pocketbase-types";

export interface IStoreProps {
  order: OrderItemsRecord[];
  setOrder: (order: OrderItemsRecord[]) => void;

  addOnsList: AddOnsRecordExtend[];
  setAddOnsList: (addOnsList: AddOnsRecordExtend[]) => void;

  allIngredients: string[];
  setAllIngredients: (index: string[]) => void;
}

export interface PendingPaymentData {
  id: string;
  timeStamp: string;
  orders: OrderItemsRecord[];
  addOns: AddOnsRecordExtend[];
}
