import React, { useEffect, useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

function Alert({ checkAlert }) {
  const [visible, setVisible] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    if (checkAlert && (checkAlert.Error || checkAlert.Success)) {
      setVisible(true);
      setAnimatingOut(false); // Reset to play slide-down animation
      const timer = setTimeout(() => {
        setAnimatingOut(true); // Trigger slide-up animation
        setTimeout(() => setVisible(false), 500); // Wait for slide-up animation to finish before hiding
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [checkAlert]);

  return (
    <div className="fixed inset-x-0 z-50 flex items-center justify-center top-10">
      {visible && (
        <p
          className={`${
            checkAlert.Error
              ? "text-red-700 font-extrabold shadow-red-600"
              : "text-green-800 font-semibold shadow-green-600"
          } py-3 bg-gray-100 rounded-lg shadow-md px-28 flex items-center justify-center ${
            animatingOut ? "animate-slideUp" : "animate-slideDown"
          }`}
        >
          {checkAlert.Error ? checkAlert.Error : checkAlert.Success}
          <span className="ml-3">
            {checkAlert.Error ? <ThumbDownIcon /> : <ThumbUpAltIcon />}
          </span>
        </p>
      )}
    </div>
  );
}

export default Alert;
