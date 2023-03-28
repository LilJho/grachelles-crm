import Button from "@/components/UI/Buttons/Button";
import Label from "@/components/UI/Inputs/Label";
import SearchField from "@/components/UI/Inputs/SearchField";
import Modal from "@/components/UI/Modal/Modal";
import useFetchData from "hooks/useFetchData";
import React from "react";
import { Collections } from "types/pocketbase-types";

interface IModal {
  isOpen: boolean;
  toggle: () => {};
}

const ProductsVariantModal = ({ isOpen, toggle }: IModal) => {
  const { data: variantsData, isLoading: variantsLoading } = useFetchData({
    collectionName: Collections.ProductVariants,
  });

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      title="Add Product Variant"
      closeButton
      maxWidth="max-w-3xl"
      titleSize="sm"
    >
      <div className="flex flex-col gap-6">
        <div className="flex gap-6">
          <SearchField
            size="sm"
            fullWidth
            placeholder="Search Product Variant"
          />
          <Button size="sm" variant="light" color="blue">
            New Variant
          </Button>
        </div>
        <div className="border border-gray-300 rounded-md min-h-[200px] max-h-96 overflow-auto py-1">
          {variantsData?.map((val) => {
            return (
              <label
                key={val.id}
                className="flex gap-6 items-center px-4 py-2 border-b border-gray-300 last:border-b-0 text-sm cursor-pointer"
              >
                <input
                  className="w-5 h-5 border-gray-200 rounded-md cursor-pointer checked:bg-primary-600"
                  type="checkbox"
                  //   onChange={onChange}
                  //   value={value}
                  //   checked={checked}
                />
                <span>{val.name}</span>
              </label>
            );
          })}
          {/* <h5 className="font-semibold text-center text-gray-400">
            No product variants available
          </h5> */}
        </div>
        <div>
          <Label>Selected</Label>
          <div className="text-sm">No selected records</div>
        </div>
        <div className="mt-4 flex justify-between border-t border-gray-300 pt-6">
          <Button size="sm" color="gray" variant="light">
            Cancel
          </Button>
          <Button size="sm">Save Selection</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductsVariantModal;
