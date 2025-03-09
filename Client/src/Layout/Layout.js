import React from "react";
import Sidebar from "../Component/SideNavBar/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";

function Layout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-[10%] ">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-[95%] mt-4 ">
        {/* Header */}
        <div className="h-[10%]   ">
          <Header />
        </div>

        {/* Outlet Content */}
        <div className="flex-1 ">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="h-[10%]  ">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
