import React, { useState } from "react";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [theme, setTheme] = useState("light");

  const tabs = [
    { id: "general", label: "Theme Settings" },
    { id: "user", label: "User Management" },
    { id: "academic", label: "Academic Settings" },
    { id: "progress", label: "Progress Tracking" },
    { id: "security", label: "Security" },
    { id: "integrations", label: "Integrations" },
  ];

  return (
    <>
      <div className="w-full min-h-screen p-8 bg-gray-100">
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
            {/* Theme Settings (Replacing General Settings) */}
            {activeTab === "general" && (
              <section>
                <h3 className="mb-4 text-2xl font-semibold">Theme Settings</h3>
                <p className="mb-4 text-gray-600">
                  Choose a theme to personalize the appearance of the system.
                </p>
                <div className="p-6 bg-white rounded-lg shadow">
                  <label className="block mb-2 font-medium text-gray-700">
                    Select Theme
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                  >
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                  </select>
                </div>
              </section>
            )}

            {/* User Management */}
            {activeTab === "user" && (
              <section>
                <h3 className="mb-4 text-2xl font-semibold">User Management</h3>
                <p className="mb-4 text-gray-600">
                  Manage roles and permissions for users.
                </p>
                <div className="p-6 bg-white rounded-lg shadow">
                  <label className="block mb-2 font-medium text-gray-700">
                    Default Role
                  </label>
                  <select className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300">
                    <option>Student</option>
                    <option>Teacher</option>
                    <option>Admin</option>
                  </select>
                </div>
              </section>
            )}

            {/* Academic Settings */}
            {activeTab === "academic" && (
              <section>
                <h3 className="mb-4 text-2xl font-semibold">
                  Academic Settings
                </h3>
                <p className="mb-4 text-gray-600">
                  Configure subject selection, grading policies, and academic
                  rules.
                </p>
                <div className="p-6 bg-white rounded-lg shadow">
                  <label className="block mb-2 font-medium text-gray-700">
                    Select Grading System
                  </label>
                  <select className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300">
                    <option>Percentage</option>
                    <option>GPA</option>
                    <option>Letter Grades</option>
                  </select>
                </div>
              </section>
            )}

            {/* Progress Tracking */}
            {activeTab === "progress" && (
              <section>
                <h3 className="mb-4 text-2xl font-semibold">
                  Progress Tracking
                </h3>
                <p className="mb-4 text-gray-600">
                  Customize performance tracking metrics.
                </p>
                <div className="p-6 bg-white rounded-lg shadow">
                  <label className="block mb-2 font-medium text-gray-700">
                    Select Metrics to Track
                  </label>
                  <select className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300">
                    <option>Attendance</option>
                    <option>Assignment Scores</option>
                    <option>Exam Performance</option>
                  </select>
                </div>
              </section>
            )}

            {/* Security */}
            {activeTab === "security" && (
              <section>
                <h3 className="mb-4 text-2xl font-semibold">Security</h3>
                <p className="mb-4 text-gray-600">
                  Manage security settings such as authentication and password
                  policies.
                </p>
                <div className="p-6 bg-white rounded-lg shadow">
                  <label className="block mb-2 font-medium text-gray-700">
                    Enable Two-Factor Authentication
                  </label>
                  <input type="checkbox" className="ml-2" />
                </div>
              </section>
            )}

            {/* Integrations */}
            {activeTab === "integrations" && (
              <section>
                <h3 className="mb-4 text-2xl font-semibold">Integrations</h3>
                <p className="mb-4 text-gray-600">
                  Connect with third-party services for seamless functionality.
                </p>
                <div className="p-6 bg-white rounded-lg shadow">
                  <label className="block mb-2 font-medium text-gray-700">
                    Integration Type
                  </label>
                  <select className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300">
                    <option>Google Classroom</option>
                    <option>Microsoft Teams</option>
                    <option>Custom API</option>
                  </select>
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
