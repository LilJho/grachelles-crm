import Button from "@/components/UI/Buttons/Button";
import Label from "@/components/UI/Inputs/Label";
import SearchField from "@/components/UI/Inputs/SearchField";
import Modal from "@/components/UI/Modal/Modal";
import { handleSelectAll, handleSelectData } from "helper/checkBoxSelect";
import { searchFilter } from "helper/searchFilter";
import useDebounce from "hooks/useDebounce";
import useFetchData from "hooks/useFetchData";
import useToggle from "hooks/useToggle";
import React, { useState } from "react";
import { Collections } from "types/pocketbase-types";
import AddNewVariant from "./AddNewVariant";

interface IModal {
  isOpen: boolean;
  toggle: () => void;
  setProductData: (product: any) => void;
  setSelectedRows: (row: any) => void;
  selectedRows: any[];
}

const ProductsVariantModal = ({
  isOpen,
  toggle,
  setProductData,
  selectedRows,
  setSelectedRows,
}: IModal) => {
  const { data: variantsData, isLoading: variantsLoading } = useFetchData({
    collectionName: Collections.ProductVariants,
  });

  const [query, setQuery] = useState("");
  const debouncedValue = useDebounce<string>(query, 500);

  const filteredVariants = searchFilter(variantsData, debouncedValue);

  const handleSaveSelection = () => {
    setProductData((prev: any) => ({
      ...prev,
      product_variants: selectedRows.map((val: { id: string }) => val.id),
    }));
    toggle();
  };

  const [showVariantForm, toggleVariantForm] = useToggle();

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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            size="sm"
            variant="light"
            color="blue"
            onClick={toggleVariantForm}
          >
            New Variant
          </Button>
        </div>
        <label className="flex items-center justify-end gap-2 ml-auto -mb-2 cursor-pointer max-w-max">
          <input
            className="w-5 h-5 border-gray-200 rounded-md cursor-pointer checked:bg-primary-600"
            type="checkbox"
            checked={selectedRows?.length === filteredVariants.length}
            onChange={() =>
              handleSelectAll(filteredVariants as any, setSelectedRows)
            }
          />
          <span>Select All</span>
        </label>
        <div className="border border-gray-300 rounded-md min-h-[200px] max-h-96 overflow-auto py-1 relative flex flex-col">
          {filteredVariants.length ? (
            filteredVariants?.sort()?.map((val: any) => {
              return (
                <label
                  key={val.id as any}
                  className="flex items-center gap-6 px-4 py-2 text-sm border-b border-gray-300 cursor-pointer last:border-b-0"
                >
                  <input
                    className="w-5 h-5 border-gray-200 rounded-md cursor-pointer checked:bg-primary-600"
                    type="checkbox"
                    checked={(selectedRows as any)?.includes(val)}
                    onChange={() => handleSelectData(val, setSelectedRows)}
                  />

                  <span className="capitalize">{`${val.category}${
                    val.parent_name ? " - " + val.parent_name : ""
                  }${val.name ? " - " + val.name : ""}${
                    val.size ? " - " + val.size : ""
                  }${val.type ? " - " + val.type : ""}${
                    val.sinkers ? " - " + val.sinkers : ""
                  }`}</span>
                </label>
              );
            })
          ) : (
            <div className="flex items-center justify-center flex-1 my-auto font-semibold text-center text-gray-400">
              <h4>No product variants available</h4>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-4 border-gray-300">
          <Button size="sm" color="gray" variant="light" onClick={toggle}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSaveSelection}>
            Save Selection
          </Button>
        </div>
      </div>
      {showVariantForm && (
        <AddNewVariant isOpen={showVariantForm} toggle={toggleVariantForm} />
      )}
    </Modal>
  );
};

export default ProductsVariantModal;
