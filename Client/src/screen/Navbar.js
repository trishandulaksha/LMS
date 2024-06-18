import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";

function Navbar() {
  const [isClicked, setisClicked] = useState(false);
  return (
    <>
      <header className="mx-3 mt-4 border border-black ">
        <div className="flex items-center justify-between">
          <div className="leftside">
            <h2 className="ml-4">LOGO</h2>
          </div>
          <div className="rightside">
            <div>
              <input
                type="text"
                placeholder="Search Course"
                className="p-1 border border-black"
              />
              <MenuIcon className="mx-2" />
              <AccountCircleIcon className="mx-2" />
              <NotificationsActiveIcon className="ml-2 mr-4" />
            </div>
          </div>
        </div>
      </header>
      <div className="h-screen w-44 bg-slate-500">
        <div className="mt-1 ml-6">
          <ul className="">
            <li className="font-bold text-white cursor-pointer pt-7">
              Dashboard
            </li>
            <li className="my-6 font-bold text-white cursor-pointer">Result</li>
            <li className="my-6 font-bold text-white cursor-pointer">
              Cource Enrollment
            </li>
            <li className="my-6 font-bold text-white cursor-pointer">
              Calender
            </li>
            <li className="my-6 font-bold text-white cursor-pointer">
              Admin Access
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
