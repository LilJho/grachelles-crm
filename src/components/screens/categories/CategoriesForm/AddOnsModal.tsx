import Button from "@/components/UI/Buttons/Button";
import Label from "@/components/UI/Inputs/Label";
import SearchField from "@/components/UI/Inputs/SearchField";
import Modal from "@/components/UI/Modal/Modal";
import { handleSelectAll, handleSelectData } from "helper/checkBoxSelect";
import { searchFilter } from "helper/searchFilter";
import useDebounce from "hooks/useDebounce";
import useFetchData from "hooks/useFetchData";
import React, { useState } from "react";
import { Collections } from "types/pocketbase-types";

interface IModal {
  isOpen: boolean;
  toggle: () => void;
  setData: (product: any) => void;
  setSelectedRows: (row: any) => void;
  selectedRows: any[];
}

const AddOnsModal = ({
  isOpen,
  toggle,
  setData,
  selectedRows,
  setSelectedRows,
}: IModal) => {
  const { data: addOnsData } = useFetchData({
    collectionName: Collections.AddOns,
  });

  const [query, setQuery] = useState("");
  const debouncedValue = useDebounce<string>(query, 500);

  const filteredVariants = searchFilter(addOnsData, debouncedValue);

  const handleSaveSelection = () => {
    setData((prev: any) => ({
      ...prev,
      add_ons: selectedRows.map((val: { id: string }) => val.id),
    }));
    toggle();
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      title="Add New Add Ons"
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
          <Button size="sm" variant="light" color="blue">
            New Add Ons
          </Button>
        </div>
        <label className="flex items-center justify-end gap-2 -mb-2 max-w-max ml-auto cursor-pointer">
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
                  className="flex gap-6 items-center px-4 py-2 border-b border-gray-300 last:border-b-0 text-sm cursor-pointer"
                >
                  <input
                    className="w-5 h-5 border-gray-200 rounded-md cursor-pointer checked:bg-primary-600"
                    type="checkbox"
                    checked={(selectedRows as any)?.includes(val)}
                    onChange={() => handleSelectData(val, setSelectedRows)}
                  />

                  <span className="capitalize">{val.name}</span>
                </label>
              );
            })
          ) : (
            <div className="flex-1 my-auto font-semibold text-center text-gray-400 flex items-center justify-center">
              <h4>No add ons available</h4>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-between border-gray-300">
          <Button size="sm" color="gray" variant="light" onClick={toggle}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSaveSelection}>
            Save Selection
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddOnsModal;
