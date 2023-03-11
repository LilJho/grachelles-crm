import useToggle from "hooks/useToggle";
import React from "react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar";
interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  const [showSidebar, toggleSidebar] = useToggle();

  return (
    <div className={`text-gray-800 flex h-screen text-left align-middle`}>
      <Sidebar isOpen={showSidebar} toggle={toggleSidebar} />
      <div className="flex-1 w-full">
        <Header toggleSidebar={toggleSidebar} />
        <div className="bg-gray-50 h-full p-6">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
