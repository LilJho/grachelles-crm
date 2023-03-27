import useToggle from "hooks/useToggle";
import React from "react";
import { UsersRolesOptions } from "types/pocketbase-types";
import PrivatePage from "../PageWrapper/PrivatePage";
import Header from "./Header/Header";
import Sidebar from "./Sidebar";
interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  const [showSidebar, toggleSidebar] = useToggle();

  return (
    <PrivatePage allowedRoles={[UsersRolesOptions.admin]}>
      <div
        className={`text-gray-800 flex h-screen text-left align-middle bg-gray-100`}
      >
        <Sidebar isOpen={showSidebar} toggle={toggleSidebar} />
        <div className="flex-1 h-full w-full md:pl-72">
          <Header toggleSidebar={toggleSidebar} />
          <div className="py-6 px-10 bg-gray-100">{children}</div>
        </div>
      </div>
    </PrivatePage>
  );
};

export default MainLayout;
