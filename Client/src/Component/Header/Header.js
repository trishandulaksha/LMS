import React, { useState, useRef } from "react";
import SchoolIcon from "@mui/icons-material/School";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// Import the new notification component
import CourseDetailsPopup from "../CourseDetailsPopup/CourseDetailsPopup";
import NotificationPopup from "../NotificationDetailsPopus/NotificationDetailPopus";

const Header = () => {
  const [courseCode, setCourseCode] = useState(""); // Course code state
  const [notificationMessage, setNotificationMessage] = useState(""); // Notification message state
  const [showNotification, setShowNotification] = useState(false); // Control notification visibility
  const popupRef = useRef(); // Ref to access the CourseDetailsPopup component

  // Handle the course code input change
  const handleSearchChange = (e) => {
    setCourseCode(e.target.value);
  };

  // Trigger search on button click
  const handleSearchClick = () => {
    popupRef.current.fetchCourseDetails(); // Trigger the fetch operation on the popup component
  };

  // Show notification
  const showNotificationPopup = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

  return (
    <div>
      {/* Existing Header Section with no changes */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center">
          <SchoolIcon sx={{ fontSize: "50px" }} />
          <div className="ml-4 text-3xl font-extrabold">SPTS</div>
        </div>
        <div className="flex items-center">
          <div className="relative p-1 bg-white rounded-lg shadow-lg">
            <input
              type="text"
              placeholder="Enter Course Code"
              value={courseCode}
              onChange={handleSearchChange}
              className="px-4 py-2 text-sm rounded-lg outline-none"
            />
            <SearchIcon
              sx={{ cursor: "pointer" }}
              onClick={handleSearchClick}
            />
          </div>
          <NotificationsActiveIcon
            sx={{ marginLeft: 2 }}
            onClick={() =>
              showNotificationPopup("You have a new notification!")
            }
          />
        </div>
      </div>

      {/* Course Details Popup Component */}
      <CourseDetailsPopup ref={popupRef} courseCode={courseCode} />

      {/* Notification Popup */}
      <NotificationPopup
        message={notificationMessage}
        show={showNotification}
        onClose={() => setShowNotification(false)} // Close the notification
      />
    </div>
  );
};

export default Header;