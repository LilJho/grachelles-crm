import Heading from "@/components/UI/Heading";
import React, { FC, memo, useState } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import MenuCard from "./MenuCard";
import { ProductsResponse, CategoriesResponse } from "types/pocketbase-types";
import NoProducts from "public/images/Farmers-market-cuate.svg";
import Image from "next/image";
import useToggle from "hooks/useToggle";
import ProductOptions from "./ProductOptions/ProductOptions";
import useGetOne from "hooks/useGetOne";

interface IMenus {
  currentMenu: { name: string; id: string };
  onClick: () => void;
  data: ProductsResponse<unknown>[] | undefined;
}

const MenuList: FC<IMenus> = ({ currentMenu, onClick, data }) => {
  const { data: category } = useGetOne<
    CategoriesResponse & {
      expand: {
        add_ons: [];
        branch: [];
      };
    }
  >({
    collectionName: "categories",
    id: currentMenu.id,
    expand: "add_ons, branch",
    queryKey: "category",
  });

  const filterData = data?.filter((val) => val.category === currentMenu.id);

  const [selectedProduct, setSelectedProduct] = useState<ProductsResponse>();

  const [showProductOption, toggleProductOption] = useToggle();

  const handleProductToggle = (val: ProductsResponse) => {
    setSelectedProduct(val);
    toggleProductOption();
  };

  return (
    <>
      <button className="flex items-center gap-2" onClick={onClick}>
        <HiArrowNarrowLeft className="w-5 h-5" />
        <Heading>{currentMenu?.name + " Menu"}</Heading>
      </button>
      {filterData?.length ? (
        <div className="grid gap-5 grid-flow-row grid-cols-3 sm:flex sm:flex-wrap mt-4">
          {filterData?.map((val) => (
            <MenuCard
              key={val?.id}
              label={val.parent_name}
              onClick={() => handleProductToggle(val)}
            />
          ))}
        </div>
      ) : (
        <NoProductsState />
      )}
      {showProductOption ? (
        <ProductOptions
          isOpen={showProductOption}
          toggle={toggleProductOption}
          data={
            selectedProduct as ProductsResponse & {
              expand: {
                product_variants: Array<{
                  name: string;
                  size: string;
                  type: string;
                  price: number;
                  sinkers: string;
                  ingredients: string[];
                }>;
              };
            }
          }
          addOns={category?.expand?.add_ons}
          categoryID={currentMenu.id}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default memo(MenuList);

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
