import React, { useState } from "react";
import {
  ProductsResponse,
  AddOnsRecord,
  OrderItemsSizeOptions,
  OrderItemsTypeOptions,
  OrderItemsSinkersOptions,
} from "types/pocketbase-types";
import GrachellesImage from "public/images/grachelles.png";
import Image from "next/image";
import DefaultModal from "@/components/UI/Modal/DefaultModal";
import QuantityController from "./QuantityController";
import { getUniqueValues } from "helper/getUniqueValues";
import Button from "@/components/UI/Button/Button";
import Options from "./Options";
import AddOns from "./AddOns";
import useStore from "lib/store/useStore";
import useSelectedProductOptions from "hooks/useSelectedProductOptions ";
import useProductAmountCalculation from "hooks/useProductAmountCalculation";
import { v4 as uuid } from "uuid";

interface IProductOptionsProps {
  isOpen: boolean;
  toggle: () => void;
  data:
    | (ProductsResponse & {
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
      })
    | undefined;
  addOns: AddOnsRecord[] | undefined;
  categoryID: string;
}

interface IAddedAddonsProp {
  quantity: number;
  total_price: number;
  name: string;
  branch: string;
  ingredients?: string[] | undefined;
  price?: number | undefined;
}

const ProductOptions = ({
  isOpen,
  toggle,
  data,
  addOns,
  categoryID,
}: IProductOptionsProps) => {
  const productVariant = data?.expand.product_variants;

  const names = getUniqueValues(productVariant, "name");
  const sizes = getUniqueValues(productVariant, "size", ["r", "s", "m", "l"]);
  const types = getUniqueValues(productVariant, "type");
  const sinkers = getUniqueValues(productVariant, "sinkers", ["p", "n"]);
  const options = { names, sizes, types, sinkers };
  const { selectedOptions, handleSelectOption } =
    useSelectedProductOptions(options);

  //Code for finding the selected product
  const findSelectedProduct = productVariant?.find(
    (val) =>
      val.name === selectedOptions.names.value &&
      val.size === selectedOptions.sizes.value &&
      val.type === selectedOptions.types.value &&
      val.sinkers === selectedOptions.sinkers.value
  );

  const [quantity, setQuantity] = useState<number>(1);

  const [addedAddOns, setAddedAddOns] = useState(
    addOns?.map((val) => ({ ...val, quantity: 0, total_price: 0 }))
  );

  const totalAmount = useProductAmountCalculation({
    findSelectedProduct,
    addedAddOns,
    quantity,
  });

  const [order, setOrder] = useStore((state) => [state.order, state.setOrder]);
  const [allIngredients, setAllIngredients] = useStore((state) => [
    state.allIngredients,
    state.setAllIngredients,
  ]);
  const [addOnsList, setAddOnsList] = useStore((state) => [
    state.addOnsList,
    state.setAddOnsList,
  ]);

  //Check if order has addons
  const added_addons = addedAddOns?.filter((val) => val.quantity !== 0) ?? [];
  const addOnsDetails = added_addons?.map((val) => ({
    name: val.name,
    quantity: val.quantity,
  }));

  const getIngredientsOnly = added_addons?.map((val) => val.ingredients);
  const getAllAddOnsIDs: string[] =
    (getIngredientsOnly?.flat() as string[]) ?? [];
  const handleAddOrder = () => {
    if (data && findSelectedProduct) {
      setOrder([
        ...order,
        {
          orderID: uuid(),
          parent_name: data.parent_name,
          category: categoryID,
          name: findSelectedProduct.name,
          size: findSelectedProduct.size as OrderItemsSizeOptions,
          type: findSelectedProduct.type as OrderItemsTypeOptions,
          sinkers: findSelectedProduct.sinkers as OrderItemsSinkersOptions,
          selling_price: findSelectedProduct.price,
          quantity,
          total_price: Number(totalAmount),
          added_addons: addOnsDetails as [],
          product_type: data.product_type,
        },
      ]);
      setAddOnsList([...addOnsList, added_addons as any]);
      setAllIngredients([
        ...allIngredients,
        ...(data.base_ingredients as string[]),
        ...getAllAddOnsIDs,
        ...findSelectedProduct.ingredients,
      ]);
    }
    toggle();
  };

  return (
    <DefaultModal toggle={toggle} isOpen={isOpen}>
      <div className="mt-1 flex flex-col h-full">
        <div className="flex flex-col justify-center items-center">
          <Image
            src={GrachellesImage}
            alt="Product Image"
            className="rounded-md w-24 h-24 object-cover"
          />
          <h2 className="text-lg font-medium mt-2">{data?.parent_name}</h2>
          <QuantityController setQuantity={setQuantity} quantity={quantity} />
        </div>
        <div className="my-4 flex-1 flex flex-col gap-4 overflow-y-auto">
          <Options
            data={sizes}
            label="Sizes"
            selectedOptions={selectedOptions}
            handleSelectOption={handleSelectOption}
            objKey="sizes"
            type="letter"
          />
          <Options
            data={names}
            label="Flavors"
            selectedOptions={selectedOptions}
            handleSelectOption={handleSelectOption}
            objKey="names"
          />
          <Options
            data={types}
            label="Variant"
            selectedOptions={selectedOptions}
            handleSelectOption={handleSelectOption}
            objKey="types"
          />
          <Options
            data={sinkers}
            label="Sinkers"
            selectedOptions={selectedOptions}
            handleSelectOption={handleSelectOption}
            objKey="sinkers"
          />
          <AddOns addOns={addedAddOns} setAddedAddOns={setAddedAddOns} />
        </div>
        {findSelectedProduct === undefined && (
          <span className="text-xs text-red-400 text-center py-1.5">
            This product is not available!
          </span>
        )}
        <div className="flex gap-2 justify-between mt-auto justify-self-end">
          <div className="flex flex-col">
            <span className="text-xs">Total amount</span>
            <h6 className="font-semibold">{`₱ ${totalAmount}`}</h6>
          </div>
          <Button
            size="sm"
            disabled={findSelectedProduct === undefined}
            onClick={handleAddOrder}
          >
            Add to billing
          </Button>
        </div>
      </div>
    </DefaultModal>
  );
};

export default React.memo(ProductOptions);

// Do not remove
// const sameOrder = order.find((val: any) => {
//   // Check if the product name, size, and type match
//   if (
//     val.name === selectedOptions.names.value &&
//     val.size === selectedOptions.sizes.value &&
//     val.type === selectedOptions.types.value
//   ) {
//     // Check if the added addons arrays are the same
//     const valAddonsJSON = JSON.stringify(val.added_addons);
//     const addedAddonsJSON = JSON.stringify(added_addons);
//     return valAddonsJSON === addedAddonsJSON;
//   }
//   return false;
// });
