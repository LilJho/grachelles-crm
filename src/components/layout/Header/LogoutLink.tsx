import dayjs from "dayjs";
import useLocalStorage from "hooks/useLocalStorage";
import useToggle from "hooks/useToggle";
import { pb } from "lib/database/pocketbase";
import useAuthStore from "lib/store/useAuthStore";
import { useRouter } from "next/router";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import {
  BranchesResponse,
  UsersResponse,
  UsersRolesOptions,
} from "types/pocketbase-types";
import UnstyledButton from "../../UI/Button/UnstyledButton";
import CashierSales from "./CashierSales";
type Props = {};

const LogoutLink = (props: Props) => {
  const { data, currentBranch, logout } = useAuthStore();
  const router = useRouter();
  const [showSalesModal, toggleSales] = useToggle();

  const handleLogout = () => {
    // Check if the user has the "cashier" role
    if (data?.roles.includes(UsersRolesOptions.cashier)) {
      toggleSales();
    } else {
      router.push("/login");
      // Log the user out
      logout();
    }
  };

  return (
    <>
      <UnstyledButton
        className={`flex gap-3
        text-gray-800 hover:bg-gray-100
        items-center px-4 py-3  rounded-md mt-auto`}
        onClick={handleLogout}
      >
        <BiLogOut
          className={`relatve flex items-center justify-center w-5 h-5 -top-[1px] text-primary-400
          `}
        />
        <span>Logout</span>
      </UnstyledButton>
      {showSalesModal && (
        <CashierSales
          toggle={toggleSales}
          isOpen={showSalesModal}
          userData={data as UsersResponse<unknown>}
          currentBranch={currentBranch as BranchesResponse}
          logout={logout}
        />
      )}
    </>
  );
};
export default LogoutLink;
