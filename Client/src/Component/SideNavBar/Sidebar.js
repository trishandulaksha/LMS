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
  { icon: <CalendarMonthIcon />, name: "Subject Recomendation", path: "/recosub" },
  { icon: <ArticleIcon />, name: "Grades", path: "/grades" },
  { icon: <TimelineIcon />, name: "Student Progress", path: "/StudentProgress" },
  { icon: <LeaderboardIcon />, name: "Schedule", path: "/Schedule" },
  { icon: <SettingsIcon />, name: "Settings", path: "/Setting" },
];

const bottomIcons = [
  { icon: <LogoutIcon />, name: "Logout", path: null },
  { icon: <AccountCircleIcon />, name: "My Profile", path: "/MyProfile" },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleClick = (event, iconName, path) => {
    if (iconName === "Logout") {
      // Show confirmation dialog
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (confirmLogout) {
        // Remove the JWT token and navigate to the login page
        localStorage.removeItem("jwtToken");
        navigate("/login");
      } else {
        // Prevent navigation if logout is canceled
        event.preventDefault();
      }
    }
  };

  return (
    <div className="fixed flex flex-col justify-between float-left h-screen py-10 text-justify sm:ml-4 ml-7">
      {/* Top Icons */}
      <div className="flex flex-col gap-5">
        {icons.map(({ icon, name, path }) => (
          <div
            key={name}
            className="cursor-pointer hover:text-orange-700"
            onClick={(event) => handleClick(event, name, path)}
          >
            <Link to={path}>{icon}</Link>
          </div>
        ))}
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col gap-5">
        {bottomIcons.map(({ icon, name, path }) => (
          <div
            key={name}
            className="cursor-pointer hover:text-orange-700"
            onClick={(event) => handleClick(event, name, path)}
          >
            {path ? (
              <Link to={path}>{icon}</Link>
            ) : (
              <div>{icon}</div> // For Logout which doesn't navigate
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
