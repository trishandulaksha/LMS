import React from 'react'

const Recosubgrid = ({ recommendedSubjects }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Recommended Subjects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendedSubjects.map((subject) => (
          <div
            key={subject._id}
            className="bg-white shadow-md rounded-md p-4 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">
              {subject.courseCode} - {subject.courseName}
            </h3>
            <p className="text-gray-700 text-sm">
              <span className="font-bold">Coordinator: </span>
              {subject.courseCoordinator}
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-bold">Credits: </span>
              {subject.credits}
            </p>
            <p className={`text-sm font-medium ${subject.compulsory ? "text-green-500" : "text-red-500"}`}>
              {subject.compulsory ? "Compulsory" : "Optional"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Recosubgrid