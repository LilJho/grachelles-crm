import React from "react";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";

interface IQuantityControllerProps {
  quantity: number;
  setQuantity: (index: any) => void;
}

const QuantityController = ({
  quantity = 1,
  setQuantity,
}: IQuantityControllerProps) => {
  const handleAddQuantity = () => {
    setQuantity((prev: number) => prev + 1);
  };
  const handleSubtractQuantity = () => {
    setQuantity((prev: number) => prev - 1);
  };

  return (
    <div className="flex items-center gap-4 mt-2">
      <ControlButton onClick={handleSubtractQuantity} disabled={quantity <= 1}>
        <RiSubtractFill className="w-4 h-4" />
      </ControlButton>
      <h3 className="text-xl font-medium">{quantity}</h3>
      <ControlButton onClick={handleAddQuantity}>
        <RiAddFill className="w-4 h-4" />
      </ControlButton>
    </div>
  );
};

export default QuantityController;

const ControlButton = ({
  children,
  disabled = false,
  onClick = () => {},
}: any) => {
  return (
    <button
      className="bg-primary-500 text-white rounded-full p-1.5 inline-block active:scale-95 transition-transform disabled:bg-gray-100 disabled:text-gray-800 disabled:hover:bg-gray-200 disabled:active:bg-gray-200 disabled:active:scale-100"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
