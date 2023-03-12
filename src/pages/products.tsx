import MainLayout from "@/components/layout/MainLayout";
import React, { useState } from "react";
import useFetchData from "hooks/useFetchData";
import { Collections } from "types/pocketbase-types";
import Table, {
  TableColumn,
  TableHead,
  TableRow,
} from "@/components/UI/Table/Table";

const ProductsPage = () => {
  const { data, isLoading } = useFetchData({
    collectionName: Collections.Products,
  });

  if (isLoading) {
    return "Pakyu";
  }
  console.log(data);

  // const data = [
  //   {
  //     productName: "Chicken Fillet",
  //     category: "Main Dishes",
  //     productType: "Food",
  //     Branch: "Tiniguiban",
  //   },
  //   {
  //     productName: "Jinro Soju",
  //     category: "Liquors",
  //     productType: "Drink",
  //     Branch: "Tiniguiban",
  //   },
  //   {
  //     productName: "Classic Hotdog Fries",
  //     category: "Sandwiches",
  //     productType: "Food",
  //     Branch: "Tiniguiban",
  //   },
  // ];

  return (
    <MainLayout>
      <div className="w-full p-4 bg-gray-300 rounded-xl">
        <Table
          header={
            <>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Product Type</TableHead>
              <TableHead>Branch</TableHead>
            </>
          }
        >
          {data?.map((product) => (
            <TableRow key={product.id}>
              <TableColumn>{product.parent_name}</TableColumn>
              <TableColumn>{product.category}</TableColumn>
              <TableColumn>{product.product_type}</TableColumn>
              <TableColumn>{product.branch}</TableColumn>
            </TableRow>
          ))}
        </Table>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
