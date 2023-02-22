import Image from "next/image";
import React from "react";
import Button from "../../UI/Button/Button";
import Heading from "../../UI/Heading";
import SidebarModal from "../../UI/Modal/SidebarModal";
import CoffeeBreak from "public/images/Coffee break-bro.svg";
import useStore from "lib/store/useStore";
import Orders from "./Orders";
import useToggle from "hooks/useToggle";
import Payment from "./Payment";
import { getTotalPrice } from "helper/getTotalPrice";

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

const OrdersList = ({ isOpen, toggle }: Props) => {
  const [order, setOrder] = useStore((state) => [state.order, state.setOrder]);

  const total_price = getTotalPrice(order);

  const [showPayment, togglePayment] = useToggle();

  const togglePaymentModal = () => {
    togglePayment();
    toggle();
  };

  return (
    <>
      <SidebarModal
        isOpen={isOpen}
        toggle={toggle}
        position="right"
        width="w-full xs:w-[300px] md:w-80"
      >
        <Heading>Orders List</Heading>
        {order?.length >= 1 ? (
          <div className="flex-1 overflow-y-auto my-2 flex flex-col gap-2">
            {order.map((val, idx) => {
              return (
                <Orders
                  key={idx}
                  values={val}
                  order={order}
                  setOrder={setOrder}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex-1 h-full flex my-auto">
            <NoOrdersStatus />
          </div>
        )}
        <div className="w-full h-[1px] bg-gray-100 my-2"></div>
        <div className="flex flex-col w-full mt-auto bg-white">
          <div className="font-semibold flex gap-2 justify-between mb-3 mt-1 ">
            <h3>Total</h3>
            <h3 className="">₱ {total_price.toFixed(2)}</h3>
          </div>
          <Button
            className="sm"
            onClick={togglePaymentModal}
            disabled={order.length === 0}
          >
            Proceed to Payment
          </Button>
        </div>
      </SidebarModal>
      {showPayment && <Payment toggle={togglePayment} isOpen={showPayment} />}
    </>
  );
};

export default OrdersList;

const NoOrdersStatus = () => {
  return (
    <div className="flex flex-col items-center justify-center opacity-60">
      <Image src={CoffeeBreak} alt="Coffee Break Illustration" />
      <h3 className="text-lg font-medium text-gray-400">No available orders</h3>
    </div>
  );
};
