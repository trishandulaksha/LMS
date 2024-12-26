import React from "react";

const ActionButtons = ({ isEditing, handleEdit, handleSave, handleCancel }) => {
  return (
    <div className="mt-4 space-x-2">
      {!isEditing ? (
        <button
          onClick={handleEdit}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Edit
        </button>
      ) : (
        <>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-green-500 rounded"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-white bg-red-500 rounded"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

export default ActionButtons;
