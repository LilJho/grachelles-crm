import Image from "next/image";
import React from "react";
import { RiMenuFill } from "react-icons/ri";
import UnstyledButton from "@/components/UI/Buttons/UnstyledButton";
import Logo from "public/logo/GrachellesLogo2.svg";

interface IHeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: IHeaderProps) => {
  return (
    <header className="grid grid-cols-3 md:hidden gap-2 items-center  px-2 py-3">
      <UnstyledButton onClick={toggleSidebar}>
        <RiMenuFill className="w-6 h-6" />
      </UnstyledButton>
      <Image src={Logo} alt="Grachelles Logo" />
      <div></div>
    </header>
  );
};

export default Header;
