import React from 'react';
import '../../screen/dashboard/dashboard.css';
import SchoolIcon from "@mui/icons-material/School";
import SearchIcon from "@mui/icons-material/Search";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";



const Header = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center">
          <SchoolIcon
            sx={{
              fontSize: "50px",
            }}
          />
          <div className="ml-4 text-3xl font-extrabold">SPTS</div>
        </div>
        <div className="flex items-center ">
          <div className="p-1 bg-white rounded-lg shadow-lg hide-color-mobile-screen">
            <input
              text="text"
              placeholder="Search Here"
              className="px-2 py-1 text-sm outline-none hide-on-mobile-screen"
            />
            <SearchIcon
              sx={{
                cursor: "pointer",
              }}
            />
          </div>
          <NotificationsActiveIcon sx={{ marginLeft: 2 }} />
        </div>
      </div>
    </div>
  )
}

export default Header;
