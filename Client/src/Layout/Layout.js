import React from "react";
import Sidebar from "../Component/SideNavBar/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div
      className="grid grid-cols-2"
      style={{
        gridTemplateColumns: "15% 80%",
      }}
    >
      <div className="">
        <Sidebar />
      </div>

      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
