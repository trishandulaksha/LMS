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
import { UseDataContexts } from "../../ContextAPI/LoginAndMarksContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = UseDataContexts();
  const role = user?.success.user.role || "STUDENT";

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null); // Track hovered item

  const studentIcons = [
    { icon: <DashboardIcon />, name: "Dashboard", path: "/" },
    {
      icon: <CalendarMonthIcon />,
      name: "Subject Recommendation",
      path: "/recomendedSubjects",
    },
    { icon: <ArticleIcon />, name: "Grades", path: "/grades" },
    { icon: <LeaderboardIcon />, name: "Shedule", path: "/schedule" },
    {
      icon: <TimelineIcon />,
      name: "Student Progress",
      path: "/StudentProgress",
    },
    { icon: <SettingsIcon />, name: "Settings", path: "/setting" },
  ];

  const lecturerIcons = [
    { icon: <PostAddIcon />, name: "Post Add", path: "/lecturerDashboard" },
    { icon: <LeaderboardIcon />, name: "Shedule", path: "/schedule" },
    { icon: <SettingsIcon />, name: "Settings", path: "/setting" },
  ];

  const bottomIcons = [
    { icon: <LogoutIcon />, name: "Logout" },
    { icon: <AccountCircleIcon />, name: "My Profile", path: "/myprofile" },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.clear();
    navigate("/login");
  };

  const handleClick = (iconName) => {
    if (iconName === "Logout") {
      setShowLogoutModal(true); // Open the logout confirmation popup
    }
  };

  const icons = role === "LECTURER" ? lecturerIcons : studentIcons;

  return (
    <div className="fixed flex flex-col justify-between h-screen py-4 pr-2 ml-2 bg-white sm:ml-10 sm:pr-0">
      {/* Top Menu */}
      <div className="flex flex-col gap-5">
        {icons.map(({ icon, name, path }) => (
          <div
            key={name}
            className="relative flex items-center cursor-pointer group hover:text-orange-700"
            onMouseEnter={() => setHoveredItem(name)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link to={path}>{icon}</Link>
            {hoveredItem === name && (
              <div className="absolute px-2 py-1 text-sm text-white transform -translate-y-1/2 bg-gray-800 rounded-md shadow-lg left-12 top-1/2 whitespace-nowrap">
                {name}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Menu */}
      <div className="flex flex-col gap-5">
        {bottomIcons.map(({ icon, name, path }) =>
          name === "Logout" ? (
            <div
              key={name}
              className="relative flex items-center cursor-pointer group hover:text-orange-700"
              onMouseEnter={() => setHoveredItem(name)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleClick(name)}
            >
              {icon}
              {hoveredItem === name && (
                <div className="absolute px-2 py-1 text-sm text-white transform -translate-y-1/2 bg-gray-800 rounded-md shadow-lg left-12 top-1/2 whitespace-nowrap">
                  {name}
                </div>
              )}
            </div>
          ) : (
            <div
              key={name}
              className="relative flex items-center cursor-pointer group hover:text-orange-700"
              onMouseEnter={() => setHoveredItem(name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link to={path}>{icon}</Link>
              {hoveredItem === name && (
                <div className="absolute px-2 py-1 text-sm text-white transform -translate-y-1/2 bg-gray-800 rounded-md shadow-lg left-12 top-1/2 whitespace-nowrap">
                  {name}
                </div>
              )}
            </div>
          )
        )}
      </div>

      {/* Custom Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70">
          <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6">
            <h2 className="mb-4 text-xl font-semibold text-center">
              Confirm Logout
            </h2>
            <p className="mb-6 text-center">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-6 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-6 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
