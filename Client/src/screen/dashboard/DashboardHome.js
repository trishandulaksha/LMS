import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import SchoolIcon from "@mui/icons-material/School";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ProgressBar from "../../Component/ProgressBar/ProgressBar";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { processedMarksData, loading, error } = useMarksAndGrades();
  const { user } = UseDataContexts();

  const [performanceData, setPerformanceData] = useState([]);
  const [studentDetails, setStudentDetails] = useState({
    name: "Student",
    level: "",
    completedSubjects: 0,
    totalYears: 0,
    currentYear: "",
    progressYear: 0,
    passedSubjects: 0,
    failedSubjects: 0,
    status: "Pending",
  });
  const [passedCreditAmount, setPassedCreditAmount] = useState(0);

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

      // Calculate passed credits
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
          : processedMarksData.levels?.level || "Unknown";

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

      setStudentDetails({
        name: user?.success.user.name || "Student",
        level: 3,
        completedSubjects,
        totalYears,
        currentYear,
        progressYear,
        passedSubjects,
        failedSubjects,
        status: failedSubjects === 0 ? "Good" : "Needs Improvement",
      });
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
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="w-full min-h-screen p-8 bg-gray-100 ">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center">
          <SchoolIcon
            sx={{
              fontSize: "50px",
            }}
          />
          <div className="ml-4 text-3xl font-extrabold">SPTS</div>
        </div>
        <div className="flex items-center ">
          <div className="p-1 bg-white rounded-lg shadow-lg">
            <input
              text="text"
              placeholder="Search Here"
              className="px-2 py-1 text-sm outline-none "
            />
            <SearchIcon
              sx={{
                cursor: "pointer",
              }}
            />
          </div>
          <NotificationsActiveIcon sx={{ marginLeft: 2 }} />
        </div>
      </div>

      <div className="flex flex-col items-center p-6 mt-16 mb-6 bg-white rounded-lg shadow lg:flex-row lg:justify-between lg:space-x-6">
        <div className="flex items-center space-x-4 mobile-row">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-lg font-bold">Maitey Prajapati</h2>
            <p className="text-gray-500">Level 04 Student</p>
          </div>
          <div className="pl-11">
            <ProgressBar currentCredits={50} totalCredits={130} />
          </div>
        </div>

        <div className="mt-4 lg:mt-0">
          <div className="grid grid-cols-2 gap-4 text-sm lg:flex lg:items-center lg:space-x-6 mobile-grid">
            <div className="flex flex-col items-start">
              <p>Completed Subject : 05</p>
              <p>Level : 04</p>
              <p>Year : 22/23</p>
              <p>Total Years : 04</p>
            </div>

            <div className="flex flex-col items-start">
              <p>Progress Year : 02</p>
              <p>Pass Subjects : 10</p>
              <p>Failed Subjects : 00</p>
              <p>Status : Good</p>
            </div>

            <div className="flex flex-col items-start pt-4 text-cyan-400">
              <p>View Grpdes</p>
              <p>View Progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Performance Section */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-6 text-xl font-bold">Overall Performance</h2>
        <div className="grid grid-cols-3 gap-8 mobile-grid">
          {performanceData.map((data, index) => (
            <div key={index} className="text-center">
              <Doughnut data={renderChart(data.percentage, data.color)} />
              <p className="mt-4 text-lg font-bold">{data.percentage}%</p>
              <p className="text-gray-500">{data.label}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};


export default Dashboard;
