import React, { useEffect, useState } from "react";
import SubjectRecomendation from "../../Component/SubjectRecomendation/SubjectRecomendation";
import { UseDataContexts } from "../../ContextAPI/LoginAndMarksContext";
import { subjectEnrollment, SubjectRecomendeAPI } from "../../API/SubjectAPI"; // Import the API
import "./recosub.css";

function SubjectRecomendationScreen() {
  const { user } = UseDataContexts();
  const [recommendedSubjects, setRecommendedSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  console.log("SubjectRecomendationScreen user", user);
  // Fetch recommended subjects from API
  useEffect(() => {
    const fetchRecommendedSubjects = async () => {
      if (user && user?.success.user._id) {
        setIsLoading(true); // Start loading
        try {
          const data = await SubjectRecomendeAPI(user?.success.user._id);
          setRecommendedSubjects(data.recommendedSubjects.filteredSubjects); // Update recommended subjects
        } catch (error) {
          console.error("Error fetching recommended subjects:", error);
        } finally {
          setIsLoading(false); // Stop loading
        }
      }
    };

    fetchRecommendedSubjects();
  }, [user]);

  // Handle enrolling a subject
  const handleEnrollSubject = async (subjectCode) => {
    setIsLoading(true); // Show loading animation
    try {
      const studentID = user?.success.user._id;
      const response = await subjectEnrollment(studentID, subjectCode); // Call the API to enroll
      console.log("Enrollment response:", response);
      if (response) {
        // Remove enrolled subject from the recommended list
        setRecommendedSubjects((prevSubjects) =>
          prevSubjects.filter((subject) => subject.courseCode !== subjectCode)
        );
      }
    } catch (error) {
      console.error("Error enrolling subject:", error);
    } finally {
      setIsLoading(false); // Hide loading animation
    }
  };

  return (
    <div>
      <div className="w-full min-h-screen p-8 bg-gray-100">
        <div className="relative min-h-screen bg-gray-100">
          {/* Show loading animation */}
          {isLoading && (
            <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
              <div className="loader"></div>
            </div>
          )}

          {/* Pass the recommendedSubjects data to the SubjectRecomendation component */}
          <SubjectRecomendation
            recommendedSubjects={recommendedSubjects}
            handleEnroll={handleEnrollSubject} // Pass enroll handler
          />
        </div>
      </div>
    </div>
  );
}

export default SubjectRecomendationScreen;
