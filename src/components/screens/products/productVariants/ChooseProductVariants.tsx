import Modal from "@/components/UI/Modal/Modal";
import { FormEvent, useState } from "react";
import useFetchData from "hooks/useFetchData";
import { Collections } from "types/pocketbase-types";
import ComboBox from "@/components/UI/Selects/ComboBox";
import Button from "@/components/UI/Buttons/Button";

interface ProductData {
  name: string;
  type: string;
  category: {
    id: string;
    name: string;
  };
  branch: {
    id: string;
    name: string;
  };
  baseIngredient: number[];
  productVariant: string;
}

interface IModal {
  setProductData: (prev: ProductData) => void;
  isOpen: boolean;
  toggle: () => void;
}

const ChooseProductVariants = ({ setProductData, isOpen, toggle }: IModal) => {
  const [productVariant, setProductVariant] = useState({});

  const { data: ProductVariants, isLoading: ProductVarIsLoading } =
    useFetchData({
      collectionName: Collections.ProductVariants,
    });

  if (ProductVarIsLoading) {
    <h1>Loading...</h1>;
  }

  const HandleChange = (value: any) => {
    setProductVariant(value);
  };
  const HandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setProductData((prev) => ({ ...prev, productVariant: productVariant.id }));
    toggle();
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      title={"Choose Product Variants"}
      closeButton
    >
      <form onSubmit={HandleSubmit}>
        <ComboBox
          name="stock"
          data={ProductVariants}
          objKey="name"
          label="Stock"
          size="sm"
          fullWidth
          value={productVariant}
          onChange={(value) => HandleChange(value)}
        />
        <Button type="submit" size="sm" className="mt-10" fullWidth>
          Done
        </Button>
      </form>
    </Modal>
  );
};

export default ChooseProductVariants;
