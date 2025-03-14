import React, { useState, useImperativeHandle, forwardRef } from "react";
import { ClipLoader } from "react-spinners"; // Loading animation
import { fetchSubjectsByCourseCode } from "../../API/SubjectAPI";

const CourseDetailsPopup = forwardRef(({ courseCode }, ref) => {
  const [courseData, setCourseData] = useState(null);

  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Track if the popup is open

  // Imperative handle to expose the fetchCourseDetails and close methods
  useImperativeHandle(ref, () => ({
    fetchCourseDetails,
    close: closePopup,
  }));

  // Close the popup by setting the isOpen state to false
  const closePopup = () => {
    setIsOpen(false);
  };

  // Fetch the course details when called
  const fetchCourseDetails = async () => {
    setIsOpen(true); // Open the popup when fetching starts
    try {
      const response = await fetchSubjectsByCourseCode(courseCode);
      console.log(response); // Check the response data
      if (response) {
        setCourseData(response);
      } else {
        setError("No course found with the given code.");
      }
    } catch (error) {
      setError("Failed to fetch course data.");
    }
  };

  // Error message
  if (error) {
    return (
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-600 bg-opacity-50">
        <div className="p-6 text-center text-red-500 bg-white rounded-lg shadow-lg w-96">
          {error}
        </div>
      </div>
    );
  }

  // No course data or popup closed
  if (!courseData || !isOpen) {
    return null; // No course data or popup closed
  }

  console.log("Course Data", courseData); // Ensure courseData is being passed properly

  // Ensure prerequisites is always an array
  const prerequisites = Array.isArray(courseData.success.prerequisites)
    ? courseData.success.prerequisites
    : [];

  // Ensure recommendedNextSubjects is always an array
  const recommendedNextSubjects = Array.isArray(
    courseData.success.recommendedNextSubjects
  )
    ? courseData.success.recommendedNextSubjects
    : [];

  // Course details display
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold">{courseData.success.courseName}</h2>
        <p className="mt-2 text-gray-700">
          Course Code: {courseData.success.courseCode}
        </p>
        <p className="mt-2 text-gray-700">
          Coordinator: {courseData.success.courseCoordinator}
        </p>
        <p className="mt-2 text-gray-700">
          Credits: {courseData.success.credits}
        </p>
        <p className="mt-2 text-gray-700">
          Level: {courseData.success.subjectLevel}
        </p>
        <p className="mt-2 text-gray-700">
          Prerequisites:{" "}
          {prerequisites.length > 0 ? prerequisites.join(", ") : "None"}
        </p>
        <div className="mt-4">
          <h3 className="font-bold">Recommended Next Subjects:</h3>
          <ul className="pl-4 list-disc">
            {recommendedNextSubjects.length > 0 ? (
              recommendedNextSubjects.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))
            ) : (
              <li>None</li>
            )}
          </ul>
        </div>
        <button
          onClick={closePopup} // Close the popup on button click
          className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-full"
        >
          Close
        </button>
      </div>
    </div>
  );
});

export default CourseDetailsPopup;
