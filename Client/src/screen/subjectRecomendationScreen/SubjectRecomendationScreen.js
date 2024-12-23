import React, { useEffect, useState } from "react";
import SubjectRecomendation from "../../Component/SubjectRecomendation/SubjectRecomendation";
import { UseDataContexts } from "../../ContextAPI/LoginAndMarksContext";
import "./recosub.css";

function SubjectRecomendationScreen() {
  const { user } = UseDataContexts();
  console.log(user);
  const [recommendedSubjects, setRecommendedSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    if (user && user?.success.recommendedSubjects) {
      setRecommendedSubjects(
        user?.success.recommendedSubjects.filteredSubjects
      ); // Initial load
    }
  }, [user]);

  const handleEnrollSubject = async (subjectId) => {
    setIsLoading(true); // Show loading animation
    try {
      // Mock API call to enroll the subject
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

      // After enrollment, update the recommended subjects list (simulate real-time update)
      const updatedSubjects = recommendedSubjects.filter(
        (subject) => subject.id !== subjectId
      );
      setRecommendedSubjects(updatedSubjects);
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
            onEnroll={handleEnrollSubject} // Pass enroll handler
          />
        </div>
      </div>
    </div>
  );
}

export default SubjectRecomendationScreen;
