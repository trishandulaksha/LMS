import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArticleIcon from "@mui/icons-material/Article";
import TimelineIcon from "@mui/icons-material/Timeline";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Link, useNavigate } from "react-router-dom";

const icons = [
  { icon: <DashboardIcon />, name: "Dashboard", path: "/" },
  { icon: <CalendarMonthIcon />, name: "Subject Recommendation", path: "/" },
  { icon: <ArticleIcon />, name: "Grades", path: "/grades" },
  { icon: <TimelineIcon />, name: "Student Progress", path: "/" },
  { icon: <LeaderboardIcon />, name: "Log Out", path: "/" },
  { icon: <SettingsIcon />, name: "Settings", path: "/myprofile" },
];

const bottomIcons = [
  { icon: <LogoutIcon />, name: "Logout" },
  { icon: <AccountCircleIcon />, name: "Account" },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleClick = (iconName) => {
    if (iconName === "Logout") {
      localStorage.removeItem("jwtToken");

      // Redirect to the login page
      navigate("/login");
    }
  };

  // Assuming you define `role` variable somewhere in your code
  const role = "LECTURER"; // Example, modify based on your actual logic
  const iconsList = role === "LECTURER" ? icons : icons; // Replace with actual studentIcons if needed

  return (
    <div className="fixed flex flex-col justify-between float-left h-screen py-10 text-justify sm:ml-10 ml-7 ">
      <div className="flex flex-col gap-5">
        {iconsList.map(({ icon, name, path }) => (
          <Link
            key={name}
            to={path}
            className="cursor-pointer hover:text-orange-700"
            onClick={() => handleClick(name)}
          >
            {icon}
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        {bottomIcons.map(({ icon, name }) => (
          <div
            key={name}
            className="cursor-pointer hover:text-orange-700"
            onClick={() => handleClick(name)}
          >
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
