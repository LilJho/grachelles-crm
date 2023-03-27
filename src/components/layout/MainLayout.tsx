import useToggle from "hooks/useToggle";
import React from "react";
import Button from "../UI/Buttons/Button";
import TextField from "../UI/Inputs/TextField";
import Header from "./Header/Header";
import Sidebar from "./Sidebar";
interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  const [showSidebar, toggleSidebar] = useToggle();

  return (
    <div
      className={`text-gray-800 flex h-screen text-left align-middle bg-gray-100`}
    >
      <Sidebar isOpen={showSidebar} toggle={toggleSidebar} />
      <div className="flex-1 h-full w-full md:pl-72">
        <Header toggleSidebar={toggleSidebar} />
        <div className="p-6 bg-gray-100">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
