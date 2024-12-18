import React, { createContext, useContext, useState, useEffect } from "react";
import { getMarksAndGradeByStudentId } from "../API/GetMarksAndGradeAPI";

const MarksAndGradesContext = createContext();

export const MarksAndGradesProvider = ({ children }) => {
  const [rawMarksData, setRawMarksData] = useState([]);
  const [processedMarksData, setProcessedMarksData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMarksAndGrades = async (studentID) => {
    setLoading(true);
    setError(null);

    try {
      const { rawMarksData, processedMarksData } =
        await getMarksAndGradeByStudentId(studentID);
      setRawMarksData(rawMarksData);
      setProcessedMarksData(processedMarksData);
    } catch (err) {
      console.error("Error fetching marks and grades:", err);
      setError("Failed to fetch marks and grades data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MarksAndGradesContext.Provider
      value={{
        rawMarksData,
        processedMarksData,
        loading,
        error,
        fetchMarksAndGrades,
      }}
    >
      {children}
    </MarksAndGradesContext.Provider>
  );
};

export const useMarksAndGrades = () => useContext(MarksAndGradesContext);
