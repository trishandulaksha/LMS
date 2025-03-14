import React, { useState } from "react";

const SubjectRecomendation = ({ recommendedSubjects, handleEnroll }) => {
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

  // Handle enrollment
  const handleEnrollClick = async () => {
    if (selectedCourses.length > 0) {
      await handleEnroll(selectedCourses[0]); // Enroll only one course at a time
      setSelectedCourses([]); // Reset selected courses after enrollment
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Recommended Subjects</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommendedSubjects && recommendedSubjects.length > 0 ? (
          recommendedSubjects.map((subject) => (
            <div
              key={subject.courseCode}
              className="p-4 transition-shadow bg-white border border-gray-200 rounded-md shadow-md hover:shadow-lg"
            >
              <h3 className="mb-2 text-lg font-semibold">
                {subject.courseCode} - {subject.courseName}
              </h3>
              <p className="text-sm text-gray-700">
                <span className="font-bold">Coordinator: </span>
                {subject.coordinator}
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
            onClick={handleEnrollClick}
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
