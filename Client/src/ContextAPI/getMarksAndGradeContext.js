import React, { createContext, useContext, useState, useEffect } from "react";
import { getMarksAndGradeByStudentId } from "../API/GetMarksAndGradeAPI";

const MarksAndGradesContext = createContext();

export const MarksAndGradesProvider = ({ children }) => {
  const [rawMarksData, setRawMarksData] = useState(() => {
    // Retrieve from sessionStorage or return an empty array
    const storedRawMarksData = sessionStorage.getItem("rawMarksData");
    return storedRawMarksData ? JSON.parse(storedRawMarksData) : [];
  });

  const [processedMarksData, setProcessedMarksData] = useState(() => {
    // Retrieve from sessionStorage or return an empty object
    const storedProcessedMarksData =
      sessionStorage.getItem("processedMarksData");
    return storedProcessedMarksData ? JSON.parse(storedProcessedMarksData) : {};
  });

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

      // Store fetched data in sessionStorage
      sessionStorage.setItem("rawMarksData", JSON.stringify(rawMarksData));
      sessionStorage.setItem(
        "processedMarksData",
        JSON.stringify(processedMarksData)
      );
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
