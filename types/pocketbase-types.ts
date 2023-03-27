/**
 * This file was @generated using pocketbase-typegen
 */

export enum Collections {
  AddOns = "add_ons",
  Branches = "branches",
  CashierSales = "cashier_sales",
  Categories = "categories",
  CustomFields = "custom_fields",
  DailyTimeRecords = "daily_time_records",
  Employee = "employee",
  Expenses = "expenses",
  Ingredients = "ingredients",
  LoginLogs = "login_logs",
  OrderAddOns = "order_add_ons",
  OrderItems = "order_items",
  Orders = "orders",
  ProductVariants = "product_variants",
  Products = "products",
  StockLogs = "stock_logs",
  Stocks = "stocks",
  Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString;
  created: IsoDateString;
  updated: IsoDateString;
  collectionId: string;
  collectionName: Collections;
  expand?: T;
};

export type AuthSystemFields<T = never> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export interface AddOnsRecord {
  name: string;
  branch: RecordIdString;
  ingredients?: RecordIdString[];
  price?: number;
}

export interface AddOnsRecordExtend extends AddOnsRecord {
  quantity: number;
  total_amount: number;
}

export type BranchesRecord = {
  name: string;
};

export type CashierSalesRecord = {
  branch: RecordIdString;
  datetime: IsoDateString;
  user: RecordIdString;
  sales_by_cashier?: number;
  sales_by_system?: number;
  expenses?: RecordIdString[];
};

export type CategoriesRecord = {
  name: string;
  image?: string;
  add_ons?: RecordIdString[];
};

export type CustomFieldsRecord = {
  name: string;
  type: string;
  price?: number;
  ingredients?: RecordIdString;
};

export enum DailyTimeRecordsTypeOptions {
  "time-in" = "time-in",
  "time-out" = "time-out",
}
export type DailyTimeRecordsRecord = {
  datetime: string;
  type: DailyTimeRecordsTypeOptions;
  time: string;
  employee: RecordIdString;
};

export enum EmployeeGenderOptions {
  "male" = "male",
  "female" = "female",
}
export type EmployeeRecord = {
  branch: RecordIdString[];
  name: string;
  gender: EmployeeGenderOptions;
  birthday: IsoDateString;
  contact: string;
  address: string;
};

export type ExpensesRecord = {
  name: string;
  branch: RecordIdString;
  quantity: number;
  price: number;
  total_price: number;
};

export type IngredientsRecord = {
  name: string;
  stock: RecordIdString;
  quantity: number;
};

export type LoginLogsRecord = {
  branch: RecordIdString;
  user: RecordIdString;
};

export type OrderAddOnsRecord = {
  name: string;
  quantity: number;
  price?: number;
  total_amount?: number;
};

export enum OrderItemsSizeOptions {
  "small" = "small",
  "medium" = "medium",
  "large" = "large",
}

export enum OrderItemsTypeOptions {
  "hot" = "hot",
  "cold" = "cold",
  "pearl" = "pearl",
  "nata" = "nata",
}

export enum OrderItemsSinkersOptions {
  "pearl" = "pearl",
  "nata" = "nata",
}

export type OrderItemsRecord = {
  orderID: string;
  parent_name: string;
  category: RecordIdString;
  name: string;
  size?: OrderItemsSizeOptions;
  type?: OrderItemsTypeOptions;
  sinkers?: OrderItemsSinkersOptions;
  added_addons?: [];
  selling_price?: number;
  quantity: number;
  total_price?: number;
  product_type?: string;
  branch?: RecordIdString;
  id?: string;
};

export enum OrdersPaymentMethodOptions {
  "cash" = "cash",
  "gcash" = "gcash",
}

export enum OrdersServiceMethodOptions {
  "dine-in" = "dine-in",
  "take-out" = "take-out",
}
export type OrdersRecord = {
  branch: RecordIdString;
  is_serve?: boolean;
  delivery_fee?: number;
  payment_method: OrdersPaymentMethodOptions;
  service_method: OrdersServiceMethodOptions;
  sub_total?: number;
  total_amount?: number;
  total_drinks_count?: number;
  total_food_count?: number;
  order_add_ons?: RecordIdString[];
  order_items: RecordIdString[];
  id?: string;
  created?: string;
  expand?: {
    order_items: OrderItemsRecord[];
  };
  all_ingredients_id?: string[];
  discount: boolean;
  transactionTime: string;
};

export enum ProductVariantsSizeOptions {
  "small" = "small",
  "medium" = "medium",
  "large" = "large",
}

