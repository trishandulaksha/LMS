import React, { useState, useEffect } from "react";
import { UseDataContexts } from "../../ContextAPI/LoginAndMarksContext.js";
import { fetchStudentDetails, updateStudentDetails } from "../../API/API.js";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { user } = UseDataContexts();
  const [studentDetails, setStudentDetails] = useState({
    name: "Student",
    level: "1",
    currentYear: 1,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log("User Object:", user); // Log the user object
    const fetchData = async () => {
      if (user?.success?.user?.id) {
        const studentId = user.success.user.id;
        console.log("Fetching details for student ID:", studentId); // Log the student ID
        try {
          const data = await fetchStudentDetails(studentId);
          console.log("Fetched Student Details:", data); // Log the fetched data
          if (data) {
            setStudentDetails(data);
          }
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user?.success?.user?.id) {
      const studentId = user.success.user.id;
      console.log("Updating details for student ID:", studentId); // Log the student ID
      console.log("Updated Details:", studentDetails); // Log the updated details
      try {
        await updateStudentDetails(studentId, studentDetails);
        setIsEditing(false);
        alert("Details updated successfully!");
      } catch (error) {
        console.error("Error updating student details:", error);
        alert("Failed to update details. Please try again.");
      }
    }
  };

  const tabs = [
    { id: "general", label: "General Settings" },
    { id: "user", label: "User Management" },
    { id: "academic", label: "Academic Settings" },
    { id: "progress", label: "Progress Tracking" },
    { id: "security", label: "Security" },
    { id: "integrations", label: "Integrations" },
  ];

  return (
    <>
      <div className="w-full min-h-screen p-8 bg-gray-100 ">
        <div className="flex min-h-screen mt-10 bg-gray-100">
          {/* Sidebar */}
          <aside className="w-64 h-screen bg-white shadow-md">
            <h2 className="p-6 text-2xl font-bold text-gray-800 border-b">
              Settings
            </h2>
            <ul>
              {tabs.map((tab) => (
                <li key={tab.id} className="border-b">
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left p-4 hover:bg-blue-100 transition ${
                      activeTab === tab.id
                        ? "bg-blue-500 text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Content */}
          <main className="flex-1 p-8">
            {/* Academic Settings */}
            {activeTab === "academic" && (
              <section>
                <h3 className="mb-4 text-2xl font-semibold">
                  Academic Settings
                </h3>
                <div className="p-6 bg-white rounded-lg shadow">
                  {isEditing ? (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Level
                          </label>
                          <input
                            type="text"
                            name="level"
                            value={studentDetails.level}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-1 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Current Year
                          </label>
                          <input
                            type="number"
                            name="currentYear"
                            value={studentDetails.currentYear}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-1 border rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-6 space-x-4">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      <p>
                        <strong>Level:</strong> {studentDetails.level}
                      </p>
                      <p>
                        <strong>Current Year:</strong>{" "}
                        {studentDetails.currentYear}
                      </p>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        Edit Academic Details
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Setting;