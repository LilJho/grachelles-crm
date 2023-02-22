import Button from "@/components/UI/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import TextField from "@/components/UI/TextField";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import showToast from "helper/showToast";
import useLocalStorage from "hooks/useLocalStorage";
import { pb } from "lib/database/pocketbase";
import router from "next/router";
import React, { FormEvent, useState } from "react";
import { RiLoader5Line } from "react-icons/ri";
import { BranchesResponse, UsersResponse } from "types/pocketbase-types";

interface ICashierSalesProps {
  toggle: () => void;
  isOpen: boolean;
  userData: UsersResponse<unknown>;
  currentBranch: BranchesResponse;
  logout: () => void;
}

const CashierSales = ({
  isOpen,
  toggle,
  userData,
  currentBranch,
  logout,
}: ICashierSalesProps) => {
  const [ordersAmount, setOrdersAmount] = useLocalStorage("orders", 0);
  const [expensesAmount, setExpensesAmount] = useLocalStorage("expenses", 0);
  const [startingCash, setStartingCash] = useLocalStorage("starting_cash", 0);
  const sales_by_system = ordersAmount + startingCash - expensesAmount;
  const [salesByCashier, setSalesByCashier] = useState(0);

  const handleLogoutCashier = useMutation(async (e: FormEvent) => {
    e.preventDefault();
    const formData = {
      branch: currentBranch?.id,
      datetime: dayjs().format("YYYY-MM-DD hh:mm A"),
      user: userData?.id,
      sales_by_cashier: salesByCashier,
      sales_by_system: sales_by_system,
      expenses: expensesAmount,
      total_orders_amount: ordersAmount,
    };

    await pb.collection("cashier_sales").create(formData);
    showToast("Sales record has been submitted!");
    // Log the user out
    logout();
    // Redirect the user to the login page
    await router.push("/login");
    // Reset the expenses and orders amounts
    setExpensesAmount(0);
    setOrdersAmount(0);
    setStartingCash(0);
  });

  return (
    <Modal isOpen={isOpen} toggle={toggle} closeButton title="Cashier Summary">
      <form className="flex flex-col" onSubmit={handleLogoutCashier.mutate}>
        <div className="flex flex-col gap-2 text-sm p-4 bg-primary-50 border border-primary-600 rounded-md">
          <SummaryDetail
            label="Email address"
            value={userData?.email || userData.username}
          />
          <SummaryDetail label="Branch" value={currentBranch?.name} />
          <SummaryDetail
            label="Total Sales"
            value={`₱ ${ordersAmount.toFixed(2)}`}
          />
          <SummaryDetail
            label="Starting Cash"
            value={`₱ ${startingCash.toFixed(2)}`}
          />
          <SummaryDetail
            label="Total Expenses"
            value={`₱ ${expensesAmount.toFixed(2)}`}
          />
          <SummaryDetail
            label="Net Profit"
            value={`₱ ${sales_by_system.toFixed(2)}`}
          />
        </div>
        <div className="h-[1px] bg-gray-100 my-4"></div>
        <TextField
          label="Total Earnings"
          size="sm"
          placeholder="Enter all profit"
          leftIcon="₱"
          type="number"
          description="Type in how much you earn and see if the system's calculation matches it."
          value={salesByCashier === 0 ? "" : salesByCashier}
          onChange={(e) => setSalesByCashier(Number(e.target.value))}
        />
        <div className="mt-6 flex justify-between">
          <Button size="sm" color="gray" variant="light" onClick={toggle}>
            Cancel
          </Button>
          <Button size="sm" color="red" type="submit">
            {handleLogoutCashier.isLoading ? (
              <div className="w-[46px] flex justify-center">
                <RiLoader5Line className="animate-spin w-5 h-5" />
              </div>
            ) : (
              "Logout"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CashierSales;

const SummaryDetail = ({ label = "", value = "" }) => (
  <div>
    <label>{label}</label>
    <p className="font-medium text-primary-700">{value}</p>
  </div>
);
