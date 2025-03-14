import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useMarksAndGrades } from "../../ContextAPI/getMarksAndGradeContext";

const StudentProgress = () => {
  const { processedMarksData, loading, error } = useMarksAndGrades();
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);
  const [passedSubjects, setPassedSubjects] = useState([]);
  const [pendingSubjects, setPendingSubjects] = useState([]);
  const reportRef = useRef(); // Reference for the report section

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

  const downloadPDF = () => {
    const input = reportRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("Student_Progress_Report.pdf");
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="w-full min-h-screen p-8 bg-gray-100">
      <div className="p-6 mt-10 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold">Student Progress</h2>
        <div className="flex justify-end mb-4">
          <button
            onClick={downloadPDF}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Download Report
          </button>
        </div>
        <div ref={reportRef}>
          {/* Enrolled Subjects */}
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
                    } hover:bg-gray-100`}
                  >
                    <td className="px-4 py-2">{subject.courseCode}</td>
                    <td className="px-4 py-2">{subject.credits}</td>
                    <td className="px-4 py-2">{subject.finalMarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Passed Subjects */}
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
                    } hover:bg-green-100`}
                  >
                    <td className="px-4 py-2">{subject.courseCode}</td>
                    <td className="px-4 py-2">{subject.credits}</td>
                    <td className="px-4 py-2">{subject.finalMarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pending Subjects */}
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
                    } hover:bg-red-100`}
                  >
                    <td className="px-4 py-2">{subject.courseCode}</td>
                    <td className="px-4 py-2">{subject.credits}</td>
                    <td className="px-4 py-2">{subject.finalMarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>{" "}
        {/* End of reportRef */}
      </div>
    </div>
  );
};

export default StudentProgress;
