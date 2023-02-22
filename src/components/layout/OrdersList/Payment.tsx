import Button from "@/components/UI/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import RadioTextCheck from "@/components/UI/Radio/RadioTextCheck";
import SelectField from "@/components/UI/SelectField";
import TextField from "@/components/UI/TextField";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { decreaseStock } from "helper/decreaseStock";
import postMultipleData from "helper/postMultipleData";
import showToast from "helper/showToast";
import useExtractAddOns from "hooks/useExtractAddOns";
import useLocalStorage from "hooks/useLocalStorage";
import usePaymentCalculation from "hooks/usePaymentCalculation";
import { pb } from "lib/database/pocketbase";
import useAuthStore from "lib/store/useAuthStore";
import useStore from "lib/store/useStore";
import React, { useState, FormEvent } from "react";
import { RiLoader5Line } from "react-icons/ri";
import { ToastContainer } from "react-toastify";

interface IPaymentModalProps {
  toggle: () => void;
  isOpen: boolean;
}

const Payment = ({ toggle, isOpen }: IPaymentModalProps) => {
  const [ordersAmount, setOrdersAmount] = useLocalStorage("orders", 0);
  const [giveawayAmount, setGiveawayAmount] = useLocalStorage("giveaway", 0);

  const { currentBranch: user } = useAuthStore();

  const [order, setOrder] = useStore((state) => [state.order, state.setOrder]);

  const allIngredients = useStore((state) => state.allIngredients);

  const [addOnsList, setAddOnsList] = useStore((state) => [
    state.addOnsList,
    state.setAddOnsList,
  ]);

  const [paymentDetails, setPaymentDetails] = useState({
    delivery_fee: 0,
    cash_amount: 0,
    paymentMethod: "Cash",
    serviceType: "Dine-in",
    discount: 0,
    discount_for: "",
  });

  const handleChange = (key: string, value: string | number) => {
    setPaymentDetails((prev) => ({ ...prev, [key]: value }));
  };

  const [
    sub_total,
    getTotalOrdersAmount,
    getCustomerCash,
    getCustomerChange,
    getTotalCount,
  ] = usePaymentCalculation({ order, paymentDetails });

  //format addons data and then merge the similar addons
  const addOns = useExtractAddOns(addOnsList);

  const handleSubmitOrder = useMutation(async (e: FormEvent) => {
    e.preventDefault();
    try {
      const addOnsID = await postMultipleData("order_add_ons", addOns);
      const ordersID = await postMultipleData("order_items", order);

      const formData = {
        order_items: ordersID,
        order_add_ons: addOnsID,
        sub_total: sub_total,
        delivery_fee: paymentDetails.delivery_fee,
        total_amount: getTotalOrdersAmount,
        payment_method: paymentDetails.paymentMethod.toLowerCase(),
        service_method: paymentDetails.serviceType.toLowerCase(),
        is_serve: false,
        total_drinks_count: getTotalCount("drink"),
        total_food_count: getTotalCount("food"),
        branch: user?.id,
        all_ingredients_id: allIngredients,
        discount: paymentDetails.discount,
        discount_for: paymentDetails.discount_for,
      };

      await pb.collection("orders").create(formData);
      // await decreaseStock(allIngredients);

      setOrdersAmount(
        paymentDetails.paymentMethod.toLowerCase() !== "giveaway"
          ? ordersAmount + getTotalOrdersAmount
          : ordersAmount
      );

      // setGiveawayAmount(
      //   paymentDetails.paymentMethod.toLowerCase() === "giveaway"
      //     ? giveawayAmount + getTotalOrdersAmount
      //     : giveawayAmount
      // );

      showToast("Order submitted successfully!");

      toggle();
      setOrder([]);
      setAddOnsList([]);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        title={<span className="text-xl">Payment</span>}
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitOrder.mutate}
        >
          <TextField
            label="Orders total amount"
            size="sm"
            leftIcon="₱"
            value={sub_total}
            readOnly
          />
          <TextField
            label="Delivery fee"
            size="sm"
            leftIcon="₱"
            onChange={(e: { target: { value: string } }) =>
              handleChange("delivery_fee", Number(e.target.value))
            }
            type="number"
            value={
              paymentDetails.delivery_fee === 0
                ? ""
                : paymentDetails.delivery_fee
            }
            placeholder="Enter delivery charge"
          />
          <TextField
            label="Cash amount"
            size="sm"
            leftIcon="₱"
            onChange={(e: { target: { value: string } }) =>
              handleChange("cash_amount", Number(e.target.value))
            }
            value={
              paymentDetails.cash_amount === 0 ? "" : paymentDetails.cash_amount
            }
            placeholder="Enter customer cash amount"
          />
          <div className="flex gap-2">
            <TextField
              label="Discount"
              size="sm"
              leftIcon="%"
              onChange={(e: { target: { value: string } }) =>
                handleChange("discount", Number(e.target.value))
              }
              value={
                paymentDetails.discount === 0 ? "" : paymentDetails.discount
              }
              placeholder="Enter discount"
              fullWidth
            />
            <SelectField
              fullWidth
              label="Discount for"
              data={["PWD", "Senior Citizen", "Promo"]}
              size="sm"
              onChange={(e) => handleChange("discount_for", e)}
              value={paymentDetails.discount_for || ""}
            />
          </div>
          <RadioTextCheck
            label="Payment Method"
            size="sm"
            options={["Cash", "G-cash", "Food Panda", "Giveaway"]}
            onChange={(e: { target: { value: string } }) =>
              handleChange("paymentMethod", e.target.value)
            }
            value={paymentDetails.paymentMethod}
          />
          <RadioTextCheck
            label="Service Type"
            size="sm"
            options={["Dine-in", "Take-out"]}
            onChange={(e: { target: { value: string } }) =>
              handleChange("serviceType", e.target.value)
            }
            value={paymentDetails.serviceType}
          />
          <div className="w-full h-[1px] bg-gray-200 my-1"></div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between text-gray-500">
              <h4>Total amount</h4>
              <h4>₱ {getTotalOrdersAmount.toFixed(2)}</h4>
            </div>
            <div className="flex items-center justify-between  text-gray-500">
              <h4>Cash</h4>
              <h4>₱ {paymentDetails.cash_amount.toFixed(2)}</h4>
            </div>
            <div className="flex items-center justify-between font-semibold">
              <h4>Change</h4>
              <h4>₱ {getCustomerChange.toFixed(2)}</h4>
            </div>
            <div className="flex items-center justify-between mt-4">
              <Button
                size="sm"
                variant="subtle"
                textDisplay
                color="red"
                onClick={toggle}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                disabled={getTotalOrdersAmount > getCustomerCash}
                type={handleSubmitOrder.isLoading ? "button" : "submit"}
              >
                {handleSubmitOrder.isLoading ? (
                  <div className="w-[88px] flex justify-center">
                    <RiLoader5Line className="animate-spin w-5 h-5" />
                  </div>
                ) : (
                  "Submit Order"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default React.memo(Payment);
