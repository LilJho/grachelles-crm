import TextField from "@/components/UI/Inputs/TextField";
import Modal from "@/components/UI/Modal/Modal";
import SelectField from "@/components/UI/Selects/SelectField";
import React from "react";
import FoodMeasurement from "data/FoodMeasurement.json";
import StockTypes from "data/StockTypes.json";
import useFetchData from "hooks/useFetchData";
import { BranchesResponse, Collections } from "types/pocketbase-types";
import Button from "@/components/UI/Buttons/Button";
import { RiLoader5Line } from "react-icons/ri";
import NumberField from "@/components/UI/Inputs/NumberField";

interface IFormData {
  name: string;
  quantity: number;
  measurement: string;
  type: string;
  branch: {
    id: string;
    name: string;
  };
}

interface IInventoryFormProps {
  isOpen: boolean;
  toggle: () => void;
  mode?: "add" | "edit";
  onSubmit: (val: any) => void;
  isLoading: boolean;
  formData: IFormData;
  setFormData: any;
}

const InventoryForm = ({
  isOpen,
  toggle,
  mode = "add",
  onSubmit = () => {},
  isLoading = false,
  setFormData,
  formData,
}: IInventoryFormProps) => {
  const { data: BranchData, isLoading: BranchLoading } =
    useFetchData<BranchesResponse>({
      collectionName: Collections.Branches,
    });

  const handleFormChange = (key: string, val: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: val }));
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key !== "Backspace" && isNaN(parseInt(event.key, 10))) {
      event.preventDefault();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      title={FormMode[mode].title}
      closeButton
    >
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <TextField
          size="sm"
          label="Name"
          required
          value={formData.name}
          onChange={(e) => handleFormChange("name", e.target.value)}
        />
        <div className="flex items-center gap-6 w-full">
          <NumberField
            size="sm"
            label="Quantity"
            fullWidth
            required
            value={formData.quantity === 0 ? "" : formData.quantity}
            onChange={(e) => handleFormChange("quantity", Number(e))}
          />
          <SelectField
            size="sm"
            label="Measurement"
            data={FoodMeasurement.measurements}
            fullWidth
            required
            value={formData.measurement}
            onChange={(e) => handleFormChange("measurement", e)}
          />
          <SelectField
            size="sm"
            label="Type"
            data={StockTypes.StocksType}
            fullWidth
            required
            value={formData.type}
            onChange={(e) => handleFormChange("type", e)}
          />
        </div>
        {mode === "add" && (
          <SelectField
            label="Branch"
            size="sm"
            data={BranchData}
            objKey="name"
            required
            value={formData.branch}
            onChange={(e) => handleFormChange("branch", e)}
            fullWidth
          />
        )}
        <div className="flex justify-between mt-4">
          <Button
            size="sm"
            color="gray"
            variant="light"
            onClick={isLoading ? () => {} : toggle}
          >
            Cancel
          </Button>
          <Button size="sm" type={isLoading ? "button" : "submit"}>
            {isLoading ? (
              <div className="w-12 flex justify-center">
                <RiLoader5Line className="animate-spin w-6 h-6" />
              </div>
            ) : (
              <>{FormMode[mode].button}</>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default InventoryForm;

const FormMode = {
  add: {
    title: "Add Stock",
    button: "Add New Stock",
  },
  edit: {
    title: "Update Stock",
    button: "Update Stock Record",
  },
};
