import React, { useState } from "react";
import { subjectEnrollment } from "../../API/SubjectAPI";
import { UseDataContexts } from "../../ContextAPI/LoginAndMarksContext";
// Assuming subjectEnrollment function is available

const SubjectRecomendation = ({ recommendedSubjects }) => {
  const { user } = UseDataContexts();
  const [selectedCourses, setSelectedCourses] = useState([]); // Track selected courses

  // Handle course selection
  const handleCourseSelect = (courseCode) => {
    setSelectedCourses((prev) => {
      if (prev.includes(courseCode)) {
        return prev.filter((code) => code !== courseCode); // Remove if already selected
      }
      return [...prev, courseCode]; // Add course code to selection
    });
  };
  console.log(selectedCourses);
  // Handle enrollment
  const handleEnroll = async () => {
    try {
      const studentID = user?.success.user._id; // Replace with actual student ID
      for (const courseCode of selectedCourses) {
        const response = await subjectEnrollment(studentID, courseCode);
        console.log(response);
        if (response) {
          console.log(`Successfully enrolled in ${courseCode}`);
        }
      }
      alert("Enrollment successful!");
    } catch (error) {
      console.error("Enrollment failed:", error.message);
      alert("Failed to enroll in selected courses.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Recommended Subjects</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommendedSubjects && recommendedSubjects.length > 0 ? (
          recommendedSubjects.map((subject) => (
            <div
              key={subject._id}
              className="p-4 transition-shadow bg-white border border-gray-200 rounded-md shadow-md hover:shadow-lg"
            >
              <h3 className="mb-2 text-lg font-semibold">
                {subject.courseCode} - {subject.courseName}
              </h3>
              <p className="text-sm text-gray-700">
                <span className="font-bold">Coordinator: </span>
                {subject.courseCoordinator}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold">Credits: </span>
                {subject.credits}
              </p>
              <p
                className={`text-sm font-medium ${
                  subject.compulsory ? "text-green-500" : "text-red-500"
                }`}
              >
                {subject.compulsory ? "Compulsory" : "Optional"}
              </p>
              {/* Add checkbox to select the course */}
              <div className="mt-2">
                <input
                  type="checkbox"
                  id={subject.courseCode}
                  onChange={() => handleCourseSelect(subject.courseCode)}
                  checked={selectedCourses.includes(subject.courseCode)}
                />
                <label htmlFor={subject.courseCode} className="ml-2 text-sm">
                  Select this course
                </label>
              </div>
            </div>
          ))
        ) : (
          <p>No recommended subjects available.</p>
        )}
      </div>

      {/* Display the enroll button if any course is selected */}
      {selectedCourses.length > 0 && (
        <div className="mt-4">
          <button
            onClick={handleEnroll}
            className="px-4 py-2 text-white bg-blue-600 rounded-md"
          >
            Enroll in Selected Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default SubjectRecomendation;
