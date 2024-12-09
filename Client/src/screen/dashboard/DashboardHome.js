import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import SchoolIcon from "@mui/icons-material/School";
import SearchIcon from "@mui/icons-material/Search";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ProgressBar from "../../Component/ProgressBar/ProgressBar";


ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const performanceData = [
    {
      label: "First Year",
      percentage: 81,
      color: "#FF6384",
    },
    {
      label: "Second Year",
      percentage: 62,
      color: "#36A2EB",
    },
    {
      label: "Third Year",
      percentage: 22,
      color: "#4BC0C0",
    },
  ];

  const renderChart = (percentage, color) => {
    return {
      labels: ["Completed", "Remaining"],
      datasets: [
        {
          data: [percentage, 100 - percentage],
          backgroundColor: [color, "#E0E0E0"],
          hoverBackgroundColor: [color, "#E0E0E0"],
          borderWidth: 0,
        },
      ],
    };
  };

  return (

    <div className="w-full min-h-screen p-8 bg-gray-100 ">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center">
          <SchoolIcon
            sx={{
              fontSize: "50px",
            }}
          />
          <div className="ml-4 text-3xl font-extrabold">SPTS</div>
        </div>
        <div className="flex items-center ">
          <div className="p-1 bg-white rounded-lg shadow-lg">
            <input
              text="text"
              placeholder="Search Here"
              className="px-2 py-1 text-sm outline-none "
            />
            <SearchIcon
              sx={{
                cursor: "pointer",
              }}
            />
          </div>
          <NotificationsActiveIcon sx={{ marginLeft: 2 }} />
        </div>
      </div>

      <div className="flex flex-col items-center p-6 mt-16 mb-6 bg-white rounded-lg shadow lg:flex-row lg:justify-between lg:space-x-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-lg font-bold">Maitey Prajapati</h2>
            <p className="text-gray-500">Level 04 Student</p>
          </div>
          <div className="pl-11">
            <ProgressBar currentCredits={50} totalCredits={130} />
          </div>
        </div>

        <div className="mt-4 lg:mt-0">
          <div className="grid grid-cols-2 gap-4 text-sm lg:flex lg:items-center lg:space-x-6">
            <div className="flex flex-col items-start">
              <p>Completed Subject : 05</p>
              <p>Level : 04</p>
              <p>Year : 22/23</p>
              <p>Total Years : 04</p>

            </div>

            <div className="flex flex-col items-start">
              <p>Progress Year : 02</p>
              <p>Pass Subjects : 10</p>
              <p>Failed Subjects : 00</p>
              <p>Status : Good</p>
            </div>

            <div className="flex flex-col items-start pt-4 text-cyan-400">
              <p>View Grpdes</p>
              <p>View Progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Performance Section */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-6 text-xl font-bold">Overall Performance</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {performanceData.map((data, index) => (
            <div key={index} className="text-center">
              <Doughnut data={renderChart(data.percentage, data.color)} />
              <p className="mt-4 text-lg font-bold">{data.percentage}%</p>
              <p className="text-gray-500">{data.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
