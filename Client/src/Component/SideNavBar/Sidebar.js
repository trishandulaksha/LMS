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

  const studentIcons = [
    { icon: <DashboardIcon />, name: "Dashboard", path: "/" },
    {
      icon: <CalendarMonthIcon />,
      name: "Subject Recommendation",
      path: "/recomendedSubjects",
    },
    { icon: <ArticleIcon />, name: "Grades", path: "/grades" },
    { icon: <LeaderboardIcon />, name: "Leaderboard", path: "/schedule" },
    {
      icon: <TimelineIcon />,
      name: "Student Progress",
      path: "/StudentProgress",
    },
    { icon: <SettingsIcon />, name: "Settings", path: "/setting" },
  ];

  const lecturerIcons = [
    { icon: <DashboardIcon />, name: "Dashboard", path: "/" },
    { icon: <PostAddIcon />, name: "Post Add", path: "/lecturerDashboard" },
    { icon: <LeaderboardIcon />, name: "Leaderboard", path: "/schedule" },
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
    <div className="fixed flex flex-col justify-between h-screen py-10 sm:ml-10 ml-7">
      {/* Top Menu */}
      <div className="flex flex-col gap-5">
        {icons.map(({ icon, name, path }) => (
          <Link
            key={name}
            to={path}
            className="cursor-pointer hover:text-orange-700"
          >
            {icon}
          </Link>
        ))}
      </div>

      {/* Bottom Menu */}
      <div className="flex flex-col gap-5">
        {bottomIcons.map(({ icon, name, path }) =>
          name === "Logout" ? (
            <div
              key={name}
              className="cursor-pointer hover:text-orange-700"
              onClick={() => handleClick(name)}
            >
              {icon}
            </div>
          ) : (
            <Link
              key={name}
              to={path}
              className="cursor-pointer hover:text-orange-700"
            >
              {icon}
            </Link>
          )
        )}
      </div>

      {/* Custom Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-80">
            <div className="p-5 text-center">
              <h2 className="mb-4 text-lg font-bold">Confirm Logout</h2>
              <p className="mb-6">Are you sure you want to log out?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-4 py-2 text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
