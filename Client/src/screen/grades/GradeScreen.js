import SchoolIcon from "@mui/icons-material/School";
import React, { useEffect, useState } from "react";
import data from "./data.json";
import GradeChartComponent from "../../Component/GradeChartComponent/GradeChartComponent";
import GradeTableComponent from "../../Component/GradeTableComponent/GradeTableComponent";

function GradeScreen() {
  // Initialize selected year and semester to the first available year and semester in the data
  const [selectedYear, setSelectedYear] = useState(data.years[0].year);
  const [selectedSemester, setSelectedSemester] = useState(
    data.years[0].semesters[0].semester
  );
  const [subjects, setSubjects] = useState(
    data.years[0].semesters[0].subjects || []
  );
  const [error, setError] = useState("");

  useEffect(() => {
    // Find the data for the selected year
    const yearData = data.years.find((y) => y.year === selectedYear);
    if (!yearData) {
      setError("Data not found for the selected year");
      setSubjects([]);
      return;
    }

    setError("");

    // Find the data for the selected semester
    const semesterData = yearData.semesters.find(
      (sem) => sem.semester === selectedSemester
    );

    if (semesterData) {
      setSubjects(semesterData.subjects);
    } else {
      setError("Data not found for the selected semester");
      setSubjects([]);
    }
  }, [selectedYear, selectedSemester]);

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setSelectedYear(newYear);

    // Set the first semester of the newly selected year
    const yearData = data.years.find((y) => y.year === newYear);
    if (yearData && yearData.semesters.length > 0) {
      setSelectedSemester(yearData.semesters[0].semester);
      setSubjects(yearData.semesters[0].subjects);
    } else {
      setSelectedSemester("");
      setSubjects([]);
    }
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen p-4 overflow-x-hidden md:px-8 lg:px-16 xl:px-20 ">
        <div className="p-2 mt-5 shadow-sm md:p-5 bg-slate-200 bg-opacity-35 rounded-xl shadow-blue-200">
          <div className="mt-8 ">
            <div className="inline-flex items-center">
              <SchoolIcon
                sx={{
                  fontSize: "50px",
                }}
              />
              <div className="ml-4 text-3xl font-extrabold">SPTS</div>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-extrabold">Grades</h2>
            </div>
          </div>

          <div className="flex flex-col justify-center w-full max-w-4xl mt-6 space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
            <div className="flex flex-col w-full sm:w-1/2">
              <label className="text-lg font-semibold">Select Year</label>
              <select
                className="p-2 mt-2 bg-white border rounded-md"
                value={selectedYear}
                onChange={handleYearChange}
              >
                {data.years.map((year) => (
                  <option key={year.year} value={year.year}>
                    {year.year}
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
                {data.years
                  .find((y) => y.year === selectedYear)
                  ?.semesters.map((sem) => (
                    <option key={sem.semester} value={sem.semester}>
                      {sem.semester}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex items-center justify-center w-full sm:w-1/2">
              <p className="font-extrabold">GPA Value = </p>
              <p className="ml-2 text-2xl font-bold"> 2.8</p>
            </div>
          </div>

          {error ? (
            <p className="mt-6 text-xl text-center text-red-500">{error}</p>
          ) : (
            <div className="flex flex-col justify-between mt-8 space-y-8 sm:flex-row sm:space-y-0 sm:space-x-8">
              <div className="w-full overflow-auto sm:w-1/2 ">
                <GradeChartComponent subjects={subjects || []} />
              </div>
              <div className="w-full overflow-auto sm:w-1/2">
                <GradeTableComponent
                  subjects={subjects || []}
                  year={selectedYear}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default GradeScreen;
