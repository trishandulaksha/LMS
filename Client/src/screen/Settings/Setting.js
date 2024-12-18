import React, { useState } from 'react';
import Header from '../../Component/Header/Header';
import Footer from '../footer/Footer';

const Setting = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General Settings' },
    { id: 'user', label: 'User Management' },
    { id: 'academic', label: 'Academic Settings' },
    { id: 'progress', label: 'Progress Tracking' },
    { id: 'security', label: 'Security' },
    { id: 'integrations', label: 'Integrations' },
  ];

  return (
    <>
    <div className="w-full min-h-screen p-8 bg-gray-100 ">
    <Header/>
    <div className="flex min-h-screen mt-10 bg-gray-100">
   
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-white shadow-md">
        <h2 className="p-6 text-2xl font-bold text-gray-800 border-b">Settings</h2>
        <ul>
          {tabs.map((tab) => (
            <li key={tab.id} className="border-b">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left p-4 hover:bg-blue-100 transition ${
                  activeTab === tab.id ? 'bg-blue-500 text-white' : 'text-gray-700'
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
        {/* General Settings */}
        {activeTab === 'general' && (
          <section>
            <h3 className="mb-4 text-2xl font-semibold">General Settings</h3>
            <div className="p-6 bg-white rounded-lg shadow">
              <label className="block mb-2 font-medium text-gray-700">System Name</label>
              <input
                type="text"
                placeholder="Enter system name"
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
              />
            </div>
          </section>
        )}

        {/* User Management */}
        {activeTab === 'user' && (
          <section>
            <h3 className="mb-4 text-2xl font-semibold">User Management</h3>
            <div className="p-6 bg-white rounded-lg shadow">
              <label className="block mb-2 font-medium text-gray-700">Default Role</label>
              <select className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300">
                <option>Student</option>
                <option>Teacher</option>
                <option>Admin</option>
              </select>
            </div>
          </section>
        )}

        {/* Other Tabs */}
        {activeTab === 'academic' && (
          <section>
            <h3 className="mb-4 text-2xl font-semibold">Academic Settings</h3>
            <p>Configure subjects, classes, and grading systems here.</p>
          </section>
        )}
        {activeTab === 'progress' && (
          <section>
            <h3 className="mb-4 text-2xl font-semibold">Progress Tracking</h3>
            <p>Customize metrics and tracking options.</p>
          </section>
        )}
        {activeTab === 'security' && (
          <section>
            <h3 className="mb-4 text-2xl font-semibold">Security</h3>
            <p>Manage security options such as 2FA and password policies.</p>
          </section>
        )}
        {activeTab === 'integrations' && (
          <section>
            <h3 className="mb-4 text-2xl font-semibold">Integrations</h3>
            <p>Configure third-party integrations like Google Classroom.</p>
          </section>
        )}
      </main>
    </div>
      <Footer/>
    </div>

    </>
  );
};

export default Setting;
