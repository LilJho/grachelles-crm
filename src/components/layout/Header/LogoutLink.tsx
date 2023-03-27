import useAuthStore from "lib/store/useAuthStore";
import { useRouter } from "next/router";
import React from "react";
import { BiLogOut } from "react-icons/bi";

import UnstyledButton from "@/components/UI/Buttons/UnstyledButton";

const LogoutLink = () => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    router.push("/login");
    // Log the user out
    await logout();
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
    </>
  );
};
export default LogoutLink;
