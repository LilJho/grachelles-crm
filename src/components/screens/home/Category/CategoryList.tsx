import Heading from "@/components/UI/Heading";
import React, { FC } from "react";
import CategoryCard from "./CategoryCard";
import { CategoriesResponse } from "types/pocketbase-types";
import ProductLoadingState from "../ProductLoadingState";
import Image from "next/image";
import NoProducts from "public/images/Farmers-market-cuate.svg";

interface ICategoryProps {
  data: CategoriesResponse<unknown>[] | undefined;
  setCurrentTab: (index: { name: string; id: string }) => void;
  isLoading: boolean;
}

const CategoryList: FC<ICategoryProps> = ({
  data,
  setCurrentTab,
  isLoading,
}) => {
  return (
    <div>
      <Heading>Category</Heading>
      {!isLoading && data?.length === 0 ? (
        <div>
          <NoProductsState />
        </div>
      ) : (
        <div className="grid gap-5 grid-flow-row grid-cols-3 sm:flex sm:flex-wrap mt-4">
          {isLoading ? (
            <ProductLoadingState />
          ) : (
            data?.map((val) => (
              <CategoryCard
                key={val.id}
                label={val.name}
                image={val.image}
                onClick={() => setCurrentTab({ name: val.name, id: val.id })}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryList;

const NoProductsState = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-8 opacity-60">
      <Image
        src={NoProducts}
        className="w-3/5 max-w-[400px] h-auto"
        alt="Farmers Market Illustration"
      />
      <h3 className="text-lg font-medium text-gray-400">
        No products available
      </h3>
    </div>
  );
};
