import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArticleIcon from "@mui/icons-material/Article";
import TimelineIcon from "@mui/icons-material/Timeline";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const sidebar = () => {
  return (
    <div className="flex flex-col justify-between float-left p-2 text-justify h-lvh">
      <div className="flex flex-col gap-5">
        <DashboardIcon />
        <CalendarMonthIcon />
        <ArticleIcon />
        <TimelineIcon />
        <LeaderboardIcon />
        <SettingsIcon />
      </div>
      
      <div className="flex flex-col gap-5">
        <LogoutIcon />
        <AccountCircleIcon />
      </div>
    </div>
  );
};

export default sidebar;
