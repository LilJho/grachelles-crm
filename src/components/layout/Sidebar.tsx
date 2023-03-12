import Image from "next/image";
import Logo from "public/logo/GrachellesLogo2.svg";
import NavLink from "./Header/NavLink";
import LogoutLink from "./Header/LogoutLink";
import SidebarModal from "@/components/UI/Modal/SidebarModal";

interface ISidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar = ({ isOpen, toggle }: ISidebarProps) => {
  return (
    <>
      <div className="hidden md:flex fixed top-0 bottom-0 left-0 flex-col w-72 bg-white px-4 py-6">
        <SidebarContent />
      </div>
      <SidebarModal toggle={toggle} isOpen={isOpen} width="w-[280px] md:w-80">
        <SidebarContent />
      </SidebarModal>
    </>
  );
};

export default Sidebar;

const SidebarContent = () => {
  return (
    <>
      <div className="flex justify-center mt-4">
        <Image src={Logo} alt="Grachelles Logo" />
      </div>
      <ul className="mt-8 flex flex-1 flex-col gap-3 font-quicksand">
        <NavLink href="/">Dashboard</NavLink>
        <NavLink href="/report">Report</NavLink>
        <NavLink href="/inventory">Inventory</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/expenses">Expenses</NavLink>
        <NavLink href="/branch">Branch</NavLink>
        <NavLink href="/staff">Staff</NavLink>
        <NavLink href="/account">Accounts</NavLink>
        <NavLink href="/settings">Settings</NavLink>
        <LogoutLink />
      </ul>
    </>
  );
};

{
}
