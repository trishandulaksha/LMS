import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArticleIcon from "@mui/icons-material/Article";
import TimelineIcon from "@mui/icons-material/Timeline";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const handleClick = (iconName) => {
  console.log(`${iconName} icon clicked`);
};

const icons = [
  { icon: <DashboardIcon />, name: "Dashboard", path: "/dashboard" },
  {
    icon: <CalendarMonthIcon />,
    name: "Subject Recomendataion",
    path: "/dashboard",
  },
  { icon: <ArticleIcon />, name: "Grades", path: "/grades" },
  { icon: <TimelineIcon />, name: "Student Progress", path: "/dashboard" },
  { icon: <LeaderboardIcon />, name: "Log Out", path: "/dashboard" },
  { icon: <SettingsIcon />, name: "Settings", path: "/myprofile" },
];

const bottomIcons = [
  { icon: <LogoutIcon />, name: "Logout" },
  { icon: <AccountCircleIcon />, name: "Account" },
];

const Sidebar = () => {
  return (
    <div className="fixed flex flex-col justify-between float-left h-screen py-10 text-justify sm:ml-10 ml-7 ">
      <div className="flex flex-col gap-5">
        {icons.map(({ icon, name, path }) => (
          <div
            key={name}
            className="cursor-pointer hover:text-orange-700"
            onClick={() => handleClick(name)}
          >
            <Link to={path}>{icon}</Link>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        {bottomIcons.map(({ icon, name, path }) => (
          <div
            key={name}
            className="cursor-pointer hover:text-orange-700"
            onClick={() => handleClick(name)}
          >
            <Link to={path}>{icon}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
