import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";

import LogoDevIcon from "@mui/icons-material/LogoDev";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Sidebar from "../../Component/SideNavBar/Sidebar";

function DashboardHome() {
  return (
    <div className="flex">
      <div className="flex bg-slate-600">
        <Sidebar />
      </div>

      <div className="flex-col w-full p-5 bg-slate-900">
        <div className="flex justify-between p-1 bg-red-600">
          <div className="flex gap-3">
            <LogoDevIcon />
            <h2>SPTS</h2>
          </div>

          <div className="flex flex-row gap-5">
            <input
              text="text"
              placeholder="Search Here"
              className="px-2 rounded-lg border-1"
            />
            <SearchIcon />
            <NotificationsNoneIcon />
          </div>
        </div>

        <div className="bg-slate-400">
          <p>Second Line</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
