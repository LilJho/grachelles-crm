import {
  OrderItemsRecord,
  AddOnsRecordExtend,
  StocksResponse,
} from "types/pocketbase-types";

export interface IStoreProps {}

export interface IInventoryProps {
  data: IExpandedStocksResponse[];
  isLoading: boolean;
}

export interface IExpandedStocksResponse extends StocksResponse {
  expand: {
    branch: {
      name: string;
    };
  };
}
