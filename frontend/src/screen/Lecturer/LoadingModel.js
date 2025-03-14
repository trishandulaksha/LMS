// components/LoadingModal.js
import React from "react";

const LoadingModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold">Saving Marks...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
