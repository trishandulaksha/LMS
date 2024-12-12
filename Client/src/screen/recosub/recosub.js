import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Recosubgrid from "../../Component/Recosubgrid/Recosubgrid";
import { responseData } from "../../Testing/TestingResponse";
      
const Recosub = () => {
  const { recommendedSubjects } = responseData.success;

  return (
    <div>
    
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
      <div className="min-h-screen bg-gray-100">
      <Recosubgrid recommendedSubjects={recommendedSubjects} />
    </div>

      </div>


      </div>
      
        )
      }
      
      export default Recosub;