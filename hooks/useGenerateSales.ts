import React from "react";
import { OrdersResponse, OrderItemsResponse } from "types/pocketbase-types";

interface Props extends OrdersResponse {
  expand: {
    order_items: OrderItemsResponse[];
  };
}

const useGenerateSales = (orderData: Props[]) => {
  const flattenedOrderItems = orderData.flatMap(
    (order) => order.expand.order_items
  );

  // Then, we can use reduce to group the items by category name, parent name, name, size, and type
  const groupedOrderItems = flattenedOrderItems.reduce(
    (accumulator: any, currentItem: any) => {
      const key = `${currentItem.expand.category.name}_${currentItem.parent_name}_${currentItem.name}_${currentItem.size}_${currentItem.type}`;
      if (!accumulator[key]) {
        accumulator[key] = {
          category_name: currentItem.expand.category.name,
          parent_name: currentItem.parent_name,
          name: currentItem.name,
          size: currentItem.size,
          type: currentItem.type,
          quantity: currentItem.quantity,
          total_price: currentItem.total_price,
        };
      } else {
        accumulator[key].quantity += currentItem.quantity;
        accumulator[key].total_price += currentItem.total_price;
      }
      return accumulator;
    },
    {}
  );

  const result = Object.values(groupedOrderItems).sort((a: any, b: any) => {
    if (a.category_name < b.category_name) {
      return -1;
    }
    if (a.category_name > b.category_name) {
      return 1;
    }
    return 0;
  });

  const headers = [
    { label: "Category", key: "category_name" },
    { label: "Product Name", key: "parent_name" },
    { label: "Flavor", key: "name" },
    { label: "Size", key: "size" },
    { label: "Type", key: "type" },
    { label: "Quantity", key: "quantity" },
    { label: "Total Price", key: "total_price" },
  ];

  return { headers, result };
};

export default useGenerateSales;
