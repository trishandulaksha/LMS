import React, { useState, useEffect } from "react";
import { Close } from "@mui/icons-material"; // Import Close icon for closing the popup

const NotificationPopup = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose(); // Auto-close after 5 seconds
      }, 5000); // 5 seconds duration
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed right-0 z-50 p-4 text-white bg-blue-600 rounded-lg shadow-lg top-16 w-80">
      <div className="flex items-center justify-between">
        <p className="text-sm">{message}</p>
        <Close onClick={onClose} sx={{ cursor: "pointer", fontSize: "20px" }} />
      </div>
    </div>
  );
};

export default NotificationPopup;
