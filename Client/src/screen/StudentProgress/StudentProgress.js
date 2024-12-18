import React, { useState } from "react";
import '../../screen/dashboard/dashboard.css';
import Header from "../../Component/Header/Header";
import Footer from "../footer/Footer";

const StudentProgress = () => {
  const [marks, setMarks] = useState({
    exams: 0,
    labTest: 0,
    tmas: 0,
    vivas: 0,
    finalExams: 0,
  });

  const [gpa, setGpa] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMarks({
      ...marks,
      [name]: value,
    });
  };

  const calculateGPA = () => {
    // Example weightage percentages for GPA calculation
    const weights = {
      exams: 0.2,
      labTest: 0.2,
      tmas: 0.15,
      vivas: 0.15,
      finalExams: 0.3,
    };

    let totalWeightedMarks = 0;
    let totalWeight = 0;

    for (const key in marks) {
      totalWeightedMarks += marks[key] * weights[key];
      totalWeight += weights[key];
    }

    const calculatedGPA = (totalWeightedMarks / totalWeight) / 25; // Scale marks to GPA (4.0 scale)
    setGpa(calculatedGPA.toFixed(2));
  };

  return (
    <div className="w-full min-h-screen p-8 bg-gray-100">
      <Header />

      {/* GPA Calculator Section */}
      <div className="p-6 mt-10 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold">GPA Calculation System</h2>
        <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
          {["exams", "labTest", "tmas", "vivas", "finalExams"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="mb-2 font-medium capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="number"
                name={field}
                min="0"
                max="100"
                value={marks[field]}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg"
                placeholder={`Enter ${field} marks (0-100)`}
              />
            </div>
          ))}
        </div>
        <button
          onClick={calculateGPA}
          className="px-6 py-2 mt-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Calculate GPA
        </button>

        {gpa && (
          <div className="mt-6 text-lg font-bold text-center text-green-500">
            Your GPA: {gpa}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default StudentProgress;
