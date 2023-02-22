import useToggle from "hooks/useToggle";
import useStore from "lib/store/useStore";
import React from "react";
import Header from "./Header/Header";
import OrdersList from "./OrdersList/OrdersList";
import Sidebar from "./Sidebar";
interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  const [showSidebar, toggleSidebar] = useToggle();
  const [showOrders, toggleOrders] = useToggle();

  return (
    <div className={`text-gray-800`}>
      <Header toggleSidebar={toggleSidebar} toggleOrder={toggleOrders} />
      <Sidebar isOpen={showSidebar} toggle={toggleSidebar} />
      <OrdersList isOpen={showOrders} toggle={toggleOrders} />
      <div className="px-4 py-1">{children}</div>
    </div>
  );
};

export default MainLayout;
