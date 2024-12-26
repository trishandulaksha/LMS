import React, { useEffect, useState } from "react";
import { useMarksAndGrades } from "../../ContextAPI/getMarksAndGradeContext";
import { UseDataContexts } from "../../ContextAPI/LoginAndMarksContext";

const StudentProgress = () => {
  const { processedMarksData, loading, error } = useMarksAndGrades();

  const [enrolledSubjects, setEnrolledSubjects] = useState([]);
  const [passedSubjects, setPassedSubjects] = useState([]);
  const [pendingSubjects, setPendingSubjects] = useState([]);

  useEffect(() => {
    if (processedMarksData) {
      const levels = Object.values(processedMarksData.levels || {});
      const enrolled = [];
      const passed = [];
      const pending = [];

      levels.forEach((level) => {
        level.enrolledSubjects?.forEach((subject) => {
          enrolled.push(subject);

          if (subject.finalMarks >= 50) {
            passed.push(subject);
          } else {
            pending.push(subject);
          }
        });
      });

      setEnrolledSubjects(enrolled);
      setPassedSubjects(passed);
      setPendingSubjects(pending);
    }
  }, [processedMarksData]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="w-full min-h-screen p-8 bg-gray-100">
      <div className="p-6 mt-10 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold">Student Progress</h2>

        {/* Enrolled Subjects Table */}
        <div id="enrolled">
          <h3 className="mt-8 text-lg font-semibold">Enrolled Subjects</h3>
          <table className="w-full mt-4 border border-collapse table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Credits</th>
                <th className="px-4 py-2 text-left">Final Marks</th>
              </tr>
            </thead>
            <tbody>
              {enrolledSubjects.map((subject, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition-colors duration-300`}
                >
                  <td className="px-4 py-2">{subject.courseCode}</td>
                  <td className="px-4 py-2">{subject.credits}</td>
                  <td className="px-4 py-2">{subject.finalMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Passed Subjects Table */}
        <div id="passed">
          <h3 className="mt-8 text-lg font-semibold">Passed Subjects</h3>
          <table className="w-full mt-4 border border-collapse table-auto">
            <thead className="bg-green-200">
              <tr>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Credits</th>
                <th className="px-4 py-2 text-left">Final Marks</th>
              </tr>
            </thead>
            <tbody>
              {passedSubjects.map((subject, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-green-50" : "bg-white"
                  } hover:bg-green-100 transition-colors duration-300`}
                >
                  <td className="px-4 py-2">{subject.courseCode}</td>
                  <td className="px-4 py-2">{subject.credits}</td>
                  <td className="px-4 py-2">{subject.finalMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pending Subjects Table */}
        <div id="pending">
          <h3 className="mt-8 text-lg font-semibold">Pending Subjects</h3>
          <table className="w-full mt-4 border border-collapse table-auto">
            <thead className="bg-red-200">
              <tr>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Credits</th>
                <th className="px-4 py-2 text-left">Final Marks</th>
              </tr>
            </thead>
            <tbody>
              {pendingSubjects.map((subject, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-red-50" : "bg-white"
                  } hover:bg-red-100 transition-colors duration-300`}
                >
                  <td className="px-4 py-2">{subject.courseCode}</td>
                  <td className="px-4 py-2">{subject.credits}</td>
                  <td className="px-4 py-2">{subject.finalMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;
