import React, { useState, useEffect } from "react";
import InputField from "../../Component/InputComponent/InputComponent";
import { UseDataContexts } from "../../ContextAPI/LoginAndMarksContext";

// Custom CSS for loading dots animation
import "./myProfile.css";

const MyProfile = () => {
  const { user } = UseDataContexts();
  console.log(user?.success?.user?.name);

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

  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    if (user?.success?.user) {
      const nameParts = user.success.user.name
        ? user.success.user.name.split(" ")
        : ["", ""];
      const updatedProfileData = {
        firstName: nameParts[0] || "",
        lastName: nameParts[1] || "",
        gender: user.success.user.gender || "",
        role: user.success.user.role || "",
        dateOfBirth: "", // Replace with user.success.user.dateOfBirth if available
        educationLevel: "", // Replace with user.success.user.educationLevel if available
        email: user.success.user.email || "",
        contactNumber: user.success.user.mobile_number || "",
        guardianName: "", // Replace with user.success.user.guardianName if available
        guardianContactNumber: "", // Replace with user.success.user.guardianContactNumber if available
        homeAddress: "", // Replace with user.success.user.homeAddress if available
      };
      setProfileData(updatedProfileData);
    }

    const cachedProfile = JSON.parse(sessionStorage.getItem("user"));
    if (cachedProfile) {
      setProfileData((prevState) => ({
        ...prevState,
        ...cachedProfile,
      }));
      console.log("Cached Data:", cachedProfile);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value || "" });
  };

  const handleSave = () => {
    setLoading(true); // Start loading

    // Simulate a save delay (e.g., save to API or localStorage)
    setTimeout(() => {
      localStorage.setItem("profileData", JSON.stringify(profileData));
      console.log("Profile Data Saved:", profileData);

      setLoading(false); // End loading
    }, 2000); // Simulating a delay of 2 seconds
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
          {profileData.role || "N/A"}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <InputField
          label="First Name"
          name="firstName"
          value={profileData.firstName || ""}
          onChange={handleChange}
          placeholder="First Name"
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={profileData.lastName || ""}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <InputField
          label="E-mail"
          type="email"
          name="email"
          value={profileData.email || ""}
          onChange={handleChange}
          placeholder="E-mail"
        />
        <InputField
          label="Contact Number"
          type="tel"
          name="contactNumber"
          value={profileData.contactNumber || ""}
          onChange={handleChange}
          placeholder="Contact Number"
        />

        {/* Dropdown for Gender */}
        <div>
          <label className="block mb-1 text-sm text-gray-700">Gender</label>
          <select
            name="gender"
            value={profileData.gender || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <InputField
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={profileData.dateOfBirth || ""}
          onChange={handleChange}
          placeholder="mm/dd/yyyy"
        />
        <InputField
          label="Education Level"
          name="educationLevel"
          value={profileData.educationLevel || ""}
          onChange={handleChange}
          placeholder="Education Level"
        />
        <InputField
          label="Guardian's Name"
          name="guardianName"
          value={profileData.guardianName || ""}
          onChange={handleChange}
          placeholder="Guardian's Name"
        />
        <InputField
          label="Guardian's Contact Number"
          type="tel"
          name="guardianContactNumber"
          value={profileData.guardianContactNumber || ""}
          onChange={handleChange}
          placeholder="Guardian's Contact Number"
        />
        <InputField
          label="Home Address"
          name="homeAddress"
          value={profileData.homeAddress || ""}
          onChange={handleChange}
          placeholder="Home Address"
        />
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={handleSave}
          className="w-full p-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 sm:w-auto"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              {/* Custom Dots Loading Animation */}
              <div className="dot-loader">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
