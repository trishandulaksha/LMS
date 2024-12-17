import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArticleIcon from "@mui/icons-material/Article";
import TimelineIcon from "@mui/icons-material/Timeline";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";


const icons = [
  { icon: <DashboardIcon />, name: "Dashboard", path: "/" },
  {
    icon: <CalendarMonthIcon />,
    name: "Subject Recomendataion",
    path: "/recosub",
  },
  { icon: <ArticleIcon />, name: "Grades", path: "/grades" },
  { icon: <TimelineIcon />, name: "Student Progress", path: "/StudentProgress" },
  { icon: <LeaderboardIcon />, name: "Schedule", path: "/Schedule" },
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

  return (
    <div className="fixed flex flex-col justify-between float-left h-screen py-10 text-justify sm:ml-4 ml-7 ">
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
