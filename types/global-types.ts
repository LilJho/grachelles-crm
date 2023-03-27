import {
  OrderItemsRecord,
  AddOnsRecordExtend,
  StocksResponse,
  ProductsResponse,
  ProductsRecord,
  ProductVariantsRecord,
  ProductVariantsResponse,
  BranchesResponse,
  CategoriesResponse,
} from "types/pocketbase-types";

export interface IStoreProps {}

export interface IInventoryProps {
  data: IExpandedStocksResponse[];
  isLoading: boolean;
}

export interface IExpandedStocksResponse extends StocksResponse {
  expand: {
    branch: BranchesResponse;
  };
}
export interface IProductProps {
  data: IExpandedProductResponse[];
  isLoading: boolean;
}

export interface IExpandedProductResponse extends ProductsResponse {
  expand: {
    branch: BranchesResponse;
    product_variants: ProductVariantsResponse[];
    category: CategoriesResponse;
  };
}
