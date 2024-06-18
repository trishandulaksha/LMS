import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArticleIcon from "@mui/icons-material/Article";
import TimelineIcon from "@mui/icons-material/Timeline";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const handleClick = (iconName) => {
  console.log(`${iconName} icon clicked`);
};

const icons = [
  { icon: <DashboardIcon />, name: "Dashboard" },
  { icon: <CalendarMonthIcon />, name: "Calendar" },
  { icon: <ArticleIcon />, name: "Articles" },
  { icon: <TimelineIcon />, name: "Timeline" },
  { icon: <LeaderboardIcon />, name: "Leaderboard" },
  { icon: <SettingsIcon />, name: "Settings" },
];

const bottomIcons = [
  { icon: <LogoutIcon />, name: "Logout" },
  { icon: <AccountCircleIcon />, name: "Account" },
];

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between float-left h-screen p-2 text-justify">
      <div className="flex flex-col gap-5">
        {icons.map(({ icon, name }) => (
          <div key={name} className="hover:text-orange-700" onClick={() => handleClick(name)}>
            {icon}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        {bottomIcons.map(({ icon, name }) => (
          <div key={name} className="hover:text-orange-700" onClick={() => handleClick(name)}>
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
