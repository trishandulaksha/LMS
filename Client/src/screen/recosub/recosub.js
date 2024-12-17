import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Recosubgrid from "../../Component/Recosubgrid/Recosubgrid";
import { responseData } from "../../Testing/TestingResponse";
import Header from "../../Component/Header/Header";
      
const Recosub = () => {
  const { recommendedSubjects } = responseData.success;

  return (
    <div>
    
        <div className="w-full min-h-screen p-8 bg-gray-100 ">
          
        <Header/>
      <div className="min-h-screen bg-gray-100">
      <Recosubgrid recommendedSubjects={recommendedSubjects} />
    </div>

      </div>


      </div>
      
        )
      }
      
      export default Recosub;