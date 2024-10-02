import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Avatar from '@mui/material/Avatar';
import LogoDevIcon from "@mui/icons-material/LogoDev";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Sidebar from "../../Component/SideNavBar/Sidebar";

import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}


function DashboardHome() {



  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex">
      <div className="flex ">
        <Sidebar />
      </div>

      <div className="flex-col w-full p-5 ">
        <div className="flex justify-between p-1 ">
          <div className="flex gap-3">
            <LogoDevIcon />
            <p className="font-semibold text-xl">SPTS</p>
          </div>

          <div className="flex flex-row gap-5">
            <input
              text="text"
              placeholder="Search Here"
              className="px-2 rounded-lg border-2 text-sm"
            />
            <SearchIcon />
            <NotificationsNoneIcon />
          </div>
        </div>

        <div className=" flex flex-row items-center m-5 text-sm">
          <div className="border-2 border-black flex flex-row gap-5 w-full justify-around p-4 rounded-lg">
            <div className="flex flex-col items-center pt-3">
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <p>Name Here</p>
            </div>
              <div className="flex flex-col items-center">
                <p>Credits</p>
                <Box className="w-full">
                <LinearProgressWithLabel value={progress} />
                </Box>
                <p>50/130</p>
              </div>
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
                <a href="#">View Grades</a>
                <a href="#">View Progress</a>
              </div>
        </div>
      </div>

      <div className="flex flex-row items-center m-5 mt-8 ml-8 text-lg font-semibold">
        <p>Overall Performance</p>
      </div>

      <div className="flex flex-row items-center m-5">
        <div className="flex flex-col items-center">

        </div>
      </div>

    </div>
    </div>
  );
}

export default DashboardHome;
