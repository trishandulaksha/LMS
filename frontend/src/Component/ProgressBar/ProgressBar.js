import React from "react";

const ProgressBar = ({ currentCredits, totalCredits }) => {
  const percentage = (currentCredits / totalCredits) * 100;

  return (
    <div className="w-full my-4">
      <div className="flex justify-between mb-1 text-sm">
        <span>Credits - </span>
        <span className="ml-1">
          {`${currentCredits}/${totalCredits}`} ({Math.round(percentage)}%)
        </span>
      </div>
      <div className="relative h-3 bg-gray-300 rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