export enum ProductVariantsTypeOptions {
  "hot" = "hot",
  "cold" = "cold",
  "pearl" = "pearl",
  "nata" = "nata",
}
export type ProductVariantsRecord = {
  name: string;
  size?: ProductVariantsSizeOptions;
  type?: ProductVariantsTypeOptions;
  price?: number;
  ingredients?: RecordIdString[];
};

export enum ProductsProductTypeOptions {
  "drink" = "drink",
  "food" = "food",
}
export type ProductsRecord = {
  parent_name: string;
  category: RecordIdString;
  branch: RecordIdString;
  image?: string;
  product_type: ProductsProductTypeOptions;
  base_ingredients?: RecordIdString[];
  product_variants: RecordIdString[];
  custom_field?: RecordIdString[];
};

export enum StockLogsTypeOptions {
  "in" = "in",
  "out" = "out",
}
export type StockLogsRecord = {
  branch: RecordIdString;
  quantity: number;
  stock: RecordIdString;
  type: StockLogsTypeOptions;
  user: RecordIdString;
};

export enum StocksMeasurementOptions {
  "pieces" = "pieces",
  "grams" = "grams",
  "mg" = "mg",
}

export enum StocksTypeOptions {
  "powder" = "powder",
}
export type StocksRecord = {
  name: string;
  branch: RecordIdString;
  measurement: StocksMeasurementOptions;
  type: StocksTypeOptions;
  quantity: number;
};

export enum UsersRolesOptions {
  "admin" = "admin",
  "cashier" = "cashier",
  "stocker" = "stocker",
  "chef" = "chef",
}
export type UsersRecord = {
  name?: string;
  avatar?: string;
  roles: UsersRolesOptions[];
  branch: RecordIdString[];
  employee_data: RecordIdString;
};

// Response types include system fields and match responses from the PocketBase API
export type AddOnsResponse<Texpand = unknown> = AddOnsRecord &
  BaseSystemFields<Texpand>;
export type BranchesResponse = BranchesRecord & BaseSystemFields;
export type CashierSalesResponse<Texpand = unknown> = CashierSalesRecord &
  BaseSystemFields<Texpand>;
export type CategoriesResponse<Texpand = unknown> = CategoriesRecord &
  BaseSystemFields<Texpand>;
export type CustomFieldsResponse<Texpand = unknown> = CustomFieldsRecord &
  BaseSystemFields<Texpand>;
export type DailyTimeRecordsResponse<Texpand = unknown> =
  DailyTimeRecordsRecord & BaseSystemFields<Texpand>;
export type EmployeeResponse<Texpand = unknown> = EmployeeRecord &
  BaseSystemFields<Texpand>;
export type ExpensesResponse<Texpand = unknown> = ExpensesRecord &
  BaseSystemFields<Texpand>;
export type IngredientsResponse<Texpand = IngredientsResponseExpand> =
  IngredientsRecord & BaseSystemFields<Texpand>;
export type LoginLogsResponse<Texpand = unknown> = LoginLogsRecord &
  BaseSystemFields<Texpand>;
export type OrderAddOnsResponse = OrderAddOnsRecord & BaseSystemFields;
export type OrderItemsResponse<Texpand = unknown> = OrderItemsRecord &
  BaseSystemFields<Texpand>;
export type OrdersResponse<Texpand = unknown> = OrdersRecord &
  BaseSystemFields<Texpand>;
export type ProductVariantsResponse<Texpand = unknown> = ProductVariantsRecord &
  BaseSystemFields<Texpand>;
export type ProductsResponse<Texpand = unknown> = ProductsRecord &
  BaseSystemFields<Texpand>;
export type StockLogsResponse<Texpand = unknown> = StockLogsRecord &
  BaseSystemFields<Texpand>;
export type StocksResponse<Texpand = unknown> = StocksRecord &
  BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = UsersRecord &
  AuthSystemFields<Texpand>;

export type CollectionRecords = {
  add_ons: AddOnsRecord;
  branches: BranchesRecord;
  cashier_sales: CashierSalesRecord;
  categories: CategoriesRecord;
  custom_fields: CustomFieldsRecord;
  daily_time_records: DailyTimeRecordsRecord;
  employee: EmployeeRecord;
  expenses: ExpensesRecord;
  ingredients: IngredientsRecord;
  login_logs: LoginLogsRecord;
  order_add_ons: OrderAddOnsRecord;
  order_items: OrderItemsRecord;
  orders: OrdersRecord;
  product_variants: ProductVariantsRecord;
  products: ProductsRecord;
  stock_logs: StockLogsRecord;
  stocks: StocksRecord;
  users: UsersRecord;
};

export type IngredientsResponseExpand = {
  stock: StocksResponse;
};
