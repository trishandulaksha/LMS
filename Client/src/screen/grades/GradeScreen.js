import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import GradeChartComponent from "../../Component/GradeChartComponent/GradeChartComponent";
import GradeTableComponent from "../../Component/GradeTableComponent/GradeTableComponent";
import SchoolIcon from "@mui/icons-material/School";
import { useMarksAndGrades } from "../../ContextAPI/getMarksAndGradeContext";
import { UseDataContexts } from "../../ContextAPI/LoginAndMarksContext";

// Modal component for error message
const ErrorModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    // Navigate to the RecommendedSubjects screen
    navigate("/recomendedSubjects");
    onClose(); // Close the modal after redirection
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg">
          <p className="text-xl font-semibold text-red-500">
            No Marks Found. Please enroll in subjects.
          </p>
          <div className="mt-4">
            <button
              onClick={handleRedirect}
              className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Yes, Take me to Enroll
            </button>
          </div>
        </div>
      </div>
    )
  );
};

function GradeScreen() {
  const { processedMarksData, loading, error } = useMarksAndGrades();
  const { user } = UseDataContexts();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false); // State to control modal visibility

  console.log("GRADE SCREEN USER", user);

  useEffect(() => {
    // Only try to access levels if processedMarksData and processedMarksData.levels exist
    if (processedMarksData && processedMarksData.levels) {
      const firstLevel = Object.values(processedMarksData.levels)[0];
      setSubjects(firstLevel.enrolledSubjects || []);
      setSelectedYear(firstLevel.enrolledSubjects[0]?.studentYear || "");
      setSelectedSemester(firstLevel.enrolledSubjects[0]?.semester || "");
    }
  }, [processedMarksData]);

  useEffect(() => {
    // Show error modal if there's an error fetching data
    if (error) {
      setShowErrorModal(true);
    }
  }, [error]);

  const handleYearChange = (e) => {
    const selected = e.target.value;
    setSelectedYear(selected);
    const level = Object.values(processedMarksData.levels).find(
      (lvl) => lvl.enrolledSubjects[0]?.studentYear === selected
    );
    if (level) {
      setSelectedSemester(level.enrolledSubjects[0]?.semester || "");
      setSubjects(level.enrolledSubjects || []);
    }
  };

  const handleSemesterChange = (e) => {
    const selected = e.target.value;
    setSelectedSemester(selected);
    const subjectsForSemester = Object.values(processedMarksData.levels)
      .flatMap((lvl) => lvl.enrolledSubjects)
      .filter(
        (subject) =>
          subject.semester === selected && subject.studentYear === selectedYear
      );

    setSubjects(subjectsForSemester);
  };

  return (
    <div className="w-full mt-20">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <ErrorModal
          isOpen={showErrorModal}
          onClose={() => setShowErrorModal(false)}
        />
      ) : (
        <div className="flex flex-col w-full p-4 overflow-x-hidden md:px-8 lg:px-16 xl:px-20 ">
          <div className="w-full p-2 shadow-sm md:p-5 bg-slate-200 bg-opacity-35 rounded-xl shadow-blue-200">
            <div className="flex flex-col justify-center w-full max-w-4xl space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
              <div className="flex flex-col w-full sm:w-1/2">
                <label className="text-lg font-semibold">Select Year</label>
                <select
                  className="p-2 mt-2 bg-white border rounded-md"
                  value={selectedYear}
                  onChange={handleYearChange}
                >
                  {processedMarksData.levels &&
                    Object.values(processedMarksData.levels).map((level) => (
                      <option
                        key={level.enrolledSubjects[0]?.studentYear}
                        value={level.enrolledSubjects[0]?.studentYear}
                      >
                        {level.enrolledSubjects[0]?.studentYear}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex flex-col w-full sm:ml-1 sm:w-1/2">
                <label className="text-lg font-semibold">Select Semester</label>
                <select
                  className="p-2 mt-2 bg-white border rounded-md"
                  value={selectedSemester}
                  onChange={handleSemesterChange}
                >
                  {[
                    ...new Set(
                      processedMarksData.levels
                        ? Object.values(processedMarksData.levels)
                            .flatMap((level) => level.enrolledSubjects)
                            .filter(
                              (subject) => subject.studentYear === selectedYear
                            )
                            .map((subject) => subject.semester)
                        : []
                    ),
                  ].map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-center w-full sm:w-1/2">
                <p className="font-extrabold">GPA Value = </p>
                <p className="ml-2 text-2xl font-bold">{user?.success.gpa}</p>
              </div>
            </div>

            <div className="flex flex-col justify-between w-full mt-8 space-y-8 sm:flex-row sm:space-y-0 sm:space-x-8">
              <div className="w-full overflow-auto sm:w-1/2 ">
                <GradeChartComponent subjects={subjects} />
              </div>
              <div className="w-full overflow-auto sm:w-1/2">
                <GradeTableComponent subjects={subjects} year={selectedYear} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GradeScreen;
