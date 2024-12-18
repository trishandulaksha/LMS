import React from "react";
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
import { UseDataContexts } from "../../ContextAPI/LoginAndMarksContext"; // Assuming this context holds the user role

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = UseDataContexts(); // Retrieve user role
  const role = user?.success.user.role || "STUDENT"; // Default to 'student' if role is undefined

  const studentIcons = [
    { icon: <DashboardIcon />, name: "Dashboard", path: "/" },
    { icon: <CalendarMonthIcon />, name: "Subject Recommendation", path: "/" },
    { icon: <ArticleIcon />, name: "Grades", path: "/grades" },
    { icon: <LeaderboardIcon />, name: "Leaderboard", path: "/" },
    { icon: <SettingsIcon />, name: "Settings", path: "/myprofile" },
  ];

  const lecturerIcons = [
    { icon: <DashboardIcon />, name: "Dashboard", path: "/" },
    { icon: <PostAddIcon />, name: "Post Add", path: "/lecturerDashboard" },
    { icon: <LeaderboardIcon />, name: "Leaderboard", path: "/" },
    { icon: <SettingsIcon />, name: "Settings", path: "/myprofile" },
  ];

  const bottomIcons = [
    { icon: <LogoutIcon />, name: "Logout" },
    { icon: <AccountCircleIcon />, name: "Account" },
  ];

  const handleClick = (iconName) => {
    if (iconName === "Logout") {
      localStorage.removeItem("jwtToken");
      navigate("/login");
    }
  };

  const icons = role === "LECTURER" ? lecturerIcons : studentIcons;

  return (
    <div className="fixed flex flex-col justify-between float-left h-screen py-10 text-justify sm:ml-10 ml-7">
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
