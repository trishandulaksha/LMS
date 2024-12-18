import React from "react";

const SubjectRecomendation = ({ recommendedSubjects }) => {
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
            </div>
          ))
        ) : (
          <p>No recommended subjects available.</p>
        )}
      </div>
    </div>
  );
};

export default SubjectRecomendation;
