import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";
import { HiX } from "react-icons/hi";
import UnstyledButton from "../UI/Button/UnstyledButton";
import Logo from "public/logo/GrachellesLogo2.svg";
import NavLink from "./Header/NavLink";
import LogoutLink from "./Header/LogoutLink";
import SidebarModal from "../UI/Modal/SidebarModal";

interface ISidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar = ({ isOpen, toggle }: ISidebarProps) => {
  return (
    <SidebarModal toggle={toggle} isOpen={isOpen} width="w-[280px] md:w-80">
      <div className="flex justify-center mt-4">
        <Image src={Logo} alt="Grachelles Logo" />
      </div>
      <ul className="mt-8 flex flex-1 flex-col gap-3 font-quicksand">
        <NavLink href="/">Menu</NavLink>
        <NavLink href="/orders">Orders</NavLink>
        <NavLink href="/expenses">Expenses</NavLink>
        <NavLink href="/chef">Chef</NavLink>
        <NavLink href="/dtr">DTR</NavLink>
        <LogoutLink />
      </ul>
    </SidebarModal>
  );
};

export default Sidebar;
