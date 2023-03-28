import {
  StocksResponse,
  ProductsResponse,
  ProductVariantsResponse,
  BranchesResponse,
  CategoriesResponse,
  OrdersResponse,
  OrderItemsResponse,
  CashierSalesResponse,
  UsersResponse,
  EmployeeResponse,
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
export interface IOrderProps {
  data: IExpandedOrderResponse[];
  isLoading: boolean;
}

export interface IExpandedOrderResponse extends OrdersResponse {
  expand: {
    order_items: OrderItemsResponse[];
  };
}
export interface ICashierSalesProps {
  data: IExpandedCashierSalesResponse[];
  isLoading: boolean;
}

export interface IExpandedCashierSalesResponse extends CashierSalesResponse {
  expand: {
    user: IExpandedEmployeeSalesResponse[];
  };
}
export interface IExpandedEmployeeSalesResponse extends UsersResponse {
  expand: {
    employee_data: EmployeeResponse;
  };
}

export interface IAccounts {
  data: ExpandedUser[];
  isLoading?: boolean;
}

export interface ExpandedUser extends UsersResponse {
  expand: {
    branch: BranchesResponse[];
    employee_data: EmployeeResponse;
  };
}
