import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Link } from "react-router-dom";
import ProgressBar from "../../Component/ProgressBar/ProgressBar";
import { useMarksAndGrades } from "../../ContextAPI/getMarksAndGradeContext";
import { UseDataContexts } from "../../ContextAPI/LoginAndMarksContext";
import userImage from ".././../assets/images/userIcon.jpeg";

// Modal for loading popup
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

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { processedMarksData, loading, error } = useMarksAndGrades();
  const { user } = UseDataContexts();

  const [performanceData, setPerformanceData] = useState([]);
  const [studentDetails, setStudentDetails] = useState({
    name: "Student",
    level: "3", // Default level as 3
    completedSubjects: 0,
    totalYears: 4,
    currentYear: 1,
    progressYear: 1, // Default progress year as 1
    passedSubjects: 0,
    failedSubjects: 0,
    status: "Pending",
    levelCredits: {}, // Track credits completed per level
  });
  const [passedCreditAmount, setPassedCreditAmount] = useState(0);
  const [progressBarTotalCredits, setProgressBarTotalCredits] = useState(28); // Default to 28 credits for Year 1

  console.log(user);

  useEffect(() => {
    if (processedMarksData) {
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

      // Calculate passed credits level-wise
      const creditsPerLevel = 28; // Minimum credits required per level
      let cumulativeCredits = 0;
      let currentLevel = 3; // Starting level
      const levelCredits = {};

      for (const level of levels) {
        const passedCredits = level.enrolledSubjects
          ?.filter((subject) => subject.finalMarks >= 50)
          .reduce((acc, subject) => acc + (subject.credits || 0), 0);

        cumulativeCredits += passedCredits || 0;
        levelCredits[level.level] = cumulativeCredits;

        // Move to the next level if the student has completed at least 28 credits in the current level
        if (cumulativeCredits >= creditsPerLevel * (level.level - 2)) {
          currentLevel = level.level + 1;
        }
      }

      // Calculate progress year based on cumulative credits
      const progressYear = Math.min(
        Math.floor(cumulativeCredits / creditsPerLevel) + 1,
        totalYears
      );

      // Set the total credits for the progress bar based on the progress year
      let progressBarTotal;
      if (progressYear === 1) {
        progressBarTotal = 28; // Year 1: 0–28 credits
      } else if (progressYear === 2) {
        progressBarTotal = 56; // Year 2: 29–56 credits
      } else if (progressYear === 3) {
        progressBarTotal = 84; // Year 3: 57–84 credits
      } else if (progressYear === 4) {
        progressBarTotal =
          processedMarksData?.registerSubjectFullCreditAmount || 130; // Year 4: 85+ credits
      }

      setProgressBarTotalCredits(progressBarTotal);
      setPassedCreditAmount(cumulativeCredits);

      const performanceData = levels.map((level, idx) => ({
        label: `Level ${level.level}`,
        percentage: Math.round(
          ((level.enrolledSubjects?.filter((s) => s.finalMarks >= 50).length ||
            0) /
            (level.enrolledSubjects?.length || 1)) *
            100
        ),
        color: `hsl(${(idx + 1) * 90}, 70%, 60%)`,
      }));

      setPerformanceData(performanceData);

      setStudentDetails({
        name: user?.success.user.name || "Student",
        level: currentLevel,
        completedSubjects,
        totalYears,
        currentYear: Math.floor((currentLevel - 3) / 1) + 1, // Calculate current year based on level
        progressYear, // Update progress year based on cumulative credits
        passedSubjects,
        failedSubjects,
        status: failedSubjects === 0 ? "Good" : "Needs Improvement",
        levelCredits, // Include level-wise credits in student details
      });
    } else {
      // If no data, show the default values without error message
      setStudentDetails({
        name: user?.success.user.name || "Student",
        level: "3", // Default level 3
        completedSubjects: 0,
        totalYears: 4,
        currentYear: 1,
        progressYear: 1, // Default progress year as 1
        passedSubjects: 0,
        failedSubjects: 0,
        status: "Pending",
        levelCredits: {}, // Default empty level credits
      });
      setPerformanceData([]);
      setProgressBarTotalCredits(28); // Default to 28 credits for Year 1
    }
  }, [processedMarksData, user]);

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

  if (loading) return <LoadingModal isOpen={loading} />; // Display loading modal when data is loading

  return (
    <div className="w-full min-h-screen p-8 bg-gray-100">
      {/* Header Section */}

      {/* Student Info Section */}
      <div className="flex flex-col items-center p-6 mt-1 mb-6 bg-white rounded-lg shadow lg:flex-row lg:justify-between lg:space-x-6">
        <div className="flex items-center space-x-4">
          <img
            src={userImage}
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
              totalCredits={progressBarTotalCredits} // Dynamically set total credits based on progress year
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
