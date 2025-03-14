import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Link } from "react-router-dom";
import ProgressBar from "../../Component/ProgressBar/ProgressBar";
import { useMarksAndGrades } from "../../ContextAPI/getMarksAndGradeContext";
import { UseDataContexts } from "../../ContextAPI/LoginAndMarksContext";
import { saveStudentDetails, fetchStudentDetails } from "../../API/API.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Loading Modal Component
const LoadingModal = ({ isOpen }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg">
          <div
            className="inline-block w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full spinner-border animate-spin"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-4 text-lg font-semibold">Loading Data...</p>
        </div>
      </div>
    )
  );
};

const Dashboard = () => {
  const { processedMarksData, loading, error } = useMarksAndGrades();
  const { user } = UseDataContexts();

  const [performanceData, setPerformanceData] = useState([]);
  const [studentDetails, setStudentDetails] = useState({
    name: "Student",
    level: "1",
    completedSubjects: 0,
    totalYears: 4,
    currentYear: 1,
    progressYear: 0,
    passedSubjects: 0,
    failedSubjects: 0,
    status: "Pending",
  });
  const [passedCreditAmount, setPassedCreditAmount] = useState(0);

  // Fetch student data from the API (only for students)
  useEffect(() => {
    const fetchData = async () => {
      if (user?.success.user.role === "STUDENT") {
        try {
          const studentId = user?.success.user.id; // Assuming user ID is available
          const data = await fetchStudentDetails(studentId);
          if (data) {
            setStudentDetails(data);
          }
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  // Save student data to the API (only for students)
  const saveData = async () => {
    if (user?.success.user.role === "STUDENT") {
      try {
        const studentId = user?.success.user.id;
        await saveStudentDetails({ id: studentId, ...studentDetails });
      } catch (error) {
        console.error("Error saving student data:", error);
      }
    }
  };

  // Update student details when processedMarksData changes (only for students)
  useEffect(() => {
    if (processedMarksData && user?.success.user.role === "STUDENT") {
      const levels = Object.values(processedMarksData.levels || {});
      const totalYears = 4;
      const completedSubjects = levels.reduce(
        (acc, level) => acc + (level.enrolledSubjects?.length || 0),
        0
      );
      const passedSubjects = levels.reduce(
        (acc, level) =>
          acc +
          (level.enrolledSubjects?.filter((subject) => subject.finalMarks >= 50)
            .length || 0),
        0
      );
      const failedSubjects = completedSubjects - passedSubjects;

      const totalPassedCredits = levels.reduce(
        (acc, level) =>
          acc +
          (level.enrolledSubjects
            ?.filter((subject) => subject.finalMarks >= 50)
            .reduce((subAcc, subject) => subAcc + (subject.credits || 0), 0) ||
          0),
        0
      );

      setPassedCreditAmount(totalPassedCredits);

      const currentYear =
        processedMarksData.currentYear ||
        levels.findIndex((level) =>
          level.enrolledSubjects?.some((s) => s.finalMarks < 50)
        ) + 1;

      const progressYear = failedSubjects === 0 ? totalYears : currentYear;

      const level =
        totalYears === 1 && currentYear === 1
          ? 3
          : processedMarksData.levels?.level || "1";

      const performanceData = levels.map((level, idx) => ({
        label: `Year ${idx + 1}`,
        percentage: Math.round(
          ((level.enrolledSubjects?.filter((s) => s.finalMarks >= 50).length ||
            0) /
            (level.enrolledSubjects?.length || 1)) *
            100
        ),
        color: `hsl(${(idx + 1) * 90}, 70%, 60%)`,
      }));

      setPerformanceData(performanceData);

      const updatedStudentDetails = {
        name: user?.success.user.name || "Student",
        level,
        completedSubjects,
        totalYears,
        currentYear,
        progressYear,
        passedSubjects,
        failedSubjects,
        status: failedSubjects === 0 ? "Good" : "Needs Improvement",
      };

      setStudentDetails(updatedStudentDetails);
      saveData(); // Save updated data to the API
    }
  }, [processedMarksData, user]);

  // Render chart data
  const renderChart = (percentage, color) => ({
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, "#E0E0E0"],
        hoverBackgroundColor: [color, "#E0E0E0"],
        borderWidth: 0,
      },
    ],
  });

  // Display loading modal if data is being fetched
  if (loading) return <LoadingModal isOpen={loading} />;

  return (
    <div className="w-full min-h-screen p-8 bg-gray-100">
      {/* Student Info Section */}
      <div className="flex flex-col items-center p-6 mt-16 mb-6 bg-white rounded-lg shadow lg:flex-row lg:justify-between lg:space-x-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-lg font-bold">{studentDetails.name}</h2>
            <p className="text-gray-500">
              Level {studentDetails.level} Student
            </p>
          </div>
          <div className="pl-11">
            <ProgressBar
              currentCredits={passedCreditAmount}
              totalCredits={
                processedMarksData?.registerSubjectFullCreditAmount || 130
              }
            />
          </div>
        </div>
        <div className="mt-4 lg:mt-0">
          <div className="grid grid-cols-2 gap-4 text-sm lg:flex lg:items-center lg:space-x-6">
            <div className="flex flex-col items-start">
              <p>
                {" "}
                <Link
                  to="/studentprogress#enrolled"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Enrolled Subjects: {studentDetails.completedSubjects}{" "}
                </Link>
              </p>
              <p>Level: {studentDetails.level}</p>
              <p>Year: {studentDetails.currentYear}</p>
              <p>Total Years: {studentDetails.totalYears}</p>
            </div>

            <div className="flex flex-col items-start">
              <p>Progress Year: {studentDetails.progressYear}</p>
              <p>
                <Link
                  to="/studentprogress#passed"
                  className="text-green-500 hover:text-green-700"
                >
                  Passed Subjects: {studentDetails.passedSubjects}
                </Link>
              </p>
              <p>
                {" "}
                <Link
                  to="/studentprogress#pending"
                  className="text-red-500 hover:text-red-700"
                >
                  Pending Subjects: {studentDetails.failedSubjects}{" "}
                </Link>
              </p>
              <p>Status: {studentDetails.status}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Performance Section */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-6 text-xl font-bold">Overall Performance</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {performanceData.length === 0 ? (
            <p>No performance data available yet.</p>
          ) : (
            performanceData.map((data, index) => (
              <div key={index} className="text-center">
                <Doughnut data={renderChart(data.percentage, data.color)} />
                <p className="mt-4 text-lg font-bold">{data.percentage}%</p>
                <p className="text-gray-500">{data.label}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;