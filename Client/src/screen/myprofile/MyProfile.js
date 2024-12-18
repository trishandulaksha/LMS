import React, { useState, useEffect } from "react";
import InputField from "../../Component/InputComponent/InputComponent";
import Footer from "../footer/Footer";

const MyProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    role: "",
    dateOfBirth: "",
    educationLevel: "",
    password: "",
    email: "",
    contactNumber: "",
    guardianName: "",
    guardianContactNumber: "",
    homeAddress: "",
  });

  useEffect(() => {
    const cachedProfile = JSON.parse(localStorage.getItem("profileData"));
    if (cachedProfile) {
      setProfileData(cachedProfile);
      console.log("Cached Data:", cachedProfile);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
    console.log("Profile Data Saved:", profileData);
  };

  return (
    <div className="max-w-4xl p-4 mx-auto rounded-lg shadow-lg bg-purple-50 sm:p-8">
      <h2 className="mb-6 text-2xl font-semibold text-center text-purple-700 sm:text-3xl">
        My Profile
      </h2>

      {/* Profile Icon and Title */}
      <div className="flex flex-col items-center justify-center mb-6 space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
        <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full sm:w-24 sm:h-24">
          <span className="text-4xl sm:text-5xl">👤</span>
        </div>
        <h3 className="text-lg font-medium text-purple-600 sm:text-xl">
          STUDENT
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <InputField
          label="First Name"
          name="firstName"
          value={profileData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={profileData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <InputField
          label="E-mail"
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleChange}
          placeholder="E-mail"
        />
        <InputField
          label="Contact Number"
          type="tel"
          name="contactNumber"
          value={profileData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
        />

        {/* Dropdown for Gender */}
        <div>
          <label className="block mb-1 text-sm text-gray-700">Gender</label>
          <select
            name="gender"
            value={profileData.gender}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <InputField
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={profileData.dateOfBirth}
          onChange={handleChange}
          placeholder="mm/dd/yyyy"
        />
        <InputField
          label="Education Level"
          name="educationLevel"
          value={profileData.educationLevel}
          onChange={handleChange}
          placeholder="Education Level"
        />
        <InputField
          label="Guardian's Name"
          name="guardianName"
          value={profileData.guardianName}
          onChange={handleChange}
          placeholder="Guardian's Name"
        />
        <InputField
          label="Guardian's Contact Number"
          type="tel"
          name="guardianContactNumber"
          value={profileData.guardianContactNumber}
          onChange={handleChange}
          placeholder="Guardian's Contact Number"
        />
        <InputField
          label="Home Address"
          name="homeAddress"
          value={profileData.homeAddress}
          onChange={handleChange}
          placeholder="Home Address"
        />
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={handleSave}
          className="w-full p-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 sm:w-auto"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
