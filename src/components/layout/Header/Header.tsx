import Image from "next/image";
import React from "react";
import { RiMenuFill, RiShoppingCart2Line } from "react-icons/ri";
import UnstyledButton from "../../UI/Button/UnstyledButton";
import Logo from "public/logo/GrachellesLogo2.svg";
import useStore from "lib/store/useStore";

interface IHeaderProps {
  toggleSidebar: () => void;
  toggleOrder: () => void;
}

const Header = ({ toggleSidebar, toggleOrder }: IHeaderProps) => {
  const order = useStore((state) => state.order);
  return (
    <header className="flex gap-2 items-center justify-between px-2 py-3">
      <UnstyledButton onClick={toggleSidebar}>
        <RiMenuFill className="w-6 h-6" />
      </UnstyledButton>
      <Image src={Logo} alt="Grachelles Logo" />
      <UnstyledButton onClick={toggleOrder} className="relative">
        {order.length >= 1 && (
          <div className="absolute right-1 top-1 border-2 border-white bg-red-500 rounded-full text-[8px] text-white w-4 h-4 flex items-center justify-center">
            {order.length}
          </div>
        )}
        <RiShoppingCart2Line className="w-6 h-6" />
      </UnstyledButton>
    </header>
  );
};

export default Header;
