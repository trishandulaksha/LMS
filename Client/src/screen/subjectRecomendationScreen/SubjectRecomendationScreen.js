import React, { useEffect, useState } from "react";
import SubjectRecomendation from "../../Component/SubjectRecomendation/SubjectRecomendation";
import { UseDataContexts } from "../../ContextAPI/LoginAndMarksContext";
import "./recosub.css";
function SubjectRecomendationScreen() {
  const { user } = UseDataContexts();
  const [recommendedSubjects, setRecommendedSubjects] = useState([]);

  useEffect(() => {
    if (user && user?.success.recommendedSubjects) {
      setRecommendedSubjects(user?.success.recommendedSubjects); // Get recommended subjects from user context
    }
  }, [user]);

  return (
    <div>
      <div className="w-full min-h-screen p-8 bg-gray-100 ">
        <div className="min-h-screen bg-gray-100">
          {/* Pass the recommendedSubjects data to the SubjectRecomendation component */}
          <SubjectRecomendation recommendedSubjects={recommendedSubjects} />
        </div>
      </div>
    </div>
  );
}

export default SubjectRecomendationScreen;
